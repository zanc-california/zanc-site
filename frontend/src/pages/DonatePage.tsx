import React from 'react';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';

const DonatePage = () => {
  return (
    <div>
      <PageHeader title="Support Our Mission" />
      
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-4 font-heading">Make a Difference</h2>
            <p className="text-gray-700 leading-relaxed">
              Your donation supports our cultural programs, community initiatives, and educational scholarships. 
              Help us preserve Zambian heritage and strengthen our community in California.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary-800 mb-2 font-heading">One-Time Donation</h3>
              <p className="text-gray-600 mb-6">
                Support our mission with a one-time contribution of any amount.
              </p>
              <Button 
                variant="primary" 
                onClick={() => alert("This would redirect to a payment processing page in a real implementation.")}
              >
                Donate Now
              </Button>
            </div>
            
            <div className="bg-primary-50 rounded-lg p-6 text-center border border-primary-100 hover:shadow-md transition-shadow">
              <div className="inline-block bg-primary-800 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-2 font-heading">Monthly Giving</h3>
              <p className="text-gray-600 mb-6">
                Join our community of monthly donors providing ongoing support.
              </p>
              <Button 
                variant="primary" 
                onClick={() => alert("This would redirect to a payment processing page in a real implementation.")}
              >
                Give Monthly
              </Button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary-800 mb-2 font-heading">Sponsor a Program</h3>
              <p className="text-gray-600 mb-6">
                Direct your donation to a specific initiative or program.
              </p>
              <Button 
                variant="primary" 
                onClick={() => alert("This would redirect to a payment processing page in a real implementation.")}
              >
                Sponsor Now
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h3 className="text-xl font-semibold text-primary-800 mb-4 font-heading">Where Your Donation Goes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-lg font-medium text-primary-700 mb-2">Cultural Programs</h4>
                <p className="text-gray-600">
                  Support events, workshops, and activities that preserve and promote Zambian culture in California.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-primary-700 mb-2">Scholarship Fund</h4>
                <p className="text-gray-600">
                  Help Zambian students in California pursue higher education through our scholarship program.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-primary-700 mb-2">Community Outreach</h4>
                <p className="text-gray-600">
                  Fund initiatives that support vulnerable communities in Zambia, including educational and healthcare projects.
                </p>
              </div>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-primary-800 mb-4 font-heading">Other Ways to Support</h3>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-primary-700 mb-2">In-Kind Donations</h4>
              <p className="text-gray-600 mb-2">
                We accept donations of goods and services that support our programs. 
                Items we currently need include:
              </p>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Educational materials for our outreach programs</li>
                <li>Professional services (legal, accounting, marketing)</li>
                <li>Technology equipment for our offices and events</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-primary-700 mb-2">Volunteer Your Time</h4>
              <p className="text-gray-600 mb-2">
                Your skills and time are valuable resources. Consider volunteering with ZANC to:
              </p>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Help organize events and programs</li>
                <li>Share your professional expertise</li>
                <li>Support administrative functions</li>
                <li>Mentor Zambian youth in California</li>
              </ul>
              <div className="mt-4">
                <a href="/get-involved" className="text-primary-600 hover:text-primary-800 font-medium">
                  Learn more about volunteering →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonatePage;