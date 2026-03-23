
import React, { useState } from 'react';
import Button from './Button';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const MembershipForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    membershipType: 'individual'
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if user is authenticated
      if (!user) {
        // Store current location and redirect to sign in
        navigate('/signin', { state: { from: '/get-involved' } });
        return;
      }

      const session = await supabase.auth.getSession();
      const accessToken = session.data.session?.access_token;
      
      if (!accessToken) {
        console.log('No access token, redirecting to sign in');
        navigate('/signin', { state: { from: '/get-involved' } });
        return;
      }

      console.log('Submitting application...');

      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(formData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Server error:', errorData);
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const data = await res.json();
      console.log('Response data:', data);
      
      if (data.url) {
        console.log('Redirecting to:', data.url);
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('Error submitting application:', err);
      if (err instanceof Error && err.name === 'AbortError') {
        alert('Request timed out. Please try again.');
      } else {
        const errorMessage = err instanceof Error ? err.message : 'Please try again.';
        alert(`Error submitting application: ${errorMessage}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      
      <div>
        <label htmlFor="membershipType" className="block text-sm font-medium text-gray-700 mb-1">
          Membership Type
        </label>
        <select
          id="membershipType"
          name="membershipType"
          value={formData.membershipType}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="individual">Individual ($50/year)</option>
          <option value="family">Family ($80/year)</option>
          <option value="student">Student ($25/year)</option>
          <option value="corporate">Corporate ($200/year)</option>
        </select>
      </div>
      
      <Button 
        type="submit" 
        variant="primary" 
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Processing...' : user ? 'Submit Application' : 'Sign In to Continue'}
      </Button>
      
      {!user && (
        <p className="text-sm text-gray-600 text-center">
          You need to be signed in to apply for membership.
        </p>
      )}
    </form>
  );
};

export default MembershipForm;
