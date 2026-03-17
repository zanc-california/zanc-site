import { useState } from 'react';
import { Link } from 'react-router-dom';
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
      <PageHeader title="Membership" />
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-6 font-heading">Join ZANC</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Becoming a member of ZANC connects you with fellow Zambians in California and gives you access to our
                network, resources, and events.
              </p>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary-800 mb-2 font-heading">Membership Rates</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm md:text-base">
                  <li>
                    <span className="font-semibold">Sacramento / Bay Area residents:</span> $10/month
                  </li>
                  <li>
                    <span className="font-semibold">Out of town / Out of state members:</span> $5/month
                  </li>
                  <li>Billing options: Monthly or Yearly subscription.</li>
                </ul>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                <li>Invitations to exclusive cultural and networking events</li>
                <li>Regular updates on community news and activities</li>
                <li>Opportunities to participate in community service projects</li>
                <li>Access to mentorship and professional development resources</li>
                <li>Voting rights in organizational elections</li>
              </ul>

              {hasOptions ? (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-gray-700">Choose your billing</p>
                  <div className="flex flex-wrap gap-3">
                    {yearlyLink && (
                      <button
                        type="button"
                        onClick={() => setBilling('yearly')}
                        className={`px-4 py-2 rounded-md border-2 font-medium transition-colors text-left ${
                          billing === 'yearly'
                            ? 'border-primary-600 bg-primary-50 text-primary-800'
                            : 'border-gray-300 text-gray-700 hover:border-primary-400'
                        }`}
                      >
                        <span className="block">Yearly</span>
                        {prices.yearly && <span className="block text-sm font-semibold text-primary-700">{prices.yearly}</span>}
                      </button>
                    )}
                    {monthlyLink && (
                      <button
                        type="button"
                        onClick={() => setBilling('monthly')}
                        className={`px-4 py-2 rounded-md border-2 font-medium transition-colors text-left ${
                          billing === 'monthly'
                            ? 'border-primary-600 bg-primary-50 text-primary-800'
                            : 'border-gray-300 text-gray-700 hover:border-primary-400'
                        }`}
                      >
                        <span className="block">Monthly</span>
                        {prices.monthly && <span className="block text-sm font-semibold text-primary-700">{prices.monthly}</span>}
                      </button>
                    )}
                  </div>
                  <a href={paymentLink} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button variant="primary">
                      {billing === 'monthly'
                        ? 'Join ZANC — $10/month or $5/month (out of state)'
                        : 'Join ZANC — $120/year or $60/year (out of state)'}
                    </Button>
                  </a>
                </div>
              ) : (
                <p className="text-amber-700 text-sm">Membership payment links are not configured. Add VITE_STRIPE_MEMBERSHIP_MONTHLY and VITE_STRIPE_MEMBERSHIP_YEARLY in Vercel and .env.local.</p>
              )}
            </div>
            <div className="bg-primary-50 p-6 rounded-lg border border-primary-200">
              <h3 className="text-xl font-semibold text-primary-800 mb-4 font-heading">Forms</h3>
              <p className="text-gray-700 mb-4">
                Download the membership application form, complete it, and submit per the instructions. Payment can be made via the button above.
              </p>
              <Link to="/forms">
                <Button variant="outline" className="w-full">Download Membership Form</Button>
              </Link>
            </div>
          </div>
          <p className="mt-6 text-sm text-gray-700 max-w-3xl">
            Membership subscription is mandatory for all Group Insurance subscribers. We highly encourage all community members to 
            subscribe to help cover community needs and sponsor events.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Membership;
