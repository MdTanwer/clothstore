import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Modest Clothing Store",
  description:
    "Our privacy policy explaining how we collect, use, and protect your personal information in compliance with UK GDPR and data protection laws.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Privacy Policy
          </h1>

          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong>{" "}
            {new Date().toLocaleDateString("en-GB")}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Introduction
            </h2>
            <p>
              Modest Clothing Store ("we," "our," or "us") is committed to
              protecting your privacy and personal data. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you visit our website or make a purchase from us.
              This policy complies with the UK General Data Protection
              Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Information We Collect
            </h2>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Personal Information
            </h3>
            <ul className="list-disc pl-6 mb-4">
              <li>
                Name and contact information (email address, phone number)
              </li>
              <li>Billing and delivery addresses</li>
              <li>
                Payment information (processed securely by our payment
                providers)
              </li>
              <li>Order history and preferences</li>
              <li>Account credentials when you create an account</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Non-Personal Information
            </h3>
            <ul className="list-disc pl-6">
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>IP address and location data</li>
              <li>Website usage patterns and analytics</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. How We Use Your Information
            </h2>
            <p>
              We use your personal information for the following lawful
              purposes:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>
                <strong>Contract Performance:</strong> Processing and fulfilling
                your orders
              </li>
              <li>
                <strong>Legitimate Interest:</strong> Improving our services and
                customer experience
              </li>
              <li>
                <strong>Consent:</strong> Marketing communications (where you
                have opted in)
              </li>
              <li>
                <strong>Legal Obligation:</strong> Compliance with accounting
                and tax requirements
              </li>
              <li>
                <strong>Fraud Prevention:</strong> Protecting against fraudulent
                transactions
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Your Rights Under UK GDPR
            </h2>
            <p>You have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>
                <strong>Right of Access:</strong> Request a copy of your
                personal data
              </li>
              <li>
                <strong>Right to Rectification:</strong> Correct inaccurate or
                incomplete data
              </li>
              <li>
                <strong>Right to Erasure:</strong> Request deletion of your
                personal data
              </li>
              <li>
                <strong>Right to Restrict Processing:</strong> Limit how we use
                your data
              </li>
              <li>
                <strong>Right to Data Portability:</strong> Receive your data in
                a portable format
              </li>
              <li>
                <strong>Right to Object:</strong> Opt out of certain types of
                processing
              </li>
              <li>
                <strong>Rights Related to Automated Decision Making:</strong>{" "}
                Including profiling
              </li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:privacy@modestclothing.com"
                className="text-black hover:underline"
              >
                privacy@modestclothing.com
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Cookies and Tracking
            </h2>
            <p>
              We use cookies and similar technologies to enhance your browsing
              experience. You can control cookie preferences through our cookie
              consent banner or your browser settings. For detailed information
              about our cookie usage, please see our{" "}
              <a href="/cookies" className="text-black hover:underline">
                Cookie Policy
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Data Security and Retention
            </h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal data. We retain your information only as
              long as necessary for the purposes outlined in this policy or as
              required by law. Payment information is processed securely through
              PCI-compliant payment processors.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. International Transfers
            </h2>
            <p>
              Your data may be transferred to and processed in countries outside
              the UK/EEA. When this happens, we ensure appropriate safeguards
              are in place, such as adequacy decisions or standard contractual
              clauses approved by the UK Information Commissioner's Office.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Third-Party Services
            </h2>
            <p>
              We may share your information with trusted third parties
              including:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Payment processors (Stripe, PayPal)</li>
              <li>Shipping and logistics partners</li>
              <li>Email marketing services (where you have consented)</li>
              <li>Analytics providers (Google Analytics)</li>
              <li>Customer support tools</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Marketing Communications
            </h2>
            <p>
              We will only send you marketing emails if you have explicitly
              consented. You can unsubscribe at any time by clicking the
              unsubscribe link in our emails or contacting us directly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Contact Information
            </h2>
            <p>
              For any privacy-related questions or to exercise your data
              protection rights, please contact us:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p>
                <strong>Data Protection Officer</strong>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:privacy@modestclothing.com"
                  className="text-black hover:underline"
                >
                  privacy@modestclothing.com
                </a>
              </p>
              <p>Phone: +44 20 7123 4567</p>
              <p>Address: [Your Business Address]</p>
            </div>
            <p className="mt-4">
              You also have the right to lodge a complaint with the Information
              Commissioner's Office (ICO) if you believe your data protection
              rights have been breached.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              11. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any material changes by posting the new policy on
              our website and updating the "last updated" date.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
