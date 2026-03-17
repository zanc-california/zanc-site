import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary-800 mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/admin/news"
          className="block p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-primary-800 mb-2">News</h3>
          <p className="text-gray-600 text-sm">Create, edit, and delete news posts.</p>
        </Link>
        <Link
          to="/admin/gallery"
          className="block p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-primary-800 mb-2">Gallery</h3>
          <p className="text-gray-600 text-sm">Upload and manage gallery images.</p>
        </Link>
      </div>
      <p className="mt-6 text-sm text-gray-500">
        Payments are managed directly in the <a href="https://dashboard.stripe.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Stripe Dashboard</a>.
      </p>
    </div>
  );
}
