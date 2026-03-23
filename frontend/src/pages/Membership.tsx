import { useId, useState } from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import {
  paidMemberBenefitsClosing,
  paidMemberBenefitsIntro,
  paidMemberBenefitSections,
} from '../data/membershipPaidBenefits';
import { getMembershipNorCalMonthlyLink, getMembershipNorCalYearlyLink, getMembershipOutOfStateYearlyLink } from '../lib/stripe';

const Membership = () => {
  const [paidDetailsOpen, setPaidDetailsOpen] = useState(false);
  const paidDetailsId = useId();

  const norcalMonthlyLink = getMembershipNorCalMonthlyLink();
  const norcalYearlyLink = getMembershipNorCalYearlyLink();
  const outStateYearlyLink = getMembershipOutOfStateYearlyLink();

  return (
    <div>
      <PageHeader title="Join ZANC" />
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl mb-10">
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-zambia-green">Membership</h2>
            <p className="mt-3 text-slate leading-relaxed">
              Becoming a member connects you with fellow Zambians in Northern California and gives you access to the ZANC community&apos;s
              resources and events.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Reveal delayMs={0} className="group rounded-xl border border-mist bg-white p-6 shadow-sm ui-card-motion ui-card-motion-hover ui-card-motion-active">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-heading font-semibold text-zambia-green">NorCal Member</h3>
                  <p className="text-sm text-slate mt-1">Sacramento / Bay Area residents</p>
                </div>
                <span className="text-xs font-heading uppercase tracking-[0.08em] text-copper bg-copper-glow px-2 py-1 rounded border border-mist">
                  Recommended
                </span>
              </div>

              <div className="mt-5">
                <p className="text-4xl font-heading font-bold text-copper">$10<span className="text-base text-slate font-normal">/mo</span></p>
                <p className="mt-1 text-sm text-slate">$80/year</p>
                <p className="mt-1.5 text-xs font-medium text-copper leading-snug">
                  April promo only — the $80/year rate applies when you join for the year during the month of April.
                </p>
              </div>

              <ul className="mt-5 space-y-2 text-slate text-sm">
                <li>• Voting rights in organizational elections</li>
                <li>• Invitations to community and cultural events</li>
                <li>• Updates on programs, events, and opportunities</li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                {norcalMonthlyLink && (
                  <a href={norcalMonthlyLink} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button variant="accent">Join — Monthly</Button>
                  </a>
                )}
                {norcalYearlyLink && (
                  <a href={norcalYearlyLink} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button variant="primary">Join — Yearly</Button>
                  </a>
                )}
                {!norcalMonthlyLink && !norcalYearlyLink && (
                  <p className="text-amber-700 text-sm">Online card checkout is temporarily disabled while live payment links are being updated.</p>
                )}
              </div>
            </Reveal>

            <Reveal delayMs={90} className="group rounded-xl border border-mist bg-white p-6 shadow-sm ui-card-motion ui-card-motion-hover ui-card-motion-active">
              <div>
                <h3 className="text-xl font-heading font-semibold text-zambia-green">Nationwide</h3>
                <p className="text-sm text-slate mt-1">Out of town / Out of state members</p>
              </div>

              <div className="mt-5">
                <p className="text-4xl font-heading font-bold text-copper">$40<span className="text-base text-slate font-normal">/yr</span></p>
                <p className="text-sm text-slate mt-1">Out of State</p>
              </div>

              <ul className="mt-5 space-y-2 text-slate text-sm">
                <li>• Stay connected to the NorCal community</li>
                <li>• Access to events and community updates</li>
                <li>• Support programs across multiple states</li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                {outStateYearlyLink && (
                  <a href={outStateYearlyLink} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button variant="outline">Join — Yearly</Button>
                  </a>
                )}
                {!outStateYearlyLink && (
                  <p className="text-amber-700 text-sm">Online card checkout is temporarily disabled while live payment links are being updated.</p>
                )}
              </div>
            </Reveal>
          </div>

          <div className="mt-10 max-w-3xl">
            <Button
              type="button"
              variant="outline"
              className="gap-2"
              onClick={() => setPaidDetailsOpen((o) => !o)}
              aria-expanded={paidDetailsOpen}
              aria-controls={paidDetailsId}
            >
              <span>{paidDetailsOpen ? 'Hide' : 'View'} membership details</span>
              <span className="text-xs font-heading" aria-hidden>
                {paidDetailsOpen ? '▴' : '▾'}
              </span>
            </Button>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                paidDetailsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  id={paidDetailsId}
                  className="mt-4 rounded-xl border border-mist bg-cloud p-6 md:p-8"
                  role="region"
                  aria-label="Paid membership benefits for NorCal and SoCal members"
                  {...(!paidDetailsOpen ? { 'aria-hidden': 'true' as const } : {})}
                >
                  <h3 className="text-lg font-heading font-semibold text-zambia-green">
                    ZANC membership benefits (paid members)
                  </h3>
                  <p className="mt-3 rounded-lg border border-copper/25 bg-copper-glow/50 px-3 py-2 text-sm font-medium text-redwood leading-snug">
                    {paidMemberBenefitsIntro}
                  </p>
                  <ol className="mt-6 space-y-6 text-sm text-slate leading-relaxed list-decimal pl-5 marker:font-heading marker:text-zambia-green marker:font-semibold">
                    {paidMemberBenefitSections.map((section) => (
                      <li key={section.title} className="pl-1">
                        <span className="font-heading font-semibold text-zambia-green">{section.title}</span>
                        {section.bullets.length > 0 && (
                          <ul className="mt-2 list-disc space-y-2 pl-4 marker:text-slate">
                            {section.bullets.map((b) => (
                              <li key={b}>{b}</li>
                            ))}
                          </ul>
                        )}
                        {section.subsections?.map((sub, i) => (
                          <ul key={i} className="mt-2 list-[circle] space-y-2 pl-8 marker:text-slate">
                            {sub.bullets.map((b) => (
                              <li key={b}>{b}</li>
                            ))}
                          </ul>
                        ))}
                      </li>
                    ))}
                  </ol>
                  <p className="mt-6 text-sm text-slate leading-relaxed border-t border-mist pt-6">
                    {paidMemberBenefitsClosing}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Reveal className="mt-10 max-w-3xl rounded-xl border border-mist bg-cloud p-6 md:p-8 ui-card-motion motion-safe:hover:border-zambia-green/15 motion-safe:hover:shadow-md">
            <h3 className="text-lg font-heading font-semibold text-zambia-green">What happens after you join?</h3>
            <ul className="mt-4 space-y-2 text-slate text-sm leading-relaxed list-disc pl-5">
              <li>You&apos;ll be added to our community communication channels</li>
              <li>You&apos;ll receive updates on events and programs</li>
              <li>You can participate in committees and activities</li>
            </ul>
          </Reveal>

          <div className="mt-8 rounded-xl border border-mist bg-white p-4 shadow-sm md:p-6 ui-card-motion motion-safe:hover:shadow-md motion-safe:hover:border-zambia-green/10">
            <h3 className="font-heading font-semibold text-zambia-green mb-3">Pay by Zelle or Venmo</h3>
            <p className="text-sm text-slate mb-4">
              Prefer to pay outside of Stripe? Use the same options as insurance payments. Include your name and membership type
              (NorCal monthly/yearly or Nationwide yearly) in the payment note when possible.
            </p>
            <ul className="space-y-2 text-sm text-slate">
              <li>
                <span className="font-semibold text-zambia-green">Zelle:</span> Send to{' '}
                <a href="mailto:zancsac@gmail.com" className="text-bay-blue hover:underline">
                  zancsac@gmail.com
                </a>
              </li>
              <li>
                <span className="font-semibold text-zambia-green">Venmo:</span>{' '}
                <span className="font-medium">@Zanc-Sacramento</span>
              </li>
            </ul>
            <p className="text-sm text-slate mt-4">
              Questions? Email{' '}
              <a href="mailto:zancsac@gmail.com" className="text-bay-blue hover:underline">
                zancsac@gmail.com
              </a>
              .
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-mist bg-cloud p-6 ui-card-motion motion-safe:hover:shadow-md motion-safe:hover:border-zambia-green/10">
              <h3 className="text-lg font-heading font-semibold text-zambia-green">Membership intake form</h3>
              <p className="text-slate mt-2 text-sm">
                Download the ZANC membership intake form (PDF). Complete it and return it by email to zancsac@gmail.com or mail to our PO
                Box address.
              </p>
              <div className="mt-4">
                <a
                  href="/forms/zanc-membership-intake-form.pdf"
                  download="zanc-membership-intake-form.pdf"
                  className="inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">Download intake form (PDF)</Button>
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-mist bg-cloud p-6 ui-card-motion motion-safe:hover:shadow-md motion-safe:hover:border-zambia-green/10">
              <h3 className="text-lg font-heading font-semibold text-zambia-green">Important</h3>
              <p className="text-slate mt-2 text-sm">
                Membership subscription is mandatory for all Group Insurance subscribers. We highly encourage all community members to
                subscribe to help cover community needs and sponsor events.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;
