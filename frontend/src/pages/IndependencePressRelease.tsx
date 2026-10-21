import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WOODLAND_PRESS_RELEASE as release } from '../data/woodlandPressRelease2026';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { SITE_ORIGIN } from '../lib/siteMeta';

const IndependencePressRelease = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  useDocumentMeta({
    title: release.title,
    description: release.subtitle,
    path: release.path,
    type: 'article',
    image: '/images/brand/zanc-mark-512.jpg',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: release.title,
      description: release.subtitle,
      datePublished: release.publishedAt,
      mainEntityOfPage: `${SITE_ORIGIN}${release.path}`,
      publisher: { '@type': 'Organization', name: 'Zambian Association in Northern California', url: SITE_ORIGIN },
    },
  });

  return (
    <div className="bg-white py-8 md:py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link to="/news" className="text-sm font-medium text-bay-blue underline underline-offset-4">← Events & News</Link>
        <article aria-labelledby="press-release-title" className="mt-8">
          <header>
            <p className="text-xs font-heading uppercase tracking-widest text-redwood">FOR IMMEDIATE RELEASE</p>
            <p className="mt-3 text-sm text-slate">
              Media contact: Zambian Association in Northern California (ZANC) ·{' '}
              <a href="mailto:zancsac@gmail.com" className="underline underline-offset-4">zancsac@gmail.com</a>
            </p>
            <h1 id="press-release-title" className="mt-6 text-3xl sm:text-4xl font-heading font-semibold leading-tight text-zambia-green">{release.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-slate">{release.subtitle}</p>
            <p className="mt-4 text-sm text-slate">Published <time dateTime={release.publishedAt}>{release.publishedDate}</time></p>
          </header>
          <div className="mt-8 space-y-5 text-slate leading-relaxed">
            {release.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <section aria-labelledby="release-event-details" className="mt-10">
            <h2 id="release-event-details" className="text-2xl font-heading font-semibold text-zambia-green">Event Details</h2>
            <dl className="mt-5 divide-y divide-mist border-y border-mist">
              {release.details.map((detail) => (
                <div key={detail.label} className="grid gap-1 py-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-5">
                  <dt className="font-semibold text-zambia-green">{detail.label}</dt>
                  <dd className="min-w-0 text-slate leading-relaxed break-words">
                    {detail.href ? <a href={detail.href} className="underline underline-offset-4">{detail.value}</a> : detail.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
          <p className="mt-6 text-slate leading-relaxed">{release.closing}</p>
          <section aria-labelledby="release-about-zanc" className="mt-10">
            <h2 id="release-about-zanc" className="text-2xl font-heading font-semibold text-zambia-green">About ZANC</h2>
            <p className="mt-4 text-slate leading-relaxed">{release.about}</p>
          </section>
        </article>
        <div className="mt-10 border-t border-mist pt-6">
          <Link to="/independence" className="inline-flex rounded-md bg-zambia-green px-5 py-3 font-semibold text-white hover:bg-zambia-green-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zambia-green">Event details and reservations</Link>
        </div>
      </div>
    </div>
  );
};

export default IndependencePressRelease;
