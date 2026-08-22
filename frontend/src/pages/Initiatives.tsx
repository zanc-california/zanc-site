import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

/**
 * Overview of ZANC's ongoing programs. Every pillar here points at something that actually exists
 * elsewhere on the site — this page orients people, it does not announce new work.
 */
const PILLARS: { title: string; body: string; to: string; linkLabel: string }[] = [
  {
    title: 'Cultural celebration',
    body:
      'The annual Zambian Independence celebration is our flagship gathering, alongside seasonal socials that keep Zambian ' +
      'heritage present and shared with the next generation.',
    to: '/independence',
    linkLabel: 'Independence 2026 →',
  },
  {
    title: 'Member protection',
    body:
      'A cultural group life insurance program with Hartford, covering members and eligible dependents across several states, ' +
      'with an annual open enrollment window.',
    to: '/insurance',
    linkLabel: 'Group life insurance →',
  },
  {
    title: 'Business & investment',
    body:
      'A quarterly series on diaspora engagement with Zambia — trade and shipping, investment opportunities, entrepreneurship, ' +
      'and building wealth across two countries.',
    to: '/news#business-investment-series',
    linkLabel: 'The series →',
  },
  {
    title: 'Community connection',
    body:
      'Bi-monthly hangouts, quarterly virtual community conversations, and a community board where members share jobs, housing, ' +
      'scholarships, and opportunities.',
    to: '/community',
    linkLabel: 'Community board →',
  },
];

const Initiatives = () => {
  useDocumentMeta({
    title: 'Initiatives',
    description:
      'ZANC programs: cultural celebration, group life insurance for members and dependents, the Business & Investment ' +
      'series, and year-round community connection across Northern California.',
    path: '/initiatives',
  });

  return (
    <div>
      <PageHeader title="ZANC Initiatives" />
      <section className="py-12 md:py-16 bg-fog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl mb-10">
            <p className="text-slate leading-relaxed text-lg">
              ZANC&apos;s work sits in a few steady areas — celebrating Zambian heritage, protecting members and their families,
              opening doors between the diaspora and Zambia, and simply keeping people connected across Northern California.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.map((pillar, i) => (
              <Reveal
                key={pillar.title}
                delayMs={i * 80}
                className="h-full flex flex-col rounded-xl border border-mist bg-white p-6 shadow-sm ui-card-motion ui-card-motion-hover"
              >
                <h2 className="text-lg font-heading font-semibold text-zambia-green">{pillar.title}</h2>
                <p className="mt-3 text-sm text-slate leading-relaxed flex-1">{pillar.body}</p>
                <div className="mt-5">
                  <Link to={pillar.to} className="text-bay-blue font-medium text-sm hover:underline inline-flex items-center gap-1">
                    {pillar.linkLabel}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 rounded-xl border border-mist bg-white p-6 md:p-8">
            <h2 className="text-lg font-heading font-semibold text-zambia-green">Partnerships</h2>
            <p className="mt-3 text-slate leading-relaxed text-sm max-w-3xl">
              We work with organizations that strengthen the diaspora and our local ties. If your organization would like to
              partner with ZANC or support a program, we would like to hear from you.
            </p>
            <div className="mt-5">
              <Link to="/contact" className="text-bay-blue font-medium text-sm hover:underline">
                Talk to us about partnering →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Initiatives;
