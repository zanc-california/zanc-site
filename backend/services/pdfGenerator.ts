import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export interface InsuranceFormData {
  // Member Information
  firstName: string;
  middleInitial?: string | null;
  lastName: string;
  dateOfBirth: Date;
  streetAddress: string;
  aptUnit?: string | null;
  city: string;
  state: string;
  zipCode: string;
  socialSecurity: string;
  primaryPhone: string;
  secondaryPhone?: string | null;
  gender: string;
  email: string;
  
  // Coverage Selection
  coverageAmount: string;
  
  // Children Coverage
  enrollChildrenCoverage: boolean;
  
  // Dependent Information (up to 4 dependents)
  dependents?: Array<{
    name: string;
    gender: string;
    dateOfBirth: string;
    socialSecurity: string;
  }> | null;
  
  // Beneficiary Designation - Primary
  primaryBeneficiaryName?: string | null;
  primaryBeneficiarySSN?: string | null;
  primaryBeneficiaryDOB?: Date | null;
  primaryBeneficiaryRelationship?: string | null;
  primaryBeneficiaryPercentage?: string | null;
  primaryBeneficiaryAddress?: string | null;
  primaryBeneficiaryPhone?: string | null;
  
  // Beneficiary Designation - Contingent
  contingentBeneficiaryName?: string | null;
  contingentBeneficiarySSN?: string | null;
  contingentBeneficiaryDOB?: Date | null;
  contingentBeneficiaryRelationship?: string | null;
  contingentBeneficiaryPercentage?: string | null;
  contingentBeneficiaryAddress?: string | null;
  contingentBeneficiaryPhone?: string | null;
  
  // Additional Contingent Beneficiary
  contingent2BeneficiaryName?: string | null;
  contingent2BeneficiarySSN?: string | null;
  contingent2BeneficiaryDOB?: Date | null;
  contingent2BeneficiaryRelationship?: string | null;
  contingent2BeneficiaryPercentage?: string | null;
  contingent2BeneficiaryAddress?: string | null;
  contingent2BeneficiaryPhone?: string | null;
  
  // Existing Life Insurance
  hasExistingPolicy: boolean;
  
  // Member Signature and Date
  signatureDate: Date;
}

export interface MembershipFormData {
  fullName: string;
  dateOfBirth: Date;
  gender?: string | null;
  phoneNumber: string;
  emailAddress: string;
  occupation: string;
  otherExpertiseHobby?: string | null;
  streetAddress: string;
  cityStateZipCode: string;
  numberOfFamilyMembers?: string | null;
  spousePartnerName?: string | null;
  childrenNamesAges?: string | null;
  wantPaidMembership?: string | null;
  preferredPaymentMethod?: string | null;
  membershipFee?: string | null;
  culturalEvents?: boolean;
  networkingOpportunities?: boolean;
  volunteerOpportunities?: boolean;
  professionalDevelopment?: boolean;
  otherInterests?: string | null;
  eventPlanning?: boolean;
  itTechnology?: boolean;
  fundraising?: boolean;
  otherSkills?: string | null;
  howDidYouHear?: string | null;
  comments?: string | null;
  consentToStore?: boolean;
}

export class PDFGenerator {
  static async generateInsurancePDF(data: InsuranceFormData, insuranceType: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 40, size: 'A4' });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });

      // Helper function to draw checkbox
      const drawCheckbox = (x: number, y: number, checked: boolean = false) => {
        doc.rect(x, y, 8, 8).stroke();
        if (checked) {
          doc.fontSize(8);
          doc.text('✓', x + 1, y - 1);
        }
      };

      try {
        // Header matching Hartford Life Insurance form exactly
        doc.fontSize(12).font('Helvetica-Bold').text('HARTFORD LIFE AND ACCIDENT INSURANCE COMPANY', { align: 'center' });
        doc.fontSize(10).font('Helvetica').text('One Hartford Plaza', { align: 'center' });
        doc.text('Hartford, Connecticut 06155', { align: 'center' });
        doc.text('(A Stock Insurance Company)', { align: 'center' });
        doc.moveDown(0.5);

        // Program Title with exact formatting
        doc.fontSize(12).font('Helvetica-Bold').text('Cultural Group Benefits Insurance Program', { align: 'center' });
        doc.fontSize(11).text('Enrollment Form Group Term Life Insurance Plan', { align: 'center' });
        doc.moveDown(0.5);

        // Policy Information Section - exact table layout
        doc.fontSize(9).font('Helvetica');
        
        // Draw table structure for policy info
        const tableTop = doc.y;
        const leftCol = 50;
        const rightCol = 320;
        
        // Left column - Policyholder name
        doc.text('Policyholder Name:', leftCol, tableTop);
        doc.text('Cultural Group Insurance Trust (CGI)', leftCol, tableTop + 12);
        
        // Right column - Group info
        doc.text('Group Billing #: 3440', rightCol, tableTop);
        doc.text('Group Policy #: AGL1942', rightCol, tableTop + 12);
        doc.text('Participating Organization of:', rightCol, tableTop + 24);
        doc.text('Zambians in Northern California (ZANC)', rightCol, tableTop + 36);
        
        // Draw lines around policy info
        doc.moveTo(leftCol - 5, tableTop - 5).lineTo(rightCol + 200, tableTop - 5).stroke();
        doc.moveTo(leftCol - 5, tableTop + 50).lineTo(rightCol + 200, tableTop + 50).stroke();
        doc.moveTo(leftCol - 5, tableTop - 5).lineTo(leftCol - 5, tableTop + 50).stroke();
        doc.moveTo(rightCol + 200, tableTop - 5).lineTo(rightCol + 200, tableTop + 50).stroke();
        doc.moveTo(rightCol - 10, tableTop - 5).lineTo(rightCol - 10, tableTop + 50).stroke();
        
        doc.y = tableTop + 60;

        // MEMBER Section with table layout
        doc.fontSize(11).font('Helvetica-Bold').text('MEMBER', leftCol);
        doc.moveDown(0.3);
        
        // Member information table
        doc.fontSize(8).font('Helvetica');
        const memberTableTop = doc.y;
        
        // Headers row
        doc.text('First Name', leftCol, memberTableTop);
        doc.text('M.I.', leftCol + 100, memberTableTop);
        doc.text('Last Name', leftCol + 130, memberTableTop);
        doc.text('Date of Birth', leftCol + 230, memberTableTop);
        doc.text('Sex', leftCol + 320, memberTableTop);
        doc.text('Social Security No.', leftCol + 350, memberTableTop);
        
        // Draw header line
        doc.moveTo(leftCol, memberTableTop + 10).lineTo(leftCol + 450, memberTableTop + 10).stroke();
        
        // Data row
        const dataY = memberTableTop + 15;
        doc.text(data.firstName || '', leftCol, dataY);
        doc.text(data.middleInitial || '', leftCol + 100, dataY);
        doc.text(data.lastName || '', leftCol + 130, dataY);
        doc.text(data.dateOfBirth ? data.dateOfBirth.toLocaleDateString('en-US') : '', leftCol + 230, dataY);
        doc.text(data.gender || '', leftCol + 320, dataY);
        doc.text(data.socialSecurity || '', leftCol + 350, dataY);
        
        // Address section
        doc.y = dataY + 20;
        doc.text('Street Address:', leftCol);
        doc.text(data.streetAddress || '', leftCol + 70);
        doc.moveDown(0.3);
        
        const addressY = doc.y;
        doc.text('City:', leftCol, addressY);
        doc.text(data.city || '', leftCol + 30, addressY);
        doc.text('State:', leftCol + 150, addressY);
        doc.text(data.state || '', leftCol + 175, addressY);
        doc.text('Zip Code:', leftCol + 210, addressY);
        doc.text(data.zipCode || '', leftCol + 250, addressY);
        doc.text('Phone:', leftCol + 300, addressY);
        doc.text(data.primaryPhone || '', leftCol + 330, addressY);
        
        doc.moveDown(0.5);
        doc.text('Email:', leftCol);
        doc.text(data.email || '', leftCol + 35);
        
        doc.moveDown(1);

        // MEMBER COVERAGE Section with table
        doc.fontSize(10).font('Helvetica-Bold').text('MEMBER COVERAGE', leftCol);
        doc.moveDown(0.3);
        doc.fontSize(8).font('Helvetica');
        
        // Coverage table headers
        const covTableY = doc.y;
        doc.text('Coverage', leftCol, covTableY);
        doc.text('Proposed Benefit Amount', leftCol + 150, covTableY);
        doc.text('Current Benefit Amount', leftCol + 300, covTableY);
        
        // Table line
        doc.moveTo(leftCol, covTableY + 10).lineTo(leftCol + 450, covTableY + 10).stroke();
        
        // Coverage data
        const covDataY = covTableY + 15;
        doc.text('Life Insurance', leftCol, covDataY);
        doc.text(`$${data.coverageAmount || '0'}`, leftCol + 150, covDataY);
        doc.text('$0', leftCol + 300, covDataY);
        
        doc.moveDown(1.5);

        // CHILDREN COVERAGE Section
        doc.fontSize(10).font('Helvetica-Bold').text('CHILDREN COVERAGE', leftCol);
        doc.moveDown(0.3);
        doc.fontSize(8).font('Helvetica');
        
        const childrenY = doc.y;
        doc.text('Do you wish to enroll in coverage for children?', leftCol, childrenY);
        
        // Yes/No checkboxes
        drawCheckbox(leftCol + 250, childrenY - 2, data.enrollChildrenCoverage);
        doc.text('Yes', leftCol + 265, childrenY);
        drawCheckbox(leftCol + 300, childrenY - 2, !data.enrollChildrenCoverage);
        doc.text('No', leftCol + 315, childrenY);
        
        doc.moveDown(0.5);
        
        // Children details table if applicable
        if (data.enrollChildrenCoverage && data.dependents && data.dependents.length > 0) {
          const childTableY = doc.y;
          doc.text('Child Name', leftCol, childTableY);
          doc.text('Date of Birth', leftCol + 120, childTableY);
          doc.text('Sex', leftCol + 220, childTableY);
          doc.text('Social Security No.', leftCol + 250, childTableY);
          
          doc.moveTo(leftCol, childTableY + 10).lineTo(leftCol + 400, childTableY + 10).stroke();
          
          let childY = childTableY + 15;
          data.dependents.forEach((dependent, index) => {
            if (dependent.name && dependent.name.trim() !== '' && index < 4) {
              doc.text(dependent.name, leftCol, childY);
              doc.text(dependent.dateOfBirth || '', leftCol + 120, childY);
              doc.text(dependent.gender || '', leftCol + 220, childY);
              doc.text(dependent.socialSecurity || '', leftCol + 250, childY);
              childY += 12;
            }
          });
          doc.y = childY + 5;
        } else {
          doc.moveDown(0.5);
        }

        // BENEFICIARY DESIGNATION Section
        doc.fontSize(10).font('Helvetica-Bold').text('BENEFICIARY DESIGNATION', leftCol);
        doc.moveDown(0.3);
        doc.fontSize(7).font('Helvetica');
        doc.text('You must select your beneficiary - the person (or more than one person) or legal entity who receives a benefit payment.', leftCol);
        doc.moveDown(0.3);

        // Primary Beneficiary Table
        doc.fontSize(8).font('Helvetica-Bold').text('Primary Beneficiary:', leftCol);
        doc.moveDown(0.2);
        doc.fontSize(7).font('Helvetica');
        
        const benTableY = doc.y;
        doc.text('Name', leftCol, benTableY);
        doc.text('Date of Birth', leftCol + 120, benTableY);
        doc.text('Sex', leftCol + 200, benTableY);
        doc.text('Social Security No.', leftCol + 220, benTableY);
        doc.text('Percent', leftCol + 320, benTableY);
        doc.text('Relationship', leftCol + 360, benTableY);
        
        doc.moveTo(leftCol, benTableY + 8).lineTo(leftCol + 450, benTableY + 8).stroke();
        
        const benDataY = benTableY + 12;
        doc.text(data.primaryBeneficiaryName || 'None', leftCol, benDataY);
        doc.text(data.primaryBeneficiaryDOB ? data.primaryBeneficiaryDOB.toLocaleDateString('en-US') : 'None', leftCol + 120, benDataY);
        doc.text('', leftCol + 200, benDataY); // Sex not in our form
        doc.text(data.primaryBeneficiarySSN || 'None', leftCol + 220, benDataY);
        doc.text(data.primaryBeneficiaryPercentage || '100', leftCol + 320, benDataY);
        doc.text(data.primaryBeneficiaryRelationship || 'None', leftCol + 360, benDataY);
        
        doc.moveDown(0.8);
        doc.text('Address:', leftCol);
        doc.text(data.primaryBeneficiaryAddress || 'None', leftCol + 40);
        doc.moveDown(0.3);
        doc.text('Phone:', leftCol);
        doc.text(data.primaryBeneficiaryPhone || 'None', leftCol + 30);

        doc.moveDown(0.8);

        // Contingent Beneficiary if provided
        if (data.contingentBeneficiaryName && data.contingentBeneficiaryName.trim() !== '') {
          doc.fontSize(8).font('Helvetica-Bold').text('Contingent Beneficiary:', leftCol);
          doc.moveDown(0.2);
          doc.fontSize(7).font('Helvetica');
          
          const contBenTableY = doc.y;
          doc.text('Name', leftCol, contBenTableY);
          doc.text('Date of Birth', leftCol + 120, contBenTableY);
          doc.text('Sex', leftCol + 200, contBenTableY);
          doc.text('Social Security No.', leftCol + 220, contBenTableY);
          doc.text('Percent', leftCol + 320, contBenTableY);
          doc.text('Relationship', leftCol + 360, contBenTableY);
          
          doc.moveTo(leftCol, contBenTableY + 8).lineTo(leftCol + 450, contBenTableY + 8).stroke();
          
          const contBenDataY = contBenTableY + 12;
          doc.text(data.contingentBeneficiaryName, leftCol, contBenDataY);
          doc.text(data.contingentBeneficiaryDOB ? data.contingentBeneficiaryDOB.toLocaleDateString('en-US') : 'None', leftCol + 120, contBenDataY);
          doc.text('', leftCol + 200, contBenDataY);
          doc.text(data.contingentBeneficiarySSN || 'None', leftCol + 220, contBenDataY);
          doc.text(data.contingentBeneficiaryPercentage || '100', leftCol + 320, contBenDataY);
          doc.text(data.contingentBeneficiaryRelationship || 'None', leftCol + 360, contBenDataY);
          
          doc.moveDown(0.8);
          doc.text('Address:', leftCol);
          doc.text(data.contingentBeneficiaryAddress || 'None', leftCol + 40);
          doc.moveDown(0.3);
          doc.text('Phone:', leftCol);
          doc.text(data.contingentBeneficiaryPhone || 'None', leftCol + 30);
          
          doc.moveDown(0.8);
        }

        // Check if we need a new page
        if (doc.y > 650) {
          doc.addPage();
        }

        // EXISTING LIFE INSURANCE POLICY Section
        doc.fontSize(10).font('Helvetica-Bold').text('EXISTING LIFE INSURANCE POLICY', leftCol);
        doc.moveDown(0.3);
        doc.fontSize(8).font('Helvetica');
        doc.text('By applying for this insurance, do you intend to replace, discontinue, or change', leftCol);
        doc.text('an existing policy of life insurance?', leftCol);
        
        const existingPolicyY = doc.y + 5;
        drawCheckbox(leftCol, existingPolicyY, !data.hasExistingPolicy);
        doc.text('No', leftCol + 15, existingPolicyY + 2);
        drawCheckbox(leftCol + 60, existingPolicyY, data.hasExistingPolicy);
        doc.text('Yes', leftCol + 75, existingPolicyY + 2);
        
        doc.moveDown(1);

        // MEMBER SIGNATURE Section
        doc.fontSize(10).font('Helvetica-Bold').text('MEMBER SIGNATURE', leftCol);
        doc.moveDown(0.3);
        doc.fontSize(8).font('Helvetica');
        doc.text('Member Signature (Required to activate coverage):', leftCol);
        doc.moveDown(0.3);
        
        // Signature line
        doc.moveTo(leftCol, doc.y).lineTo(leftCol + 200, doc.y).stroke();
        doc.text('[Digital Signature Applied]', leftCol, doc.y + 5);
        
        doc.moveDown(0.8);
        doc.text('Date:', leftCol);
        doc.text(data.signatureDate ? data.signatureDate.toLocaleDateString('en-US') : new Date().toLocaleDateString('en-US'), leftCol + 30);
        
        doc.moveDown(1);

        // NOTIFICATION Section
        doc.fontSize(10).font('Helvetica-Bold').text('NOTIFICATION', leftCol);
        doc.moveDown(0.3);
        doc.fontSize(7).font('Helvetica');
        doc.text('I have the opportunity to enroll in the Hartford Life and Accident Insurance Company Group Term Life Insurance Plan (AGL1942). I understand that the above statement will be used to determine my eligibility for insurance under this Group Plan. I understand that any person who knowingly and willfully presents false information on the application is committing a criminal act and may be subject to penalties which may include imprisonment, fines, and suspension or revocation of the coverage, within the contestable period of such misrepresentation materially affects acceptance of the risk.', leftCol, doc.y, { width: 500 });
        
        doc.moveDown(0.8);

        // Footer information
        doc.fontSize(7).font('Helvetica');
        doc.text('Life Form Series includes GBD-1300, GBD-1100, or state equivalent.', leftCol);
        doc.text('CGB 01-2017 (3)', leftCol);
        
        doc.moveDown(0.5);
        doc.fontSize(7).fillColor('#666666');
        doc.text(`Application generated on: ${new Date().toLocaleString('en-US')}`, { align: 'center' });

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  static async generateMembershipPDF(data: MembershipFormData, membershipType: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });

      try {
        // Header matching the official form
        doc.fontSize(16).text('ZANC Membership Intake Form', { align: 'center' });
        doc.moveDown();
        
        doc.fontSize(10);
        doc.text('Thank you for your interest in joining the Zambian Association in Northern California (ZANC).', { align: 'center' });
        doc.text('Whether you choose to pay the membership fee or simply connect with our vibrant community,', { align: 'center' });
        doc.text('we are excited to welcome you.', { align: 'center' });
        doc.moveDown();
        doc.text('Please fill out the form below.', { align: 'center' });
        doc.moveDown();
        doc.font('Helvetica-Oblique').text('*** If you wish to take advantage of membership benefits, you may submit the membership', { align: 'center' });
        doc.text('fee after completing this form.', { align: 'center' });
        doc.font('Helvetica');
        doc.moveDown(2);

        // Personal Information Section
        doc.fontSize(12).fillColor('#000000').text('Personal Information');
        doc.moveDown(0.5);
        doc.fontSize(10);
        
        doc.text(`1. Full Name: ${data.fullName}`);
        doc.moveDown(0.3);
        doc.text(`2. Date of Birth: ${data.dateOfBirth.toLocaleDateString()}`);
        doc.moveDown(0.3);
        doc.text(`3. Gender: ${data.gender ? `☑ ${data.gender}` : '☐ Male ☐ Female ☐ Prefer not to say'}`);
        doc.moveDown(0.3);
        doc.text(`4. Phone Number: ${data.phoneNumber}`);
        doc.moveDown(0.3);
        doc.text(`5. Email Address: ${data.emailAddress}`);
        doc.moveDown(0.3);
        doc.text(`6. Occupation: ${data.occupation}`);
        doc.moveDown(0.3);
        doc.text(`7. Other (Expertise or hobby): ${data.otherExpertiseHobby || '_'.repeat(40)}`);
        doc.moveDown(1);

        // Residential Information Section
        doc.fontSize(12).text('Residential Information');
        doc.moveDown(0.5);
        doc.fontSize(10);
        
        doc.text(`8. Street Address: ${data.streetAddress}`);
        doc.moveDown(0.3);
        doc.text(`9. City, State, ZIP Code: ${data.cityStateZipCode}`);
        doc.moveDown(1);

        // Family Information Section (Optional)
        doc.fontSize(12).text('Family Information (Optional)');
        doc.moveDown(0.5);
        doc.fontSize(10);
        
        doc.text(`10. Number of Family Members in Household: ${data.numberOfFamilyMembers || '_'.repeat(20)}`);
        doc.moveDown(0.3);
        doc.text(`11. Spouse/Partner's Name (if applicable): ${data.spousePartnerName || '_'.repeat(30)}`);
        doc.moveDown(0.3);
        doc.text(`12. Children's Names and Ages (if applicable): ${data.childrenNamesAges || '_'.repeat(40)}`);
        doc.moveDown(1);

        // Membership Interest Section
        doc.fontSize(12).text('Membership Interest');
        doc.moveDown(0.5);
        doc.fontSize(10);
        
        doc.text('13. Would you like to become a paid member of ZANC?');
        doc.text(`   ${data.wantPaidMembership === 'yes' ? '☑' : '☐'} Yes, I would like to pay the membership fee to access benefits.`);
        doc.text(`   ${data.wantPaidMembership === 'no' ? '☑' : '☐'} No, I'd prefer to connect without a paid membership.`);
        doc.moveDown(0.5);
        
        doc.text('14. Preferred Membership Payment Method (for paid members):');
        doc.text(`   ${data.preferredPaymentMethod === 'Zelle/Venmo' ? '☑' : '☐'} Zelle/Venmo`);
        doc.text(`   ${data.preferredPaymentMethod === 'PayPal' ? '☑' : '☐'} PayPal`);
        doc.text(`   ${data.preferredPaymentMethod === 'Cash/Check' ? '☑' : '☐'} Cash/Check`);
        doc.moveDown(0.5);
        
        doc.text('15. Membership Fee (if applicable):');
        doc.text(`   • Individual (18 and over): $120/year    |    $100 if paid by March 15th`);
        doc.text(`   • Family: $180/year    |    $150 if paid by March 15th`);
        doc.moveDown(1);

        // Areas of Interest/Skills Section
        doc.fontSize(12).text('Areas of Interest/Skills');
        doc.moveDown(0.5);
        doc.fontSize(10);
        
        doc.text('16. What areas of ZANC activities interest you most? (Select all that apply)');
        doc.text(`   ${data.culturalEvents ? '☑' : '☐'} Cultural Events`);
        doc.text(`   ${data.networkingOpportunities ? '☑' : '☐'} Networking Opportunities`);
        doc.text(`   ${data.volunteerOpportunities ? '☑' : '☐'} Volunteer Opportunities`);
        doc.text(`   ${data.professionalDevelopment ? '☑' : '☐'} Professional Development`);
        doc.text(`   ☐ Other: ${data.otherInterests || '_'.repeat(40)}`);
        doc.moveDown(0.5);
        
        doc.text('17. Do you have any skills or resources you\'d like to contribute to ZANC?');
        doc.text(`   ${data.eventPlanning ? '☑' : '☐'} Event Planning`);
        doc.text(`   ${data.itTechnology ? '☑' : '☐'} IT/Technology`);
        doc.text(`   ${data.fundraising ? '☑' : '☐'} Fundraising`);
        doc.text(`   ☐ Other: ${data.otherSkills || '_'.repeat(40)}`);
        doc.moveDown(1);

        // Additional Information Section
        doc.fontSize(12).text('Additional Information');
        doc.moveDown(0.5);
        doc.fontSize(10);
        
        doc.text('18. How did you hear about ZANC?');
        doc.text(`   ${data.howDidYouHear === 'Friend/Family' ? '☑' : '☐'} Friend/Family`);
        doc.text(`   ${data.howDidYouHear === 'Social Media' ? '☑' : '☐'} Social Media`);
        doc.text(`   ${data.howDidYouHear === 'Event' ? '☑' : '☐'} Event`);
        doc.text(`   ${data.howDidYouHear === 'Other' ? '☑' : '☐'} Other: ${'_'.repeat(30)}`);
        doc.moveDown(0.5);
        
        doc.text('19. Comments or Suggestions:');
        if (data.comments) {
          const lines = doc.heightOfString(data.comments, { width: 500 });
          doc.text(data.comments, { width: 500 });
        } else {
          doc.text('_'.repeat(80));
          doc.moveDown(0.3);
          doc.text('_'.repeat(80));
        }
        doc.moveDown(1);

        // Payment Instructions Section
        doc.fontSize(12).text('Payment Instructions (for paid members only)');
        doc.moveDown(0.5);
        doc.fontSize(10);
        
        doc.text('• Please submit your membership payment via [Zelle, PayPal, etc.]');
        doc.text('• Include your full name in the payment reference.');
        doc.moveDown(1);

        // Consent Section
        doc.fontSize(12).text('Consent');
        doc.moveDown(0.5);
        doc.fontSize(10);
        
        doc.text(`${data.consentToStore ? '☑' : '☐'} I consent to my information being stored by ZANC for community engagement purposes only.`);
        doc.moveDown(2);

        // Footer matching the official form
        doc.fontSize(8).fillColor('#666666');
        doc.text('ZANC Membership Intake Form        2025        zancsac@gmail.com', { align: 'center' });

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }
}
