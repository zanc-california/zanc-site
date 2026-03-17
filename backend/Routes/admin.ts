import { Router, Response } from 'express';
import { requireUser, AuthenticatedRequest } from '../middleware/requireUser';
import { sendMembershipApprovalEmail, sendMembershipRejectionEmail } from '../utils/emailService';
import prisma from '../prisma';

const router = Router();

// Middleware to check if user is admin
const requireAdmin = async (req: AuthenticatedRequest, res: Response, next: Function) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Get all users with their membership status (optimized)
router.get('/users', requireUser, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        memberships: {
          include: {
            payment: {
              select: {
                id: true,
                status: true,
                amount: true,
                currency: true,
                createdAt: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Also get CombinedOrders to include new application flow data
    const combinedOrders = await prisma.combinedOrder.findMany({
      include: {
        membershipApplication: true,
        insuranceApplication: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

  const usersWithStatus = users.map((user: typeof users[number]) => {
      const latestMembership = user.memberships[0];
      
      // Check if user has any CombinedOrders
  const userOrders = combinedOrders.filter((order: typeof combinedOrders[number]) => order.userEmail === user.email);
      const latestOrder = userOrders[0];

      // Determine the most recent application status
      let applicationStatus = latestMembership?.status || null;
      let applicationData = latestMembership;

      if (latestOrder && (!latestMembership || latestOrder.createdAt > latestMembership.createdAt)) {
        applicationStatus = latestOrder.status;
        applicationData = {
          id: latestOrder.id.toString(),
          type: latestOrder.membershipType || 'Combined',
          status: latestOrder.status,
          createdAt: latestOrder.createdAt,
          updatedAt: latestOrder.updatedAt,
          userId: user.id,
          rejectionReason: null,
          approvedAt: null,
          rejectedAt: null,
          payment: latestOrder.paymentStatus ? {
            id: latestOrder.id.toString(),
            status: latestOrder.paymentStatus,
            amount: latestOrder.totalAmount * 100, // Convert to cents
            currency: 'USD',
            createdAt: latestOrder.createdAt
          } : null
        };
      }

      return {
        id: user.id,
        name: user.name || '',
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        membership: applicationData ? {
          id: applicationData.id,
          type: applicationData.type || 'Individual',
          status: applicationData.status,
          createdAt: applicationData.createdAt,
          payment: applicationData.payment ? {
            id: applicationData.payment.id,
            status: applicationData.payment.status,
            amount: applicationData.payment.amount / 100, // Convert cents to dollars
            currency: applicationData.payment.currency,
            createdAt: applicationData.payment.createdAt
          } : null
        } : null
      };
    });

    res.json(usersWithStatus);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update user details
router.put('/users/:id', requireUser, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        role
      }
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user
router.delete('/users/:id', requireUser, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Delete related records first
    await prisma.payment.deleteMany({ where: { userId: id } });
    await prisma.membership.deleteMany({ where: { userId: id } });
    await prisma.user.delete({ where: { id } });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Update membership status (approve/reject)
router.put('/memberships/:id/status', requireUser, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason } = req.body;

    if (!['approved', 'rejected', 'active', 'pending'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Get membership with user info for email
    const existingMembership = await prisma.membership.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    if (!existingMembership) {
      return res.status(404).json({ error: 'Membership not found' });
    }

    const membership = await prisma.membership.update({
      where: { id },
      data: { 
        status,
        ...(rejectionReason && { rejectionReason }),
        ...(status === 'approved' && { approvedAt: new Date() }),
        ...(status === 'rejected' && { rejectedAt: new Date() })
      },
      include: {
        user: true,
        payment: true
      }
    });

    // Send notification email
    try {
      if (status === 'approved') {
        await sendMembershipApprovalEmail(
          existingMembership.user.email,
          existingMembership.user.name || 'Member'
        );
      } else if (status === 'rejected') {
        await sendMembershipRejectionEmail(
          existingMembership.user.email,
          existingMembership.user.name || 'Member',
          rejectionReason
        );
      }
    } catch (emailError) {
      console.error('Error sending notification email:', emailError);
      // Don't fail the update if email fails
    }

    // Log activity
    await prisma.activity.create({
      data: {
        type: status === 'approved' ? 'membership_approved' : 'membership_rejected',
        message: `Membership ${status} for ${existingMembership.user.name || existingMembership.user.email}${rejectionReason ? `: ${rejectionReason}` : ''}`,
        userId: req.user?.id,
      },
    });

    res.json(membership);
  } catch (error) {
    console.error('Error updating membership status:', error);
    res.status(500).json({ error: 'Failed to update membership status' });
  }
});

// Get pending applications
router.get('/applications/pending', requireUser, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const pendingApplications = await prisma.membership.findMany({
      where: {
        status: 'pending'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true
          }
        },
        payment: {
          select: {
            id: true,
            status: true,
            amount: true,
            currency: true,
            createdAt: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

  const formattedApplications = pendingApplications.map((app: typeof pendingApplications[number]) => ({
      id: app.id,
      type: app.type || 'Individual',
      status: app.status,
      applicationDate: app.createdAt,
      user: {
        id: app.user.id,
        name: app.user.name || '',
        email: app.user.email,
        joinDate: app.user.createdAt
      },
      payment: app.payment ? {
        id: app.payment.id,
        status: app.payment.status,
        amount: app.payment.amount / 100, // Convert cents to dollars
        currency: app.payment.currency,
        paidAt: app.payment.createdAt
      } : null
    }));

    res.json(formattedApplications);
  } catch (error) {
    console.error('Error fetching pending applications:', error);
    res.status(500).json({ error: 'Failed to fetch pending applications' });
  }
});

// Get active members
router.get('/members/active', requireUser, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const activeMembers = await prisma.membership.findMany({
      where: {
        status: {
          in: ['approved', 'active']
        }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true
          }
        },
        payment: {
          select: {
            id: true,
            status: true,
            amount: true,
            currency: true,
            createdAt: true
          }
        }
      },
      orderBy: {
        approvedAt: 'desc'
      }
    });

  const formattedMembers = activeMembers.map((member: typeof activeMembers[number]) => ({
      id: member.id,
      type: member.type || 'Individual',
      status: member.status,
      approvedAt: member.approvedAt,
      applicationDate: member.createdAt,
      user: {
        id: member.user.id,
        name: member.user.name || '',
        email: member.user.email,
        joinDate: member.user.createdAt
      },
      payment: member.payment ? {
        id: member.payment.id,
        status: member.payment.status,
        amount: member.payment.amount / 100, // Convert cents to dollars
        currency: member.payment.currency,
        paidAt: member.payment.createdAt
      } : null
    }));

    res.json(formattedMembers);
  } catch (error) {
    console.error('Error fetching active members:', error);
    res.status(500).json({ error: 'Failed to fetch active members' });
  }
});

// Get dashboard statistics (optimized)
router.get('/dashboard/stats', requireUser, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const [
      totalUsers,
      totalMemberships,
      pendingApplications,
      approvedMembers,
      rejectedApplications,
      totalRevenue,
      paidApplications,
      totalInsuranceApplications,
      pendingInsuranceApplications
    ] = await Promise.all([
      prisma.user.count(),
      prisma.membership.count(),
      prisma.membership.count({ where: { status: 'pending' } }),
      prisma.membership.count({ where: { status: { in: ['approved', 'active'] } } }),
      prisma.membership.count({ where: { status: 'rejected' } }),
      prisma.payment.aggregate({
        where: { status: 'paid' },
        _sum: { amount: true }
      }),
      prisma.membership.count({ 
        where: { 
          payment: { 
            status: 'paid' 
          } 
        } 
      }),
      prisma.combinedOrder.count({ 
        where: { 
          insuranceApplicationId: { not: null } 
        } 
      }),
      prisma.combinedOrder.count({ 
        where: { 
          insuranceApplicationId: { not: null },
          status: 'PENDING'
        } 
      })
    ]);

    res.json({
      totalUsers,
      totalMemberships,
      pendingApplications,
      approvedMembers,
      rejectedApplications,
      totalRevenue: (totalRevenue._sum.amount || 0) / 100, // Convert cents to dollars
      paidApplications,
      totalInsuranceApplications,
      pendingInsuranceApplications
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// Get recent activities (optimized)
router.get('/dashboard/activities', requireUser, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const [recentMemberships, recentActivities] = await Promise.all([
      prisma.membership.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, email: true } },
          payment: { select: { status: true, amount: true } }
        }
      }),
      prisma.activity.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      })
    ]);

  const membershipActivities = recentMemberships.map((membership: typeof recentMemberships[number]) => ({
      id: `membership-${membership.id}`,
      type: 'membership_application',
      description: `${membership.user.name || membership.user.email} submitted a ${membership.type || 'Individual'} membership application`,
      status: membership.status,
      paymentStatus: membership.payment?.status || 'no-payment',
      amount: membership.payment?.amount ? membership.payment.amount / 100 : null,
      createdAt: membership.createdAt
    }));

  const systemActivities = recentActivities.map((activity: typeof recentActivities[number]) => ({
      id: activity.id,
      type: activity.type,
      description: activity.message,
      status: 'completed',
      createdAt: activity.createdAt
    }));

    // Combine and sort activities
    const allActivities = [...membershipActivities, ...systemActivities]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);

    res.json(allActivities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// Get all insurance applications
router.get('/insurance/applications', requireUser, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const orders = await prisma.combinedOrder.findMany({
      where: {
        insuranceApplicationId: {
          not: null
        }
      },
      include: {
        insuranceApplication: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Get user info and payments for each order
  const formattedApplications = await Promise.all(orders.map(async (order: typeof orders[number]) => {
      const user = await prisma.user.findUnique({
        where: { email: order.userEmail },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true
        }
      });

      const payment = order.stripeSessionId ? await prisma.payment.findFirst({
        where: { stripeSessionId: order.stripeSessionId },
        select: {
          id: true,
          status: true,
          amount: true,
          currency: true,
          createdAt: true
        }
      }) : null;

      return {
        id: order.id,
        insuranceId: order.insuranceApplication?.id,
        firstName: order.insuranceApplication?.firstName || '',
        lastName: order.insuranceApplication?.lastName || '',
        email: order.insuranceApplication?.email || '',
        coverageAmount: order.insuranceApplication?.coverageAmount || 0,
        primaryBeneficiaryName: order.insuranceApplication?.primaryBeneficiaryName || '',
        status: order.status,
        applicationDate: order.createdAt,
        user: user ? {
          id: user.id,
          name: user.name || '',
          email: user.email,
          joinDate: user.createdAt
        } : null,
        payment: payment ? {
          id: payment.id,
          status: payment.status,
          amount: payment.amount / 100,
          currency: payment.currency,
          paidAt: payment.createdAt
        } : null
      };
    }));

    res.json(formattedApplications);
  } catch (error) {
    console.error('Error fetching insurance applications:', error);
    res.status(500).json({ error: 'Failed to fetch insurance applications' });
  }
});

// Update insurance application status
router.put('/insurance/:id/status', requireUser, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Get order with insurance application
    const existingOrder = await prisma.combinedOrder.findUnique({
      where: { id: parseInt(id) },
      include: {
        insuranceApplication: true
      },
    });

    if (!existingOrder || !existingOrder.insuranceApplication) {
      return res.status(404).json({ error: 'Insurance application not found' });
    }

    // Update the order status
    const updatedOrder = await prisma.combinedOrder.update({
      where: { id: parseInt(id) },
      data: { 
        status: status.toUpperCase(), // Convert to match the PENDING/PAID/CANCELLED format
        ...(status === 'approved' && { paymentStatus: 'paid' })
      },
      include: {
        insuranceApplication: true
      }
    });

    // Log activity
    await prisma.activity.create({
      data: {
        type: status === 'approved' ? 'insurance_approved' : 'insurance_rejected',
        message: `Insurance application ${status} for ${existingOrder.insuranceApplication.firstName} ${existingOrder.insuranceApplication.lastName}`,
        userId: req.user?.id,
      },
    });

    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating insurance application status:', error);
    res.status(500).json({ error: 'Failed to update insurance application status' });
  }
});

export default router;
