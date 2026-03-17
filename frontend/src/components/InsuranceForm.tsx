import React, { useState } from 'react';
import Button from './Button';

interface InsuranceFormData {
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

interface InsuranceFormProps {
  onSubmit: (data: InsuranceFormData) => void;
  onBack: () => void;
  insuranceType: string;
}

const InsuranceForm: React.FC<InsuranceFormProps> = ({ onSubmit, onBack, insuranceType }) => {
  const [formData, setFormData] = useState<InsuranceFormData>({
    // Member Information
    firstName: '',
    middleInitial: '',
    lastName: '',
    dateOfBirth: '',
    streetAddress: '',
    aptUnit: '',
    city: '',
    state: '',
    zipCode: '',
    socialSecurity: '',
    primaryPhone: '',
    secondaryPhone: '',
    gender: '',
    email: '',
    
    // Coverage Selection
    coverageAmount: '',
    
    // Children Coverage
    enrollChildrenCoverage: false,
    
    // Dependent Information
    dependents: [
      { name: '', gender: '', dateOfBirth: '', socialSecurity: '' },
      { name: '', gender: '', dateOfBirth: '', socialSecurity: '' },
      { name: '', gender: '', dateOfBirth: '', socialSecurity: '' },
      { name: '', gender: '', dateOfBirth: '', socialSecurity: '' }
    ],
    
    // Beneficiary Designation - Primary
    primaryBeneficiaryName: '',
    primaryBeneficiarySSN: '',
    primaryBeneficiaryDOB: '',
    primaryBeneficiaryRelationship: '',
    primaryBeneficiaryPercentage: '',
    primaryBeneficiaryAddress: '',
    primaryBeneficiaryPhone: '',
    
    // Beneficiary Designation - Contingent
    contingentBeneficiaryName: '',
    contingentBeneficiarySSN: '',
    contingentBeneficiaryDOB: '',
    contingentBeneficiaryRelationship: '',
    contingentBeneficiaryPercentage: '',
    contingentBeneficiaryAddress: '',
    contingentBeneficiaryPhone: '',
    
    // Additional Contingent Beneficiary
    contingent2BeneficiaryName: '',
    contingent2BeneficiarySSN: '',
    contingent2BeneficiaryDOB: '',
    contingent2BeneficiaryRelationship: '',
    contingent2BeneficiaryPercentage: '',
    contingent2BeneficiaryAddress: '',
    contingent2BeneficiaryPhone: '',
    
    // Existing Life Insurance
    hasExistingPolicy: false,
    
    // Member Signature and Date
    signatureDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleDependentChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      dependents: prev.dependents.map((dep, i) => 
        i === index ? { ...dep, [field]: value } : dep
      )
    }));
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="text-left">
            <h1 className="text-lg font-bold">HARTFORD LIFE AND ACCIDENT INSURANCE COMPANY</h1>
            <p className="text-sm">One Hartford Plaza</p>
            <p className="text-sm">Hartford, Connecticut 06155</p>
            <p className="text-sm mt-2">(A Stock Insurance Company)</p>
          </div>
          <div className="text-right">
            <img src="/images/hartford-logo.jpg" alt="Hartford Logo" className="h-16 mb-2" />
            <div className="text-red-600 font-bold">THE HARTFORD</div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-3 rounded">
          <h2 className="text-lg font-bold">Cultural Group Benefits Insurance Program</h2>
          <h3 className="text-md font-semibold">Enrollment Form Group Term Life Insurance Plan</h3>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Policy Information */}
        <div className="grid grid-cols-3 gap-4 border-b pb-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Policyholder Name: Cultural Group Insurance Trust (CGI)
            </label>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Group Billing #: 3440
            </label>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Group Policy #: AGL1942
            </label>
          </div>
        </div>

        <div className="text-sm font-medium mb-4">
          <strong>Participating Organization of:</strong><br />
          Zambians in Northern California (ZANC)
        </div>

        {/* Member Information */}
        <div className="border border-gray-300 p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4 bg-gray-100 p-2">MEMBER</h3>
          
          <div className="grid grid-cols-4 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                MI (Optional)
              </label>
              <input
                type="text"
                name="middleInitial"
                maxLength={1}
                value={formData.middleInitial}
                onChange={handleChange}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Date of Birth (MM/DD/YYYY) *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                required
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3 mb-4">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Street (No PO Boxes) *
              </label>
              <input
                type="text"
                name="streetAddress"
                required
                value={formData.streetAddress}
                onChange={handleChange}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Apt/Unit (if Applicable)
              </label>
              <input
                type="text"
                name="aptUnit"
                value={formData.aptUnit}
                onChange={handleChange}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                State *
              </label>
              <input
                type="text"
                name="state"
                required
                maxLength={2}
                value={formData.state}
                onChange={handleChange}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Zip *
              </label>
              <input
                type="text"
                name="zipCode"
                required
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Social Security # *
              </label>
              <input
                type="text"
                name="socialSecurity"
                required
                placeholder="XXX-XX-XXXX"
                value={formData.socialSecurity}
                onChange={handleChange}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Primary Phone *
              </label>
              <input
                type="tel"
                name="primaryPhone"
                required
                value={formData.primaryPhone}
                onChange={handleChange}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Secondary Phone (Optional)
              </label>
              <input
                type="tel"
                name="secondaryPhone"
                value={formData.secondaryPhone}
                onChange={handleChange}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Gender *
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === 'Male'}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  <span className="text-xs">Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === 'Female'}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  <span className="text-xs">Female</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Coverage Selection */}
        <div className="border border-gray-300 p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4 bg-gray-100 p-2">MEMBER COVERAGE</h3>
          
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Proposed Benefit Amount*
              </label>
              <select
                name="coverageAmount"
                required
                value={formData.coverageAmount}
                onChange={handleChange}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="">Select Amount</option>
                <option value="10000">$10,000</option>
                <option value="20000">$20,000</option>
                <option value="30000">$30,000</option>
                <option value="50000">$50,000</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                First Year Benefit Amount*
              </label>
              <div className="text-sm">
                <p>Under Age 65: $10,000 = $20,000</p>
                <p>Age 65-69: $5,000 = $10,000</p>
                <p>Age 70+: $1,000 = $2,000</p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Maximum Graded Benefit Amount*
              </label>
              <div className="text-sm">
                <p>$20,000</p>
                <p>$10,000</p>
                <p>$2,000</p>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-600 mb-4">
            *At age 65, your benefit amount will reduce to 50% of the base amount. At age 70, your benefit amount will reduce to 10% of the base amount.
          </div>
        </div>

        {/* Children Coverage */}
        <div className="border border-gray-300 p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4 bg-gray-100 p-2">CHILDREN COVERAGE (Optional)</h3>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="enrollChildrenCoverage"
                checked={formData.enrollChildrenCoverage}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm font-medium">I wish to enroll in coverage for my children:</span>
            </label>
          </div>

          {formData.enrollChildrenCoverage && (
            <div className="space-y-4">
              <div className="text-xs text-gray-600 mb-4">
                The benefit amount is calculated by your participating Cultural Association.
              </div>
              
              <h4 className="text-sm font-semibold mb-3">DEPENDENT INFORMATION (if more than 4 children, attach additional sheet)</h4>
              
              {formData.dependents.map((dependent, index) => (
                <div key={index} className="grid grid-cols-4 gap-3 p-3 bg-gray-50 rounded">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Child Name
                    </label>
                    <input
                      type="text"
                      value={dependent.name}
                      onChange={(e) => handleDependentChange(index, 'name', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      value={dependent.gender}
                      onChange={(e) => handleDependentChange(index, 'gender', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={dependent.dateOfBirth}
                      onChange={(e) => handleDependentChange(index, 'dateOfBirth', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Social Security #
                    </label>
                    <input
                      type="text"
                      placeholder="XXX-XX-XXXX"
                      value={dependent.socialSecurity}
                      onChange={(e) => handleDependentChange(index, 'socialSecurity', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Beneficiary Designation */}
        <div className="border border-gray-300 p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4 bg-gray-100 p-2">BENEFICIARY DESIGNATION</h3>
          
          <div className="text-xs text-gray-600 mb-4">
            You must select your beneficiary - the person (or more than one person) or legal entity (or more than one entity) who receives a benefit payment if 
            you or your covered covered by the plan. <strong>If you do not name a beneficiary, your close next of kin would receive your benefit if your primary 
            beneficiary dies first.</strong>
          </div>

          <div className="text-xs text-gray-600 mb-4">
            We will send your beneficiary designation to show as that there will be no question as to your meaning. If you name more than one primary or 
            contingent beneficiary, show the percentage of your benefit to be paid to each beneficiary. Please provide all of the information requested below. If 
            your beneficiary is not related either by marriage or blood to you, please let us know the nature of the relationship. If you need assistance, 
            contact the Main Office at 860-547-7176.
          </div>

          {/* Primary Beneficiary */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-3">Primary Beneficiary(s)</h4>
            <div className="text-xs text-gray-600 mb-3">
              A primary beneficiary is a beneficiary or beneficiaries that you name to receive the benefits if they are living at the time of your death. The primary 
              beneficiary(s) are the first in line to receive death benefits. Contingent beneficiaries, or secondary beneficiaries, are those named to receive the death 
              benefits only if all of the primary beneficiaries are not living. If the named assistance, contact the Main Office at 860-547-7176.
            </div>
            
            <div className="grid grid-cols-5 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Primary Beneficiary Name *
                </label>
                <input
                  type="text"
                  name="primaryBeneficiaryName"
                  required
                  value={formData.primaryBeneficiaryName}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Social Security #
                </label>
                <input
                  type="text"
                  name="primaryBeneficiarySSN"
                  placeholder="XXX-XX-XXXX"
                  value={formData.primaryBeneficiarySSN}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="primaryBeneficiaryDOB"
                  value={formData.primaryBeneficiaryDOB}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Relationship *
                </label>
                <input
                  type="text"
                  name="primaryBeneficiaryRelationship"
                  required
                  value={formData.primaryBeneficiaryRelationship}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Percentage *
                </label>
                <input
                  type="text"
                  name="primaryBeneficiaryPercentage"
                  required
                  placeholder="100%"
                  value={formData.primaryBeneficiaryPercentage}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  name="primaryBeneficiaryAddress"
                  required
                  value={formData.primaryBeneficiaryAddress}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Phone #
                </label>
                <input
                  type="tel"
                  name="primaryBeneficiaryPhone"
                  value={formData.primaryBeneficiaryPhone}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Contingent Beneficiary */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-3">Contingent Beneficiary(s)</h4>
            
            <div className="grid grid-cols-5 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Contingent Beneficiary Name
                </label>
                <input
                  type="text"
                  name="contingentBeneficiaryName"
                  value={formData.contingentBeneficiaryName}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Social Security #
                </label>
                <input
                  type="text"
                  name="contingentBeneficiarySSN"
                  placeholder="XXX-XX-XXXX"
                  value={formData.contingentBeneficiarySSN}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="contingentBeneficiaryDOB"
                  value={formData.contingentBeneficiaryDOB}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Relationship
                </label>
                <input
                  type="text"
                  name="contingentBeneficiaryRelationship"
                  value={formData.contingentBeneficiaryRelationship}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Percentage
                </label>
                <input
                  type="text"
                  name="contingentBeneficiaryPercentage"
                  placeholder="100%"
                  value={formData.contingentBeneficiaryPercentage}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="contingentBeneficiaryAddress"
                  value={formData.contingentBeneficiaryAddress}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Phone #
                </label>
                <input
                  type="tel"
                  name="contingentBeneficiaryPhone"
                  value={formData.contingentBeneficiaryPhone}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Additional Contingent Beneficiary */}
            <div className="grid grid-cols-5 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Contingent Beneficiary Name
                </label>
                <input
                  type="text"
                  name="contingent2BeneficiaryName"
                  value={formData.contingent2BeneficiaryName}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Social Security #
                </label>
                <input
                  type="text"
                  name="contingent2BeneficiarySSN"
                  placeholder="XXX-XX-XXXX"
                  value={formData.contingent2BeneficiarySSN}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="contingent2BeneficiaryDOB"
                  value={formData.contingent2BeneficiaryDOB}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Relationship
                </label>
                <input
                  type="text"
                  name="contingent2BeneficiaryRelationship"
                  value={formData.contingent2BeneficiaryRelationship}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Percentage
                </label>
                <input
                  type="text"
                  name="contingent2BeneficiaryPercentage"
                  placeholder="100%"
                  value={formData.contingent2BeneficiaryPercentage}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="contingent2BeneficiaryAddress"
                  value={formData.contingent2BeneficiaryAddress}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Phone #
                </label>
                <input
                  type="tel"
                  name="contingent2BeneficiaryPhone"
                  value={formData.contingent2BeneficiaryPhone}
                  onChange={handleChange}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-600 mb-4">
            The beneficiary for insurance on the lives of your dependents will automatically be you, if surviving. Otherwise, the beneficiary will 
            be subject to policy provisions. A beneficiary for member's insurance may be changed upon written request.
          </div>
        </div>

        {/* Existing Life Insurance Policy */}
        <div className="border border-gray-300 p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4 bg-gray-100 p-2">EXISTING LIFE INSURANCE POLICY</h3>
          
          <div className="mb-4">
            <p className="text-xs font-medium mb-2">
              By applying for this insurance, do you intend to replace, discontinue, or change an existing policy of life insurance?
            </p>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasExistingPolicy"
                  value="true"
                  checked={formData.hasExistingPolicy === true}
                  onChange={(e) => setFormData(prev => ({ ...prev, hasExistingPolicy: e.target.value === 'true' }))}
                  className="mr-1"
                />
                <span className="text-xs">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="hasExistingPolicy"
                  value="false"
                  checked={formData.hasExistingPolicy === false}
                  onChange={(e) => setFormData(prev => ({ ...prev, hasExistingPolicy: e.target.value === 'true' }))}
                  className="mr-1"
                />
                <span className="text-xs">No</span>
              </label>
            </div>
          </div>
        </div>

        {/* Signature Section */}
        <div className="border border-gray-300 p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-4 bg-gray-100 p-2">MEMBER SIGNATURE</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Member Signature (Required to activate coverage) *
              </label>
              <div className="h-12 border border-gray-300 rounded bg-gray-50 flex items-center px-3">
                <span className="text-sm text-gray-500">Digital signature will be applied upon submission</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Date (MM/DD/YYYY) *
              </label>
              <input
                type="date"
                name="signatureDate"
                required
                value={formData.signatureDate}
                onChange={handleChange}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex space-x-4 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            Back to Service Selection
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
          >
            Continue to {insuranceType === 'insurance-only' ? 'Payment' : 'Membership Form'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InsuranceForm;
