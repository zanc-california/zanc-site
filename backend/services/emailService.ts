import nodemailer from 'nodemailer';
import prisma from '../prisma';
import { PDFGenerator } from './pdfGenerator';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendApplicationEmails = async (orderId: number): Promise<void> => {
  try {
    console.log(`Attempting to send emails for order ${orderId}`);
    
    // Fetch order with applications
    const order = await prisma.combinedOrder.findUnique({
      where: { id: orderId },
      include: {
        insuranceApplication: true,
        membershipApplication: true
      }
    });

    if (!order) {
      throw new Error('Order not found');
    }

    console.log('Order found:', order.id);

    const attachments = [];
    const isManualPayment = order.status === 'MANUAL_PAYMENT';
    
    let emailContent = `
      <h2>New ZANC Application Received</h2>
      <p><strong>Order ID:</strong> ${order.id}</p>
      <p><strong>User Email:</strong> ${order.userEmail}</p>
      <p><strong>Total Amount:</strong> $${order.totalAmount}</p>
      <p><strong>Payment Status:</strong> ${isManualPayment ? 'Manual Payment Pending' : order.status}</p>
      ${isManualPayment ? '<p><strong>Note:</strong> Customer will pay using alternative methods (Zelle, Bank Transfer, or Venmo) and send receipt to (714) 592-9143</p>' : ''}
      <hr>
    `;

    // Generate Insurance PDF if insurance application exists
    if (order.insuranceApplication && order.insuranceType) {
      console.log('Generating insurance PDF...');
      
      // Transform the database record to match the PDF generator interface
      const insuranceFormData = {
        ...order.insuranceApplication,
        dependents: order.insuranceApplication.dependents as Array<{
          name: string;
          gender: string;
          dateOfBirth: string;
          socialSecurity: string;
        }> | null
      };
      
      const insurancePdf = await PDFGenerator.generateInsurancePDF(
        insuranceFormData,
        order.insuranceType
      );
      
      attachments.push({
        filename: `insurance-application-${order.id}.pdf`,
        content: insurancePdf,
        contentType: 'application/pdf'
      });

      emailContent += `
        <h3>Insurance Application Details</h3>
        <p><strong>Type:</strong> ${order.insuranceType}</p>
        <p><strong>Price:</strong> $${order.insurancePrice}</p>
        <p><strong>Applicant:</strong> ${order.insuranceApplication.firstName} ${order.insuranceApplication.middleInitial || ''} ${order.insuranceApplication.lastName}</p>
        <p><strong>Email:</strong> ${order.insuranceApplication.email}</p>
        <p><strong>Phone:</strong> ${order.insuranceApplication.primaryPhone}</p>
        <p><strong>Coverage Amount:</strong> $${order.insuranceApplication.coverageAmount}</p>
        <p><strong>Primary Beneficiary:</strong> ${order.insuranceApplication.primaryBeneficiaryName || 'N/A'}</p>
        <hr>
      `;
    }

    // Generate Membership PDF if membership application exists
    if (order.membershipApplication && order.membershipType) {
      console.log('Generating membership PDF...');
      const membershipPdf = await PDFGenerator.generateMembershipPDF(
        order.membershipApplication,
        order.membershipType
      );
      
      attachments.push({
        filename: `membership-application-${order.id}.pdf`,
        content: membershipPdf,
        contentType: 'application/pdf'
      });

      emailContent += `
        <h3>Membership Application Details</h3>
        <p><strong>Type:</strong> ${order.membershipType}</p>
        <p><strong>Price:</strong> $${order.membershipPrice}</p>
        <p><strong>Applicant:</strong> ${order.membershipApplication.fullName}</p>
        <p><strong>Email:</strong> ${order.membershipApplication.emailAddress}</p>
        <p><strong>Phone:</strong> ${order.membershipApplication.phoneNumber}</p>
        <p><strong>Occupation:</strong> ${order.membershipApplication.occupation}</p>
      `;
    }

    emailContent += `
      <hr>
      <p><em>Generated automatically on ${new Date().toLocaleString()}</em></p>
    `;

    console.log('Sending admin email...');
    // Send email to admin
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `ZANC - New Application ${isManualPayment ? '(Manual Payment)' : ''} - Order #${order.id}`,
      html: emailContent,
      attachments: attachments
    };

    await transporter.sendMail(mailOptions);
    console.log('Admin email sent successfully');

    console.log('Sending user confirmation email...');
    // Send confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: order.userEmail,
      subject: `ZANC - Application ${isManualPayment ? 'Submitted' : 'Received'} - Thank You!`,
      html: `
        <h2>Thank you for your ZANC Application!</h2>
        <p>Dear Applicant,</p>
        <p>We have received your application${isManualPayment ? '' : ' and payment'}. Here are the details:</p>
        <ul>
          <li><strong>Order ID:</strong> ${order.id}</li>
          <li><strong>Total Amount${isManualPayment ? ' Due' : ' Paid'}:</strong> $${order.totalAmount}</li>
          ${order.membershipType ? `<li><strong>Membership:</strong> ${order.membershipType}</li>` : ''}
          ${order.insuranceType ? `<li><strong>Insurance:</strong> ${order.insuranceType}</li>` : ''}
        </ul>
        ${isManualPayment ? `
          <div style="background-color: #FEF3C7; border: 1px solid #F59E0B; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h3 style="color: #92400E; margin-top: 0;">Complete Your Payment</h3>
            <p><strong>Payment Methods:</strong></p>
            <ul>
              <li><strong>Zelle:</strong> zancsac@gmail.com</li>
              <li><strong>Bank Transfer:</strong> Wells Fargo Account #7185547853</li>
              <li><strong>Venmo:</strong> @Zanc-Sacramento</li>
            </ul>
            <p style="color: #92400E;"><strong>Important:</strong> After payment, send a screenshot or photo of your receipt to: <strong>(714) 592-9143</strong></p>
          </div>
        ` : ''}
        <p>Our team will review your application${isManualPayment ? ' once payment is verified' : ''} and contact you if any additional information is needed.</p>
        <p>Welcome to the Zambian Association of North Carolina!</p>
        <hr>
        <p><em>This is an automated confirmation email.</em></p>
      `
    };

    await transporter.sendMail(userMailOptions);
    console.log('User confirmation email sent successfully');

    console.log(`All application emails sent successfully for order ${orderId}`);
  } catch (error) {
    console.error('Error sending application emails:', error);
    throw error;
  }
};

const sendTestEmail = async (): Promise<void> => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'ZANC - Email Service Test',
      html: `
        <h2>Email Service Test</h2>
        <p>This is a test email to verify the email service is working correctly.</p>
        <p>Time: ${new Date().toLocaleString()}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Test email sent successfully');
  } catch (error) {
    console.error('Error sending test email:', error);
    throw error;
  }
};

module.exports = {
  sendApplicationEmails,
  sendTestEmail
};
