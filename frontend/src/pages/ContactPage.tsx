import { Link } from 'react-router-dom';
import { Users, HandHeart, Handshake } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ContactForm, { ZANC_CONTACT_EMAIL } from '../components/ContactForm';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const ContactPage = () => {
  useDocumentMeta({
    title: 'Contact ZANC',
    description:
      'Get in touch with the Zambian Association in Northern California about membership, events, insurance, volunteering, or partnerships.',
    path: '/contact',
  });

  return (
    <div>
      <PageHeader title="Contact Us" />
      
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Ways to connect" className="mb-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Users, title: 'Become a member', text: 'Find the right membership option.', to: '/membership' },
              { icon: HandHeart, title: 'Lend a hand', text: 'Explore ways to get involved.', to: '/get-involved' },
              { icon: Handshake, title: 'Start a partnership', text: 'Tell us what you have in mind.', to: '#contact-message' },
            ].map(({ icon: Icon, title, text, to }) => {
              const content = <><Icon size={24} className="mb-3 text-zambia-green" aria-hidden="true" /><span className="block font-heading font-semibold text-zambia-green">{title} <span aria-hidden="true">→</span></span><span className="mt-1 block text-sm text-slate-600">{text}</span></>;
              const className = 'rounded-xl border border-mist bg-cloud p-5 hover:border-zambia-green/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-zambia-green';
              return to.startsWith('#') ? <a key={to} href={to} className={className}>{content}</a> : <Link key={to} to={to} className={className}>{content}</Link>;
            })}
          </nav>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-6 font-heading">Get in Touch</h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                We're always happy to hear from members of our community. Whether you have a question about membership, 
                want to learn more about our events, or are interested in volunteering, please feel free to reach out to us.
              </p>
              
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-lg font-medium text-primary-800 mb-1">Email</h3>
                  <p className="text-gray-700">
                    <a href={`mailto:${ZANC_CONTACT_EMAIL}`} className="text-bay-blue hover:underline">
                      {ZANC_CONTACT_EMAIL}
                    </a>
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-primary-800 mb-1">Phone</h3>
                  <p className="text-gray-700">Available by request via email</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-primary-800 mb-2">Updates</h3>
                <p className="text-gray-700">
                  For announcements and new community updates, subscribe in the footer or email{' '}
                  <a href={`mailto:${ZANC_CONTACT_EMAIL}`} className="text-bay-blue hover:underline">
                    {ZANC_CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </div>
            </div>
            
            <div id="contact-message" className="scroll-mt-28 rounded-lg border border-mist bg-gray-50 p-6 shadow-sm ui-card-motion motion-safe:hover:border-zambia-green/15 motion-safe:hover:shadow-md">
              <h3 className="text-xl font-semibold text-primary-800 mb-4 font-heading">Contact us by email</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
