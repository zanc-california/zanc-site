import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import ContactForm, { ZANC_CONTACT_EMAIL } from '../components/ContactForm';

const GetInvolved = () => {
  return (
    <div>
      <PageHeader title="Get Involved" />

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-4 font-heading">
              Membership, insurance, and ways to plug in
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The fastest way to get involved with ZANC is to join as a member, review the group life
              insurance program if it fits your household, and contact the team if you want to volunteer
              or partner with us.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-lg border border-primary-200 bg-primary-50 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-primary-800 mb-3 font-heading">Join ZANC</h3>
              <p className="text-gray-700 mb-5">
                Membership connects you to events, elections, updates, and the broader ZANC community.
              </p>
              <Link to="/membership">
                <Button variant="primary" className="w-full">View Membership Options</Button>
              </Link>
            </div>

            <div className="rounded-lg border border-mist bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-primary-800 mb-3 font-heading">Group Life Insurance</h3>
              <p className="text-gray-700 mb-5">
                Review eligibility, rates, payment methods, and current enrollment guidance on the insurance page.
              </p>
              <Link to="/insurance">
                <Button variant="outline" className="w-full">Review Insurance Details</Button>
              </Link>
            </div>

            <div className="rounded-lg border border-mist bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-primary-800 mb-3 font-heading">Volunteer or Partner</h3>
              <p className="text-gray-700 mb-5">
                If you want to volunteer, sponsor a program, or support an event, email the team directly.
              </p>
              <a href={`mailto:${ZANC_CONTACT_EMAIL}`} className="block">
                <Button variant="accent" className="w-full">Email ZANC</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-6 font-heading">Forms & Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg border border-mist bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-primary-800 mb-2">Membership Intake Form</h3>
              <p className="text-gray-700 mb-4">
                Download the membership intake form, complete it, and return it by email to{' '}
                <a href={`mailto:${ZANC_CONTACT_EMAIL}`} className="text-bay-blue hover:underline">
                  {ZANC_CONTACT_EMAIL}
                </a>
                .
              </p>
              <a
                href="/forms/zanc-membership-intake-form.pdf"
                download="zanc-membership-intake-form.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">Download Membership Form</Button>
              </a>
            </div>

            <div className="rounded-lg border border-mist bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-primary-800 mb-2">Insurance Application PDF</h3>
              <p className="text-gray-700 mb-4">
                The insurance PDF is still being finalized. Contact ZANC directly and we&apos;ll share the current application steps.
              </p>
              <Button variant="outline" disabled className="!cursor-not-allowed">
                Insurance PDF Coming Soon
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-4 font-heading">Contact ZANC</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Questions about joining, volunteering, community programming, or insurance can all be routed through the ZANC email inbox.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-primary-800">Email</h3>
                  <p className="text-gray-700">
                    <a href={`mailto:${ZANC_CONTACT_EMAIL}`} className="text-bay-blue hover:underline">
                      {ZANC_CONTACT_EMAIL}
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-primary-800">Phone</h3>
                  <p className="text-gray-700">Available by request via email</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-mist bg-gray-50 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-primary-800 mb-4 font-heading">Contact us by email</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolved;
