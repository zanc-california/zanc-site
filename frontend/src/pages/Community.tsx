import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import CommunityVoiceQuotes from '../components/CommunityVoiceQuotes';
import { ZANC_CONTACT_EMAIL } from '../components/ContactForm';
import { supabase } from '../lib/supabase';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const LINK360_URL = 'https://link360.vercel.app/';

/** Placeholder until a stable Zoom (or other) link is published — opens email to request the link. */
const joinNextSessionMailto = `mailto:${ZANC_CONTACT_EMAIL}?subject=${encodeURIComponent('Join next Community Conversations session')}&body=${encodeURIComponent('Please send me the link or details for the next open Zoom session.\n\nThank you!')}`;

const submitOpportunityMailto = `mailto:${ZANC_CONTACT_EMAIL}?subject=${encodeURIComponent('Opportunity submission for ZANC community board')}&body=${encodeURIComponent('Title:\nCategory (Jobs / Housing / Scholarships / Business Opportunities / Other):\nShort description:\nLink (optional):\nContact:\n')}`;

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

const OPPORTUNITY_CATEGORY_LABELS = ['Jobs', 'Housing', 'Scholarships', 'Business Opportunities'] as const;

export default function Community() {
  useDocumentMeta({
    title: 'Community Board',
    description:
      'The ZANC community board — jobs, housing, scholarships, and business opportunities shared by members, plus a place to suggest events and ideas.',
    path: '/community',
  });

  const categories: SuggestionCategory[] = useMemo(
    () => ['Event Idea', 'Community Service', 'Partnership', 'General Feedback'],
    []
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<SuggestionCategory>('Event Idea');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'ok' | 'err';
    text: string;
  } | null>(null);

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
    setSubmitStatus(null);
    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          category,
          message,
          website,
        }),
      });

      const data = (await response.json()) as { success?: boolean; message?: string };
      if (response.ok && data.success) {
        setSubmitStatus({
          type: 'ok',
          text: data.message ?? 'Thanks! Your suggestion has been received.',
        });
        setName('');
        setEmail('');
        setCategory('Event Idea');
        setMessage('');
        setWebsite('');
      } else {
        setSubmitStatus({
          type: 'err',
          text: data.message ?? 'We could not submit your suggestion right now.',
        });
      }
    } catch {
      setSubmitStatus({
        type: 'err',
        text: 'We could not submit your suggestion right now. Please email zancsac@gmail.com.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader title="Community" />

      <section className="py-12 md:py-16 bg-fog">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-heading uppercase tracking-[0.12em] text-redwood">Your community, your voice</p>
              <h2 className="mt-3 text-3xl font-heading font-semibold text-zambia-green">Good things begin with a conversation.</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-slate-600">Meet others, share an opportunity, or help shape what comes next. There’s more than one way to be part of ZANC.</p>
              <nav aria-label="Community quick links" className="mt-5 flex flex-wrap gap-3">
                {[
                  { href: '#community-conversations', label: 'Conversations' },
                  { href: '#opportunities', label: 'Opportunities' },
                  { href: '#share-an-idea', label: 'Share an idea' },
                ].map((item) => <a key={item.href} href={item.href} className="inline-flex min-h-11 items-center rounded-full border border-zambia-green/25 bg-white px-4 py-2 text-sm font-medium text-zambia-green hover:bg-copper-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-zambia-green">{item.label} <span className="ml-2" aria-hidden="true">↓</span></a>)}
              </nav>
            </div>
            <figure className="overflow-hidden rounded-xl border border-mist bg-white">
              <img src="/images/community/gathering-640.webp" alt="Community friends gathered together in a living room" width={640} height={480} className="aspect-[4/3] w-full object-cover" />
              <figcaption className="px-4 py-3 text-sm text-slate-600">Familiar faces, shared stories, new connections.</figcaption>
            </figure>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div id="share-an-idea" className="scroll-mt-28 lg:col-span-2 bg-white rounded-xl border border-mist p-6 shadow-sm">
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
                <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="suggestion-website">Leave this field empty</label>
                  <input
                    id="suggestion-website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button
                  variant="accent"
                  onClick={submitSuggestion}
                  disabled={submitting || !name || !email || !message}
                >
                  {submitting ? 'Submitting…' : 'Submit Suggestion'}
                </Button>
                {submitStatus && (
                  <span className={`text-sm font-medium ${submitStatus.type === 'ok' ? 'text-zambia-green' : 'text-redwood'}`}>
                    {submitStatus.text}
                  </span>
                )}
                {!submitStatus && (
                  <span className="text-xs text-slate">
                    We only use this to follow up on your suggestion.
                  </span>
                )}
              </div>
            </div>

            <aside className="self-start rounded-xl border border-dashed border-mist bg-cloud p-6">
              <h2 className="text-xl font-heading font-semibold text-zambia-green">Community Exchange</h2>
              <div className="mt-3 rounded-lg border border-mist bg-copper-glow/40 p-4">
                <p className="font-heading font-semibold text-redwood">Coming Soon</p>
                <p className="text-sm text-slate mt-1">
                  A planned marketplace for members to list services, sell goods, and connect professionally. Listings are not available yet.
                </p>
                <p className="text-sm text-slate mt-3 font-medium text-zambia-green">
                  Only active ZANC members will be able to list items and services.
                </p>
                <div className="mt-4">
                  <Link to="/membership" className="text-sm font-medium text-zambia-green underline underline-offset-4">Explore membership</Link>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-10">
            <CommunityVoiceQuotes />
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              id="community-conversations"
              className="rounded-xl border border-mist bg-white p-6 shadow-sm scroll-mt-24"
            >
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-heading font-semibold text-zambia-green">Community Conversations</h2>
                <span className="text-[10px] font-heading uppercase tracking-[0.12em] text-copper bg-copper-glow px-2 py-1 rounded border border-mist">
                  Recurring
                </span>
              </div>
              <p className="text-slate mt-3 text-sm leading-relaxed">
                Join our recurring open Zoom sessions to share ideas, discuss opportunities, and connect with fellow community members.
              </p>
              <p className="text-xs text-slate mt-2">
                Meeting links are shared before each session — use the button below to request the next link by email.
              </p>
              <div className="mt-5">
                <a href={joinNextSessionMailto} className="inline-block">
                  <Button variant="accent">Join Next Session</Button>
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-mist bg-white p-6 shadow-sm">
              <h2 className="text-xl font-heading font-semibold text-zambia-green">Shipping to Zambia?</h2>
              <p className="text-slate mt-3 text-sm leading-relaxed">
                Coordinate pooled container shipping with fellow community members and reduce costs.
              </p>
              <div className="mt-5">
                <a href={LINK360_URL} target="_blank" rel="noopener noreferrer" className="inline-block">
                  <Button variant="primary">Start Shipping</Button>
                </a>
              </div>
            </div>
          </div>

          <div id="opportunities" className="mt-10 scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-heading font-semibold text-zambia-green">Opportunities</h2>
                <p className="text-slate mt-1">Jobs, scholarships, housing, and more shared with the community.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {OPPORTUNITY_CATEGORY_LABELS.map((label) => (
                    <span
                      key={label}
                      className="text-xs font-heading uppercase tracking-[0.06em] text-slate bg-cloud px-2.5 py-1 rounded-full border border-mist"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <a href={submitOpportunityMailto} className="inline-block shrink-0">
                <Button variant="outline">Submit an Opportunity</Button>
              </a>
            </div>

            {loadingOpps ? (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-28 rounded-xl border border-mist bg-cloud animate-pulse" />
                ))}
              </div>
            ) : opportunities.length === 0 ? (
              <div className="mt-4 rounded-xl border border-mist bg-white p-6 text-slate">
                No opportunities posted yet. Check back soon — or submit one for the team to review.
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
