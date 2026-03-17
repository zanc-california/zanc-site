import React, { useState } from 'react';
import Button from './Button';

interface MembershipFormData {
  // Personal Information
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  emailAddress: string;
  occupation: string;
  otherExpertiseHobby: string;
  // Residential Information
  streetAddress: string;
  cityStateZipCode: string;
  // Family Information
  numberOfFamilyMembers: string;
  spousePartnerName: string;
  childrenNamesAges: string;
  // Membership Interest
  wantPaidMembership: string;
  preferredPaymentMethod: string;
  membershipFee: string;
  // Areas of Interest/Skills
  culturalEvents: boolean;
  networkingOpportunities: boolean;
  volunteerOpportunities: boolean;
  professionalDevelopment: boolean;
  otherInterests: string;
  // Skills to contribute
  eventPlanning: boolean;
  itTechnology: boolean;
  fundraising: boolean;
  otherSkills: string;
  // Additional Information
  howDidYouHear: string;
  comments: string;
  // Consent
  consentToStore: boolean;
}

interface MembershipApplicationFormProps {
  onSubmit: (data: MembershipFormData) => void;
  onBack: () => void;
  membershipType: string;
}

const MembershipApplicationForm: React.FC<MembershipApplicationFormProps> = ({ 
  onSubmit, 
  onBack, 
  membershipType 
}) => {
  const [formData, setFormData] = useState<MembershipFormData>({
    // Personal Information
    fullName: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    emailAddress: '',
    occupation: '',
    otherExpertiseHobby: '',
    // Residential Information
    streetAddress: '',
    cityStateZipCode: '',
    // Family Information
    numberOfFamilyMembers: '',
    spousePartnerName: '',
    childrenNamesAges: '',
    // Membership Interest
    wantPaidMembership: '',
    preferredPaymentMethod: '',
    membershipFee: '',
    // Areas of Interest/Skills
    culturalEvents: false,
    networkingOpportunities: false,
    volunteerOpportunities: false,
    professionalDevelopment: false,
    otherInterests: '',
    // Skills to contribute
    eventPlanning: false,
    itTechnology: false,
    fundraising: false,
    otherSkills: '',
    // Additional Information
    howDidYouHear: '',
    comments: '',
    // Consent
    consentToStore: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary-800 mb-4">
          ZANC Membership Intake Form
        </h2>
        
        <div className="text-sm text-gray-700 mb-6">
          <p>Thank you for your interest in joining the Zambian Association in Northern California (ZANC).</p>
          <p>Whether you choose to pay the membership fee or simply connect with our vibrant community,</p>
          <p>we are excited to welcome you.</p>
          <p className="mt-4">Please fill out the form below.</p>
          <p className="mt-4 italic">
            *** If you wish to take advantage of membership benefits, you may submit the membership 
            fee after completing this form.
          </p>
        </div>

        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Selected Plan:</strong> {membershipType}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                1. Full Name: *
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-primary-500 bg-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                2. Date of Birth: *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                required
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-primary-500 bg-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                3. Gender:
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === 'Male'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">☐ Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === 'Female'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">☐ Female</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Prefer not to say"
                    checked={formData.gender === 'Prefer not to say'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">☐ Prefer not to say</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                4. Phone Number: *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-primary-500 bg-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                5. Email Address: *
              </label>
              <input
                type="email"
                name="emailAddress"
                required
                value={formData.emailAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-primary-500 bg-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                6. Occupation: *
              </label>
              <input
                type="text"
                name="occupation"
                required
                value={formData.occupation}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-primary-500 bg-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                7. Other (Expertise or hobby):
              </label>
              <input
                type="text"
                name="otherExpertiseHobby"
                value={formData.otherExpertiseHobby}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-primary-500 bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Residential Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Residential Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                8. Street Address: *
              </label>
              <input
                type="text"
                name="streetAddress"
                required
                value={formData.streetAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-primary-500 bg-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                9. City, State, ZIP Code: *
              </label>
              <input
                type="text"
                name="cityStateZipCode"
                required
                value={formData.cityStateZipCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-primary-500 bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Family Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Family Information (Optional)</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                10. Number of Family Members in Household:
              </label>
              <input
                type="text"
                name="numberOfFamilyMembers"
                value={formData.numberOfFamilyMembers}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-primary-500 bg-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                11. Spouse/Partner's Name (if applicable):
              </label>
              <input
                type="text"
                name="spousePartnerName"
                value={formData.spousePartnerName}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:border-primary-500 bg-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                12. Children's Names and Ages (if applicable):
              </label>
              <textarea
                name="childrenNamesAges"
                value={formData.childrenNamesAges}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Membership Interest */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Membership Interest</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                13. Would you like to become a paid member of ZANC?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="wantPaidMembership"
                    value="yes"
                    checked={formData.wantPaidMembership === 'yes'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">☐ Yes, I would like to pay the membership fee to access benefits.</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="wantPaidMembership"
                    value="no"
                    checked={formData.wantPaidMembership === 'no'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">☐ No, I'd prefer to connect without a paid membership.</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                14. Preferred Membership Payment Method (for paid members):
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="preferredPaymentMethod"
                    value="Zelle/Venmo"
                    checked={formData.preferredPaymentMethod === 'Zelle/Venmo'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">☐ Zelle/Venmo</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="preferredPaymentMethod"
                    value="PayPal"
                    checked={formData.preferredPaymentMethod === 'PayPal'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">☐ PayPal</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="preferredPaymentMethod"
                    value="Cash/Check"
                    checked={formData.preferredPaymentMethod === 'Cash/Check'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">☐ Cash/Check</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                15. Membership Fee (if applicable):
              </label>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="membershipFee"
                      value="individual"
                      checked={formData.membershipFee === 'individual'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm">• Individual (18 and over): $120/year</span>
                  </label>
                  <span className="text-sm font-medium">$100 if paid by March 15th</span>
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="membershipFee"
                      value="family"
                      checked={formData.membershipFee === 'family'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm">• Family: $180/year</span>
                  </label>
                  <span className="text-sm font-medium">$150 if paid by March 15th</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Areas of Interest/Skills */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Areas of Interest/Skills</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                16. What areas of ZANC activities interest you most? (Select all that apply)
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="culturalEvents"
                    checked={formData.culturalEvents}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">☐ Cultural Events</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="networkingOpportunities"
                    checked={formData.networkingOpportunities}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">☐ Networking Opportunities</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="volunteerOpportunities"
                    checked={formData.volunteerOpportunities}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">☐ Volunteer Opportunities</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="professionalDevelopment"
                    checked={formData.professionalDevelopment}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">☐ Professional Development</span>
                </label>
                <div className="flex items-center">
                  <span className="text-sm mr-2">☐ Other:</span>
                  <input
                    type="text"
                    name="otherInterests"
                    value={formData.otherInterests}
                    onChange={handleChange}
                    className="flex-1 px-3 py-1 border-b border-gray-300 focus:outline-none focus:border-primary-500 bg-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                17. Do you have any skills or resources you'd like to contribute to ZANC?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="eventPlanning"
                    checked={formData.eventPlanning}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">☐ Event Planning</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="itTechnology"
                    checked={formData.itTechnology}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">☐ IT/Technology</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="fundraising"
                    checked={formData.fundraising}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">☐ Fundraising</span>
                </label>
                <div className="flex items-center">
                  <span className="text-sm mr-2">☐ Other:</span>
                  <input
                    type="text"
                    name="otherSkills"
                    value={formData.otherSkills}
                    onChange={handleChange}
                    className="flex-1 px-3 py-1 border-b border-gray-300 focus:outline-none focus:border-primary-500 bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Additional Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                18. How did you hear about ZANC?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="howDidYouHear"
                    value="Friend/Family"
                    checked={formData.howDidYouHear === 'Friend/Family'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">☐ Friend/Family</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="howDidYouHear"
                    value="Social Media"
                    checked={formData.howDidYouHear === 'Social Media'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">☐ Social Media</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="howDidYouHear"
                    value="Event"
                    checked={formData.howDidYouHear === 'Event'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">☐ Event</span>
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="howDidYouHear"
                    value="Other"
                    checked={formData.howDidYouHear === 'Other'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm mr-2">☐ Other:</span>
                  <input
                    type="text"
                    name="howDidYouHearOther"
                    className="flex-1 px-3 py-1 border-b border-gray-300 focus:outline-none focus:border-primary-500 bg-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                19. Comments or Suggestions:
              </label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Instructions (for paid members only)</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Please submit your membership payment via [Zelle, PayPal, etc.]</li>
            <li>• Include your full name in the payment reference.</li>
          </ul>
        </div>

        {/* Consent */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Consent</h3>
          <label className="flex items-start">
            <input
              type="checkbox"
              name="consentToStore"
              required
              checked={formData.consentToStore}
              onChange={handleChange}
              className="mr-3 mt-1"
            />
            <span className="text-sm text-gray-700">
              ☐ I consent to my information being stored by ZANC for community engagement purposes only.
            </span>
          </label>
        </div>

        {/* Form Actions */}
        <div className="flex space-x-4 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
          >
            Continue to Payment
          </Button>
        </div>
      </form>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 mt-8 border-t pt-4">
        <p>ZANC Membership Intake Form - 2025 - zancsac@gmail.com</p>
      </div>
    </div>
  );
};

export default MembershipApplicationForm;
