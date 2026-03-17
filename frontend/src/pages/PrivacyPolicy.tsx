import React from 'react';
import PageHeader from '../components/PageHeader';

const PrivacyPolicy = () => {
  return (
    <div>
      <PageHeader title="Privacy Policy" />
      
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p>
              Last updated: June 1, 2025
            </p>
            
            <h2>Introduction</h2>
            <p>
              The Zambian Association in Northern California ("ZANC", "we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website, use our services, or interact with us in any way.
            </p>
            
            <h2>Information We Collect</h2>
            <p>
              We may collect the following types of information:
            </p>
            <ul>
              <li>Personal identification information (name, email address, phone number, etc.)</li>
              <li>Contact information</li>
              <li>Membership information</li>
              <li>Donation information</li>
              <li>Event participation information</li>
              <li>Website usage data</li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect for various purposes, including:
            </p>
            <ul>
              <li>To provide and maintain our services</li>
              <li>To notify you about changes to our services</li>
              <li>To allow you to participate in interactive features of our services</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our services</li>
              <li>To monitor the usage of our services</li>
              <li>To detect, prevent, and address technical issues</li>
              <li>To process membership applications and renewals</li>
              <li>To organize events and communicate with participants</li>
            </ul>
            
            <h2>Data Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers.
            </p>
            
            <h2>Data Security</h2>
            <p>
              We implement appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our site.
            </p>
            
            <h2>Your Data Protection Rights</h2>
            <p>
              Under data protection laws, you have rights including:
            </p>
            <ul>
              <li><strong>Right to access</strong> - You have the right to request copies of your personal data.</li>
              <li><strong>Right to rectification</strong> - You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
              <li><strong>Right to erasure</strong> - You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><strong>Right to restrict processing</strong> - You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
              <li><strong>Right to object to processing</strong> - You have the right to object to our processing of your personal data, under certain conditions.</li>
              <li><strong>Right to data portability</strong> - You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>
            
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul>
              <li>Email: privacy@zanc.org</li>
              <li>Phone: (123) 456-7890</li>
              <li>Mail: 123 Zambian Lane, San Francisco, CA 94103</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;