import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Layout from '../components/Layout';

const SuccessPage: React.FC = () => {
  return (
    <Layout>
      <PageHeader title="Payment Successful!" />
      
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your membership application. Your payment has been processed successfully.
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              What happens next?
            </h2>
            <ul className="text-green-700 space-y-2 text-left">
              <li>• You will receive a confirmation email shortly</li>
              <li>• Our team will review your application</li>
              <li>• You'll be contacted within 2-3 business days</li>
              <li>• Welcome materials will be sent to your email</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              to="/about"
              className="border border-primary-600 text-primary-600 px-6 py-3 rounded-md hover:bg-primary-50 transition-colors"
            >
              Learn More About ZANC
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessPage;
