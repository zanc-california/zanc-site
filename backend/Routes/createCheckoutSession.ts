import { Request, Response } from 'express';
import Stripe from 'stripe';
import prisma from '../prisma';
import { requireUser, AuthenticatedRequest } from '../middleware/requireUser';

// Check if Stripe secret key is available
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });

export default async function createCheckoutSession(req: AuthenticatedRequest, res: Response) {
  try {
    console.log('Starting checkout session creation...');
    
    // Validate environment variables
    if (!process.env.SUCCESS_URL || !process.env.CANCEL_URL) {
      console.error('Missing SUCCESS_URL or CANCEL_URL environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }
    
    const { user } = req;
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    console.log('User authenticated:', user.id);

    // Get membership type from request to calculate price
    const { membershipType = 'individual' } = req.body;
    const priceMap = {
      individual: 5000, // $50
      family: 8000,     // $80
      student: 2500,    // $25
      corporate: 20000  // $200
    };
    
    const amount = priceMap[membershipType as keyof typeof priceMap] || 5000;
    console.log('Membership type:', membershipType, 'Amount:', amount);

    // Create database records in parallel with Stripe session
    const membership = await prisma.membership.create({
      data: {
        userId: user.id,
        type: membershipType,
        status: 'pending',
      },
    });

    console.log('Membership created:', membership.id);

    // Create Stripe Checkout Session with correct metadata
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: `${membershipType} Annual Membership` },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.CANCEL_URL!,
      metadata: {
        userId: user.id,
        membershipId: membership.id,
      },
    });

    console.log('Stripe session created:', session.id);

    // Create Payment record
    await prisma.payment.create({
      data: {
        userId: user.id,
        membershipId: membership.id,
        status: 'pending',
        stripeSessionId: session.id,
        amount: amount,
        currency: 'usd',
        stripeId: '',
        stripePaymentIntentId: session.payment_intent as string || null,
      },
    });

    console.log('Sending response with URL:', session.url);
    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe Checkout Session Error:', err);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
