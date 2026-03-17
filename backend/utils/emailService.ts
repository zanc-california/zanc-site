import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Create transporter (configure based on your email service)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (options: EmailOptions) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || 'ZANC <noreply@zanc.org>',
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const sendMembershipApprovalEmail = async (userEmail: string, userName: string) => {
  const subject = 'Your ZANC Membership Application has been Approved! 🎉';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="${process.env.FRONTEND_URL}/images/logo.jpg" alt="ZANC Logo" style="width: 60px; height: 60px; border-radius: 50%;">
        <h1 style="color: #1e40af; margin-top: 10px;">Welcome to ZANC!</h1>
      </div>
      
      <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #1e40af; margin-top: 0;">Congratulations, ${userName}!</h2>
        <p style="color: #374151; line-height: 1.6;">
          We're thrilled to inform you that your membership application has been <strong>approved</strong>! 
          You are now an official member of the Association of Zambians in California (ZANC).
        </p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h3 style="color: #1e40af;">What's Next?</h3>
        <ul style="color: #374151; line-height: 1.6;">
          <li>Access to all ZANC events and cultural activities</li>
          <li>Networking opportunities with fellow Zambians in California</li>
          <li>Participation in community initiatives and charitable projects</li>
          <li>Exclusive member-only resources and updates</li>
        </ul>
      </div>
      
      <div style="background-color: #fef3c7; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
        <p style="color: #92400e; margin: 0;">
          <strong>Important:</strong> Please log in to your account to access all member benefits and stay updated on upcoming events.
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="${process.env.FRONTEND_URL}" style="background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Visit ZANC Website
        </a>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
        <p>Best regards,<br>The ZANC Team</p>
        <p style="font-size: 12px;">
          Association of Zambians in California<br>
          Email: contact@zanc.org<br>
          Website: ${process.env.FRONTEND_URL}
        </p>
      </div>
    </div>
  `;

  await sendEmail({
    to: userEmail,
    subject,
    html,
  });
};

export const sendMembershipRejectionEmail = async (userEmail: string, userName: string, reason?: string) => {
  const subject = 'Update on Your ZANC Membership Application';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="${process.env.FRONTEND_URL}/images/logo.jpg" alt="ZANC Logo" style="width: 60px; height: 60px; border-radius: 50%;">
        <h1 style="color: #1e40af; margin-top: 10px;">ZANC Membership Application Update</h1>
      </div>
      
      <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #dc2626; margin-top: 0;">Dear ${userName},</h2>
        <p style="color: #374151; line-height: 1.6;">
          Thank you for your interest in joining the Association of Zambians in California (ZANC). 
          After careful review, we regret to inform you that your membership application cannot be approved at this time.
        </p>
        
        ${reason ? `
          <div style="background-color: #fff; padding: 15px; border-radius: 6px; margin: 15px 0;">
            <h4 style="color: #dc2626; margin-top: 0;">Reason:</h4>
            <p style="color: #374151; margin-bottom: 0;">${reason}</p>
          </div>
        ` : ''}
      </div>
      
      <div style="margin-bottom: 30px;">
        <h3 style="color: #1e40af;">What Can You Do?</h3>
        <ul style="color: #374151; line-height: 1.6;">
          <li>Contact us directly to discuss your application</li>
          <li>Address any concerns mentioned in the feedback</li>
          <li>Reapply in the future when circumstances change</li>
          <li>Stay connected with our community through public events</li>
        </ul>
      </div>
      
      <div style="background-color: #e0f2fe; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
        <p style="color: #0277bd; margin: 0;">
          <strong>We appreciate your interest in ZANC</strong> and encourage you to stay engaged with our community. 
          Many of our events are open to all members of the Zambian diaspora.
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="${process.env.FRONTEND_URL}/contact" style="background-color: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Contact Us
        </a>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
        <p>Best regards,<br>The ZANC Team</p>
        <p style="font-size: 12px;">
          Association of Zambians in California<br>
          Email: contact@zanc.org<br>
          Website: ${process.env.FRONTEND_URL}
        </p>
      </div>
    </div>
  `;

  await sendEmail({
    to: userEmail,
    subject,
    html,
  });
};
