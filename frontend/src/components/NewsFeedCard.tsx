interface NewsFeedCardProps {
  title: string;
  excerpt: string;
  date: string;
  imageUrl?: string | null;
  onOpen: () => void;
}

/** Compact preview; full story opens in a modal. */
const NewsFeedCard = ({ title, excerpt, date, imageUrl, onOpen }: NewsFeedCardProps) => {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="text-left w-full bg-white rounded-xl border border-mist p-0 shadow-sm hover:shadow-md hover:border-copper/30 transition-all overflow-hidden group"
    >
      {imageUrl ? (
        <div className="aspect-[16/10] w-full bg-cloud overflow-hidden">
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="h-2 w-full bg-gradient-to-r from-zambia-green/20 via-copper/30 to-bay-blue/20" />
      )}
      <div className="p-4">
        <h3 className="text-lg font-heading font-semibold text-zambia-green group-hover:text-copper transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-xs font-heading uppercase tracking-[0.06em] text-copper mt-2">{date}</p>
        <p className="text-slate text-sm mt-3 line-clamp-3 leading-relaxed">{excerpt}</p>
        <p className="text-bay-blue text-sm font-medium mt-4 group-hover:underline">Read full article →</p>
      </div>
    </button>
  );
};

export default NewsFeedCard;
