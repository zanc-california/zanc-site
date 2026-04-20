import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import type { CommunityEvent } from '../data/communityCalendar2026';

type LandingEventSpotlightModalProps = {
  open: boolean;
  onClose: () => void;
  event: CommunityEvent | null;
};

export default function LandingEventSpotlightModal({ open, onClose, event }: LandingEventSpotlightModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open || !event) return null;

  const newsHash = event.anchorId ? `/news#${event.anchorId}` : '/news';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <button type="button" className="absolute inset-0 bg-black/50" aria-label="Close event details" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="landing-spotlight-modal-title"
        className="relative w-full sm:max-w-lg max-h-[92vh] sm:max-h-[85vh] bg-white rounded-t-2xl sm:rounded-xl shadow-xl border border-mist flex flex-col overflow-hidden"
      >
        <div className="flex items-start justify-between gap-3 px-4 py-3 border-b border-mist bg-cloud/80 shrink-0">
          <div className="min-w-0">
            <p className="text-[11px] font-heading uppercase tracking-[0.12em] text-copper">Featured on Events &amp; News</p>
            <h2 id="landing-spotlight-modal-title" className="text-lg font-heading font-semibold text-zambia-green mt-1 pr-2">
              {event.title}
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="text-xs font-heading uppercase tracking-[0.08em] text-copper bg-copper-glow px-2 py-1 rounded border border-mist">
                {event.dateLabel}
              </span>
              {event.feeNote ? (
                <span className="text-xs text-slate bg-white px-2 py-1 rounded border border-mist">{event.feeNote}</span>
              ) : null}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md p-2 text-slate hover:bg-mist/80 hover:text-zambia-green"
            aria-label="Close"
          >
            <span aria-hidden className="text-xl leading-none">
              ×
            </span>
          </button>
        </div>
        <div className="overflow-y-auto px-4 py-4 space-y-4">
          {event.imageUrl ? (
            <div className="-mx-4 -mt-4 border-b border-mist bg-cloud">
              <img
                src={event.imageUrl}
                alt={`${event.title} — event image`}
                className="w-full h-44 object-cover"
                loading="lazy"
              />
            </div>
          ) : null}
          <p className="text-sm text-slate">
            <span className="font-semibold text-zambia-green">Where</span> · {event.location}
          </p>
          <p className="text-sm text-slate leading-relaxed whitespace-pre-line">{event.description}</p>
          {(event.externalUrl || event.secondaryExternalUrl) && (
            <div className="flex flex-col gap-2 pt-1">
              {event.externalUrl ? (
                <a
                  href={event.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-bay-blue hover:underline"
                >
                  {event.externalLinkLabel ?? 'Link'}
                </a>
              ) : null}
              {event.secondaryExternalUrl ? (
                <a
                  href={event.secondaryExternalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-bay-blue hover:underline"
                >
                  {event.secondaryExternalLinkLabel ?? 'More info'}
                </a>
              ) : null}
            </div>
          )}
        </div>
        <div className="px-4 py-3 border-t border-mist bg-cloud/80 flex flex-wrap gap-3 shrink-0">
          <Link to={newsHash} onClick={onClose}>
            <Button variant="accent" type="button">
              View on Events &amp; News
            </Button>
          </Link>
          <Button variant="outline" type="button" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
