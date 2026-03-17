import React from 'react';
import { Link } from 'react-router-dom';

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ id, title, excerpt, date }) => {
  return (
    <div className="border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow">
      <Link to={`/news/${id}`}>
        <h3 className="text-lg font-semibold text-primary-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">{date}</p>
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
        <p className="text-primary-600 text-sm font-medium hover:underline">Read more →</p>
      </Link>
    </div>
  );
};

export default NewsCard;