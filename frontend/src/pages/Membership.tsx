import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { getMembershipMonthlyLink, getMembershipYearlyLink, getMembershipPrices } from '../lib/stripe';

type BillingOption = 'monthly' | 'yearly';

const Membership = () => {
  const monthlyLink = getMembershipMonthlyLink();
  const yearlyLink = getMembershipYearlyLink();
  const [billing, setBilling] = useState<BillingOption>('yearly');

  const paymentLink = billing === 'monthly' ? monthlyLink : yearlyLink;
  const hasOptions = monthlyLink || yearlyLink;
  const prices = getMembershipPrices();

  return (
    <div>
      <PageHeader title="Join ZANC" />
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-zambia-green">Membership</h2>
            <p className="mt-3 text-slate leading-relaxed">
              Becoming a member connects you with fellow Zambians in Northern California and gives you access to community resources and events.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-mist p-6 shadow-sm">
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
                <p className="text-sm text-slate mt-1">$120/year</p>
              </div>

              <ul className="mt-5 space-y-2 text-slate text-sm">
                <li>• Voting rights in organizational elections</li>
                <li>• Invitations to community and cultural events</li>
                <li>• Updates on programs, events, and opportunities</li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                {monthlyLink && (
                  <a href={monthlyLink} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button variant="accent">Join — Monthly</Button>
                  </a>
                )}
                {yearlyLink && (
                  <a href={yearlyLink} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button variant="primary">Join — Yearly</Button>
                  </a>
                )}
                {!monthlyLink && !yearlyLink && (
                  <p className="text-amber-700 text-sm">Membership payment links are not configured.</p>
                )}
              </div>
              {(prices.monthly || prices.yearly) && (
                <p className="mt-3 text-xs text-slate">
                  Display prices (env): {prices.monthly ?? '—'} / {prices.yearly ?? '—'}
                </p>
              )}
            </div>

            <div className="bg-white rounded-xl border border-mist p-6 shadow-sm">
              <div>
                <h3 className="text-xl font-heading font-semibold text-zambia-green">Nationwide</h3>
                <p className="text-sm text-slate mt-1">Out of town / Out of state members</p>
              </div>

              <div className="mt-5">
                <p className="text-4xl font-heading font-bold text-copper">$5<span className="text-base text-slate font-normal">/mo</span></p>
                <p className="text-sm text-slate mt-1">$60/year</p>
              </div>

              <ul className="mt-5 space-y-2 text-slate text-sm">
                <li>• Stay connected to the NorCal community</li>
                <li>• Access to events and community updates</li>
                <li>• Support programs across multiple states</li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                {monthlyLink && (
                  <a href={monthlyLink} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button variant="outline">Join — Monthly</Button>
                  </a>
                )}
                {yearlyLink && (
                  <a href={yearlyLink} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button variant="outline">Join — Yearly</Button>
                  </a>
                )}
                {!monthlyLink && !yearlyLink && (
                  <p className="text-amber-700 text-sm">Membership payment links are not configured.</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-cloud rounded-xl border border-mist p-6">
              <h3 className="text-lg font-heading font-semibold text-zambia-green">Membership Application Form</h3>
              <p className="text-slate mt-2 text-sm">
                Download, complete, and return your application via email at info@zanc.org or mail to our PO Box address.
              </p>
              <div className="mt-4">
                <a href="/forms/membership-application.pdf" download className="inline-block">
                  <Button variant="outline">Download Membership PDF</Button>
                </a>
              </div>
            </div>

            <div className="bg-cloud rounded-xl border border-mist p-6">
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
