import { Request, Response } from 'express';
import prisma from '../prisma';
import { requireUser, AuthenticatedRequest } from '../middleware/requireUser';

export default async function approveHandler(req: AuthenticatedRequest, res: Response) {
  try {
    const { user } = req;
    if (!user || user.role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden' });
    const { membershipId } = req.body;
    await prisma.membership.update({ where: { id: membershipId }, data: { status: 'active' } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Approval failed' });
  }
}
