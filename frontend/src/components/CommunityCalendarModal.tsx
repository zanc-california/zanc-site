import { useEffect, useRef } from 'react';
import { CALENDAR_MODAL_SECTIONS } from '../data/communityCalendar2026';
import { getUpcomingNearbyEvents } from '../data/nearbyEvents2026';

export default function CommunityCalendarModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <dialog ref={dialogRef} onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} aria-labelledby="calendar-title" className="m-auto w-[calc(100%_-_2rem)] max-w-2xl max-h-[85vh] rounded-2xl border border-mist p-0 backdrop:bg-black/50">
      <div className="sticky top-0 bg-white border-b border-mist flex justify-between items-center gap-3 p-5">
        <h2 id="calendar-title" className="font-heading text-lg font-semibold text-zambia-green">2026 community calendar</h2>
        <button type="button" onClick={onClose} aria-label="Close calendar" className="rounded-lg px-3 py-2 text-slate hover:bg-cloud">✕</button>
      </div>
      <div className="p-5 space-y-4">
        {CALENDAR_MODAL_SECTIONS.map((block) => <section key={block.title} className="rounded-lg border border-mist p-4 bg-cloud"><h3 className="font-heading font-semibold text-zambia-green">{block.title}</h3><ul className="mt-2 text-slate text-sm space-y-2 list-disc pl-5">{block.lines.map((line) => <li key={line}>{line}</li>)}</ul></section>)}
        {getUpcomingNearbyEvents().length > 0 && <section className="rounded-lg border border-mist p-4 bg-cloud"><h3 className="font-heading font-semibold text-zambia-green">Nearby outings &amp; community save-the-dates</h3><p className="mt-2 text-xs text-slate">Hosted independently. All times are Pacific.</p><ul className="mt-3 space-y-4 text-sm text-slate">{getUpcomingNearbyEvents().map((event) => <li key={event.id}><p className="font-semibold">{event.title} · {event.city}</p><p>{event.dateLabel} · {event.timeLabel}</p>{event.sourceUrl ? <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-copper hover:underline">Organizer details ↗</a> : <p className="text-xs mt-1">Save the date · venue and RSVP details to be announced</p>}</li>)}</ul></section>}
      </div>
    </dialog>
  );
}
