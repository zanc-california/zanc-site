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
): Promise<{ success: boolean; message: string }> {
  if (typeof rawEmail !== 'string' || !rawEmail.trim()) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  const email = rawEmail.trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
    return { success: false, message: 'Subscription is temporarily unavailable. Please try again later.' };
  }

  const supabase = createClient(env.supabaseUrl, env.supabaseServiceRoleKey);

  const { error: insertError } = await supabase.from('email_subscribers').insert({ email });

  if (insertError) {
    if (insertError.code === '23505') {
      return {
        success: true,
        message: "You're already subscribed — thank you for staying connected with ZANC.",
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

export function getSubscribeEnvFromProcess(): SubscribeEnv {
  return {
    resendApiKey: process.env.RESEND_API_KEY ?? '',
    supabaseUrl: process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL ?? '',
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
    resendFrom: process.env.RESEND_FROM ?? 'ZANC <hello@updates.zancsac.com>',
    adminNotifyEmail: process.env.ZANC_SUBSCRIBE_ADMIN_EMAIL ?? 'zancsac@gmail.com',
  };
}
