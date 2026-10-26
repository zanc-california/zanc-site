import { useEffect, useRef, useState } from 'react';
import PhotoCredit from './PhotoCredit';

export type GalleryPhoto = {
  id: string;
  image_url: string;
  thumbnail_url?: string;
  caption: string | null;
  alt?: string;
  category: string | null;
  tags?: string[] | null;
  credit?: { name: string; url: string };
};

/** Native modal dialog provides focus containment, Escape and focus restoration. */
export default function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const open = selected !== null;
  const photo = selected === null ? null : photos[selected];

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (!open) {
      element.close();
      return;
    }
    element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const move = (direction: number) => setSelected((current) => current === null ? null : (current + direction + photos.length) % photos.length);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((item, index) => (
          <figure key={item.id} className="overflow-hidden rounded-xl border border-mist bg-white shadow-sm">
            <button type="button" onClick={() => setSelected(index)} aria-haspopup="dialog"
              aria-label={`Enlarge photo: ${item.caption || 'Community moment'}`}
              className="group block w-full cursor-zoom-in bg-cloud focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-zambia-green">
              <img src={item.thumbnail_url || item.image_url}
                srcSet={item.thumbnail_url ? `${item.thumbnail_url} 640w, ${item.image_url} 1600w` : undefined}
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                alt={item.alt || item.caption || 'ZANC community photograph'} loading="lazy" decoding="async"
                className="aspect-[3/2] w-full object-contain motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.02]" />
            </button>
            <figcaption className="space-y-2 p-4">
              <p className="text-sm leading-relaxed text-slate">{item.caption}</p>
              <p className="text-[11px] font-heading uppercase tracking-wide text-redwood">{(item.tags?.length ? item.tags : [item.category]).filter(Boolean).join(' · ')}</p>
              {item.credit && <PhotoCredit credit={item.credit} className="text-slate" />}
            </figcaption>
          </figure>
        ))}
      </div>

      <dialog ref={dialog} onCancel={() => setSelected(null)}
        onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            move(event.key === 'ArrowRight' ? 1 : -1);
          }
        }}
        aria-label="Photo viewer"
        className="m-auto max-h-[94dvh] w-[calc(100%-1rem)] max-w-6xl overflow-y-auto rounded-xl border-0 bg-white p-0 shadow-2xl backdrop:bg-black/80">
        {photo && (
          <>
            <div className="flex items-center justify-between gap-3 border-b border-mist px-4 py-2">
              <p className="text-sm text-slate" aria-live="polite">Photo {(selected ?? 0) + 1} of {photos.length}</p>
              <button type="button" autoFocus onClick={() => setSelected(null)} aria-label="Close photo viewer"
                className="min-h-11 rounded-md px-4 text-zambia-green hover:bg-cloud focus-visible:outline focus-visible:outline-2">Close ×</button>
            </div>
            <div className="bg-black">
              <img key={photo.id} src={photo.image_url} alt={photo.alt || photo.caption || 'ZANC community photograph'} className="max-h-[65dvh] w-full object-contain" />
            </div>
            <div className="flex flex-col items-stretch justify-between gap-3 p-4 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1" aria-live="polite">
                <p className="text-sm font-medium text-zambia-green">{photo.caption}</p>
                {photo.credit && <PhotoCredit credit={photo.credit} className="mt-1 text-slate" />}
              </div>
              <div className="flex shrink-0 justify-end gap-2">
                <button type="button" onClick={() => move(-1)} aria-label="Previous photo" className="min-h-11 rounded-md border border-mist px-4 text-zambia-green hover:bg-cloud">← Previous</button>
                <button type="button" onClick={() => move(1)} aria-label="Next photo" className="min-h-11 rounded-md border border-mist px-4 text-zambia-green hover:bg-cloud">Next →</button>
              </div>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
