import { UserRound } from 'lucide-react';

/** Placeholder circle for board invitee photos before announcements. */
const BoardInviteePlaceholder = ({ slotLabel }: { slotLabel: string }) => {
  return (
    <div className="flex flex-col items-center max-w-[200px] mx-auto">
      <div
        className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-dashed border-mist bg-cloud flex items-center justify-center text-slate/70"
        aria-hidden
      >
        <UserRound className="w-14 h-14 md:w-16 md:h-16" strokeWidth={1.25} />
      </div>
      <p className="mt-4 text-xs font-heading uppercase tracking-[0.06em] text-slate">{slotLabel}</p>
      <p className="mt-1 text-sm font-medium text-primary-800 text-center">Announced soon</p>
    </div>
  );
};

export default BoardInviteePlaceholder;
