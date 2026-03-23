import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSubscribeEnvFromProcess, handleSubscribe } from './lib/handleSubscribe';

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    let email: unknown;
    if (typeof req.body === 'string') {
      try {
        email = JSON.parse(req.body).email;
      } catch {
        return res.status(400).json({ success: false, message: 'Invalid request.' });
      }
    } else if (req.body && typeof req.body === 'object') {
      email = (req.body as { email?: unknown }).email;
    } else {
      return res.status(400).json({ success: false, message: 'Invalid request.' });
    }

    const result = await handleSubscribe(email, getSubscribeEnvFromProcess());
    return res.status(200).json(result);
  } catch {
    return res.status(200).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
}
