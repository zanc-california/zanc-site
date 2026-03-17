import React from 'react';
import PageHeader from '../components/PageHeader';
import BoardMember from '../components/BoardMember';

const About = () => {
  // Board members (2026–2028) — elections held February 2026
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
      name: 'Catherine Samoyu',
      position: 'Vice Secretary',
    },
  ];

  return (
    <div>
      <PageHeader title="About" />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-r from-zambia-green via-zambia-green-light to-bay-blue" />
          <div className="absolute inset-0 bg-black/25" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-white/90 text-sm uppercase tracking-[0.08em] font-heading">Our mission</p>
            <h1 className="mt-3 text-3xl md:text-5xl font-heading font-bold text-white tracking-[-0.02em] drop-shadow">
              Zambian heritage, Northern California community.
            </h1>
            <p className="mt-4 text-white/90 text-base md:text-lg leading-relaxed">
              The Zambian Association in Northern California (ZANC) serves as a cultural bridge — preserving heritage, fostering unity,
              and supporting community initiatives in Northern California and beyond.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-16 bg-fog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-4 text-center font-heading">
            Board Members (2026–2028)
          </h2>
          <p className="text-center text-gray-600 mb-10">
            General elections were recently held and a new committee was elected.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 justify-items-center">
            {boardMembers.map((member) => (
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
      
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-zambia-green">Our History</h2>
              <p className="text-slate mt-4 leading-relaxed">
                Founded in 1995, ZANC began as a small group of Zambian expatriates who recognized the need for a formal organization
                to bring the community together. What started as informal gatherings evolved into a structured association dedicated to
                cultural preservation and community support.
              </p>
              <p className="text-slate mt-4 leading-relaxed">
                Today, our community spans families across California, Arizona, Nevada, Illinois, Indiana, New York, and Connecticut — with
                active membership across multiple states.
              </p>
              <p className="text-slate mt-4 leading-relaxed">
                ZANC is registered as a fraternal society with the California Franchise Tax Board, maintains an active PO Box for official
                correspondence, and banks with Wells Fargo as our trusted partner.
              </p>
              <div className="mt-6">
                <a href="/membership" className="inline-block">
                  <span className="sr-only">Join ZANC</span>
                </a>
              </div>
            </div>

            <div className="bg-cloud rounded-xl border border-mist p-6">
              <h3 className="text-lg font-heading font-semibold text-zambia-green mb-4">Timeline</h3>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <div className="mt-1 h-3 w-3 rounded-full bg-copper" />
                  <div>
                    <p className="font-medium text-zambia-green">1995</p>
                    <p className="text-sm text-slate">ZANC founded to connect and support the Zambian community in Northern California.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 h-3 w-3 rounded-full bg-copper" />
                  <div>
                    <p className="font-medium text-zambia-green">Growing reach</p>
                    <p className="text-sm text-slate">Membership expands across multiple states with families staying connected through events and programs.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 h-3 w-3 rounded-full bg-copper" />
                  <div>
                    <p className="font-medium text-zambia-green">Today</p>
                    <p className="text-sm text-slate">A thriving community rooted in Zambian heritage and NorCal pride.</p>
                  </div>
                </li>
              </ol>

              <div className="mt-6">
                <a href="/membership" className="inline-block">
                  <span className="sr-only">Join ZANC</span>
                </a>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="/membership" className="inline-block">
                    <button type="button" className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-copper text-white font-medium hover:bg-copper-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-copper">
                      Join ZANC
                    </button>
                  </a>
                  <a href="/news" className="inline-block">
                    <button type="button" className="inline-flex items-center justify-center px-6 py-3 rounded-md border-2 border-mist bg-white text-slate font-medium hover:bg-cloud focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bay-blue">
                      Explore Events
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;