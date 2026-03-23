import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ServiceSelection from './ServiceSelection';
import InsuranceForm from './InsuranceForm';
import MembershipApplicationForm from './MembershipApplicationForm';

export interface ServiceSelectionData {
  membershipType: string;
  membershipPrice: number;
  insuranceType: string;
  insurancePrice: number;
  totalAmount: number;
}

export interface InsuranceFormData {
  // Member Information
  firstName: string;
  middleInitial: string;
  lastName: string;
  dateOfBirth: string;
  streetAddress: string;
  aptUnit: string;
  city: string;
  state: string;
  zipCode: string;
  socialSecurity: string;
  primaryPhone: string;
  secondaryPhone: string;
  gender: string;
  email: string;
  
  // Coverage Selection
  coverageAmount: string;
  
  // Children Coverage
  enrollChildrenCoverage: boolean;
  
  // Dependent Information (up to 4 dependents)
  dependents: Array<{
    name: string;
    gender: string;
    dateOfBirth: string;
    socialSecurity: string;
  }>;
  
  // Beneficiary Designation - Primary
  primaryBeneficiaryName: string;
  primaryBeneficiarySSN: string;
  primaryBeneficiaryDOB: string;
  primaryBeneficiaryRelationship: string;
  primaryBeneficiaryPercentage: string;
  primaryBeneficiaryAddress: string;
  primaryBeneficiaryPhone: string;
  
  // Beneficiary Designation - Contingent
  contingentBeneficiaryName: string;
  contingentBeneficiarySSN: string;
  contingentBeneficiaryDOB: string;
  contingentBeneficiaryRelationship: string;
  contingentBeneficiaryPercentage: string;
  contingentBeneficiaryAddress: string;
  contingentBeneficiaryPhone: string;
  
  // Additional Contingent Beneficiary
  contingent2BeneficiaryName: string;
  contingent2BeneficiarySSN: string;
  contingent2BeneficiaryDOB: string;
  contingent2BeneficiaryRelationship: string;
  contingent2BeneficiaryPercentage: string;
  contingent2BeneficiaryAddress: string;
  contingent2BeneficiaryPhone: string;
  
  // Existing Life Insurance
  hasExistingPolicy: boolean;
  
  // Member Signature and Date
  signatureDate: string;
}

export interface MembershipFormData {
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  occupation: string;
  employer: string;
  workAddress: string;
  workPhone: string;
  placeOfBirth: string;
  zambianAddress: string;
  familyInZambia: string;
  visitFrequency: string;
  howDidYouHear: string;
  volunteerInterest: string;
  skillsToOffer: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  reference1Name: string;
  reference1Phone: string;
  reference1Email: string;
  reference2Name: string;
  reference2Phone: string;
  reference2Email: string;
}

type Step = 'service-selection' | 'insurance-form' | 'membership-form' | 'payment';

type StripeCheckout = {
  redirectToCheckout: (options: { sessionId: string }) => Promise<{ error?: { message?: string } }>;
};


import { useNavigate } from 'react-router-dom';

const ApplicationFlow: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('service-selection');
  const [orderId, setOrderId] = useState<number | null>(null);
  const [serviceData, setServiceData] = useState<ServiceSelectionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Redirect to sign-in if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);

  const handleServiceSelection = async (data: ServiceSelectionData) => {
    setLoading(true);
    setError('');
    
    try {
      // Create order in backend
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/applications/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          userEmail: user?.email || 'user@example.com' // Get email from auth context
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const result = await response.json();
      setOrderId(result.orderId);
      setServiceData(data);
      
      // Move to next step based on selections
      if (data.insuranceType && data.insuranceType !== 'none') {
        setCurrentStep('insurance-form');
      } else if (data.membershipType && data.membershipType !== 'none') {
        setCurrentStep('membership-form');
      } else {
        setCurrentStep('payment');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setError('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInsuranceSubmit = async (data: InsuranceFormData) => {
    if (!orderId) return;
    
    setLoading(true);
    setError('');
    
    try {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/applications/submit-insurance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          formData: data,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit insurance application');
      }

      // Move to membership form if membership was selected, otherwise go to payment
      if (serviceData?.membershipType && serviceData.membershipType !== 'none') {
        setCurrentStep('membership-form');
      } else {
        setCurrentStep('payment');
      }
    } catch (error) {
      console.error('Error submitting insurance application:', error);
      setError('Failed to submit insurance application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMembershipSubmit = async (data: MembershipFormData) => {
    if (!orderId) return;
    
    setLoading(true);
    setError('');
    
    try {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/applications/submit-membership`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          formData: data,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit membership application');
      }

      setCurrentStep('payment');
    } catch (error) {
      console.error('Error submitting membership application:', error);
      setError('Failed to submit membership application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!orderId) return;
    
    setLoading(true);
    setError('');
    
    try {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/applications/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      console.log('Received session ID:', sessionId);
      
      // Redirect to Stripe Checkout
      const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
      console.log('Using Stripe key:', stripeKey ? 'Key loaded' : 'Key missing');
      
      const stripeFactory = (window as Window & { Stripe?: (key: string) => StripeCheckout }).Stripe;
      const stripe = stripeKey && stripeFactory ? stripeFactory(stripeKey) : null;
      console.log('Stripe object:', stripe ? 'Initialized' : 'Failed to initialize');

      if (!stripe) {
        throw new Error('Stripe is not configured.');
      }

      const result = await stripe.redirectToCheckout({ sessionId });
      if (result.error?.message) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setError('Failed to initialize payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setError('');
    
    switch (currentStep) {
      case 'insurance-form':
        setCurrentStep('service-selection');
        break;
      case 'membership-form':
        // Go back to insurance form if insurance was selected, otherwise service selection
        if (serviceData?.insuranceType && serviceData.insuranceType !== 'none') {
          setCurrentStep('insurance-form');
        } else {
          setCurrentStep('service-selection');
        }
        break;
      case 'payment':
        // Go back to membership form if membership was selected, 
        // otherwise insurance form if insurance was selected,
        // otherwise service selection
        if (serviceData?.membershipType && serviceData.membershipType !== 'none') {
          setCurrentStep('membership-form');
        } else if (serviceData?.insuranceType && serviceData.insuranceType !== 'none') {
          setCurrentStep('insurance-form');
        } else {
          setCurrentStep('service-selection');
        }
        break;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {error && (
        <div className="max-w-4xl mx-auto p-4">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStep === 'service-selection' && (
        <ServiceSelection onNext={handleServiceSelection} />
      )}

      {currentStep === 'insurance-form' && serviceData && (
        <InsuranceForm
          onSubmit={handleInsuranceSubmit}
          onBack={handleBack}
          insuranceType={serviceData.insuranceType}
        />
      )}

      {currentStep === 'membership-form' && serviceData && (
        <MembershipApplicationForm
          onSubmit={handleMembershipSubmit}
          onBack={handleBack}
          membershipType={serviceData.membershipType}
        />
      )}

      {currentStep === 'payment' && serviceData && (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-primary-800 mb-6">Review & Payment</h2>
          
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            
            {serviceData.membershipType && serviceData.membershipType !== 'none' && (
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="font-medium">ZANC Membership - {serviceData.membershipType}</span>
                <span className="font-bold">${serviceData.membershipPrice}</span>
              </div>
            )}
            
            {serviceData.insuranceType && serviceData.insuranceType !== 'none' && (
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span className="font-medium">ZANC Insurance - {serviceData.insuranceType}</span>
                <span className="font-bold">${serviceData.insurancePrice}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg border-t-2 border-primary-600">
              <span className="text-lg font-bold">Total Amount</span>
              <span className="text-xl font-bold text-primary-600">${serviceData.totalAmount}</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Stripe Payment Option */}
              <div className="border rounded-lg p-6 hover:border-primary-500 transition-colors">
                <h4 className="text-lg font-medium mb-4 text-center">💳 Pay with Card</h4>
                <p className="text-sm text-gray-600 mb-4 text-center">Secure online payment with credit/debit card</p>
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-primary-600 text-white px-4 py-3 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Pay Now with Card'}
                </button>
              </div>

              {/* Alternative Payment Methods */}
              <div className="border rounded-lg p-6">
                <h4 className="text-lg font-medium mb-4 text-center">📲 Alternative Payment Methods</h4>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <span className="font-medium">Zelle:</span>
                    <span className="text-sm">zancsac@gmail.com</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <span className="font-medium">Bank:</span>
                    <span className="text-sm">Wells Fargo #7185547853</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                    <span className="font-medium">Venmo:</span>
                    <span className="text-sm">@Zanc-Sacramento</span>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800 mb-2">✅ Important:</p>
                    <p className="text-yellow-700">After payment, send a screenshot or photo of your receipt to: <strong>(714) 592-9143</strong></p>
                  </div>
                </div>

                <button
                  onClick={async () => {
                    try {
                      // Mark order as manual payment
                      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/applications/mark-manual-payment/${orderId}`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      });
                      
                      // Redirect to success page with manual payment flag
                      window.location.href = `/success?manual_payment=true&order_id=${orderId}&amount=${serviceData.totalAmount}`;
                    } catch (error) {
                      console.error('Error marking manual payment:', error);
                    }
                  }}
                  className="w-full bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  I'll Pay Using These Methods
                </button>
              </div>
            </div>
          </div>

          {/* Important Notes Section */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h4 className="font-semibold mb-3">📌 Important Notes:</h4>
            <ul className="text-sm space-y-2 text-gray-700">
              <li>• Anyone who does not pay by the deadline will lose coverage.</li>
              <li>• If you want to join or make changes (add family), do it now – this is Open Enrollment Time (until July 31).</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h4 className="font-semibold mb-3">Need Help? Contact:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium mb-2">Payment Questions:</p>
                <p>Atupele: (714) 592-9143</p>
                <p>Kassy: (845) 665-3953</p>
              </div>
              <div>
                <p className="font-medium mb-2">New Applications:</p>
                <p>Beene: (530) 329-6321</p>
                <p>Lusayo: (714) 423-5323</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3">We're here to support each other as a community. Please reach out if you have questions, and we will help walk you through the process.</p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleBack}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationFlow;
