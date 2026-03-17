import express from 'express';
import prisma from '../prisma';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

// Create combined order (service selection)
router.post('/create-order', async (req, res) => {
  try {
    console.log('=== CREATE ORDER ===');
    console.log('Request body:', req.body);
    
    const {
      membershipType,
      membershipPrice,
      insuranceType,
      insurancePrice,
      totalAmount,
      userEmail
    } = req.body;

    console.log('Creating order with:', {
      membershipType,
      membershipPrice,
      insuranceType,
      insurancePrice,
      totalAmount,
      userEmail
    });

    const order = await prisma.combinedOrder.create({
      data: {
        membershipType: membershipType || null,
        membershipPrice: membershipPrice || 0,
        insuranceType: insuranceType || null,
        insurancePrice: insurancePrice || 0,
        totalAmount,
        userEmail,
        status: 'PENDING',
      }
    });

    console.log('Order created:', order.id);
    res.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Submit insurance application
router.post('/submit-insurance', async (req, res) => {
  try {
    const { orderId, formData } = req.body;

    // Verify order exists
    const order = await prisma.combinedOrder.findUnique({
      where: { id: orderId }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Helper function to parse date safely
    const parseDate = (dateString: string | undefined) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date;
    };

    // Create insurance application with Hartford form structure
    const application = await prisma.insuranceApplication.create({
      data: {
        orderId,
        // Member Information
        firstName: formData.firstName,
        middleInitial: formData.middleInitial || null,
        lastName: formData.lastName,
        dateOfBirth: new Date(formData.dateOfBirth),
        streetAddress: formData.streetAddress,
        aptUnit: formData.aptUnit || null,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        socialSecurity: formData.socialSecurity,
        primaryPhone: formData.primaryPhone,
        secondaryPhone: formData.secondaryPhone || null,
        gender: formData.gender,
        email: formData.email,
        
        // Coverage Selection
        coverageAmount: formData.coverageAmount,
        
        // Children Coverage
        enrollChildrenCoverage: formData.enrollChildrenCoverage || false,
        
        // Dependent Information (stored as JSON)
        dependents: formData.dependents || null,
        
        // Beneficiary Designation - Primary
        primaryBeneficiaryName: formData.primaryBeneficiaryName || null,
        primaryBeneficiarySSN: formData.primaryBeneficiarySSN || null,
        primaryBeneficiaryDOB: parseDate(formData.primaryBeneficiaryDOB),
        primaryBeneficiaryRelationship: formData.primaryBeneficiaryRelationship || null,
        primaryBeneficiaryPercentage: formData.primaryBeneficiaryPercentage || null,
        primaryBeneficiaryAddress: formData.primaryBeneficiaryAddress || null,
        primaryBeneficiaryPhone: formData.primaryBeneficiaryPhone || null,
        
        // Beneficiary Designation - Contingent
        contingentBeneficiaryName: formData.contingentBeneficiaryName || null,
        contingentBeneficiarySSN: formData.contingentBeneficiarySSN || null,
        contingentBeneficiaryDOB: parseDate(formData.contingentBeneficiaryDOB),
        contingentBeneficiaryRelationship: formData.contingentBeneficiaryRelationship || null,
        contingentBeneficiaryPercentage: formData.contingentBeneficiaryPercentage || null,
        contingentBeneficiaryAddress: formData.contingentBeneficiaryAddress || null,
        contingentBeneficiaryPhone: formData.contingentBeneficiaryPhone || null,
        
        // Additional Contingent Beneficiary
        contingent2BeneficiaryName: formData.contingent2BeneficiaryName || null,
        contingent2BeneficiarySSN: formData.contingent2BeneficiarySSN || null,
        contingent2BeneficiaryDOB: parseDate(formData.contingent2BeneficiaryDOB),
        contingent2BeneficiaryRelationship: formData.contingent2BeneficiaryRelationship || null,
        contingent2BeneficiaryPercentage: formData.contingent2BeneficiaryPercentage || null,
        contingent2BeneficiaryAddress: formData.contingent2BeneficiaryAddress || null,
        contingent2BeneficiaryPhone: formData.contingent2BeneficiaryPhone || null,
        
        // Existing Life Insurance
        hasExistingPolicy: formData.hasExistingPolicy || false,
        
        // Member Signature and Date
        signatureDate: new Date(formData.signatureDate),
      }
    });

    // Update order status
    await prisma.combinedOrder.update({
      where: { id: orderId },
      data: { 
        insuranceCompleted: true,
        insuranceApplicationId: application.id
      }
    });

    res.json({ success: true, applicationId: application.id });
  } catch (error) {
    console.error('Error submitting insurance application:', error);
    res.status(500).json({ error: 'Failed to submit insurance application' });
  }
});

// Submit membership application
router.post('/submit-membership', async (req, res) => {
  try {
    const { orderId, formData } = req.body;

    // Verify order exists
    const order = await prisma.combinedOrder.findUnique({
      where: { id: orderId }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Create membership application
    const application = await prisma.membershipApplication.create({
      data: {
        orderId,
        // Personal Information  
        fullName: formData.fullName,
        dateOfBirth: new Date(formData.dateOfBirth),
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
        emailAddress: formData.emailAddress,
        occupation: formData.occupation,
        otherExpertiseHobby: formData.otherExpertiseHobby,
        // Residential Information
        streetAddress: formData.streetAddress,
        cityStateZipCode: formData.cityStateZipCode,
        // Family Information (Optional)
        numberOfFamilyMembers: formData.numberOfFamilyMembers,
        spousePartnerName: formData.spousePartnerName,
        childrenNamesAges: formData.childrenNamesAges,
        // Membership Interest
        wantPaidMembership: formData.wantPaidMembership,
        preferredPaymentMethod: formData.preferredPaymentMethod,
        // Areas of Interest/Skills
        culturalEvents: formData.culturalEvents,
        networkingOpportunities: formData.networkingOpportunities,
        volunteerOpportunities: formData.volunteerOpportunities,
        professionalDevelopment: formData.professionalDevelopment,
        otherInterests: formData.otherInterests,
        eventPlanning: formData.eventPlanning,
        itTechnology: formData.itTechnology,
        fundraising: formData.fundraising,
        otherSkills: formData.otherSkills,
        // Additional Information
        howDidYouHear: formData.howDidYouHear,
        comments: formData.comments,
        // Consent
        consentToStore: formData.consentToStore,
      }
    });

    // Update order status
    await prisma.combinedOrder.update({
      where: { id: orderId },
      data: { 
        membershipCompleted: true,
        membershipApplicationId: application.id
      }
    });

    res.json({ success: true, applicationId: application.id });
  } catch (error) {
    console.error('Error submitting membership application:', error);
    res.status(500).json({ error: 'Failed to submit membership application' });
  }
});

// Create Stripe checkout session
router.post('/create-checkout-session', async (req, res) => {
  try {
    console.log('=== CREATE CHECKOUT SESSION ===');
    console.log('Request body:', req.body);
    const { orderId } = req.body;

    if (!orderId) {
      console.log('ERROR: No orderId provided');
      return res.status(400).json({ error: 'Order ID is required' });
    }

    console.log('Looking for order:', orderId);
    // Get order details
    const order = await prisma.combinedOrder.findUnique({
      where: { id: orderId },
      include: {
        insuranceApplication: true,
        membershipApplication: true
      }
    });

    if (!order) {
      console.log('ERROR: Order not found:', orderId);
      return res.status(404).json({ error: 'Order not found' });
    }

    console.log('Order found:', {
      id: order.id,
      userEmail: order.userEmail,
      totalAmount: order.totalAmount,
      membershipType: order.membershipType,
      insuranceType: order.insuranceType
    });

    // Create line items for Stripe
    const lineItems = [];

    if (order.membershipType && order.membershipPrice > 0) {
      console.log('Adding membership line item:', {
        type: order.membershipType,
        price: order.membershipPrice
      });
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `ZANC Membership - ${order.membershipType}`,
          },
          unit_amount: Math.round(order.membershipPrice * 100), // Convert to cents
        },
        quantity: 1,
      });
    }

    if (order.insuranceType && order.insurancePrice > 0) {
      console.log('Adding insurance line item:', {
        type: order.insuranceType,
        price: order.insurancePrice
      });
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `ZANC Insurance - ${order.insuranceType}`,
          },
          unit_amount: Math.round(order.insurancePrice * 100), // Convert to cents
        },
        quantity: 1,
      });
    }

    console.log('Line items:', lineItems);

    if (lineItems.length === 0) {
      console.log('ERROR: No line items to charge');
      return res.status(400).json({ error: 'No items to charge' });
    }

    console.log('Creating Stripe session...');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancelled?order_id=${orderId}`,
      metadata: {
        orderId: orderId.toString()
      },
      customer_email: order.userEmail,
    });

    console.log('Stripe session created:', session.id);
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Get order details
router.get('/order/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.combinedOrder.findUnique({
      where: { id: parseInt(id) },
      include: {
        insuranceApplication: true,
        membershipApplication: true
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Manual email trigger endpoint for testing
router.post('/send-emails/:orderId', async (req, res) => {
  try {
    const orderId = parseInt(req.params.orderId);
    console.log('=== MANUAL EMAIL TRIGGER ===');
    console.log('Order ID:', orderId);

    // Import email service using require for CommonJS
    const { sendApplicationEmails } = require('../services/emailService');
    
    // Send emails
    await sendApplicationEmails(orderId);
    
    console.log(`Emails sent successfully for order ${orderId}`);
    res.json({ 
      success: true, 
      message: `Emails sent successfully for order ${orderId}` 
    });
  } catch (error) {
    console.error('Error sending emails manually:', error);
    res.status(500).json({ 
      error: 'Failed to send emails',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Test email endpoint
router.post('/test-email', async (req, res) => {
  try {
    console.log('=== EMAIL TEST ===');
    
    // Import email service using require for CommonJS
    const { sendTestEmail } = require('../services/emailService');
    
    // Send test email
    await sendTestEmail();
    
    console.log('Test email sent successfully');
    res.json({ 
      success: true, 
      message: 'Test email sent successfully' 
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ 
      error: 'Failed to send test email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Mark order as manual payment
router.post('/mark-manual-payment/:orderId', async (req, res) => {
  try {
    console.log('=== MARK MANUAL PAYMENT ===');
    const { orderId } = req.params;
    
    console.log('Marking order as manual payment:', orderId);
    
    // Update the order to indicate manual payment
    const updatedOrder = await prisma.combinedOrder.update({
      where: { id: parseInt(orderId) },
      data: {
        paymentStatus: 'manual_payment_pending',
        status: 'MANUAL_PAYMENT'
      },
      include: {
        membershipApplication: true,
        insuranceApplication: true
      }
    });
    
    console.log('Order updated for manual payment:', updatedOrder.id);
    
    // Generate PDFs and send emails just like Stripe payment flow
    try {
      console.log('Generating PDFs and sending emails for manual payment...');
      
      // Use require instead of import for better compatibility
      const emailService = require('../services/emailService');
      await emailService.sendApplicationEmails(parseInt(orderId));
      
      console.log(`Application emails sent for manual payment order ${orderId}`);
    } catch (emailError) {
      console.error('Error sending application emails for manual payment:', emailError);
      // Don't fail the request if email fails, just log the error
    }
    
    res.json({ 
      success: true, 
      orderId: updatedOrder.id,
      message: 'Order marked for manual payment and PDFs generated' 
    });
  } catch (error) {
    console.error('Error marking manual payment:', error);
    res.status(500).json({ 
      error: 'Failed to mark manual payment',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
