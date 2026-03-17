// src/pages/Success.tsx
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Success() {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [orderId, setOrderId] = useState<number | null>(null);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // For new combined order system, we don't need to update payment status
      // The payment is already completed through Stripe
      setPaymentStatus('success');
      
      // Try to extract order ID from URL parameters
      const urlOrderId = searchParams.get('order_id');
      if (urlOrderId) {
        setOrderId(parseInt(urlOrderId));
      }
    } else {
      setPaymentStatus('success'); // Default to success if no session ID
    }
  }, [sessionId, searchParams]);

  const sendEmailsManually = async () => {
    if (!orderId) {
      alert('Order ID not found. Please try refreshing the page.');
      return;
    }

    setEmailStatus('sending');
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/applications/send-emails/${orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        setEmailStatus('sent');
        alert('Emails sent successfully!');
      } else {
        setEmailStatus('error');
        alert('Failed to send emails: ' + data.details);
      }
    } catch (error) {
      setEmailStatus('error');
      alert('Error sending emails: ' + (error as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-green-700">🎉 Payment Successful</h1>
        
        {paymentStatus === 'loading' && (
          <p className="text-lg text-gray-700">
            Processing your payment...
          </p>
        )}
        
        {paymentStatus === 'success' && (
          <div>
            <p className="text-lg text-gray-700">
              Thank you for your application to become a member of ZANC!
            </p>
            <p className="text-sm text-gray-600">
              Your membership status has been updated to active.
            </p>
            {orderId && emailStatus !== 'sent' && (
              <div className="mt-4">
                <button
                  onClick={sendEmailsManually}
                  disabled={emailStatus === 'sending'}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {emailStatus === 'sending' ? 'Sending Emails...' : 'Send Confirmation Emails'}
                </button>
                <p className="text-xs text-gray-500 mt-1">
                  Click to send membership PDFs to admin email
                </p>
              </div>
            )}
            {emailStatus === 'sent' && (
              <p className="text-sm text-green-600 mt-2">
                ✅ Confirmation emails sent successfully!
              </p>
            )}
          </div>
        )}
        
        {paymentStatus === 'error' && (
          <div>
            <p className="text-lg text-red-600">
              Payment successful, but there was an issue updating your membership status.
            </p>
            <p className="text-sm text-gray-600">
              Please contact support if you continue to have issues.
            </p>
          </div>
        )}
        
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
