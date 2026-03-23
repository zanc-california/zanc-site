import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import SubscribeForm from './SubscribeForm';

type SubscribeModalProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * Email signup overlay (hero CTA). Uses same /api/subscribe flow as footer form.
 */
export default function SubscribeModal({ open, onClose }: SubscribeModalProps) {
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

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close subscribe dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscribe-modal-title"
        className="relative w-full sm:max-w-md max-h-[92vh] sm:max-h-[85vh] bg-white rounded-t-2xl sm:rounded-xl shadow-xl border border-mist flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-mist bg-cloud/80 shrink-0">
          <h2 id="subscribe-modal-title" className="text-lg font-heading font-semibold text-zambia-green pr-2">
            Subscribe to ZANC updates
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-slate hover:text-zambia-green px-2 py-1 rounded-md text-xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <p className="text-sm text-slate mb-4 leading-relaxed">
            Events, opportunities, and community activities — straight to your inbox.
          </p>
          <SubscribeForm variant="inline" inputId="subscribe-email-hero" autoFocusEmail showIntro={false} />
        </div>
      </div>
    </div>,
    document.body
  );
}
