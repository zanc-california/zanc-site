// src/pages/Cancel.tsx
import { Link } from 'react-router-dom';

export default function Cancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-red-600">❌ Payment Cancelled</h1>
        <p className="text-lg text-gray-700">
          You cancelled the payment. You can try again anytime.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
