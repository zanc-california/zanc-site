import { useCallback, useEffect, useState } from 'react';
import { COMMUNITY_QUOTES } from '../data/communityQuotes';

const ROTATE_MS = 6500;

/**
 * Subtle rotating quotes with fade — auto-advance + manual arrows.
 * Respects prefers-reduced-motion (no auto-rotate; instant change on arrow only).
 */
export default function CommunityVoiceQuotes() {
  const [index, setIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

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
      <div className="relative mt-4 min-h-[7rem] md:min-h-[6.5rem]">
        <blockquote
          className={`motion-safe:transition-opacity motion-safe:duration-300 ${
            fadeIn ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-lg md:text-xl font-heading font-medium text-zambia-green leading-snug">&ldquo;{q.text}&rdquo;</p>
          <footer className="mt-4 text-sm text-slate font-medium">— {q.author}</footer>
        </blockquote>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
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
  );
}
