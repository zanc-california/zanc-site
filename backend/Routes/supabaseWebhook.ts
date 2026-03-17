import { Request, Response } from 'express';
import prisma from '../prisma';
import crypto from 'crypto';

export default async function supabaseWebhookHandler(req: Request, res: Response) {
  try {
    // Verify the webhook signature (recommended for production)
    const signature = req.headers['x-supabase-signature'] as string;
    const webhookSecret = process.env.SUPABASE_WEBHOOK_SECRET;
    
    if (webhookSecret && signature) {
      const body = JSON.stringify(req.body);
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex');
      
      if (signature !== expectedSignature) {
        console.error('Invalid webhook signature');
        return res.status(401).json({ error: 'Invalid signature' });
      }
    }

    const { type, record } = req.body;

    // Handle user creation events
    if (type === 'INSERT' && record?.table === 'auth.users') {
      const { id, email, user_metadata } = record;
      
      // Create user in our custom User table
      await prisma.user.create({
        data: {
          id,
          email,
          name: user_metadata?.name || null,
          emailVerified: record.email_confirmed_at ? new Date(record.email_confirmed_at) : null,
          role: 'USER'
        }
      });
      
      console.log(`Created user in User table: ${email}`);
    }

    // Handle user updates (like email confirmation)
    if (type === 'UPDATE' && record?.table === 'auth.users') {
      const { id, email, user_metadata } = record;
      
      await prisma.user.upsert({
        where: { id },
        update: {
          email,
          name: user_metadata?.name || null,
          emailVerified: record.email_confirmed_at ? new Date(record.email_confirmed_at) : null,
        },
        create: {
          id,
          email,
          name: user_metadata?.name || null,
          emailVerified: record.email_confirmed_at ? new Date(record.email_confirmed_at) : null,
          role: 'USER'
        }
      });
      
      console.log(`Updated user in User table: ${email}`);
    }

    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Supabase webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
