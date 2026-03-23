import React from 'react';
import PageHeader from '../components/PageHeader';

const PrivacyPolicy = () => {
  return (
    <div>
      <PageHeader title="Privacy Policy" />

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p>Last updated: March 22, 2026</p>

            <h2>Introduction</h2>
            <p>
              The Zambian Association in Northern California (&quot;ZANC&quot;, &quot;we&quot;, &quot;our&quot;, or
              &quot;us&quot;) respects your privacy. This policy explains what information we collect through this
              website, how we use it, and which third-party services help us operate the site.
            </p>

            <h2>Information We Collect</h2>
            <ul>
              <li>If you subscribe to updates, we collect your email address.</li>
              <li>
                If you submit a community suggestion, we collect your name, email address, selected
                category, and message.
              </li>
              <li>
                If an internal administrator signs in, authentication information is handled through
                Supabase.
              </li>
              <li>
                If you use a Stripe payment link, payment information is collected by Stripe and is not
                stored directly on this site.
              </li>
              <li>
                Our hosting and infrastructure providers may collect basic technical logs such as IP
                address, browser details, and request metadata for security and reliability.
              </li>
            </ul>

            <h2>How We Use Your Information</h2>
            <ul>
              <li>Send newsletters, updates, and announcements you requested.</li>
              <li>Review and respond to community suggestions.</li>
              <li>Operate and secure the site and admin tools.</li>
              <li>Monitor for spam, abuse, fraud, and technical issues.</li>
            </ul>

            <h2>Third-Party Services</h2>
            <p>We currently rely on the following providers to run the site:</p>
            <ul>
              <li>Vercel for hosting and serverless endpoints.</li>
              <li>Supabase for database, authentication, and storage.</li>
              <li>Stripe for hosted payment checkout links.</li>
              <li>Resend for email delivery when newsletter confirmations are enabled.</li>
            </ul>

            <h2>Data Sharing</h2>
            <p>
              We do not sell your personal information. We share information only with service providers
              needed to operate the site and with authorized internal administrators who manage ZANC
              communications and community workflows.
            </p>

            <h2>Data Security</h2>
            <p>
              We use reasonable administrative and technical safeguards to protect information submitted
              through the website. No internet-based system is completely secure, but we work to reduce
              unnecessary exposure and limit access appropriately.
            </p>

            <h2>Your Choices</h2>
            <p>
              You can ask us to update or delete information you submitted through the site by emailing
              us. You can also unsubscribe from email updates at any time using the instructions in those
              emails, when available.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we will update the date at
              the top of this page.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or your information, contact us at{' '}
              <a href="mailto:zancsac@gmail.com">zancsac@gmail.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
