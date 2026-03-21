import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import ApplicationFlow from '../components/ApplicationFlow';
import ContactForm, { ZANC_CONTACT_EMAIL } from '../components/ContactForm';

const GetInvolved = () => {
  const [showApplicationFlow, setShowApplicationFlow] = useState(false);

  if (showApplicationFlow) {
    return <ApplicationFlow />;
  }

  return (
    <div>
      <PageHeader title="Get Involved" />
      
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-6 font-heading">Membership & Insurance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Becoming a member of ZANC connects you with fellow Zambians in California and gives you access to our 
                network, resources, and events. We also offer group life insurance plans for our community members.
              </p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary-800 mb-3">Membership Benefits:</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Invitations to exclusive cultural and networking events</li>
                  <li>Regular updates on community news and activities</li>
                  <li>Opportunities to participate in community service projects</li>
                  <li>Access to mentorship and professional development resources</li>
                  <li>Voting rights in organizational elections</li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-primary-800 mb-3">Group Life Insurance:</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Affordable group rates for community members</li>
                  <li>Coverage for individuals and dependents</li>
                  <li>Special rates for elders (65+ years)</li>
                  <li>Easy application process</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <Button 
                  variant="primary"
                  onClick={() => setShowApplicationFlow(true)}
                >
                  Join ZANC
                </Button>
              </div>
            </div>
            
            <div className="rounded-lg border border-primary-200 bg-primary-50 p-6 ui-card-motion motion-safe:hover:border-primary-300 motion-safe:hover:shadow-md">
              <h3 className="text-xl font-semibold text-primary-800 mb-4 font-heading">Quick Start</h3>
              <p className="text-gray-700 mb-4">
                Ready to join ZANC or get group life insurance? Our streamlined application process guides you through:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700 mb-6">
                <li>Select membership and/or insurance options</li>
                <li>Complete the application forms</li>
                <li>Make payment securely through Stripe</li>
                <li>Receive confirmation and PDFs via email</li>
              </ol>
              <Button 
                variant="outline"
                onClick={() => setShowApplicationFlow(true)}
                className="w-full"
              >
                Start Application
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-6 font-heading">Forms</h2>
          <p className="text-gray-700 mb-6 max-w-3xl">
            Download the following forms for various ZANC programs and activities. Complete the required forms and submit 
            them according to the instructions provided in each document.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a 
              href="/forms/SAMPLE%20DOWNLOAD%20FORM.pdf" 
              className="flex items-center rounded-md border border-gray-200 bg-white p-4 ui-card-motion ui-card-motion-hover ui-card-motion-active"
              download
            >
              <div>
                <h3 className="font-medium text-primary-800">Membership Form</h3>
                <p className="text-sm text-gray-500">PDF, 2 pages, 0.5MB</p>
              </div>
            </a>
            
            <a 
              href="#" 
              className="flex items-center rounded-md border border-gray-200 bg-white p-4 ui-card-motion ui-card-motion-hover ui-card-motion-active"
              onClick={(e) => {
                e.preventDefault(); 
                alert('This would download the scholarship application PDF in a real implementation');
              }}
            >
              <div>
                <h3 className="font-medium text-primary-800">Scholarship Application</h3>
                <p className="text-sm text-gray-500">PDF, 4 pages, 0.8MB</p>
              </div>
            </a>
            
            <a 
              href="#" 
              className="flex items-center rounded-md border border-gray-200 bg-white p-4 ui-card-motion ui-card-motion-hover ui-card-motion-active"
              onClick={(e) => {
                e.preventDefault(); 
                alert('This would download the volunteer registration PDF in a real implementation');
              }}
            >
              <div>
                <h3 className="font-medium text-primary-800">Volunteer Registration</h3>
                <p className="text-sm text-gray-500">PDF, 1 page, 0.3MB</p>
              </div>
            </a>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-6 font-heading">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Have questions about ZANC or want to get involved? Email us using the address below — we&apos;ll get back to you.
              </p>
              
              <div className="space-y-4 mb-6">
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
                  <p className="text-gray-700">To be announced</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-primary-800">Address</h3>
                  <p className="text-gray-700">123 Zambian Lane<br />San Francisco, CA 94103</p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-500 hover:text-primary-800 transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-500 hover:text-primary-800 transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
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

export default GetInvolved;