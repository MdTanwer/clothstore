import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const founders = [
  {
    name: "Sarah Ahmed",
    role: "Co-Founder & CEO",
    image: "/founder-1.jpg",
    bio: "Sarah has over 10 years of experience in fashion retail and is passionate about creating elegant modest wear that empowers women to express their personal style while maintaining their values.",
    quote: "Fashion should never require you to compromise your beliefs.",
  },
  {
    name: "Amina Hassan",
    role: "Co-Founder & Creative Director",
    image: "/founder-2.jpg",
    bio: "Amina brings her expertise in fashion design and her deep understanding of modest fashion trends to create collections that are both contemporary and timeless.",
    quote: "Style is about being authentically yourself, beautifully.",
  },
];

export default function FoundersBio() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Founders
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Driven by passion for modest fashion and a vision to empower women
            through style, our founders started this journey to create
            beautiful, contemporary modest wear.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {founders.map((founder) => (
            <div key={founder.name} className="group">
              <div className="relative mb-6">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Quote Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-95 backdrop-blur-sm p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 italic">
                    "{founder.quote}"
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {founder.name}
                </h3>
                <p className="text-purple-600 font-medium mb-4">
                  {founder.role}
                </p>
                <p className="text-gray-600 leading-relaxed">{founder.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Company Story */}
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Story
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded in 2020, our modest fashion brand emerged from a simple
                belief: every woman deserves to feel confident and beautiful
                while staying true to her values. What started as a small
                collection designed by friends has grown into a global community
                of women who believe that modesty and style can beautifully
                coexist.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Today, we're proud to serve customers in over 25 countries,
                offering carefully curated collections that celebrate
                femininity, elegance, and personal expression within the
                framework of modest fashion.
              </p>

              <Link
                href="/about"
                className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors group"
              >
                Read our full story
                <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    25+
                  </div>
                  <div className="text-sm text-gray-600">Countries Served</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    10K+
                  </div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    500+
                  </div>
                  <div className="text-sm text-gray-600">Unique Designs</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    4.8★
                  </div>
                  <div className="text-sm text-gray-600">Customer Rating</div>
                </div>
              </div>

              {/* Mission Statement */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-lg text-white">
                <h4 className="font-semibold mb-2">Our Mission</h4>
                <p className="text-sm leading-relaxed">
                  To empower women worldwide with beautiful, contemporary modest
                  fashion that celebrates their individuality while honoring
                  their values.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
