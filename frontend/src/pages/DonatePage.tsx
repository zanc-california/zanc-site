import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import { ZANC_CONTACT_EMAIL } from '../components/ContactForm';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

/**
 * Giving page.
 *
 * Deliberately limited to what ZANC can actually support today:
 *  - real payment rails (Zelle / Venmo / email), the same ones used for membership and insurance
 *  - programs that genuinely exist on this site (events, community programs, Independence)
 *
 * It makes no claim about tax treatment of contributions. Do not add one without authoritative
 * documentation from the association.
 */
const DonatePage = () => {
  useDocumentMeta({
    title: 'Support ZANC',
    description:
      'Support ZANC community programming — events, cultural celebrations, and community initiatives across Northern California. ' +
      'Contribute by Zelle or Venmo, sponsor an event, or give your time.',
    path: '/donate',
  });

  const sponsorMailto = `mailto:${ZANC_CONTACT_EMAIL}?subject=${encodeURIComponent(
    'Sponsorship / partnership enquiry'
  )}&body=${encodeURIComponent(
    'I would like to talk about sponsoring or partnering with ZANC.\n\nName / organization:\nWhat I have in mind:\nBest way to reach me:\n'
  )}`;

  const inKindMailto = `mailto:${ZANC_CONTACT_EMAIL}?subject=${encodeURIComponent('In-kind contribution')}`;

  return (
    <div>
      <PageHeader title="Support ZANC" />

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl mb-10">
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-zambia-green">Give to the community</h2>
            <p className="mt-3 text-slate leading-relaxed">
              ZANC is run by volunteers. Contributions go towards community events, cultural celebrations such as the annual
              Independence gathering, and the everyday work of keeping Zambians in Northern California connected to one another.
            </p>
          </Reveal>

          {/* Real payment rails — no placeholder checkout. */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Reveal className="lg:col-span-2 rounded-xl border border-mist bg-cloud p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-heading font-semibold text-zambia-green">Contribute by Zelle or Venmo</h3>
              <p className="mt-3 text-sm text-slate leading-relaxed">
                These are the same accounts used for membership and insurance payments. Please include your name and a short note
                (for example &ldquo;donation&rdquo; or the event you are supporting) so the treasurer can record it correctly.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-slate">
                <li className="rounded-lg border border-mist bg-white px-4 py-3">
                  <span className="font-semibold text-zambia-green">Zelle:</span>{' '}
                  <a href={`mailto:${ZANC_CONTACT_EMAIL}`} className="text-bay-blue hover:underline">
                    {ZANC_CONTACT_EMAIL}
                  </a>
                </li>
                <li className="rounded-lg border border-mist bg-white px-4 py-3">
                  <span className="font-semibold text-zambia-green">Venmo:</span>{' '}
                  <span className="font-medium">@Zanc-Sacramento</span>
                </li>
              </ul>
              <p className="mt-5 text-sm text-slate leading-relaxed">
                Prefer another method, or want to give towards something specific? Email{' '}
                <a href={`mailto:${ZANC_CONTACT_EMAIL}`} className="text-bay-blue font-medium hover:underline">
                  {ZANC_CONTACT_EMAIL}
                </a>{' '}
                and the team will help.
              </p>
            </Reveal>

            <Reveal delayMs={90} className="rounded-xl border border-mist bg-white p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-heading font-semibold text-zambia-green">Sponsor or partner</h3>
              <p className="mt-3 text-sm text-slate leading-relaxed">
                Businesses and organizations can sponsor programming or support a specific event. Recognition and sponsorship
                details are agreed case by case with the committee.
              </p>
              <div className="mt-5">
                <a href={sponsorMailto} className="inline-block">
                  <Button variant="accent">Start a sponsorship conversation</Button>
                </a>
              </div>
            </Reveal>
          </div>

          {/* What contributions support — only programs that actually exist on this site. */}
          <Reveal className="mt-12 rounded-xl border border-mist bg-fog p-6 md:p-8">
            <h3 className="text-xl font-heading font-semibold text-zambia-green">Where contributions go</h3>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-heading font-medium text-zambia-green mb-2">Cultural celebrations</h4>
                <p className="text-sm text-slate leading-relaxed">
                  The annual Zambian Independence celebration and other gatherings that keep our heritage present in Northern
                  California.
                </p>
              </div>
              <div>
                <h4 className="font-heading font-medium text-zambia-green mb-2">Community events</h4>
                <p className="text-sm text-slate leading-relaxed">
                  Hangouts, family days, the Business &amp; Investment series, and community conversations across the year.
                </p>
              </div>
              <div>
                <h4 className="font-heading font-medium text-zambia-green mb-2">Community support</h4>
                <p className="text-sm text-slate leading-relaxed">
                  Helping members show up for one another — welcoming new arrivals, marking milestones, and keeping the association
                  running.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Non-financial support */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Reveal className="rounded-xl border border-mist bg-white p-6 shadow-sm">
              <h3 className="text-lg font-heading font-semibold text-zambia-green">In-kind contributions</h3>
              <p className="mt-3 text-sm text-slate leading-relaxed">
                Goods, venue space, or professional services can be just as valuable as a financial contribution. Tell us what you
                have in mind and we will let you know whether it fits something we are planning.
              </p>
              <div className="mt-5">
                <a href={inKindMailto} className="inline-block">
                  <Button variant="outline">Email about in-kind giving</Button>
                </a>
              </div>
            </Reveal>

            <Reveal delayMs={90} className="rounded-xl border border-mist bg-white p-6 shadow-sm">
              <h3 className="text-lg font-heading font-semibold text-zambia-green">Give your time</h3>
              <p className="mt-3 text-sm text-slate leading-relaxed">
                Volunteers make every ZANC event possible — setup, welcome tables, cooking, décor, and program support. There are
                open roles for the Independence celebration right now.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/independence#take-part" className="inline-block">
                  <Button variant="outline">Independence volunteering</Button>
                </Link>
                <Link to="/get-involved" className="inline-block">
                  <Button variant="outline">All ways to get involved</Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonatePage;
