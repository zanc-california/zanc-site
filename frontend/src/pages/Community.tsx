import { useEffect, useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import { supabase } from '../lib/supabase';

type SuggestionCategory = 'Event Idea' | 'Community Service' | 'Partnership' | 'General Feedback';

type Opportunity = {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string | null;
  link: string | null;
  posted_by: string | null;
  created_at: string;
};

export default function Community() {
  const categories: SuggestionCategory[] = useMemo(
    () => ['Event Idea', 'Community Service', 'Partnership', 'General Feedback'],
    []
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<SuggestionCategory>('Event Idea');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loadingOpps, setLoadingOpps] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from('opportunities')
          .select('id, title, category, description, location, link, posted_by, created_at')
          .eq('active', true)
          .order('created_at', { ascending: false });

        if (error) {
          setOpportunities([]);
        } else {
          setOpportunities((data as Opportunity[]) ?? []);
        }
      } catch {
        setOpportunities([]);
      } finally {
        setLoadingOpps(false);
      }
    };
    load();
  }, []);

  const submitSuggestion = async () => {
    setSubmitting(true);
    setSubmitted(false);
    try {
      const { error } = await supabase.from('suggestions').insert([
        {
          name,
          email,
          category,
          message,
        },
      ]);
      if (!error) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setCategory('Event Idea');
        setMessage('');
      }
    } catch {
      // fail silently
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader title="Community" />

      <section className="py-12 md:py-16 bg-fog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl border border-mist p-6 shadow-sm">
              <h2 className="text-2xl font-heading font-semibold text-zambia-green">Have a suggestion for the community?</h2>
              <p className="text-slate mt-2">
                We want to hear from you. Share ideas for events, initiatives, or ways we can better serve our community.
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate mb-1" htmlFor="suggestion-name">Your Name</label>
                  <input
                    id="suggestion-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-mist bg-white focus:outline-none focus:ring-2 focus:ring-bay-blue"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate mb-1" htmlFor="suggestion-email">Your Email</label>
                  <input
                    id="suggestion-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-mist bg-white focus:outline-none focus:ring-2 focus:ring-bay-blue"
                    placeholder="email@example.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate mb-1" htmlFor="suggestion-category">Category</label>
                  <select
                    id="suggestion-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as SuggestionCategory)}
                    className="w-full px-3 py-2 rounded-md border border-mist bg-white focus:outline-none focus:ring-2 focus:ring-bay-blue"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate mb-1" htmlFor="suggestion-message">Your suggestion</label>
                  <textarea
                    id="suggestion-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-mist bg-white focus:outline-none focus:ring-2 focus:ring-bay-blue min-h-32"
                    placeholder="Share your suggestion..."
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <Button
                  variant="accent"
                  onClick={submitSuggestion}
                  disabled={submitting || !name || !email || !message}
                >
                  {submitting ? 'Submitting…' : 'Submit Suggestion'}
                </Button>
                {submitted && <span className="text-sm text-zambia-green font-medium">Thanks! Your suggestion has been received.</span>}
                {!submitted && (
                  <span className="text-xs text-slate">
                    We only use this to follow up on your suggestion.
                  </span>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-mist p-6 shadow-sm">
              <h2 className="text-xl font-heading font-semibold text-zambia-green">Community Exchange</h2>
              <div className="mt-3 rounded-lg border border-mist bg-copper-glow/40 p-4">
                <p className="font-heading font-semibold text-redwood">Coming Soon</p>
                <p className="text-sm text-slate mt-1">
                  A marketplace for members to list services, sell goods, and connect professionally.
                </p>
                <div className="mt-4">
                  <Button variant="outline">Join ZANC to unlock later</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-heading font-semibold text-zambia-green">Opportunities</h2>
                <p className="text-slate mt-1">Jobs, scholarships, housing, and more shared with the community.</p>
              </div>
            </div>

            {loadingOpps ? (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-28 rounded-xl border border-mist bg-cloud animate-pulse" />
                ))}
              </div>
            ) : opportunities.length === 0 ? (
              <div className="mt-4 rounded-xl border border-mist bg-white p-6 text-slate">
                No opportunities yet. Check back soon!
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                {opportunities.map((o) => (
                  <div key={o.id} className="rounded-xl border border-mist bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-heading font-semibold text-zambia-green">{o.title}</h3>
                      <span className="text-xs font-heading uppercase tracking-[0.08em] text-copper bg-copper-glow px-2 py-1 rounded border border-mist">
                        {o.category}
                      </span>
                    </div>
                    {o.location && <p className="text-xs text-slate mt-1">{o.location}</p>}
                    <p className="text-slate mt-3 text-sm leading-relaxed">{o.description}</p>
                    {o.link && (
                      <div className="mt-4">
                        <a href={o.link} target="_blank" rel="noopener noreferrer" className="text-bay-blue font-medium hover:underline">
                          View →
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

