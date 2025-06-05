import {
  CheckBadgeIcon,
  GlobeAltIcon,
  HeartIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Footer from "components/layout/footer";
import { Navbar } from "components/layout/navbar";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      icon: HeartIcon,
      title: "Modest Elegance",
      description:
        "We believe that modesty and style go hand in hand. Our designs celebrate femininity while respecting personal values and preferences.",
    },
    {
      icon: SparklesIcon,
      title: "Quality Craftsmanship",
      description:
        "Every piece is carefully selected and crafted with attention to detail, using premium fabrics and timeless construction techniques.",
    },
    {
      icon: GlobeAltIcon,
      title: "Global Inspiration",
      description:
        "Our collections draw inspiration from diverse cultures and fashion traditions from around the world, creating unique and inclusive designs.",
    },
    {
      icon: UserGroupIcon,
      title: "Community First",
      description:
        "We're more than a brand - we're a community of women supporting each other in expressing their personal style with confidence.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Ethical Standards",
      description:
        "We maintain the highest ethical standards in our supply chain, ensuring fair labor practices and sustainable production methods.",
    },
    {
      icon: CheckBadgeIcon,
      title: "Sustainability",
      description:
        "Committed to reducing our environmental impact through conscious material choices and responsible manufacturing practices.",
    },
  ];

  const team = [
    {
      name: "Sarah Ahmed",
      role: "Founder & Creative Director",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400&h=400&fit=crop&crop=face",
      bio: "With over 10 years in fashion design, Sarah founded our brand to create beautiful, modest clothing that empowers women worldwide.",
    },
    {
      name: "Layla Hassan",
      role: "Head of Design",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Layla brings her expertise in sustainable fashion and traditional craftsmanship to create our signature elegant silhouettes.",
    },
    {
      name: "Amira Chen",
      role: "Sustainability Director",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Amira leads our commitment to ethical fashion, ensuring every piece meets our high standards for sustainability and social responsibility.",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 pt-16 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-light text-gray-900 dark:text-white mb-6">
                Our Story
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Founded with a vision to create beautiful, modest fashion that
                empowers women to express their personal style with confidence
                and grace.
              </p>
            </div>
          </div>
        </div>

        {/* Brand Story Section */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-8">
                  Elegance Redefined
                </h2>
                <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p>
                    In 2020, our founder Sarah Ahmed recognized a gap in the
                    fashion industry. Beautiful, modest clothing that didn't
                    compromise on style or quality was difficult to find. Driven
                    by her own experiences and countless conversations with
                    women worldwide, she set out to change this narrative.
                  </p>
                  <p>
                    What started as a small collection of carefully curated
                    pieces has grown into a global community of women who
                    believe that modesty and fashion are not mutually exclusive.
                    Every design in our collection tells a story of empowerment,
                    confidence, and timeless elegance.
                  </p>
                  <p>
                    Today, we're proud to serve customers in over 50 countries,
                    each finding their perfect expression of style within our
                    thoughtfully designed pieces. Our commitment to quality,
                    sustainability, and ethical practices remains at the heart
                    of everything we do.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=600&fit=crop"
                    alt="Fashion atelier with elegant modest clothing"
                    width={600}
                    height={600}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-black dark:bg-white rounded-2xl shadow-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white dark:text-black">
                      50+
                    </div>
                    <div className="text-sm text-white dark:text-black">
                      Countries
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-6">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                The principles that guide every decision we make and every piece
                we create.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-black dark:bg-white rounded-full flex items-center justify-center mb-6">
                    <value.icon className="w-6 h-6 text-white dark:text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-6">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                The passionate individuals behind our brand, dedicated to
                creating beautiful modest fashion for the modern woman.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-xl">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={192}
                        height={192}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="py-20 bg-gradient-to-r from-gray-900 to-black dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
              Our Mission
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              "To empower women worldwide by creating beautiful, modest fashion
              that celebrates individuality, respects values, and promotes
              confidence. We believe every woman deserves to feel elegant,
              comfortable, and authentically herself."
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/collections"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Explore Our Collection
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-black transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  50,000+
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Happy Customers
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  50+
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Countries Served
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  500+
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Unique Designs
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  4.9★
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Customer Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
