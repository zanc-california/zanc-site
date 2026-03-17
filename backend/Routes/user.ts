import { Router, Response } from 'express';
import { requireUser, AuthenticatedRequest } from '../middleware/requireUser';
import prisma from '../prisma';

const router = Router();

// POST /api/user/sync - Sync user data
router.post('/sync', requireUser, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id, email, name } = req.body;
    
    // The requireUser middleware will have already created the user if they don't exist
    // But we can update their information if needed
    const user = await prisma.user.upsert({
      where: { id },
      update: {
        email,
        name: name || null,
      },
      create: {
        id,
        email,
        name: name || null,
        role: 'USER',
      },
    });

    res.json(user);
  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).json({ error: 'Failed to sync user' });
  }
});

// GET /api/user/profile - Get user profile
router.get('/profile', requireUser, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// GET /api/user/membership-status - Get user's membership status (optimized)
router.get('/membership-status', requireUser, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    const membership = await prisma.membership.findFirst({
      where: { userId },
      select: {
        id: true,
        type: true,
        status: true,
        createdAt: true,
        approvedAt: true,
        rejectedAt: true,
        rejectionReason: true,
        payment: {
          select: {
            id: true,
            status: true,
            amount: true,
            currency: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!membership) {
      return res.json({ membership: null });
    }

    // Format the response
    const formattedMembership = {
      id: membership.id,
      type: membership.type || 'Individual',
      status: membership.status,
      createdAt: membership.createdAt,
      approvedAt: membership.approvedAt,
      rejectedAt: membership.rejectedAt,
      rejectionReason: membership.rejectionReason,
      payment: membership.payment ? {
        id: membership.payment.id,
        status: membership.payment.status,
        amount: membership.payment.amount / 100, // Convert cents to dollars
        currency: membership.payment.currency,
        createdAt: membership.payment.createdAt,
      } : null
    };

    res.json({ membership: formattedMembership });
  } catch (error) {
    console.error('Error fetching membership status:', error);
    res.status(500).json({ error: 'Failed to fetch membership status' });
  }
});

export default router;
