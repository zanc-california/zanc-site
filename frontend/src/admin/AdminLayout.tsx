import { ReactNode, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type Props = { children: ReactNode };

export default function AdminLayout({ children }: Props) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setIsAdmin(false);
        navigate('/admin/login', { replace: true });
        return;
      }
      const { data } = await supabase.from('admins').select('id').eq('id', session.user.id).single();
      if (!data) {
        setIsAdmin(false);
        navigate('/admin/login', { replace: true });
        return;
      }
      setIsAdmin(true);
    };
    check();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold text-primary-800">ZANC Admin</h1>
            <nav className="flex items-center gap-4">
              <Link to="/admin" className="text-gray-600 hover:text-primary-800">Dashboard</Link>
              <Link to="/admin/news" className="text-gray-600 hover:text-primary-800">News</Link>
              <Link to="/admin/gallery" className="text-gray-600 hover:text-primary-800">Gallery</Link>
              <Link to="/admin/suggestions" className="text-gray-600 hover:text-primary-800">Suggestions</Link>
              <Link to="/admin/opportunities" className="text-gray-600 hover:text-primary-800">Opportunities</Link>
              <a href="/" className="text-gray-500 text-sm">View site</a>
              <button type="button" onClick={handleSignOut} className="text-sm text-red-600 hover:underline">
                Sign out
              </button>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
