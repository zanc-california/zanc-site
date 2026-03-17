import { Request, Response } from 'express';
import prisma from '../prisma';

// Test endpoint to simulate successful payment (for development only)
export default async function testPaymentUpdate(req: Request, res: Response) {
  try {
    const { sessionId } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }
    
    console.log('Testing payment update for session:', sessionId);
    
    // First, try to find a combined order with this session ID
    const combinedOrder = await prisma.combinedOrder.findFirst({
      where: { stripeSessionId: sessionId }
    });
    
    if (combinedOrder) {
      console.log('Found combined order:', combinedOrder);
      return res.json({ 
        success: true,
        orderId: combinedOrder.id,
        type: 'combined_order'
      });
    }
    
    // Fallback: Find the legacy payment by session ID
    const payment = await prisma.payment.findFirst({
      where: { stripeSessionId: sessionId },
      include: { membership: true }
    });
    
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    
    // Update payment status to paid
    const updatedPayment = await prisma.payment.update({
      where: { id: payment.id },
      data: { status: 'paid' },
    });
    
    // Update membership status to active
    const updatedMembership = await prisma.membership.update({
      where: { id: payment.membershipId },
      data: { status: 'active' },
    });
    
    console.log('Payment updated:', updatedPayment);
    console.log('Membership updated:', updatedMembership);
    
    res.json({ 
      success: true,
      payment: updatedPayment,
      membership: updatedMembership,
      type: 'legacy_payment'
    });
    
  } catch (error) {
    console.error('Error testing payment update:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
