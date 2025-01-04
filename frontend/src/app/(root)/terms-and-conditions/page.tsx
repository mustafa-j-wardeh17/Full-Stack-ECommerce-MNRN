import React from 'react';

const TermsAndConditions = () => {
  return (
    <section className="px-6 py-10 my-20 bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary/80">
          Terms and Conditions
        </h1>
        <p className="mb-6">
          Welcome to ByteVault. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read these carefully before using our services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing our website, you acknowledge that you have read, understood, and agree to these Terms and Conditions. If you do not agree, you must refrain from using our site.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Modifications to Terms</h2>
        <p className="mb-4">
          ByteVault reserves the right to revise these Terms and Conditions at any time without prior notice. Your continued use of the site signifies your acceptance of the updated terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Use of the Website</h2>
        <p className="mb-4">
          You agree to use our website for lawful purposes only. Any unauthorized use of this site may give rise to a claim for damages or be a criminal offense.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Intellectual Property</h2>
        <p className="mb-4">
          All content, logos, and designs on ByteVault are the property of ByteVault and are protected by intellectual property laws. Unauthorized reproduction is prohibited.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Product Information</h2>
        <p className="mb-4">
          We strive to ensure that all product descriptions and details are accurate. However, we do not warrant that product descriptions or other content are error-free.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">6. Payment and Billing</h2>
        <p className="mb-4">
          All transactions are securely processed. By making a purchase, you agree to provide accurate payment information and to honor the transaction.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">7. Limitation of Liability</h2>
        <p className="mb-4">
          ByteVault shall not be liable for any direct, indirect, or consequential damages arising from the use or inability to use our website.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">8. Governing Law</h2>
        <p className="mb-4">
          These terms are governed by and construed in accordance with the laws of [Your Country]. Any disputes shall be subject to the exclusive jurisdiction of the courts of [Your Country].
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">9. Contact Us</h2>
        <p className="mb-4">
          For any questions regarding these Terms and Conditions, please contact us at <a href="mailto:mostafa.wardeh2000@gmail.com" className="text-primary underline">mostafa.wardeh2000@gmail.com</a>.
        </p>

        <p className="text-sm text-center mt-8">
          © {new Date().getFullYear()} ByteVault. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default TermsAndConditions;
