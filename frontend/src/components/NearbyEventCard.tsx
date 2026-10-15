import { BookOpen, Clock, ExternalLink, Footprints, Heart, MapPin, Theater, Ticket } from 'lucide-react';
import type { NearbyEvent } from '../data/nearbyEvents2026';

const eventIcons = { books: BookOpen, picnic: Heart, theatre: Theater, run: Footprints };
const eventThemes = {
  books: 'bg-bay-blue/10 text-bay-blue',
  picnic: 'bg-copper-glow text-redwood',
  theatre: 'bg-copper-glow text-redwood',
  run: 'bg-zambia-green/10 text-zambia-green',
};

export default function NearbyEventCard({ event }: { event: NearbyEvent }) {
  const Icon = eventIcons[event.kind];
  const date = new Date(event.startsAt);
  const month = date.toLocaleDateString('en-US', { month: 'short', timeZone: 'America/Los_Angeles' });
  const day = date.toLocaleDateString('en-US', { day: 'numeric', timeZone: 'America/Los_Angeles' });

  return (
    <article id={event.id} className={`scroll-mt-28 rounded-2xl border border-mist bg-white overflow-hidden shadow-sm flex ${event.imageUrl ? 'md:col-span-2 flex-col sm:flex-row' : 'flex-col'}`}>
      {event.imageUrl && (
        <a href={event.imageUrl} target="_blank" rel="noopener noreferrer" className="block bg-copper-glow sm:w-64 shrink-0 p-4" aria-label={`View full flyer: ${event.title} (opens in a new tab)`}>
          <img src={event.imageUrl} alt={`${event.title} save-the-date flyer`} width="481" height="735" loading="lazy" className="w-full max-w-64 mx-auto h-auto rounded-lg" />
        </a>
      )}
      <div className="p-5 sm:p-6 flex flex-col flex-1 min-w-0">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${eventThemes[event.kind]}`}>
            <Icon size={16} aria-hidden="true" /> {event.saveTheDate ? 'Save the date · ladies’ picnic' : event.city}
          </div>
          <div className="text-center text-zambia-green shrink-0 border-l border-mist pl-4" aria-hidden="true">
            <span className="block text-[10px] uppercase tracking-widest">{month}</span>
            <span className="block text-2xl font-heading font-bold leading-tight">{day}</span>
          </div>
        </div>
        <h4 className="font-heading text-xl font-semibold text-zambia-green leading-snug">{event.title}</h4>
        <p className="mt-2 text-xs text-slate">Hosted by {event.organizer}</p>
        <p className="mt-4 text-sm leading-relaxed text-slate">{event.description}</p>
        <dl className="mt-5 space-y-3 text-sm text-slate">
          <div className="flex gap-3"><Clock size={17} className="text-copper shrink-0 mt-0.5" aria-hidden="true" /><div><dt className="sr-only">When</dt><dd><time dateTime={event.startsAt} className="font-semibold text-zambia-green">{event.dateLabel}</time><span className="block mt-0.5">{event.timeLabel} · Pacific</span></dd></div></div>
          <div className="flex gap-3"><MapPin size={17} className="text-copper shrink-0 mt-0.5" aria-hidden="true" /><div><dt className="sr-only">Where</dt><dd>{event.venue}{event.address && <span className="block mt-0.5 text-xs">{event.address}</span>}</dd></div></div>
          <div className="flex gap-3"><Ticket size={17} className="text-copper shrink-0 mt-0.5" aria-hidden="true" /><div><dt className="sr-only">Admission</dt><dd>{event.admission}</dd></div></div>
        </dl>
        <p className="mt-5 rounded-lg bg-cloud p-3 text-xs leading-relaxed text-slate">{event.planningNote}</p>
        <div className="mt-auto pt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
          {event.sourceUrl && <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex gap-1.5 items-center text-zambia-green hover:underline" aria-label={`Organizer details for ${event.title} in ${event.city} (opens in a new tab)`}>Organizer details <ExternalLink size={14} aria-hidden="true" /></a>}
          {event.ticketUrl && <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer" className="text-copper hover:underline" aria-label={`Tickets and registration for ${event.title} (opens in a new tab)`}>Tickets &amp; registration →</a>}
          {event.saveTheDate && <span className="text-copper">RSVP details coming soon</span>}
        </div>
      </div>
    </article>
  );
}
