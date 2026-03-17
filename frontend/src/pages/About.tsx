import React from 'react';
import PageHeader from '../components/PageHeader';
import BoardMember from '../components/BoardMember';

const About = () => {
  // Board members (2026–2028)
  const boardMembers = [
    {
      id: 1,
      name: 'Mabvuto Kaela',
      position: 'President',
      imageUrl: '/images/members/president.jpg',
    },
    {
      id: 2,
      name: 'Beene Naulapwa',
      position: 'Vice President',
      imageUrl: '/images/members/secretary.jpg',
    },
    {
      id: 3,
      name: 'Mujina Masumba',
      position: 'Treasurer',
    },
    {
      id: 4,
      name: 'Susanna Kaela',
      position: 'Vice Treasurer',
    },
    {
      id: 5,
      name: 'Colleen Alvarez',
      position: 'Secretary',
    },
    {
      id: 6,
      name: 'Catherine Semayo',
      position: 'Vice Secretary',
    },
  ];

  return (
    <div>
      <PageHeader title="About" />
      
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-6 font-heading">Our Mission</h2>
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">
              The Association of Zambians in California (ZANC) serves as a cultural bridge for Zambians living in California. 
              We are dedicated to preserving and promoting Zambian cultural heritage, fostering unity among Zambians, 
              and facilitating engagement with the wider community.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our organization aims to create a supportive network for Zambians in California, particularly those who are 
              new to the area. We provide resources and connections to help members navigate life in California while 
              maintaining their cultural identity.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mb-8">
              Additionally, ZANC engages in philanthropic activities to support educational and healthcare initiatives 
              in Zambia, demonstrating our commitment to contributing to the development of our home country.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-10 text-center font-heading">Board Members</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 justify-items-center">
            {boardMembers.map(member => (
              <BoardMember 
                key={member.id}
                name={member.name}
                position={member.position}
                imageUrl={member.imageUrl}
              />
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-gray-600 max-w-2xl mx-auto">
            Additional appointed invitees to the board (5 positions) will be announced soon.
          </p>
        </div>
      </section>
      
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-6 font-heading">Our History</h2>
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">
              ZANC was founded in 1995 by a small group of Zambian expatriates who recognized the need for a formal 
              organization to bring together Zambians living in California. What began as informal gatherings 
              evolved into a structured association dedicated to cultural preservation and community support.
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">
              Over the years, ZANC has grown substantially in both membership and influence. We have established 
              annual events such as the Independence Day celebration, cultural workshops, and community outreach programs.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mb-8">
              Today, ZANC continues to evolve while remaining true to its founding principles of unity, cultural 
              preservation, and community service. We look forward to many more years of connecting Zambians 
              across California and making meaningful contributions both locally and in Zambia.
            </p>
            <div className="pt-4">
              <a href="/membership" className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md bg-[#1a3c2a] text-white hover:bg-primary-800 focus:ring-2 focus:ring-offset-2 focus:ring-primary-600">
                Join ZANC
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;