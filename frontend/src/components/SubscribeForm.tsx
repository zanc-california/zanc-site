import { useState } from 'react';
import { Link } from 'react-router-dom';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Variant = 'footer' | 'inline';

type Props = {
  variant?: Variant;
  className?: string;
  /** Unique id for the email input (avoid duplicates when multiple forms on the page). */
  inputId?: string;
  autoFocusEmail?: boolean;
  /** When false, only the form + status + privacy link (e.g. inside a modal with its own title). */
  showIntro?: boolean;
};

/**
 * Posts to /api/subscribe (Vercel serverless or Vite dev middleware).
 */
export default function SubscribeForm({
  variant = 'inline',
  className = '',
  inputId = 'subscribe-email',
  autoFocusEmail = false,
  showIntro = true,
}: Props) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const endpoint =
    (import.meta.env.VITE_SUBSCRIBE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '/api/subscribe';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const trimmed = email.trim();
    if (!trimmed || !EMAIL_RE.test(trimmed)) {
      setMessage({ type: 'err', text: 'Please enter a valid email address.' });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = (await res.json()) as { success?: boolean; message?: string };
      if (data.success) {
        setMessage({ type: 'ok', text: data.message ?? "You're subscribed!" });
        setEmail('');
      } else {
        setMessage({ type: 'err', text: data.message ?? 'Something went wrong. Please try again.' });
      }
    } catch {
      setMessage({
        type: 'err',
        text: 'Could not reach the server. If you are running locally, ensure the API is available (see README).',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const isFooter = variant === 'footer';

  return (
    <div className={className}>
      {showIntro && (
        <>
          <h3 className={`font-heading font-semibold mb-2 ${isFooter ? 'text-white' : 'text-zambia-green'}`}>
            ZANC updates
          </h3>
          <p className={`text-sm mb-3 leading-relaxed ${isFooter ? 'text-white/75' : 'text-slate'}`}>
            Events, opportunities, and community activities — straight to your inbox.
          </p>
        </>
      )}
      <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <label htmlFor={inputId} className="sr-only">
          Email for ZANC updates
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
          autoFocus={autoFocusEmail}
          className={
            isFooter
              ? 'min-h-[44px] flex-1 rounded-md border border-white/25 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-copper disabled:opacity-60'
              : 'min-h-[44px] flex-1 rounded-md border border-mist bg-white px-3 py-2 text-sm text-slate placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-bay-blue disabled:opacity-60'
          }
        />
        <button
          type="submit"
          disabled={submitting}
          className={
            isFooter
              ? 'min-h-[44px] shrink-0 rounded-md bg-copper px-4 py-2 text-sm font-medium text-white hover:bg-copper-light focus:outline-none focus:ring-2 focus:ring-copper focus:ring-offset-2 focus:ring-offset-zambia-green disabled:opacity-60'
              : 'min-h-[44px] shrink-0 rounded-md bg-zambia-green px-4 py-2 text-sm font-medium text-white hover:bg-zambia-green-light focus:outline-none focus:ring-2 focus:ring-zambia-green focus:ring-offset-2 disabled:opacity-60'
          }
        >
          {submitting ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>
      {message && (
        <p
          className={`mt-2 text-sm ${message.type === 'ok' ? (isFooter ? 'text-copper-glow' : 'text-zambia-green') : isFooter ? 'text-red-200' : 'text-redwood'}`}
          role="status"
        >
          {message.text}
        </p>
      )}
      <p className={`mt-2 text-xs ${isFooter ? 'text-white/55' : 'text-slate/80'}`}>
        <Link to="/privacy-policy" className={isFooter ? 'underline hover:text-copper' : 'text-bay-blue hover:underline'}>
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
