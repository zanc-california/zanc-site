import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { heroImages } from '../heroImages';
import PhotoCredit from './PhotoCredit';

export default function HomeHero({ onSubscribe }: { onSubscribe: () => void }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState<number[]>([]);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setPlaying(!motion.matches);
    const syncVisibility = () => setVisible(!document.hidden);
    syncMotion();
    syncVisibility();
    motion.addEventListener('change', syncMotion);
    document.addEventListener('visibilitychange', syncVisibility);
    return () => {
      motion.removeEventListener('change', syncMotion);
      document.removeEventListener('visibilitychange', syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (!playing || hovered || !visible) return;
    const interval = window.setInterval(() => {
      setActive((current) => {
        const next = (current + 1) % heroImages.length;
        return ready.includes(next) ? next : current;
      });
    }, 7000);
    return () => window.clearInterval(interval);
  }, [playing, hovered, visible, ready]);

  const select = (index: number) => {
    setPlaying(false);
    setActive((index + heroImages.length) % heroImages.length);
  };
  const controlClass = 'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

  return (
    <section className="relative overflow-hidden bg-zambia-green text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-48 h-[34rem] w-[34rem] rounded-full border border-white/10" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 py-6 sm:px-6 md:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:px-8">
        <div>
          <p className="text-xs font-heading uppercase tracking-[0.16em] text-white/80">Zambia in our hearts. NorCal is home.</p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.08] tracking-[-0.025em] sm:text-5xl xl:text-6xl">
            Zambian Heritage.<br />NorCal Community.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/90 md:text-lg">
            Connecting Zambians across Northern California since 2017 — rooted in culture, thriving in community.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 md:mt-7">
            <Link to="/membership" className="inline-flex min-h-12 items-center justify-center rounded-md bg-copper-glow px-5 py-3 font-semibold text-redwood hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Join ZANC</Link>
            <Link to="/news" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/60 px-5 py-3 font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Explore events</Link>
          </div>
          <button type="button" onClick={onSubscribe} aria-haspopup="dialog" className="mt-2 inline-flex min-h-11 md:mt-5 items-center gap-2 text-sm text-white/90 underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            Get community updates <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>

        <div role="region" aria-roledescription="carousel" aria-label="Community moments"
          onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
          onFocusCapture={(event) => {
            // Keyboard entry stops rotation; pointer use of the play/pause button keeps its expected action.
            if (!event.currentTarget.contains(event.relatedTarget) && event.target.matches(':focus-visible')) setPlaying(false);
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
              event.preventDefault();
              select(active + (event.key === 'ArrowRight' ? 1 : -1));
            }
          }}>
          <div className="relative aspect-[7/5] overflow-hidden rounded-2xl bg-black/20 shadow-xl ring-1 ring-white/20">
            {heroImages.map((photo, index) => (
              <div key={photo.src} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${heroImages.length}: ${photo.title}`} aria-hidden={index !== active}
                className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${index === active ? 'opacity-100' : 'opacity-0'}`}>
                <img src={photo.src} srcSet={photo.srcSet} sizes="(min-width: 1280px) 614px, (min-width: 1024px) 50vw, 100vw" alt={photo.alt}
                  width={photo.width} height={photo.height} {...{ fetchpriority: index === 0 ? 'high' : 'low' }}
                  onLoad={() => setReady((loaded) => loaded.includes(index) ? loaded : [...loaded, index])}
                  className="h-full w-full object-cover" style={{ objectPosition: photo.position }} />
              </div>
            ))}
            {heroImages[active].recapPath && (
              <Link to={heroImages[active].recapPath} aria-label="Read the Independence celebration recap"
                className="absolute inset-0 flex items-end justify-end rounded-2xl p-3 text-white hover:bg-black/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-copper-glow">
                <span className="inline-flex min-h-10 items-center gap-2 rounded-md bg-black/70 px-3 py-2 text-sm font-semibold !text-white">
                  Read event recap <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Link>
            )}
          </div>
          <div className="mt-4" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
            <p className="min-h-14 font-heading text-lg font-semibold sm:min-h-7">{heroImages[active].title}</p>
            <p className="mt-1 min-h-10 text-sm leading-5 text-white/75">{heroImages[active].caption}</p>
            <div className="mt-1 min-h-5">
              {heroImages[active].credit && <PhotoCredit credit={heroImages[active].credit} className="text-white/80" />}
            </div>
            <div className="mt-1 min-h-11">
              {heroImages[active].galleryPath && (
                <Link to={heroImages[active].galleryPath} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold !text-white underline underline-offset-4 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  View event gallery <ArrowRight size={16} aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-0 sm:gap-2">
              <button type="button" className={controlClass} onClick={() => setPlaying((value) => !value)} aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}>
                {playing ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
              </button>
              {heroImages.map((photo, index) => (
                <button key={photo.src} type="button" onClick={() => select(index)} aria-label={`Show photo ${index + 1}: ${photo.title}`} aria-current={index === active ? 'true' : undefined}
                  className="flex h-11 w-7 sm:w-8 items-center justify-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                  <span aria-hidden="true" className={`h-1.5 rounded-full ${index === active ? 'w-7 bg-copper-glow' : 'w-2 bg-white/40'}`} />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" className={controlClass} onClick={() => select(active - 1)} aria-label="Previous photo"><ArrowLeft size={18} aria-hidden="true" /></button>
              <button type="button" className={controlClass} onClick={() => select(active + 1)} aria-label="Next photo"><ArrowRight size={18} aria-hidden="true" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
