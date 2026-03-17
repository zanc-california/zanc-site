import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { getInsuranceOptions } from '../lib/stripe';

const Insurance = () => {
  const options = getInsuranceOptions();
  const [selectedUrl, setSelectedUrl] = useState<string>(options[0]?.url ?? '');

  const now = new Date();
  const enrollmentOpens = new Date(now.getFullYear(), 5, 1); // June 1
  const enrollmentCloses = new Date(now.getFullYear(), 6, 31, 23, 59, 59); // July 31
  const isEnrollmentOpen = now >= enrollmentOpens && now <= enrollmentCloses;

  return (
    <div>
      <PageHeader title="Group Life Insurance" />
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-6 font-heading">Group Life Insurance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <div className={`mb-4 rounded-md border px-4 py-3 text-sm ${isEnrollmentOpen ? 'border-copper/40 bg-copper-glow text-redwood' : 'border-mist bg-cloud text-slate'}`}>
                <span className="font-semibold">Open Enrollment:</span> June 1 – July 31 each year.{' '}
                {isEnrollmentOpen ? <span className="font-semibold">Enrollment is open.</span> : <span>Enrollment is currently closed.</span>}{' '}
                Contact ZANC to enroll.
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
                <div className="rounded-xl border border-mist overflow-hidden">
                  <div className="bg-cloud px-4 py-3">
                    <p className="font-heading font-semibold text-zambia-green">Rates</p>
                    <p className="text-xs text-slate">Select your category and pay securely via Stripe.</p>
                  </div>
                  <div className="divide-y divide-mist bg-white">
                    {options.map((opt) => (
                      <div key={opt.url} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-4">
                        <div className="min-w-0">
                          <p className="font-medium text-zambia-green">{opt.label}</p>
                          <p className="text-sm text-slate">{opt.price ? opt.price : 'Rate shown at checkout'}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <a href={opt.url} target="_blank" rel="noopener noreferrer" className="inline-block">
                            <Button variant="accent">Pay Now</Button>
                          </a>
                          <button
                            type="button"
                            onClick={() => setSelectedUrl(opt.url)}
                            className={`text-sm font-medium ${selectedUrl === opt.url ? 'text-copper' : 'text-bay-blue hover:underline'}`}
                          >
                            {selectedUrl === opt.url ? 'Selected' : 'Select'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-amber-700 text-sm">Insurance payment links are not configured. Add VITE_STRIPE_INSURANCE_* vars in Vercel and .env.local.</p>
              )}
            </div>
            <div className="bg-cloud p-6 rounded-xl border border-mist">
              <h3 className="text-xl font-heading font-semibold text-zambia-green mb-3">Insurance Application Form</h3>
              <p className="text-slate text-sm mb-4">
                Download, complete, and return your application via email at info@zanc.org or mail to our PO Box address.
              </p>
              <a href="/forms/insurance-application.pdf" download className="inline-block w-full">
                <Button variant="outline" className="w-full">Download Insurance PDF</Button>
              </a>
              <div className="mt-6">
                <h4 className="font-heading font-semibold text-zambia-green mb-2">FAQ</h4>
                <details className="border border-mist rounded-md p-3 bg-white mb-3">
                  <summary className="cursor-pointer font-medium text-slate">Who is eligible?</summary>
                  <p className="mt-2 text-sm text-slate">Eligibility depends on program requirements and enrollment windows. Contact ZANC for guidance.</p>
                </details>
                <details className="border border-mist rounded-md p-3 bg-white mb-3">
                  <summary className="cursor-pointer font-medium text-slate">When do I enroll?</summary>
                  <p className="mt-2 text-sm text-slate">Open enrollment runs June 1 – July 31 each year.</p>
                </details>
                <details className="border border-mist rounded-md p-3 bg-white">
                  <summary className="cursor-pointer font-medium text-slate">How are premiums collected?</summary>
                  <p className="mt-2 text-sm text-slate">Premiums are collected bi-annually in February and August.</p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Insurance;
