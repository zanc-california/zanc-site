import React from 'react';

interface BoardMemberProps {
  name: string;
  position: string;
  imageUrl?: string;
  /** One-line human context (max ~120 chars in content; truncated in UI if longer) */
  shortBio?: string;
}

const BoardMember: React.FC<BoardMemberProps> = ({ name, position, imageUrl, shortBio }) => {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('');

  return (
    <div className="group flex flex-col items-center">
      <div className="mb-4 h-32 w-32 md:h-40 md:w-40 overflow-hidden rounded-full bg-gray-200 shadow-sm ring-0 motion-safe:transition-[transform,box-shadow] motion-safe:duration-300 motion-safe:group-hover:scale-[1.04] motion-safe:group-hover:shadow-md motion-safe:group-hover:ring-2 motion-safe:group-hover:ring-copper/30 motion-safe:group-hover:ring-offset-2 motion-safe:group-hover:ring-offset-fog">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${name}, ${position}`}
            className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-110 motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-2xl font-semibold text-primary-800 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105 md:text-3xl">
            {initials}
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold text-primary-800 text-center max-w-[16rem] px-1">{name}</h3>
      <p className="text-sm text-gray-600 text-center max-w-[18rem] leading-relaxed mt-1 px-1">{position}</p>
      {shortBio && (
        <p
          className="text-xs text-slate/90 text-center max-w-[18rem] mt-2 px-1 leading-snug line-clamp-2"
          title={shortBio}
        >
          {shortBio}
        </p>
      )}
    </div>
  );
};

export default BoardMember;