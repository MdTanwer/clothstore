import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Modest Clothing Store",
  description:
    "Our terms of service outlining the conditions for using our website and purchasing our products, compliant with UK consumer protection laws.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Terms of Service
          </h1>

          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong>{" "}
            {new Date().toLocaleDateString("en-GB")}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Agreement to Terms
            </h2>
            <p>
              By accessing and using this website, you accept and agree to be
              bound by the terms and provision of this agreement. These Terms of
              Service comply with UK consumer protection laws including the
              Consumer Rights Act 2015 and the Consumer Contracts (Information,
              Cancellation and Additional Charges) Regulations 2013.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Company Information
            </h2>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p>
                <strong>Modest Clothing Store Limited</strong>
              </p>
              <p>Company Registration Number: [Your Company Number]</p>
              <p>Registered Office: [Your Registered Address]</p>
              <p>VAT Number: [Your VAT Number]</p>
              <p>Email: hello@modestclothing.com</p>
              <p>Phone: +44 20 7123 4567</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Products and Services
            </h2>
            <ul className="list-disc pl-6">
              <li>
                We strive to display product colors and images as accurately as
                possible
              </li>
              <li>Product availability is subject to stock levels</li>
              <li>
                We reserve the right to limit quantities or discontinue products
              </li>
              <li>
                Prices are displayed in British Pounds (GBP) and include VAT
                where applicable
              </li>
              <li>
                We reserve the right to change prices without prior notice
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Ordering and Payment
            </h2>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Order Process
            </h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Orders are subject to acceptance and availability</li>
              <li>We will send you an order confirmation email</li>
              <li>A contract is formed when we dispatch your goods</li>
              <li>We reserve the right to refuse any order</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mb-2">Payment</h3>
            <ul className="list-disc pl-6">
              <li>Payment is required in full at the time of ordering</li>
              <li>We accept major credit cards, debit cards, and PayPal</li>
              <li>
                Payment processing is handled securely by our payment partners
              </li>
              <li>
                You are responsible for all charges associated with your payment
                method
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Consumer Rights (UK Law)
            </h2>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Right to Cancel
            </h3>
            <p>
              Under the Consumer Contracts Regulations 2013, you have the right
              to cancel your order:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>Within 14 days of receiving your goods</li>
              <li>Without giving any reason</li>
              <li>
                By notifying us in writing, email, or by returning the goods
              </li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Exceptions
            </h3>
            <p>The right to cancel does not apply to:</p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>Bespoke or personalized items</li>
              <li>Items that have been worn or altered</li>
              <li>Items for hygiene reasons (underwear, swimwear)</li>
              <li>Sale items (where clearly marked)</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Consumer Rights Act 2015
            </h3>
            <p>Under this Act, goods must be:</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Of satisfactory quality</li>
              <li>Fit for purpose</li>
              <li>As described</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Returns and Refunds
            </h2>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Return Conditions
            </h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Items must be returned within 14 days</li>
              <li>Items must be unworn and in original condition</li>
              <li>Original tags and packaging must be included</li>
              <li>
                Return shipping costs are the customer's responsibility unless
                the item is faulty
              </li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Refund Process
            </h3>
            <ul className="list-disc pl-6">
              <li>
                Refunds will be processed within 14 days of receiving returned
                items
              </li>
              <li>Refunds will be made to the original payment method</li>
              <li>
                Original shipping costs are non-refundable (unless item is
                faulty)
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Shipping and Delivery
            </h2>
            <ul className="list-disc pl-6">
              <li>Delivery times are estimates and not guaranteed</li>
              <li>Risk of loss transfers to you upon delivery</li>
              <li>
                You must inspect goods upon delivery and report any damage
                immediately
              </li>
              <li>
                We are not liable for delays caused by shipping partners or
                circumstances beyond our control
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Intellectual Property
            </h2>
            <p>
              All content on this website, including text, graphics, logos,
              images, and software, is the property of Modest Clothing Store or
              its content suppliers and is protected by UK and international
              copyright laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Limitation of Liability
            </h2>
            <p>
              To the extent permitted by law, we exclude all conditions,
              warranties, representations, or other terms that may apply to our
              website or any content on it. We will not be liable for:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Loss of profits, sales, business, or revenue</li>
              <li>Business interruption</li>
              <li>Loss of anticipated savings</li>
              <li>Loss of business opportunity, goodwill, or reputation</li>
              <li>Any indirect or consequential loss or damage</li>
            </ul>
            <p className="mt-4">
              Nothing in these terms excludes or limits our liability for death
              or personal injury caused by our negligence, fraud, or fraudulent
              misrepresentation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Dispute Resolution
            </h2>
            <p>
              Any disputes arising from these terms or your use of our website
              will be subject to the exclusive jurisdiction of the courts of
              England and Wales. We are also committed to resolving disputes
              through alternative dispute resolution where appropriate.
            </p>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-900">
                <strong>EU Consumers:</strong> The European Commission provides
                an online dispute resolution platform available at{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  className="text-blue-600 hover:underline"
                >
                  ec.europa.eu/consumers/odr/
                </a>
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              11. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these terms at any time. Changes
              will be effective immediately upon posting on the website. Your
              continued use of the website constitutes acceptance of the
              modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              12. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact us:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p>
                Email:{" "}
                <a
                  href="mailto:legal@modestclothing.com"
                  className="text-purple-600 hover:underline"
                >
                  legal@modestclothing.com
                </a>
              </p>
              <p>Phone: +44 20 7123 4567</p>
              <p>Address: [Your Business Address]</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
