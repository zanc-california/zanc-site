import { Request, Response } from 'express';
import Stripe from 'stripe';
import prisma from '../prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });

export default async function webhookHandler(req: Request, res: Response) {
  console.log('Webhook received');
  
  // For development, if webhook secret is not configured, skip signature verification
  const isDevelopment = !process.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET === 'whsec_your_webhook_secret_here' || process.env.STRIPE_WEBHOOK_SECRET === 'whsec_PASTE_YOUR_ACTUAL_WEBHOOK_SECRET_HERE';
  
  let event;
  
  if (isDevelopment) {
    console.log('Development mode: Skipping webhook signature verification');
    // In development, assume the event is valid
    event = req.body;
  } else {
    // Production mode: Verify webhook signature
    const sig = req.headers['stripe-signature']!;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
      console.log('Webhook event type:', event.type);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return res.status(400).json({ error: 'Webhook signature verification failed' });
    }
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Checkout session completed:', session.id);
      console.log('Session metadata:', session.metadata);
      
      // Check if this is a new applications order
      if (session.metadata?.orderId) {
        const orderId = parseInt(session.metadata.orderId);
        
        // Update order status to completed
        await prisma.combinedOrder.update({
          where: { id: orderId },
          data: { status: 'COMPLETED' }
        });
        
        // Send application emails with PDFs
        try {
          // Use require instead of import for better compatibility
          const emailService = require('../services/emailService');
          await emailService.sendApplicationEmails(orderId);
          console.log(`Application emails sent for order ${orderId}`);
        } catch (emailError) {
          console.error('Error sending application emails:', emailError);
          // Don't fail the webhook if email fails, just log the error
        }
        
        console.log('Successfully processed application order:', orderId);
      } 
      // Handle legacy membership payments
      else if (session.metadata?.userId && session.metadata?.membershipId) {
        const { userId, membershipId } = session.metadata;
        
        // Update payment status to paid
        const updatedPayment = await prisma.payment.updateMany({
          where: { stripeSessionId: session.id },
          data: { 
            status: 'paid',
            stripePaymentIntentId: session.payment_intent as string
          },
        });
        console.log('Payment updated:', updatedPayment);
        
        // Update membership status to active
        const updatedMembership = await prisma.membership.update({
          where: { id: membershipId },
          data: { status: 'active' },
        });
        console.log('Membership updated:', updatedMembership);
        
        console.log('Successfully processed legacy payment for user:', userId);
      }
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
  
  res.json({ received: true });
}
