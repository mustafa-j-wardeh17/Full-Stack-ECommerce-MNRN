import React from 'react'

const PrivacyPolicy = () => {
    return (
      <section className="px-6 py-10 my-20 bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
        <h1 className="text-4xl font-bold text-center text-primary mb-8">
          Privacy Policy
        </h1>
        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <p>
            Welcome to ByteVault. Your privacy is important to us, and this Privacy Policy
            explains how we collect, use, and protect your information when you visit or
            interact with our website.
          </p>
  
          <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
          <ul className="list-disc list-inside">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone number,
              and billing details when you register, place an order, or contact us.
            </li>
            <li>
              <strong>Non-Personal Information:</strong> Browser type, device information,
              IP address, and pages visited for analytics purposes.
            </li>
          </ul>
  
          <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside">
            <li>To process your orders and payments securely.</li>
            <li>To provide personalized customer support.</li>
            <li>To send updates, promotions, or notifications you subscribe to.</li>
            <li>To improve our services through analytics and feedback.</li>
          </ul>
  
          <h2 className="text-2xl font-semibold">3. Cookies</h2>
          <p>
            We use cookies to enhance your browsing experience, save preferences, and
            track usage patterns. You can disable cookies in your browser settings, but
            some features may not work as intended.
          </p>
  
          <h2 className="text-2xl font-semibold">4. Sharing Your Information</h2>
          <p>
            We do not sell or rent your personal information. However, we may share it
            with third-party services for order processing, payment gateways (e.g.,
            Stripe), and email notifications (e.g., Nodemailer).
          </p>
  
          <h2 className="text-2xl font-semibold">5. Security</h2>
          <p>
            We implement robust security measures, including encryption and secure
            connections, to protect your data. However, no system is entirely foolproof.
          </p>
  
          <h2 className="text-2xl font-semibold">6. Your Rights</h2>
          <ul className="list-disc list-inside">
            <li>Access your personal data.</li>
            <li>Request corrections or updates to your information.</li>
            <li>Delete your account and associated data.</li>
            <li>
              Opt-out of marketing emails by following the unsubscribe link in
              communications.
            </li>
          </ul>
  
          <h2 className="text-2xl font-semibold">7. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible
            for their privacy practices or content. Please review their privacy policies.
          </p>
  
          <h2 className="text-2xl font-semibold">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy occasionally. Changes will be posted on this
            page with the effective date. Please review it periodically.
          </p>
  
          <h2 className="text-2xl font-semibold">9. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please
            contact us at:
          </p>
          <p>
            <strong>Email:</strong> <a href="mailto:mostafa.wardeh2000@gmail.com" className="text-primary underline">mostafa.wardeh2000@gmail.com</a>
          </p>
        </div>
      </section>
    );
  };
  
  export default PrivacyPolicy;
  