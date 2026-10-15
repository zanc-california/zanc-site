interface NewsFeedCardProps {
  title: string;
  excerpt: string;
  date: string;
  imageUrl?: string | null;
  imageFit?: 'cover' | 'contain';
  onOpen: () => void;
}

/** Compact preview; full story opens in a modal. */
const NewsFeedCard = ({ title, excerpt, date, imageUrl, imageFit = 'cover', onOpen }: NewsFeedCardProps) => {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="text-left w-full h-full flex flex-col bg-white rounded-xl border border-mist p-0 shadow-sm hover:shadow-md hover:border-copper/30 transition-all overflow-hidden group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zambia-green"
    >
      {imageUrl ? (
        <div className="aspect-[16/10] w-full shrink-0 bg-cloud overflow-hidden border-b border-mist">
          <img
            src={imageUrl}
            alt=""
            className={`w-full h-full ${imageFit === 'contain' ? 'object-contain p-3' : 'object-cover object-top'} motion-safe:group-hover:scale-[1.02] transition-transform duration-300`}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="aspect-[16/10] w-full shrink-0 bg-copper-glow/40 flex items-center justify-center border-b border-mist"><span className="font-heading text-zambia-green text-xl">From the ZANC community</span></div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-heading font-semibold text-zambia-green group-hover:text-copper transition-colors leading-snug">
          {title}
        </h3>
        <p className="text-xs font-heading uppercase tracking-[0.06em] text-copper mt-2">{date}</p>
        <p className="text-slate text-sm mt-3 line-clamp-3 leading-relaxed">{excerpt}</p>
        <p className="text-bay-blue text-sm font-medium mt-auto pt-5 group-hover:underline">Read full article →</p>
      </div>
    </button>
  );
};

export default NewsFeedCard;
