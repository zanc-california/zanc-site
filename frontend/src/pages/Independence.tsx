import { Link } from 'react-router-dom';
import PhotoCredit from '../components/PhotoCredit';
import PhotoGallery from '../components/PhotoGallery';
import { INDEPENDENCE_2026_PHOTOS, INDEPENDENCE_PHOTOGRAPHER, INDEPENDENCE_RECAP, INDEPENDENCE_RECAP_HERO } from '../data/independence2026Recap';
import { WOODLAND_PRESS_RELEASE } from '../data/woodlandPressRelease2026';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { absoluteUrl } from '../lib/siteMeta';

const highlights = [0, 9, 11, 5, 3, 13].map((index) => INDEPENDENCE_2026_PHOTOS[index]);

export default function Independence() {
  useDocumentMeta({
    title: 'Independence 2026 — celebration recap & photos',
    description: INDEPENDENCE_RECAP.excerpt,
    path: '/independence',
    image: INDEPENDENCE_RECAP_HERO.image_url,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: INDEPENDENCE_RECAP.title,
      datePublished: '2026-10-26',
      author: { '@type': 'Organization', name: 'Zambian Association in Northern California' },
      image: absoluteUrl(INDEPENDENCE_RECAP_HERO.image_url),
      url: absoluteUrl('/independence'),
      description: INDEPENDENCE_RECAP.excerpt,
    },
  });

  return (
    <div className="bg-fog">
      <section className="overflow-hidden bg-zambia-green text-white" aria-labelledby="independence-title">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-8">
          <div>
            <p className="text-xs font-heading uppercase tracking-[0.16em] text-white/80">October 24, 2026 · Woodland, California</p>
            <h1 id="independence-title" className="mt-4 text-4xl font-heading font-bold leading-[1.1] tracking-tight sm:text-5xl">Zambia at 62.<br />Together in celebration.</h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/90">A shared meal. Familiar rhythms. New friendships. Thank you to everyone who brought our Independence celebration to life.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#celebration-photos" className="inline-flex min-h-12 items-center rounded-md bg-copper-glow px-5 py-3 font-semibold text-redwood hover:bg-white">Relive the evening ↓</a>
              <Link to={INDEPENDENCE_RECAP.galleryPath} className="inline-flex min-h-12 items-center rounded-md border border-white/60 px-5 py-3 font-semibold text-white hover:bg-white/10">Browse all 14 highlights →</Link>
            </div>
          </div>
          <figure>
            <img src={INDEPENDENCE_RECAP_HERO.image_url} srcSet={`${INDEPENDENCE_RECAP_HERO.thumbnail_url} 640w, ${INDEPENDENCE_RECAP_HERO.image_url} 1600w`}
              sizes="(min-width: 1024px) 650px, 100vw" alt={INDEPENDENCE_RECAP_HERO.alt} width={1600} height={1143}
              className="w-full rounded-xl shadow-xl" />
            <figcaption className="mt-3"><PhotoCredit credit={INDEPENDENCE_PHOTOGRAPHER} className="text-white/80" /></figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16" aria-labelledby="recap-title">
        <p className="text-xs font-heading uppercase tracking-[0.12em] text-redwood">Celebration recap · {INDEPENDENCE_RECAP.date}</p>
        <h2 id="recap-title" className="mt-3 text-3xl font-heading font-semibold leading-tight text-zambia-green">Our heritage, shared with friends</h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate">
          <p>On Saturday, October 24, Zambian families and friends of Zambia gathered at Fairfield by Marriott Inn &amp; Suites Sacramento Airport Woodland to celebrate 62 years of independence. Guests came from across Northern California and as far as Los Angeles, bringing warmth, energy and a spirit of friendship.</p>
          <p>The day began with morning worship and fellowship. The evening brought Zambian food, cultural performances, remarks from community guests, music by Jean Nangwala and DJ LittyRocket, and a dance floor that kept the celebration going.</p>
          <p>What made the occasion memorable was the community itself: families sharing their heritage, guests meeting new friends and people giving their time and skills to make everyone feel welcome.</p>
        </div>
      </section>

      <section id="celebration-photos" className="scroll-mt-24 border-y border-mist bg-cloud py-12 md:py-16" aria-labelledby="photos-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-heading uppercase tracking-[0.12em] text-redwood">The evening in pictures</p>
              <h2 id="photos-title" className="mt-2 text-3xl font-heading font-semibold text-zambia-green">Faces, food and celebration</h2>
              <p className="mt-3 max-w-2xl text-slate">A selection from Nirav Solanki’s photographs. Select any image to view it in full.</p>
            </div>
            <Link to={INDEPENDENCE_RECAP.galleryPath} className="inline-flex min-h-11 items-center font-semibold text-bay-blue underline underline-offset-4">View the 14-photo album →</Link>
          </div>
          <PhotoGallery photos={highlights} />
        </div>
      </section>

      <section id="flag-raising" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-xs font-heading uppercase tracking-[0.12em] text-redwood">A weekend of pride and connection</p>
            <h2 className="mt-3 text-2xl font-heading font-semibold text-zambia-green">Zambia’s flag at San Francisco City Hall</h2>
            <p className="mt-4 leading-relaxed text-slate">The celebration followed the Zambia flag raising at San Francisco City Hall on Friday, October 23. A City proclamation designated October 24, 2026 as “Zambian-American Friendship and Heritage Day” in San Francisco, recognizing heritage and friendship across our communities.</p>
            <p className="mt-4 leading-relaxed text-slate">Thank you to Honorary Consul Rajen Ranchhod and the City’s Protocol Office for helping bring this occasion to our community.</p>
          </div>
          <div id="take-part" className="scroll-mt-24 rounded-xl border border-copper/30 bg-white p-6 md:p-8">
            <h2 className="text-2xl font-heading font-semibold text-zambia-green">To everyone who made it happen—thank you</h2>
            <p className="mt-4 leading-relaxed text-slate">Our gratitude goes to the ZANC committee, cooking and décor teams, volunteers, performers and everyone who helped welcome and care for our guests.</p>
            <p className="mt-4 leading-relaxed text-slate">Thank you to American Hospitality Services, the Ranchhod family, Bali and the hotel team for their support and coordination. We also thank Nirav Solanki for traveling from Los Angeles and capturing these memories with such care.</p>
            <p className="mt-5 text-sm text-slate">Want to help shape future gatherings? <Link to="/get-involved" className="font-semibold text-bay-blue underline underline-offset-4">Get involved with ZANC →</Link></p>
          </div>
        </div>
      </section>

      <section className="border-t border-mist bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to={WOODLAND_PRESS_RELEASE.path} className="inline-flex min-h-11 items-center text-sm font-medium text-bay-blue underline underline-offset-4">Read the original pre-event press release →</Link>
          <Link to="/news" className="inline-flex min-h-11 items-center text-sm font-medium text-bay-blue underline underline-offset-4">More community news →</Link>
        </div>
      </section>
    </div>
  );
}
