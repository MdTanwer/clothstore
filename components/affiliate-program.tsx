import {
  ArrowRightIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  GiftIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const benefits = [
  {
    icon: CurrencyDollarIcon,
    title: "Competitive Commission",
    description: "Earn up to 15% commission on every sale you refer",
  },
  {
    icon: UserGroupIcon,
    title: "Dedicated Support",
    description: "Get personal support from our affiliate team",
  },
  {
    icon: ChartBarIcon,
    title: "Real-time Analytics",
    description: "Track your performance with detailed analytics",
  },
  {
    icon: GiftIcon,
    title: "Exclusive Bonuses",
    description: "Access special promotions and bonus opportunities",
  },
];

export default function AffiliateProgram() {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 mb-4">
              💰 Partner Program
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Join Our Affiliate Program
            </h2>

            <p className="text-lg text-gray-600 mb-8">
              Partner with us and earn money promoting modest fashion that
              empowers women. Whether you're a blogger, influencer, or fashion
              enthusiast, we'd love to work with you.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <benefit.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/affiliate/apply"
                className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors group"
              >
                Apply Now
                <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/affiliate/learn-more"
                className="inline-flex items-center justify-center px-6 py-3 border border-purple-600 text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative z-10 bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <CurrencyDollarIcon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Start Earning Today
                </h3>
                <p className="text-gray-600">Join 500+ successful affiliates</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    Average Commission
                  </span>
                  <span className="text-lg font-bold text-purple-600">12%</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    Top Earner (Monthly)
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    £2,450
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    Cookie Duration
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    60 days
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white text-center">
                <p className="text-sm font-medium">
                  🎉 Limited Time: Double commission for first 30 days!
                </p>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 -z-10" />
            <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full opacity-20 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
