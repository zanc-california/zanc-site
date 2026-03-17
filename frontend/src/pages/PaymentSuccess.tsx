import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('order_id');
  const manualPayment = searchParams.get('manual_payment') === 'true';
  const amount = searchParams.get('amount');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/applications/order/${orderId}`);
        if (response.ok) {
          const data = await response.json();
          setOrderDetails(data);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {manualPayment ? 'Application Submitted!' : 'Payment Successful!'}
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              {manualPayment 
                ? 'Your application has been submitted and PDFs have been generated. Please complete your payment using the methods provided.'
                : 'Thank you for your ZANC application and payment.'
              }
            </p>
          </div>

          {manualPayment && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-4">📲 Complete Your Payment</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between p-3 bg-white rounded border">
                  <span className="font-medium">Zelle:</span>
                  <span className="text-sm font-mono">zancsac@gmail.com</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded border">
                  <span className="font-medium">Bank Transfer:</span>
                  <span className="text-sm font-mono">Wells Fargo #7185547853</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded border">
                  <span className="font-medium">Venmo:</span>
                  <span className="text-sm font-mono">@Zanc-Sacramento</span>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
                <p className="text-red-800 font-medium">
                  Amount to Pay: <span className="text-xl">${amount || orderDetails?.totalAmount}</span>
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <p className="text-blue-800 font-medium mb-2">✅ After Payment:</p>
                <p className="text-blue-700 text-sm">
                  Send a screenshot or photo of your receipt to: <strong>(714) 592-9143</strong>
                </p>
              </div>
            </div>
          )}

          {orderDetails && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">#{orderDetails.id}</span>
                </div>
                
                {orderDetails.membershipType && orderDetails.membershipType !== 'none' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Membership:</span>
                    <span className="font-medium">{orderDetails.membershipType} - ${orderDetails.membershipPrice}</span>
                  </div>
                )}
                
                {orderDetails.insuranceType && orderDetails.insuranceType !== 'none' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Insurance:</span>
                    <span className="font-medium">{orderDetails.insuranceType} - ${orderDetails.insurancePrice}</span>
                  </div>
                )}
                
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total Paid:</span>
                  <span className="text-green-600">${orderDetails.totalAmount}</span>
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
                <h3 className="text-sm font-medium text-blue-800">What's Next?</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc list-inside space-y-1">
                    {manualPayment ? (
                      <>
                        <li>PDF copies of your application have been generated and sent to our admin team</li>
                        <li>You have received a confirmation email</li>
                        <li>Complete your payment using one of the methods above</li>
                        <li>Send payment receipt to (714) 592-9143</li>
                        <li>Once payment is verified, your application will be processed</li>
                      </>
                    ) : (
                      <>
                        <li>You will receive a confirmation email shortly</li>
                        <li>Our admin team has been notified and will review your application</li>
                        <li>PDF copies of your applications have been generated and sent to our team</li>
                        <li>We will contact you if any additional information is needed</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {manualPayment && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold mb-3">📞 Need Help?</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-2">Payment Questions:</p>
                  <p>Atupele: (714) 592-9143</p>
                  <p>Kassy: (845) 665-3953</p>
                </div>
                <div>
                  <p className="font-medium mb-2">Application Support:</p>
                  <p>Beene: (530) 329-6321</p>
                  <p>Lusayo: (714) 423-5323</p>
                </div>
              </div>
            </div>
          )}

          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
