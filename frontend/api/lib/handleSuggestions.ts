import { createClient } from '@supabase/supabase-js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CATEGORY_SET = new Set([
  'Event Idea',
  'Community Service',
  'Partnership',
  'General Feedback',
]);

const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_IP = 5;
const MAX_PER_EMAIL = 3;

type SuggestionRecord = {
  name: string;
  email: string;
  category: string;
  message: string;
};

export type SuggestionEnv = {
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
};

declare global {
  var __zancSuggestionRateLimit:
    | Map<string, { timestamps: number[] }>
    | undefined;
}

function trimEnv(value: string | undefined): string {
  return typeof value === 'string' ? value.trim() : '';
}

function getRateLimitStore() {
  if (!globalThis.__zancSuggestionRateLimit) {
    globalThis.__zancSuggestionRateLimit = new Map();
  }
  return globalThis.__zancSuggestionRateLimit;
}

function recordAttempt(key: string, limit: number, now: number): boolean {
  const store = getRateLimitStore();
  const existing = store.get(key)?.timestamps ?? [];
  const timestamps = existing.filter((timestamp) => now - timestamp < WINDOW_MS);

  if (timestamps.length >= limit) {
    store.set(key, { timestamps });
    return false;
  }

  timestamps.push(now);
  store.set(key, { timestamps });
  return true;
}

function validateSuggestion(rawPayload: unknown): SuggestionRecord | null {
  if (!rawPayload || typeof rawPayload !== 'object') return null;

  const payload = rawPayload as {
    name?: unknown;
    email?: unknown;
    category?: unknown;
    message?: unknown;
  };

  if (
    typeof payload.name !== 'string' ||
    typeof payload.email !== 'string' ||
    typeof payload.category !== 'string' ||
    typeof payload.message !== 'string'
  ) {
    return null;
  }

  const name = payload.name.trim();
  const email = payload.email.trim().toLowerCase();
  const category = payload.category.trim();
  const message = payload.message.trim();

  if (!name || !email || !category || !message) return null;
  if (name.length > 120 || message.length > 2000) return null;
  if (!EMAIL_RE.test(email)) return null;
  if (!CATEGORY_SET.has(category)) return null;

  return { name, email, category, message };
}

export function getSuggestionEnv(
  source: Record<string, string | undefined>
): SuggestionEnv {
  return {
    supabaseUrl: trimEnv(source.SUPABASE_URL) || trimEnv(source.VITE_SUPABASE_URL),
    supabaseServiceRoleKey: trimEnv(source.SUPABASE_SERVICE_ROLE_KEY),
  };
}

export function getSuggestionEnvFromProcess(): SuggestionEnv {
  return getSuggestionEnv(process.env);
}

export async function handleSuggestionSubmission(
  rawPayload: unknown,
  env: SuggestionEnv,
  ipAddress: string,
  honeypot: unknown
): Promise<{ success: boolean; message: string; code?: string }> {
  if (typeof honeypot === 'string' && honeypot.trim()) {
    return {
      success: true,
      message: 'Thanks! Your suggestion has been received.',
    };
  }

  if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
    return {
      success: false,
      code: 'missing_supabase_env',
      message: 'Suggestions are temporarily unavailable. Please email zancsac@gmail.com instead.',
    };
  }

  const suggestion = validateSuggestion(rawPayload);
  if (!suggestion) {
    return {
      success: false,
      message: 'Please complete all fields with valid information before submitting.',
    };
  }

  const now = Date.now();
  if (!recordAttempt(`ip:${ipAddress}`, MAX_PER_IP, now)) {
    return {
      success: false,
      code: 'rate_limited',
      message: 'Too many submissions in a short period. Please wait a few minutes and try again.',
    };
  }

  if (!recordAttempt(`email:${suggestion.email}`, MAX_PER_EMAIL, now)) {
    return {
      success: false,
      code: 'rate_limited',
      message: 'Too many submissions in a short period. Please wait a few minutes and try again.',
    };
  }

  const supabase = createClient(env.supabaseUrl, env.supabaseServiceRoleKey);
  const { error } = await supabase.from('suggestions').insert({
    name: suggestion.name,
    email: suggestion.email,
    category: suggestion.category,
    message: suggestion.message,
  });

  if (error) {
    console.error('[suggestions] insert failed', {
      code: error.code,
      message: error.message,
      details: error.details,
    });
    return {
      success: false,
      message: 'We could not submit your suggestion right now. Please try again later or email zancsac@gmail.com.',
    };
  }

  return {
    success: true,
    message: 'Thanks! Your suggestion has been received.',
  };
}
