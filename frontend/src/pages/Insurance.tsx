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
              <div className="mb-4 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                <span className="font-semibold">Open Enrollment:</span> June 1 – July 31 each year. Contact ZANC to enroll.
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                ZANC partners with <span className="font-semibold">Hartford Insurance</span> to offer a cultural Group Life Insurance
                program for our community members. The program currently supports 68 insured members (51 adults and 17 children)
                across California, Arizona, Nevada, Illinois, Indiana, New York, and Connecticut.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                <li>Provider: Hartford Insurance (cultural Group Life Insurance program)</li>
                <li>Coverage for members and dependents across multiple states</li>
                <li>Special tiers for elders aged 65–70 and 70+</li>
                <li>Premiums collected bi-annually in February and August</li>
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
                        {opt.label}{opt.price ? ` — ${opt.price}` : ''}
                      </option>
                    ))}
                  </select>
                  {(() => {
                    const selected = options.find((o) => o.url === selectedUrl);
                    return (
                      <div className="flex flex-wrap items-center gap-3">
                        {selected?.price && <span className="text-lg font-semibold text-primary-800">{selected.price}</span>}
                        <a href={selectedUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
                          <Button variant="primary">Pay with Stripe</Button>
                        </a>
                      </div>
                    );
                  })()}
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
