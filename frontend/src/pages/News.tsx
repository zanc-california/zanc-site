import React from 'react';
import PageHeader from '../components/PageHeader';
import NewsCard from '../components/NewsCard';

const News = () => {
  // Sample news data - in a real application, this would come from an API or database
  const newsItems = [
    {
      id: '1',
      title: 'Annual ZANC Gala Dinner Announced',
      excerpt: 'Join us for our annual gala dinner celebrating Zambian culture and community achievements. This year\'s event will feature traditional music, dance performances, and a keynote speech from a distinguished Zambian diplomat.',
      date: 'June 15, 2025',
    },
    {
      id: '2',
      title: 'Cultural Workshop Series',
      excerpt: 'Learn about Zambian traditions and cultural practices in our new workshop series. The workshops will cover traditional music, dance, cuisine, and crafts, providing hands-on experience with Zambian cultural expressions.',
      date: 'May 30, 2025',
    },
    {
      id: '3',
      title: 'Scholarship Program Applications Open',
      excerpt: 'ZANC is now accepting applications for our annual scholarship program. The program aims to support Zambian students in California pursuing higher education in various fields.',
      date: 'May 20, 2025',
    },
    {
      id: '4',
      title: 'Community Outreach Initiative Launches',
      excerpt: 'ZANC is proud to announce a new community outreach initiative aimed at supporting vulnerable communities in Zambia. The program will focus on providing educational resources and healthcare support.',
      date: 'May 10, 2025',
    },
    {
      id: '5',
      title: 'Independence Day Celebration Planning Underway',
      excerpt: 'Planning has begun for our annual Independence Day celebration. This year\'s event promises to be bigger and better, with traditional food, music, and activities for all ages.',
      date: 'April 25, 2025',
    },
    {
      id: '6',
      title: 'New Board Members Elected',
      excerpt: 'ZANC is pleased to announce the election of three new board members who will help guide our organization\'s activities and initiatives for the next two years.',
      date: 'April 15, 2025',
    },
  ];

  return (
    <div>
      <PageHeader title="News & Updates" />
      
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
            {newsItems.map((item) => (
              <NewsCard 
                key={item.id}
                id={item.id}
                title={item.title}
                excerpt={item.excerpt}
                date={item.date}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;