import { useCallback, useEffect, useState } from 'react';
import { COMMUNITY_QUOTES } from '../data/communityQuotes';

const TERRY_IMAGE = '/images/members/terry-C-community-lead.png';
const TERRY_PHONE_DISPLAY = '(916) 912-0651';
const TERRY_PHONE_TEL = 'tel:+19169120651';
const TERRY_EMAIL = 'terrychiss@yahoo.com';
const TERRY_EMAIL_HREF = `mailto:${TERRY_EMAIL}?subject=${encodeURIComponent(
  'Community Activities — message for Terry Chisenga'
)}`;

const ROTATE_MS = 6500;

/**
 * Subtle rotating quotes with fade — auto-advance + manual arrows.
 * Respects prefers-reduced-motion (no auto-rotate; instant change on arrow only).
 */
export default function CommunityVoiceQuotes() {
  const [index, setIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [terryContactOpen, setTerryContactOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const bump = useCallback(
    (delta: number) => {
      if (reduceMotion) {
        setIndex((i) => (i + delta + COMMUNITY_QUOTES.length) % COMMUNITY_QUOTES.length);
        return;
      }
      setFadeIn(false);
      window.setTimeout(() => {
        setIndex((i) => (i + delta + COMMUNITY_QUOTES.length) % COMMUNITY_QUOTES.length);
        setFadeIn(true);
      }, 220);
    },
    [reduceMotion]
  );

  useEffect(() => {
    if (reduceMotion || COMMUNITY_QUOTES.length <= 1) return;
    const id = window.setInterval(() => bump(1), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, bump]);

  const q = COMMUNITY_QUOTES[index];

  return (
    <div className="rounded-xl border border-mist bg-gradient-to-br from-cloud via-white to-copper-glow/30 px-6 py-8 md:px-10 md:py-10 shadow-sm">
      <p className="text-xs font-heading uppercase tracking-[0.12em] text-copper">Community Voice</p>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
        {/* Quotes + controls */}
        <div className="flex flex-col lg:col-span-7 xl:col-span-8">
          <div className="relative min-h-[7rem] md:min-h-[6.5rem] flex-1">
            <blockquote
              className={`motion-safe:transition-opacity motion-safe:duration-300 ${
                fadeIn ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <p className="text-lg md:text-xl font-heading font-medium text-zambia-green leading-snug">
                &ldquo;{q.text}&rdquo;
              </p>
              <footer className="mt-4 text-sm text-slate font-medium">— {q.author}</footer>
            </blockquote>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => bump(-1)}
                className="rounded-full border border-mist bg-white px-3 py-1.5 text-sm font-medium text-slate hover:bg-cloud hover:border-zambia-green/25 focus:outline-none focus:ring-2 focus:ring-bay-blue"
                aria-label="Previous quote"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => bump(1)}
                className="rounded-full border border-mist bg-white px-3 py-1.5 text-sm font-medium text-slate hover:bg-cloud hover:border-zambia-green/25 focus:outline-none focus:ring-2 focus:ring-bay-blue"
                aria-label="Next quote"
              >
                →
              </button>
            </div>
            <div className="flex gap-1.5" aria-hidden>
              {COMMUNITY_QUOTES.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-copper' : 'bg-mist'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Activities lead mini card — text left, photo right (matches layout mock) */}
        <aside className="lg:col-span-5 xl:col-span-4">
          <div className="h-full rounded-xl border border-mist bg-white/95 p-4 shadow-sm ring-1 ring-black/[0.03]">
            <div className="flex flex-row items-center gap-4">
              <div className="min-w-0 flex-1">
                <p className="font-heading font-semibold text-zambia-green text-base leading-tight">Terry Chisenga</p>
                <p className="mt-1 text-[10px] font-heading uppercase tracking-[0.12em] text-copper">Community Activities Lead</p>
                <p className="mt-3 text-xs text-slate leading-relaxed">
                  Questions about programs, hangouts, or getting involved? Tap <span className="font-medium text-slate">Contact</span> to
                  show phone and email — they stay hidden until then.
                </p>
                <div className="mt-3">
                  {!terryContactOpen ? (
                    <button
                      type="button"
                      onClick={() => setTerryContactOpen(true)}
                      className="text-sm font-medium text-bay-blue hover:underline focus:outline-none focus:ring-2 focus:ring-bay-blue focus:ring-offset-2 rounded"
                    >
                      Contact →
                    </button>
                  ) : (
                    <div className="space-y-2 rounded-lg border border-mist bg-cloud/80 px-3 py-2.5">
                      <a href={TERRY_PHONE_TEL} className="block text-sm font-medium text-bay-blue hover:underline">
                        {TERRY_PHONE_DISPLAY}
                      </a>
                      <a href={TERRY_EMAIL_HREF} className="block text-sm font-medium text-bay-blue hover:underline break-all">
                        {TERRY_EMAIL}
                      </a>
                      <button
                        type="button"
                        onClick={() => setTerryContactOpen(false)}
                        className="text-xs text-slate hover:text-zambia-green focus:outline-none focus:underline"
                      >
                        Hide contact info
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-mist bg-cloud shadow-inner sm:h-28 sm:w-28">
                <img
                  src={TERRY_IMAGE}
                  alt="Terry Chisenga, Community Activities Lead"
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                  width={112}
                  height={112}
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
