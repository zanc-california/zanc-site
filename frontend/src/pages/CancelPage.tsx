import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Layout from '../components/Layout';

const CancelPage: React.FC = () => {
  return (
    <Layout>
      <PageHeader title="Payment Cancelled" />
      
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Cancelled
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your payment was cancelled. No charges were made to your account.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Want to try again?
            </h2>
            <p className="text-blue-700">
              You can return to the membership application page and complete your payment at any time.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/get-involved"
              className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
            >
              Try Again
            </Link>
            <Link
              to="/"
              className="border border-primary-600 text-primary-600 px-6 py-3 rounded-md hover:bg-primary-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CancelPage;
