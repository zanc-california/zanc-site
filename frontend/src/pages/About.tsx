import React from 'react';
import PageHeader from '../components/PageHeader';
import BoardMember from '../components/BoardMember';
import BoardInviteePlaceholder from '../components/BoardInviteePlaceholder';

const About = () => {
  // Elected committee (2026–2028) — elections held February 2026
  const electedCommitteeMembers = [
    {
      id: 1,
      name: 'Mabvuto Kaela',
      position: 'President',
      imageUrl: '/images/members/mabvuto-kaela.png',
      shortBio: 'Focused on strengthening diaspora engagement and community growth.',
    },
    {
      id: 2,
      name: 'Beene Naulapwa',
      position: 'Vice President',
      imageUrl: '/images/members/secretary.jpg',
      shortBio: 'Supporting programs, partnerships, and a welcoming culture for every member.',
    },
    {
      id: 3,
      name: 'Mujina Masumba',
      position: 'Treasurer',
      shortBio: 'Stewarding resources with clarity so the association can plan confidently.',
    },
    {
      id: 4,
      name: 'Susanna Kaela',
      position: 'Vice Treasurer',
      imageUrl: '/images/members/susanna-kaela.png',
      shortBio: 'Backing financial operations and transparency alongside the treasurer.',
    },
    {
      id: 5,
      name: 'Colleen Alvarez',
      position: 'Secretary',
      shortBio: 'Keeping records, communications, and follow-through organized for the board.',
    },
    {
      id: 6,
      name: 'Catherine Samoyu',
      position: 'Vice Secretary',
      shortBio: 'Helping document decisions and keep members informed as we grow.',
    },
  ];

  const appointedInvitees = [
    {
      id: 1,
      name: 'Kasamba Sikapiye',
      position: 'Former Vice President (ZANC), iDream Co-Founder',
      imageUrl: '/images/members/kasamba-sikapizye-about-page.png',
      shortBio: 'Bringing enterprise and community experience to board conversations.',
    },
    {
      id: 2,
      name: 'Pastor Stephen Mubanga',
      position: 'Rev. Stephen Mubanga — LA Community Coordinator',
      imageUrl: '/images/members/pastor-stephen-mubanga.png',
      shortBio: 'Helping SoCal members stay connected with NorCal and the wider ZANC family.',
    },
    {
      id: 3,
      name: 'Sid Mofya',
      position: 'Founder, CXB Ventures (Bay Area)',
      imageUrl: '/images/members/sid-mofya.png',
      shortBio: 'Offering a Bay Area innovation and ventures lens to community goals.',
    },
    {
      id: 4,
      name: 'Rajen Ranchhod',
      position: 'Hon. Consul (CA)',
      imageUrl: '/images/members/rajen-ranchhod.jpg',
      shortBio: 'Strengthening civic and diaspora ties across California.',
    },
    {
      id: 5,
      name: 'Gladys Desmarais',
      position: 'ZANC Community',
      shortBio: 'Representing member voices and grassroots community care.',
    },
  ];

  const remainingInviteePlaceholders = ['Seat 6'] as const;

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
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-sm uppercase tracking-[0.08em] font-heading text-copper">Committee members</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-primary-800 font-heading">The ZANC Board</h2>
            <p className="mt-4 text-gray-600">
              General elections were recently held and a new committee was elected. The board includes elected committee members and
              appointed invitees as outlined below.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-12 rounded-xl border border-mist bg-white shadow-sm px-6 py-8 md:px-10 md:py-9">
            <p className="text-xs uppercase tracking-[0.08em] font-heading text-copper text-center">Vision — newly elected committee</p>
            <div className="mt-4 space-y-4 text-slate text-center leading-relaxed">
              <p>
                The newly elected committee seeks to strengthen a spirit of community partnership and participation—lifting collective
                aspirations and deepening connectedness across the broader Northern California community.
              </p>
              <p>
                In the national conversation, we aim to be a constructive force for good: honoring Zambian and American heritage and
                helping our members and neighbors thrive together.
              </p>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-heading font-semibold text-zambia-green text-center mb-2">
            Committee Members (Elected)
          </h3>
          <p className="text-center text-sm text-gray-600 mb-10">Term 2026–2028</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 justify-items-center">
            {electedCommitteeMembers.map((member) => (
              <BoardMember
                key={member.id}
                name={member.name}
                position={member.position}
                imageUrl={member.imageUrl}
                shortBio={member.shortBio}
              />
            ))}
          </div>

          <div className="mt-16 pt-12 border-t border-mist">
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-zambia-green text-center mb-3">
              Appointed invitees to the board
            </h3>
            <p className="text-center text-sm font-medium text-primary-800 mb-2 max-w-2xl mx-auto">
              Six appointed invitee positions — five are named below; one seat will be announced soon.
            </p>
            <p className="text-center text-sm text-gray-600 mb-10 max-w-2xl mx-auto">
              Photos will be added when available. Open seats show as placeholders until filled.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 justify-items-center">
              {appointedInvitees.map((member) => (
                <BoardMember
                  key={member.id}
                  name={member.name}
                  position={member.position}
                  imageUrl={member.imageUrl}
                  shortBio={member.shortBio}
                />
              ))}
              {remainingInviteePlaceholders.map((label) => (
                <BoardInviteePlaceholder key={label} slotLabel={label} />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-zambia-green">Our History</h2>
              <p className="text-slate mt-4 leading-relaxed">
                Founded in 2017, ZANC began as a small group of Zambian expatriates who recognized the need for a formal organization
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
                    <p className="font-medium text-zambia-green">2017</p>
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