import {
  CreditCardIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  TruckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Footer from "components/layout/footer";
import { Navbar } from "components/layout/navbar";

export default function LegalPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 pt-16 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
              Legal Information
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Important legal information about your rights and our obligations
              under UK law
            </p>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="py-8 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                {
                  icon: ShieldCheckIcon,
                  title: "Privacy Policy",
                  href: "#privacy",
                },
                {
                  icon: DocumentTextIcon,
                  title: "Terms & Conditions",
                  href: "#terms",
                },
                { icon: TruckIcon, title: "Returns Policy", href: "#returns" },
                {
                  icon: CreditCardIcon,
                  title: "Payment Terms",
                  href: "#payment",
                },
                {
                  icon: UserGroupIcon,
                  title: "Data Protection",
                  href: "#data",
                },
                {
                  icon: ExclamationTriangleIcon,
                  title: "Disclaimers",
                  href: "#disclaimers",
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex flex-col items-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-md transition-shadow duration-200"
                >
                  <item.icon className="w-8 h-8 text-black dark:text-white mb-2" />
                  <span className="text-sm text-center text-gray-700 dark:text-gray-300">
                    {item.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          {/* Privacy Policy */}
          <section id="privacy" className="scroll-mt-24">
            <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-6">
              Privacy Policy
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <strong>Last updated:</strong> December 2024
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                1. Information We Collect
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We collect information you provide directly to us, such as when
                you create an account, make a purchase, or contact us. This
                includes:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>
                  Personal identification information (name, email, phone
                  number)
                </li>
                <li>Billing and delivery addresses</li>
                <li>
                  Payment information (processed securely by our payment
                  providers)
                </li>
                <li>Order history and preferences</li>
                <li>Communications with our customer service team</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                2. How We Use Your Information
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Under UK GDPR, we process your personal data on the following
                lawful bases:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>
                  <strong>Contract performance:</strong> To process and fulfill
                  your orders
                </li>
                <li>
                  <strong>Legitimate interests:</strong> To improve our services
                  and communicate about products
                </li>
                <li>
                  <strong>Consent:</strong> For marketing communications (you
                  can opt out at any time)
                </li>
                <li>
                  <strong>Legal obligation:</strong> To comply with tax and
                  accounting requirements
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                3. Your Rights Under UK GDPR
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Access your personal data</li>
                <li>Rectify inaccurate data</li>
                <li>Erase your data in certain circumstances</li>
                <li>Restrict processing of your data</li>
                <li>Data portability</li>
                <li>Object to processing based on legitimate interests</li>
                <li>Lodge a complaint with the ICO</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                4. Data Retention
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We retain your personal data for as long as necessary to fulfill
                the purposes outlined in this policy, comply with legal
                obligations, and resolve disputes. Order information is
                typically retained for 7 years in compliance with UK tax law.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                5. Contact Information
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                For any privacy-related queries, contact our Data Protection
                Officer at:
                <br />
                Email: privacy@clothstore.co.uk
                <br />
                Phone: +44 20 1234 5678
              </p>
            </div>
          </section>

          {/* Terms and Conditions */}
          <section id="terms" className="scroll-mt-24">
            <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-6">
              Terms and Conditions
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <strong>Last updated:</strong> December 2024
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                1. Company Information
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                ClothStore Limited is a company registered in England and Wales.
                <br />
                Company Registration Number: 12345678
                <br />
                VAT Number: GB123456789
                <br />
                Registered Office: 123 Fashion Street, London, E1 6AN
                <br />
                Email: info@clothstore.co.uk
                <br />
                Phone: +44 20 1234 5678
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                2. Contract Formation
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                When you place an order, you are making an offer to purchase
                products. We will send you an order confirmation email, but this
                does not constitute acceptance of your offer. A contract is
                formed only when we dispatch your goods and send you a dispatch
                confirmation.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                3. Pricing and Payment
              </h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>All prices are in GBP and include VAT where applicable</li>
                <li>We reserve the right to change prices without notice</li>
                <li>Payment is required in full before dispatch</li>
                <li>We accept major credit cards, debit cards, and PayPal</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                4. Consumer Rights
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Under the Consumer Rights Act 2015, you have statutory rights
                including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>
                  Goods must be of satisfactory quality, fit for purpose, and as
                  described
                </li>
                <li>
                  Right to reject faulty goods within 30 days for a full refund
                </li>
                <li>Right to repair or replacement for faulty goods</li>
                <li>These rights are in addition to our returns policy</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                5. Limitation of Liability
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our liability is limited to the maximum extent permitted by law.
                We do not exclude liability for death or personal injury caused
                by negligence, fraud, or other matters where exclusion is
                prohibited by law.
              </p>
            </div>
          </section>

          {/* Returns Policy */}
          <section id="returns" className="scroll-mt-24">
            <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-6">
              Returns and Cancellation Policy
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                1. Distance Selling Regulations
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Under the Consumer Contracts Regulations 2013, you have the
                right to cancel your order within 14 days without giving any
                reason. This cancellation period expires 14 days after the day
                you receive the goods.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                2. How to Cancel
              </h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Email us at returns@clothstore.co.uk</li>
                <li>Call us on +44 20 1234 5678</li>
                <li>Use our online returns portal</li>
                <li>Send written notice to our registered address</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                3. Return Conditions
              </h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Items must be in original condition with tags attached</li>
                <li>
                  Items must be returned within 14 days of cancellation notice
                </li>
                <li>
                  You are responsible for return shipping costs unless the item
                  is faulty
                </li>
                <li>
                  Refunds will be processed within 14 days of receiving returned
                  items
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                4. Exceptions
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The following items cannot be returned for hygiene reasons:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Underwear and swimwear</li>
                <li>Items that have been worn or altered</li>
                <li>Personalized or made-to-order items</li>
              </ul>
            </div>
          </section>

          {/* Payment Terms */}
          <section id="payment" className="scroll-mt-24">
            <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-6">
              Payment Terms
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                1. Accepted Payment Methods
              </h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4">
                <li>Visa, Mastercard, American Express</li>
                <li>UK debit cards</li>
                <li>PayPal</li>
                <li>Apple Pay and Google Pay</li>
                <li>Klarna (Buy Now, Pay Later - subject to approval)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                2. Payment Security
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                All payments are processed securely using SSL encryption. We are
                PCI DSS compliant and do not store your full card details on our
                servers. Payment processing is handled by our certified payment
                partners.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                3. VAT Information
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                VAT is charged at the standard UK rate of 20% on all applicable
                items. Our VAT number is GB123456789. VAT receipts are available
                upon request for business customers.
              </p>
            </div>
          </section>

          {/* Data Protection */}
          <section id="data" className="scroll-mt-24">
            <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-6">
              Data Protection
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                1. ICO Registration
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We are registered with the Information Commissioner's Office
                (ICO) under registration number ZA123456. You can verify our
                registration on the ICO website.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                2. Cookie Policy
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We use cookies to improve your browsing experience. Essential
                cookies are necessary for the website to function, while
                optional cookies help us analyze usage and provide personalized
                content. You can manage your cookie preferences at any time.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                3. Third-Party Services
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We work with trusted third-party services for payment
                processing, shipping, and analytics. These partners are
                carefully selected and must comply with UK data protection
                standards.
              </p>
            </div>
          </section>

          {/* Disclaimers */}
          <section id="disclaimers" className="scroll-mt-24">
            <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-6">
              Disclaimers and Additional Information
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                1. Product Information
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We make every effort to ensure product descriptions and images
                are accurate. However, slight variations in color may occur due
                to monitor settings. Sizing information is provided as a guide
                and actual measurements may vary slightly.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                2. Intellectual Property
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                All content on this website, including images, text, and design,
                is protected by copyright and trademark law. Unauthorized use is
                strictly prohibited.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                3. Governing Law
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                These terms are governed by English law and any disputes will be
                subject to the exclusive jurisdiction of the English courts.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                4. Contact for Legal Matters
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                For any legal queries or to exercise your consumer rights:
                <br />
                Email: legal@clothstore.co.uk
                <br />
                Phone: +44 20 1234 5678
                <br />
                Address: 123 Fashion Street, London, E1 6AN
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
                5. Alternative Dispute Resolution
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you are not satisfied with our response to any complaint, you
                may refer your complaint to the relevant alternative dispute
                resolution (ADR) entity. For online purchases, you can also use
                the European Commission's Online Dispute Resolution platform.
              </p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}
