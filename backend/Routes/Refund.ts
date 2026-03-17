import { Request, Response } from 'express';
import Stripe from 'stripe';
import prisma from '../prisma';
import { requireUser, AuthenticatedRequest } from '../middleware/requireUser';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });

export default async function refundHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const { user } = req;
    if (!user || user.role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden' });
    const { membershipId } = req.body;
    const membership = await prisma.membership.findUnique({ where: { id: membershipId } });
    if (!membership) return res.status(404).json({ error: 'Membership not found' });
    const payment = await prisma.payment.findFirst({ where: { membershipId } });
    if (!payment || payment.status !== 'paid') return res.status(400).json({ error: 'No paid payment found' });
    // Refund via Stripe
    await stripe.refunds.create({ payment_intent: payment.stripePaymentIntentId! });
    await prisma.payment.update({ where: { id: payment.id }, data: { status: 'refunded' } });
    await prisma.membership.update({ where: { id: membershipId }, data: { status: 'rejected' } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Refund failed' });
  }
}
