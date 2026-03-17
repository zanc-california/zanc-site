import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import NewsCard from '../components/NewsCard';
import { heroImages } from '../heroImages';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import supabase from '../supabaseClient';

interface MembershipStatus {
  type: string;
  status: 'pending' | 'approved' | 'rejected' | 'active';
  payment?: {
    status: 'pending' | 'paid' | 'failed';
    amount: number;
  };
}

const Home = () => {
  const { user, dbUser } = useAuth();
  const [membershipStatus, setMembershipStatus] = useState<MembershipStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Sample news data
  const newsItems = [
    {
      id: '1',
      title: 'Annual ZANC Gala Dinner Announced',
      excerpt: 'Join us for our annual gala dinner celebrating Zambian culture and community achievements.',
      date: 'June 15, 2025',
    },
    {
      id: '2',
      title: 'Cultural Workshop Series',
      excerpt: 'Learn about Zambian traditions and cultural practices in our new workshop series.',
      date: 'May 30, 2025',
    },
    {
      id: '3',
      title: 'Scholarship Program Applications Open',
      excerpt: 'ZANC is now accepting applications for our annual scholarship program.',
      date: 'May 20, 2025',
    },
  ];

  // Rotating hero image state
  const [currentHero, setCurrentHero] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Fetch membership status
  useEffect(() => {
    let didCancel = false;
    const fetchMembershipStatus = async () => {
      if (!user) {
        setLoading(false);
        setMembershipStatus(null);
        setError(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;
        if (!token) {
          setError('No access token available');
          setLoading(false);
          return;
        }
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/membership-status`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          signal: controller.signal
        });
        clearTimeout(timeout);
        if (!didCancel) {
          if (response.ok) {
            const data = await response.json();
            setMembershipStatus(data.membership);
            setError(null);
          } else {
            setError('Failed to fetch membership status.');
            setMembershipStatus(null);
          }
        }
      } catch (err: any) {
        if (!didCancel) {
          setError('Error fetching membership status.');
          setMembershipStatus(null);
        }
      } finally {
        if (!didCancel) setLoading(false);
      }
      return () => { didCancel = true; };
    };
    fetchMembershipStatus();
    // refetch on login, logout, or after approval
  }, [user]);

  const getMembershipStatusDisplay = () => {
    if (error) {
      return (
        <div className="border rounded-lg p-4 bg-red-100 text-red-800 border-red-200">
          <XCircle className="h-5 w-5 inline mr-2" />
          {error}
        </div>
      );
    }
    if (!membershipStatus) return null;
    const { status, type, payment } = membershipStatus;
    let statusColor = '';
    let statusIcon = null;
    let statusText = '';
    let statusMessage = '';
    switch (status) {
      case 'approved':
      case 'active':
        statusColor = 'bg-green-100 text-green-800 border-green-200';
        statusIcon = <CheckCircle className="h-5 w-5" />;
        statusText = 'Active Member';
        statusMessage = `Congratulations! Your ${type} membership is active. You now have full access to all member benefits and events.`;
        break;
      case 'pending':
        statusColor = 'bg-yellow-100 text-yellow-800 border-yellow-200';
        statusIcon = <Clock className="h-5 w-5" />;
        statusText = 'Application Under Review';
        statusMessage = `Your ${type} membership application is currently being reviewed. We'll notify you once a decision has been made.`;
        break;
      case 'rejected':
        statusColor = 'bg-red-100 text-red-800 border-red-200';
        statusIcon = <XCircle className="h-5 w-5" />;
        statusText = 'Application Rejected';
        statusMessage = `Unfortunately, your ${type} membership application was not approved. Please contact us for more information.`;
        break;
      default:
        return null;
    }
    return (
      <div className={`border rounded-lg p-4 ${statusColor}`}>
        <div className="flex items-center space-x-2 mb-2">
          {statusIcon}
          <h3 className="font-semibold">{statusText}</h3>
        </div>
        <p className="text-sm mb-2">{statusMessage}</p>
        {payment && (
          <div className="text-sm">
            <span className="font-medium">Payment Status:</span> 
            <span className={`ml-1 ${payment.status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
              ${payment.amount} - {payment.status}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6 font-heading flex items-center gap-3">
                <img src="/images/logo.jpg" alt="ZANC Logo" className="h-10 w-10 rounded-full border-2 border-copper-400 bg-white" />
                {user ? `Welcome back, ${dbUser?.name || user.user_metadata?.name || user.email?.split('@')[0]}!` : 'Welcome to ZANC!'}
              </h2>
              
              {/* Membership Status Display */}
              {user && (
                <div className="mb-6">
                  {loading ? (
                    <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span className="text-sm text-gray-600">Loading membership status...</span>
                      </div>
                    </div>
                  ) : (
                    getMembershipStatusDisplay()
                  )}
                </div>
              )}
              
              <p className="text-gray-600 mb-6">
                {user ? (
                  <>
                    Great to see you again! As a member of the Association of Zambians in California (ZANC), 
                    you're part of a vibrant community dedicated to preserving our rich cultural heritage 
                    and supporting initiatives both here in California and back home in Zambia.
                  </>
                ) : (
                  <>
                    The Association of Zambians in California (ZANC) is a vibrant community organization 
                    dedicated to connecting Zambians living in California, preserving our rich cultural heritage, 
                    and supporting community initiatives both here and in Zambia.
                  </>
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/about">
                  <Button variant="primary" size="lg">Learn More</Button>
                </Link>
                {user && !membershipStatus && (
                  <Link to="/get-involved">
                    <Button variant="outline" size="lg">Apply for Membership</Button>
                  </Link>
                )}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden shadow-md relative">
                <img 
                  src={heroImages[currentHero].src} 
                  alt={heroImages[currentHero].alt} 
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <img 
                  src="/images/flag.jpg" 
                  alt="Zambian Flag" 
                  className="absolute bottom-2 right-2 h-10 w-auto shadow-md border-2 border-white rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-800 mb-8 font-heading">Latest Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <NewsCard 
                key={item.id}
                id={item.id}
                title={item.title}
                excerpt={item.excerpt}
                date={item.date}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/news">
              <Button variant="outline">View All News</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary-800 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading">
            {user ? 'Ready to Take the Next Step?' : 'Join Our Community'}
          </h2>
          <p className="max-w-2xl mx-auto mb-8">
            {user ? (
              <>
                You're already part of the ZANC family! 
                {!membershipStatus ? (
                  ' Apply for membership today to unlock full benefits, participate in exclusive events, and contribute to our community initiatives.'
                ) : membershipStatus.status === 'approved' ? (
                  ' As an approved member, you have full access to all benefits and events. Stay engaged with our community!'
                ) : (
                  ' Your membership application is being processed. Thank you for your interest in joining our community!'
                )}
              </>
            ) : (
              <>
                Become a member today and connect with fellow Zambians in California, participate in cultural events, 
                and contribute to our community initiatives.
              </>
            )}
          </p>
          {(!user || !membershipStatus) && (
            <Link to="/get-involved">
              <Button variant="secondary" size="lg">
                {user ? 'Apply for Membership' : 'Get Involved'}
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;