import { createClient } from '@supabase/supabase-js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SubscribeEnv = {
  resendApiKey: string;
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
  resendFrom: string;
  adminNotifyEmail: string;
};

/**
 * Server-only: validate email, insert Supabase, send Resend welcome + admin ping.
 * Duplicate emails → success + friendly message (no error to user).
 */
export async function handleSubscribe(
  rawEmail: unknown,
  env: SubscribeEnv
): Promise<{ success: boolean; message: string; code?: string }> {
  if (typeof rawEmail !== 'string' || !rawEmail.trim()) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  const email = rawEmail.trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
    return {
      success: false,
      code: 'missing_supabase_env',
      message: 'Subscription is temporarily unavailable. Please try again later.',
    };
  }

  const supabase = createClient(env.supabaseUrl, env.supabaseServiceRoleKey);

  const { error: insertError } = await supabase.from('email_subscribers').insert({ email });

  if (insertError) {
    console.error('[subscribe] Supabase insert failed', {
      code: insertError.code,
      message: insertError.message,
      details: insertError.details,
    });
    if (insertError.code === '23505') {
      return {
        success: true,
        message: "You're already subscribed — thank you for staying connected with ZANC.",
      };
    }
    if (insertError.code === '42P01' || insertError.code === 'PGRST205') {
      return {
        success: false,
        message: 'Subscription database is not initialized yet. Run supabase/email_subscribers.sql in Supabase SQL Editor.',
      };
    }
    return { success: false, message: 'Something went wrong. Please try again later.' };
  }

  let emailsOk = true;
  if (env.resendApiKey) {
    const welcomeHtml =
      '<p>Thank you for subscribing to ZANC updates.</p>' +
      '<p>You’ll receive information about events, opportunities, and community activities.</p>';

    try {
      const welcomeRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: env.resendFrom,
          to: [email],
          subject: 'Welcome to ZANC Updates',
          html: welcomeHtml,
        }),
      });
      if (!welcomeRes.ok) emailsOk = false;

      const adminRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: env.resendFrom,
          to: [env.adminNotifyEmail],
          subject: 'New ZANC subscriber',
          text: `New subscriber: ${email}`,
        }),
      });
      if (!adminRes.ok) emailsOk = false;
    } catch {
      emailsOk = false;
    }
  }

  return {
    success: true,
    message: emailsOk
      ? "You're in! Check your inbox for a quick welcome from ZANC."
      : "You're subscribed! If you don't see a confirmation email, check your spam folder.",
  };
}

function trimEnv(value: string | undefined): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function getSubscribeEnv(source: Record<string, string | undefined>): SubscribeEnv {
  return {
    resendApiKey: trimEnv(source.RESEND_API_KEY),
    supabaseUrl: trimEnv(source.SUPABASE_URL) || trimEnv(source.VITE_SUPABASE_URL),
    supabaseServiceRoleKey: trimEnv(source.SUPABASE_SERVICE_ROLE_KEY),
    resendFrom: trimEnv(source.RESEND_FROM) || 'ZANC <hello@updates.zancsac.com>',
    adminNotifyEmail: trimEnv(source.ZANC_SUBSCRIBE_ADMIN_EMAIL) || 'zancsac@gmail.com',
  };
}

export function getSubscribeEnvFromProcess(): SubscribeEnv {
  return getSubscribeEnv(process.env);
}
