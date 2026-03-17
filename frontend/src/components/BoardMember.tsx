import React from 'react';

interface BoardMemberProps {
  name: string;
  position: string;
  imageUrl: string;
}

const BoardMember: React.FC<BoardMemberProps> = ({ name, position, imageUrl }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4 bg-gray-200">
        <img 
          src={imageUrl} 
          alt={`${name}, ${position}`}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold text-primary-800">{name}</h3>
      <p className="text-sm text-gray-600">{position}</p>
    </div>
  );
};

export default BoardMember;