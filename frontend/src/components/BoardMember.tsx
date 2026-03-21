import React from 'react';

interface BoardMemberProps {
  name: string;
  position: string;
  imageUrl?: string;
}

const BoardMember: React.FC<BoardMemberProps> = ({ name, position, imageUrl }) => {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('');

  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4 bg-gray-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${name}, ${position}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-primary-800 font-semibold text-2xl md:text-3xl">
            {initials}
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold text-primary-800 text-center max-w-[16rem] px-1">{name}</h3>
      <p className="text-sm text-gray-600 text-center max-w-[18rem] leading-relaxed mt-1 px-1">{position}</p>
    </div>
  );
};

export default BoardMember;