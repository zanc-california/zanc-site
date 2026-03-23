import React from 'react';
import PageHeader from '../components/PageHeader';
import ContactForm, { ZANC_CONTACT_EMAIL } from '../components/ContactForm';

const ContactPage = () => {
  return (
    <div>
      <PageHeader title="Contact Us" />
      
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            
            <div className="rounded-lg border border-mist bg-gray-50 p-6 shadow-sm ui-card-motion motion-safe:hover:border-zambia-green/15 motion-safe:hover:shadow-md">
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
