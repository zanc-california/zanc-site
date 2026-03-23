import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  getSuggestionEnvFromProcess,
  handleSuggestionSubmission,
} from './lib/handleSuggestions';

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function getRequestIp(req: VercelRequest): string {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0].trim();
  }
  return req.socket.remoteAddress ?? 'unknown';
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
    const parsedBody =
      typeof req.body === 'string'
        ? JSON.parse(req.body || '{}')
        : req.body && typeof req.body === 'object'
          ? req.body
          : null;

    if (!parsedBody || typeof parsedBody !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid request.',
      });
    }

    const result = await handleSuggestionSubmission(
      parsedBody,
      getSuggestionEnvFromProcess(),
      getRequestIp(req),
      (parsedBody as { website?: unknown }).website
    );

    if (!result.success && result.code === 'rate_limited') {
      return res.status(429).json(result);
    }

    return res.status(result.success ? 200 : 400).json(result);
  } catch {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
}
