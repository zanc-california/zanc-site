import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { getInsuranceOptions } from '../lib/stripe';

const Insurance = () => {
  const options = getInsuranceOptions();
  const [selectedUrl, setSelectedUrl] = useState<string>(options[0]?.url ?? '');

  return (
    <div>
      <PageHeader title="Group Life Insurance" />
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-6 font-heading">Group Life Insurance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                ZANC offers affordable group life insurance plans for our community members. Select your category (age range, in-state or out-of-state, with or without dependents) and complete payment securely with Stripe.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                <li>Affordable group rates for community members</li>
                <li>Coverage for individuals and dependents</li>
                <li>Special rates for elders (65+ years)</li>
                <li>Easy application process</li>
              </ul>

              {options.length > 0 ? (
                <div className="space-y-4">
                  <label htmlFor="insurance-tier" className="block text-sm font-medium text-gray-700">
                    Select your category
                  </label>
                  <select
                    id="insurance-tier"
                    value={selectedUrl}
                    onChange={(e) => setSelectedUrl(e.target.value)}
                    className="w-full max-w-md px-4 py-2.5 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 text-gray-900"
                  >
                    {options.map((opt) => (
                      <option key={opt.url} value={opt.url}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <a href={selectedUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button variant="primary">Pay with Stripe</Button>
                  </a>
                </div>
              ) : (
                <p className="text-amber-700 text-sm">Insurance payment links are not configured. Add VITE_STRIPE_INSURANCE_* vars in Vercel and .env.local.</p>
              )}
            </div>
            <div className="bg-primary-50 p-6 rounded-lg border border-primary-200">
              <h3 className="text-xl font-semibold text-primary-800 mb-4 font-heading">Forms</h3>
              <p className="text-gray-700 mb-4">
                Download the insurance application form, complete it, and submit per the instructions. Payment can be made via the button above.
              </p>
              <Link to="/forms">
                <Button variant="outline" className="w-full">Download Insurance Form</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Insurance;
