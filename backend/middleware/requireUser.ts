import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import prisma from '../prisma';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string };
}

export async function requireUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' });
    
    const token = authHeader.replace('Bearer ', '');
    const { data, error } = await supabase.auth.getUser(token);
    
    if (error || !data?.user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    let user = await prisma.user.findUnique({ where: { id: data.user.id } });
    
    // If user doesn't exist in our database, create them
    if (!user) {
      try {
        user = await prisma.user.create({
          data: {
            id: data.user.id,
            email: data.user.email ?? '',
            role: 'USER',
            name: data.user.user_metadata?.name ?? null,
            image: data.user.user_metadata?.avatar_url ?? null,
            emailVerified: data.user.email_confirmed_at
              ? new Date(data.user.email_confirmed_at)
              : null,
          },
        });
      } catch (createError) {
        // Handle race condition - user might be created by another request
        user = await prisma.user.findUnique({ where: { id: data.user.id } });
        if (!user) {
          return res.status(500).json({ error: 'Failed to create user' });
        }
      }
    }

    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    console.error('requireUser error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
