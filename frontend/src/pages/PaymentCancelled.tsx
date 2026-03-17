import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const PaymentCancelled: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Payment Cancelled
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Your payment was cancelled. No charges were made to your account.
            </p>
          </div>

          {orderId && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Your Application is Saved</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Your application information has been saved with Order ID #{orderId}. 
                      You can complete the payment process later by contacting our support team.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">What can you do?</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Try the payment process again</li>
                    <li>Contact our support team for assistance</li>
                    <li>Check your payment method and try again</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/membership"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Try Again
              </Link>
              
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Contact Support
              </Link>
            </div>
            
            <Link
              to="/"
              className="inline-block text-primary-600 hover:text-primary-500 font-medium"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
