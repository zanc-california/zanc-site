import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

export interface ServiceSelectionData {
  membershipType: string;
  membershipPrice: number;
  insuranceType: string;
  insurancePrice: number;
  totalAmount: number;
}

interface ServiceSelectionProps {
  onNext: (data: ServiceSelectionData) => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ onNext }) => {
  const [membershipPlan, setMembershipPlan] = useState('0');
  const [insurancePlan, setInsurancePlan] = useState('0');
  const navigate = useNavigate();

  const membershipOptions = [
    { value: '0', label: '-- Select --', price: 0 },
    { value: '10', label: 'Monthly - $10', price: 10 },
    { value: '120', label: 'Yearly - $120', price: 120 },
  ];

  const insuranceOptions = [
    { value: '0', label: '-- Select --', price: 0 },
    { value: '21.8', label: 'Adult (Monthly) - $21.80', price: 21.8 },
    { value: '261.6', label: 'Adult (Yearly) - $261.60', price: 261.6 },
    { value: '22.4', label: 'Adult + Dependents (Monthly) - $22.40', price: 22.4 },
    { value: '268.8', label: 'Adult + Dependents (Yearly) - $268.80', price: 268.8 },
    { value: '10.9', label: 'Elder 65–70 (Monthly) - $10.90', price: 10.9 },
    { value: '130.8', label: 'Elder 65–70 (Yearly) - $130.80', price: 130.8 },
    { value: '2.18', label: 'Elder 71+ (Monthly) - $2.18', price: 2.18 },
    { value: '26.16', label: 'Elder 71+ (Yearly) - $26.16', price: 26.16 },
  ];

  const calculateTotal = () => {
    const membershipPrice = parseFloat(membershipPlan) || 0;
    const insurancePrice = parseFloat(insurancePlan) || 0;
    return membershipPrice + insurancePrice;
  };

  const handleProceed = () => {
    const total = calculateTotal();
    if (total === 0) {
      alert('Please select at least one service to proceed.');
      return;
    }

    const membershipOption = membershipOptions.find(opt => opt.value === membershipPlan);
    const insuranceOption = insuranceOptions.find(opt => opt.value === insurancePlan);

    const data: ServiceSelectionData = {
      membershipType: membershipPlan !== '0' ? membershipOption?.label || '' : 'none',
      membershipPrice: membershipPlan !== '0' ? membershipOption?.price || 0 : 0,
      insuranceType: insurancePlan !== '0' ? insuranceOption?.label || '' : 'none',
      insurancePrice: insurancePlan !== '0' ? insuranceOption?.price || 0 : 0,
      totalAmount: total,
    };

    onNext(data);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-primary-800 mb-6 text-center">
        ZANC Services Selection
      </h2>

      <div className="space-y-6">
        <div>
          <label htmlFor="membership" className="block text-sm font-medium text-gray-700 mb-2">
            Membership Plan
          </label>
          <select
            id="membership"
            value={membershipPlan}
            onChange={(e) => setMembershipPlan(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {membershipOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="insurance" className="block text-sm font-medium text-gray-700 mb-2">
            Group Life Insurance
          </label>
          <select
            id="insurance"
            value={insurancePlan}
            onChange={(e) => setInsurancePlan(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {insuranceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-xl font-bold text-primary-800">
            Total: ${calculateTotal().toFixed(2)}
          </div>
        </div>

        <div className="space-y-3">
          <Button
            variant="primary"
            onClick={handleProceed}
            className="w-full"
            disabled={calculateTotal() === 0}
          >
            Proceed to Forms
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/get-involved')}
            className="w-full"
          >
            Back to Get Involved
          </Button>
        </div>

        <div className="text-sm text-gray-600 text-center space-y-1">
          <p>🔒 Payments are secure and processed through trusted providers.</p>
          <p>📧 For help or receipts, contact: zancsac@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceSelection;
