import { Link } from 'react-router-dom';
import Button from '../components/Button';

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your payment. You will receive a confirmation email from Stripe shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/"><Button variant="primary">Return to Home</Button></Link>
          <Link to="/membership"><Button variant="outline">Membership</Button></Link>
          <Link to="/insurance"><Button variant="outline">Insurance</Button></Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
