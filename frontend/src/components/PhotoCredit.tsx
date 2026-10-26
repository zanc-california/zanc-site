type PhotoCreditProps = {
  credit: { name: string; url: string };
  className?: string;
};

export default function PhotoCredit({ credit, className = '' }: PhotoCreditProps) {
  return (
    <p className={`text-xs leading-relaxed ${className}`}>
      Photography by{' '}
      <a href={credit.url} target="_blank" rel="noopener noreferrer" className="!text-inherit underline underline-offset-4 hover:opacity-80">
        {credit.name}
      </a>
    </p>
  );
}
