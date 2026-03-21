import type { FC } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import Reveal from './Reveal';

/** Single featured partner / business / entity — array supports future multi-entry layouts without a carousel. */
export type FeaturedSpotlightEntry = {
  name?: string;
  description: string;
  imageUrl?: string;
  ctaLabel: string;
  ctaLink: string;
};

type FeaturedCommunitySpotlightProps = {
  eyebrow?: string;
  title: string;
  entries: FeaturedSpotlightEntry[];
  className?: string;
};

/**
 * Community spotlight block — carousel-ready data shape (multiple entries), default UI stacks entries simply.
 */
const FeaturedCommunitySpotlight: FC<FeaturedCommunitySpotlightProps> = ({
  eyebrow = 'Community spotlight',
  title,
  entries,
  className = '',
}) => {
  return (
    <section className={`py-10 md:py-14 bg-white border-y border-mist ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <p className="text-xs md:text-sm uppercase tracking-[0.08em] font-heading text-copper">{eyebrow}</p>
          <h2 className="mt-2 text-2xl md:text-3xl font-heading font-semibold text-zambia-green">{title}</h2>
        </Reveal>

        <div className="mt-8 space-y-10">
          {entries.map((entry, idx) => {
            const isExternal = /^https?:\/\//i.test(entry.ctaLink);
            const ctaInner = <Button variant="accent">{entry.ctaLabel}</Button>;

            return (
              <Reveal key={idx} delayMs={idx * 120}>
                <div className="group mx-auto max-w-2xl rounded-2xl border border-mist bg-gradient-to-b from-cloud to-white px-6 py-8 shadow-sm ui-card-motion motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-zambia-green/20 motion-safe:hover:shadow-lg md:px-10 md:py-10">
                  {entry.imageUrl && (
                    <div className="mb-6 flex justify-center motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105">
                      <img
                        src={entry.imageUrl}
                        alt={entry.name ? `${entry.name} logo` : 'Featured partner'}
                        className="max-h-24 w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  )}
                  {entry.name && (
                    <h3 className="text-lg font-heading font-semibold text-zambia-green">{entry.name}</h3>
                  )}
                  <p className={`text-slate leading-relaxed ${entry.name ? 'mt-2' : 'mt-4'}`}>{entry.description}</p>
                  <div className="mt-6 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-y-0.5">
                    {isExternal ? (
                      <a href={entry.ctaLink} target="_blank" rel="noopener noreferrer">
                        {ctaInner}
                      </a>
                    ) : (
                      <Link to={entry.ctaLink}>{ctaInner}</Link>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCommunitySpotlight;
