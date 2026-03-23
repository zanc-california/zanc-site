import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { getInsuranceOptions } from '../lib/stripe';

const Insurance = () => {
  const nextPremiumDue =
    (import.meta.env.VITE_INSURANCE_NEXT_DUE as string | undefined)?.trim() || 'January 25, 2026';
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Top-left: overview */}
            <div className="bg-white rounded-xl border border-mist p-6 shadow-sm h-full">
              <div className={`rounded-md border px-4 py-3 text-sm ${isEnrollmentOpen ? 'border-copper/40 bg-copper-glow text-redwood' : 'border-mist bg-cloud text-slate'}`}>
                <span className="font-semibold">Open Enrollment:</span> June 1 – July 31 each year.{' '}
                {isEnrollmentOpen ? <span className="font-semibold">Enrollment is open.</span> : <span>Enrollment is currently closed.</span>}{' '}
                Contact ZANC to enroll.
              </div>

              <p className="text-gray-700 leading-relaxed mt-5">
                ZANC partners with <span className="font-semibold">Hartford Insurance</span> to offer a cultural Group Life Insurance
                program for our community members. The program currently supports 68 insured members (51 adults and 17 children)
                across California, Arizona, Nevada, Illinois, Indiana, New York, and Connecticut.
              </p>

              <ul className="list-disc pl-5 space-y-2 text-gray-700 mt-5">
                <li>Provider: Hartford Insurance (cultural Group Life Insurance program)</li>
                <li>Coverage for members and dependents across multiple states</li>
                <li>Special tiers for elders aged 65–70 and 70+</li>
                <li>
                  <span className="font-semibold">Semi-annual premiums</span> — due dates are announced to insured members each
                  collection period. Confirm the current due date with the insurance team.
                </li>
              </ul>
            </div>

            {/* Top-right: application + FAQ */}
            <div className="bg-cloud p-6 rounded-xl border border-mist h-full">
              <h3 className="text-xl font-heading font-semibold text-zambia-green mb-3">Insurance Application Form</h3>
              <p className="text-slate text-sm mb-4">
                The downloadable PDF is being finalized. For now, contact ZANC directly and we&apos;ll guide you through the current application process via email at{' '}
                <a href="mailto:zancsac@gmail.com" className="text-bay-blue font-medium hover:underline">
                  zancsac@gmail.com
                </a>{' '}
                or mail to our PO Box address.
              </p>
              <div className="inline-flex w-full items-center gap-3">
                <Button variant="outline" className="w-full !cursor-not-allowed" disabled>
                  Insurance PDF Coming Soon
                </Button>
                <span className="shrink-0 rounded-full border border-copper/30 bg-copper-glow px-3 py-1 text-xs font-heading uppercase tracking-[0.08em] text-redwood">
                  Coming soon
                </span>
              </div>
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
                  <summary className="cursor-pointer font-medium text-slate">How do I pay premiums?</summary>
                  <p className="mt-2 text-sm text-slate">
                    Premiums are collected semi-annually. You can pay by Zelle, direct deposit to ZANC&apos;s Wells Fargo account,
                    Venmo, or Stripe where a payment link is available below. Send a copy of your deposit or transfer receipt to
                    the number on file. For payment questions, email{' '}
                    <a href="mailto:zancsac@gmail.com" className="text-bay-blue hover:underline">
                      zancsac@gmail.com
                    </a>
                    .
                  </p>
                </details>
              </div>
            </div>

            {/* Premium reminder + rates + payments — full width */}
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-xl border border-copper/40 bg-copper-glow/80 px-4 py-4 md:px-6 md:py-5">
                <p className="font-heading font-semibold text-redwood">Group life insurance — premium reminder</p>
                <p className="text-sm text-redwood/90 mt-2">
                  <span className="font-semibold">Next published due date:</span> {nextPremiumDue}. Due dates can vary by
                  period — always confirm with the insurance team before paying.
                </p>
                <p className="text-sm text-redwood mt-2 font-medium">
                  Please note: any insured member with an unpaid premium may be dropped from coverage.
                </p>
              </div>

              <div className="rounded-xl border border-mist overflow-hidden bg-white shadow-sm">
                <div className="bg-cloud px-4 py-3 border-b border-mist">
                  <p className="font-heading font-semibold text-zambia-green">Semi-annual premium rates (18–64)</p>
                  <p className="text-xs text-slate mt-1">
                    Figures below match recent member communications. Rates and benefits are subject to change — verify with the team.
                  </p>
                </div>
                <div className="p-4 md:p-6 grid gap-8 md:grid-cols-2">
                  <div>
                    <h4 className="font-heading font-semibold text-zambia-green mb-3 text-sm uppercase tracking-wide">
                      Sacramento (in-area) members
                    </h4>
                    <div className="overflow-x-auto rounded-lg border border-mist">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-cloud text-slate text-xs uppercase tracking-wide">
                          <tr>
                            <th className="px-3 py-2 font-semibold">Plan</th>
                            <th className="px-3 py-2 font-semibold">Premium + fee</th>
                            <th className="px-3 py-2 font-semibold">Total</th>
                            <th className="px-3 py-2 font-semibold">Benefit</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-mist text-slate">
                          <tr>
                            <td className="px-3 py-2">Adults</td>
                            <td className="px-3 py-2">$130.80 + $60 membership</td>
                            <td className="px-3 py-2 font-medium text-zambia-green">$190.80</td>
                            <td className="px-3 py-2">$20,000</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2">With dependents</td>
                            <td className="px-3 py-2">$134.40 + $60</td>
                            <td className="px-3 py-2 font-medium text-zambia-green">$194.40</td>
                            <td className="px-3 py-2">—</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-zambia-green mb-3 text-sm uppercase tracking-wide">
                      Out-of-Sacramento / Northern California
                    </h4>
                    <div className="overflow-x-auto rounded-lg border border-mist">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-cloud text-slate text-xs uppercase tracking-wide">
                          <tr>
                            <th className="px-3 py-2 font-semibold">Plan</th>
                            <th className="px-3 py-2 font-semibold">Premium + fee</th>
                            <th className="px-3 py-2 font-semibold">Total</th>
                            <th className="px-3 py-2 font-semibold">Benefit</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-mist text-slate">
                          <tr>
                            <td className="px-3 py-2">Adults</td>
                            <td className="px-3 py-2">$130.80 + $30 processing</td>
                            <td className="px-3 py-2 font-medium text-zambia-green">$160.80</td>
                            <td className="px-3 py-2">$20,000</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2">With dependents</td>
                            <td className="px-3 py-2">$134.40 + $30</td>
                            <td className="px-3 py-2 font-medium text-zambia-green">$164.40</td>
                            <td className="px-3 py-2">—</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-mist bg-white shadow-sm p-4 md:p-6">
                <h3 className="font-heading font-semibold text-zambia-green mb-3">Special rates (ages 65+)</h3>
                <p className="text-sm text-slate mb-4">
                  <span className="font-semibold">Note:</span> In-Sacramento and out-of-Sacramento / Northern California membership
                  or processing fees <span className="font-semibold">do not</span> apply to these tiers.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-mist bg-cloud/50 p-4">
                    <p className="text-xs font-heading uppercase tracking-wide text-slate">Ages 65 – 70</p>
                    <p className="text-2xl font-heading font-bold text-copper mt-1">$65.40</p>
                    <p className="text-sm text-slate mt-1">Benefit: $10,000</p>
                  </div>
                  <div className="rounded-lg border border-mist bg-cloud/50 p-4">
                    <p className="text-xs font-heading uppercase tracking-wide text-slate">Ages 70 and above</p>
                    <p className="text-2xl font-heading font-bold text-copper mt-1">$13.08</p>
                    <p className="text-sm text-slate mt-1">Benefit: $2,000</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-mist bg-white shadow-sm p-4 md:p-6">
                <h3 className="font-heading font-semibold text-zambia-green mb-4">How to pay (Zelle, bank, Venmo)</h3>
                <ul className="space-y-3 text-sm text-slate">
                  <li>
                    <span className="font-semibold text-zambia-green">Zelle:</span> Send to{' '}
                    <a href="mailto:zancsac@gmail.com" className="text-bay-blue hover:underline">
                      zancsac@gmail.com
                    </a>
                  </li>
                  <li>
                    <span className="font-semibold text-zambia-green">Direct deposit (Wells Fargo — ZANC):</span> Account #{' '}
                    <span className="font-mono bg-cloud px-1.5 py-0.5 rounded">7185547853</span>
                  </li>
                  <li>
                    <span className="font-semibold text-zambia-green">Venmo:</span>{' '}
                    <span className="font-medium">@Zanc-Sacramento</span>
                  </li>
                  <li>
                    <span className="font-semibold text-zambia-green">Receipt:</span> Send a copy of your deposit or transfer receipt
                    to{' '}
                    <a href="tel:+17145929143" className="text-bay-blue hover:underline">
                      (714) 592-9143
                    </a>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-mist">
                  <p className="text-sm font-heading font-semibold text-zambia-green mb-2">Payment questions</p>
                  <ul className="text-sm text-slate space-y-2">
                    <li>
                      <span className="font-medium text-zambia-green">Email:</span>{' '}
                      <a href="mailto:zancsac@gmail.com" className="text-bay-blue hover:underline">
                        zancsac@gmail.com
                      </a>
                    </li>
                    <li>
                      <span className="font-medium text-zambia-green">Phone:</span> To be announced
                    </li>
                  </ul>
                </div>
              </div>

              {/* Stripe */}
              {options.length > 0 ? (
                <div className="rounded-xl border border-mist overflow-hidden bg-white shadow-sm">
                  <div className="bg-cloud px-4 py-3 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                    <div>
                      <p className="font-heading font-semibold text-zambia-green">Pay online (Stripe)</p>
                      <p className="text-xs text-slate">Select your category and pay securely via Stripe where configured.</p>
                    </div>
                    <div className="flex gap-2">
                      <a href="/contact" className="inline-block">
                        <Button variant="outline" size="sm">Need help?</Button>
                      </a>
                      <a href="/news?calendar=1" className="inline-block">
                        <Button variant="primary" size="sm">Review calendar</Button>
                      </a>
                    </div>
                  </div>
                  <div className="divide-y divide-mist">
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
                <p className="text-amber-700 text-sm rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                  Online card checkout is temporarily disabled while live payment links are being updated. You can still pay via
                  Zelle, bank, or Venmo above.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Insurance;
