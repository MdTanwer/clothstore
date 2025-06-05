import {
  CheckBadgeIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Footer from "components/layout/footer";
import { Navbar } from "components/layout/navbar";
import dynamic from "next/dynamic";

// Dynamic import for the client component
const AffiliateApplicationForm = dynamic(() => import("./affiliate-form"), {
  loading: () => (
    <div className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg">
          <p className="text-gray-600 dark:text-gray-300">Loading form...</p>
        </div>
      </div>
    </div>
  ),
});

export default function AffiliateApplyPage() {
  const benefits = [
    {
      icon: CurrencyDollarIcon,
      title: "Competitive Commission",
      description: "Earn 15-25% commission on every sale you generate",
    },
    {
      icon: SparklesIcon,
      title: "Exclusive Access",
      description: "Get early access to new collections and special promotions",
    },
    {
      icon: UserGroupIcon,
      title: "Dedicated Support",
      description: "Personal affiliate manager and marketing materials",
    },
    {
      icon: GlobeAltIcon,
      title: "Global Reach",
      description: "Promote to customers worldwide with international shipping",
    },
    {
      icon: ShieldCheckIcon,
      title: "Trusted Brand",
      description: "Partner with a reputable modest fashion brand",
    },
    {
      icon: CheckBadgeIcon,
      title: "Performance Bonuses",
      description: "Additional rewards for top-performing affiliates",
    },
  ];

  const requirements = [
    "Active social media presence or website with engaged audience",
    "Alignment with our brand values of modest, elegant fashion",
    "Minimum 1,000 followers/subscribers or established blog readership",
    "Professional content creation and posting consistency",
    "Compliance with FTC guidelines for affiliate marketing",
    "Commitment to promoting authentic, honest reviews",
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 pt-16 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
              Join Our Affiliate Program
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Partner with us to promote beautiful modest fashion and earn
              competitive commissions while empowering women worldwide to
              express their style with confidence.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-4">
                Why Partner With Us?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Join a community of successful affiliates and enjoy exclusive
                benefits
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-white dark:text-black" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Requirements Section */}
        <div className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-4">
                Application Requirements
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                To ensure the best partnership, we look for affiliates who meet
                these criteria
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requirements.map((requirement, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <CheckBadgeIcon className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300">
                    {requirement}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Application Form - Dynamic Import */}
        <AffiliateApplicationForm />
      </div>

      <Footer />
    </>
  );
}
