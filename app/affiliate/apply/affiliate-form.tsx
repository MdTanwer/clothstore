"use client";

import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function AffiliateApplicationForm() {
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
    },
    businessInfo: {
      businessName: "",
      businessType: "",
      experience: "",
      website: "",
      socialMedia: {
        instagram: "",
        tiktok: "",
        youtube: "",
        facebook: "",
        blog: "",
      },
    },
    audience: {
      audienceSize: "",
      demographics: "",
      engagementRate: "",
      contentType: "",
      promotionStrategy: "",
    },
    additional: {
      motivation: "",
      previousExperience: "",
      expectations: "",
      agreeToTerms: false,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    section: string,
    field: string,
    value: string | boolean
  ) => {
    if (section === "socialMedia") {
      setFormData((prev) => ({
        ...prev,
        businessInfo: {
          ...prev.businessInfo,
          socialMedia: {
            ...prev.businessInfo.socialMedia,
            [field]: value as string,
          },
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: value,
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckBadgeIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Application Submitted!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Thank you for your interest in becoming an affiliate partner. We'll
            review your application and get back to you within 3-5 business
            days.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                personalInfo: {
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  country: "",
                  city: "",
                },
                businessInfo: {
                  businessName: "",
                  businessType: "",
                  experience: "",
                  website: "",
                  socialMedia: {
                    instagram: "",
                    tiktok: "",
                    youtube: "",
                    facebook: "",
                    blog: "",
                  },
                },
                audience: {
                  audienceSize: "",
                  demographics: "",
                  engagementRate: "",
                  contentType: "",
                  promotionStrategy: "",
                },
                additional: {
                  motivation: "",
                  previousExperience: "",
                  expectations: "",
                  agreeToTerms: false,
                },
              });
            }}
            className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-4">
            Apply Now
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Fill out the form below to start your affiliate journey with us
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.personalInfo.firstName}
                  onChange={(e) =>
                    handleInputChange(
                      "personalInfo",
                      "firstName",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.personalInfo.lastName}
                  onChange={(e) =>
                    handleInputChange(
                      "personalInfo",
                      "lastName",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.personalInfo.email}
                  onChange={(e) =>
                    handleInputChange("personalInfo", "email", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.personalInfo.phone}
                  onChange={(e) =>
                    handleInputChange("personalInfo", "phone", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  required
                  value={formData.personalInfo.country}
                  onChange={(e) =>
                    handleInputChange("personalInfo", "country", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.city}
                  onChange={(e) =>
                    handleInputChange("personalInfo", "city", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Business Information
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Business/Brand Name
                  </label>
                  <input
                    type="text"
                    value={formData.businessInfo.businessName}
                    onChange={(e) =>
                      handleInputChange(
                        "businessInfo",
                        "businessName",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Business Type *
                  </label>
                  <select
                    required
                    value={formData.businessInfo.businessType}
                    onChange={(e) =>
                      handleInputChange(
                        "businessInfo",
                        "businessType",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="">Select Business Type</option>
                    <option value="influencer">Social Media Influencer</option>
                    <option value="blogger">Fashion Blogger</option>
                    <option value="youtuber">YouTube Creator</option>
                    <option value="website">Website Owner</option>
                    <option value="email">Email Marketer</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Years of Experience *
                  </label>
                  <select
                    required
                    value={formData.businessInfo.experience}
                    onChange={(e) =>
                      handleInputChange(
                        "businessInfo",
                        "experience",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="">Select Experience Level</option>
                    <option value="beginner">Less than 1 year</option>
                    <option value="intermediate">1-3 years</option>
                    <option value="experienced">3-5 years</option>
                    <option value="expert">5+ years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Website/Blog URL
                  </label>
                  <input
                    type="url"
                    value={formData.businessInfo.website}
                    onChange={(e) =>
                      handleInputChange(
                        "businessInfo",
                        "website",
                        e.target.value
                      )
                    }
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Social Media Links */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Social Media Profiles (Please provide at least one)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="url"
                      value={formData.businessInfo.socialMedia.instagram}
                      onChange={(e) =>
                        handleInputChange(
                          "socialMedia",
                          "instagram",
                          e.target.value
                        )
                      }
                      placeholder="Instagram URL"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <input
                      type="url"
                      value={formData.businessInfo.socialMedia.tiktok}
                      onChange={(e) =>
                        handleInputChange(
                          "socialMedia",
                          "tiktok",
                          e.target.value
                        )
                      }
                      placeholder="TikTok URL"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <input
                      type="url"
                      value={formData.businessInfo.socialMedia.youtube}
                      onChange={(e) =>
                        handleInputChange(
                          "socialMedia",
                          "youtube",
                          e.target.value
                        )
                      }
                      placeholder="YouTube URL"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <input
                      type="url"
                      value={formData.businessInfo.socialMedia.facebook}
                      onChange={(e) =>
                        handleInputChange(
                          "socialMedia",
                          "facebook",
                          e.target.value
                        )
                      }
                      placeholder="Facebook URL"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Audience Information */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Audience Information
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Total Audience Size *
                  </label>
                  <select
                    required
                    value={formData.audience.audienceSize}
                    onChange={(e) =>
                      handleInputChange(
                        "audience",
                        "audienceSize",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="">Select Audience Size</option>
                    <option value="1k-5k">1,000 - 5,000</option>
                    <option value="5k-10k">5,000 - 10,000</option>
                    <option value="10k-50k">10,000 - 50,000</option>
                    <option value="50k-100k">50,000 - 100,000</option>
                    <option value="100k+">100,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Average Engagement Rate
                  </label>
                  <select
                    value={formData.audience.engagementRate}
                    onChange={(e) =>
                      handleInputChange(
                        "audience",
                        "engagementRate",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="">Select Engagement Rate</option>
                    <option value="1-3%">1-3%</option>
                    <option value="3-5%">3-5%</option>
                    <option value="5-10%">5-10%</option>
                    <option value="10%+">10%+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Demographics *
                </label>
                <textarea
                  required
                  value={formData.audience.demographics}
                  onChange={(e) =>
                    handleInputChange(
                      "audience",
                      "demographics",
                      e.target.value
                    )
                  }
                  placeholder="Describe your audience demographics (age, gender, interests, location, etc.)"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content Type *
                </label>
                <select
                  required
                  value={formData.audience.contentType}
                  onChange={(e) =>
                    handleInputChange("audience", "contentType", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">Select Primary Content Type</option>
                  <option value="fashion">Fashion & Style</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="modest-fashion">Modest Fashion</option>
                  <option value="beauty">Beauty & Makeup</option>
                  <option value="travel">Travel</option>
                  <option value="parenting">Parenting</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  How do you plan to promote our products? *
                </label>
                <textarea
                  required
                  value={formData.audience.promotionStrategy}
                  onChange={(e) =>
                    handleInputChange(
                      "audience",
                      "promotionStrategy",
                      e.target.value
                    )
                  }
                  placeholder="Describe your promotional strategy (social media posts, reviews, try-ons, etc.)"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Additional Information
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Why do you want to partner with us? *
                </label>
                <textarea
                  required
                  value={formData.additional.motivation}
                  onChange={(e) =>
                    handleInputChange(
                      "additional",
                      "motivation",
                      e.target.value
                    )
                  }
                  placeholder="Tell us what motivates you to promote our modest fashion brand"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Previous Affiliate Marketing Experience
                </label>
                <textarea
                  value={formData.additional.previousExperience}
                  onChange={(e) =>
                    handleInputChange(
                      "additional",
                      "previousExperience",
                      e.target.value
                    )
                  }
                  placeholder="Describe any previous affiliate marketing experience or brand partnerships"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What are your expectations from this partnership?
                </label>
                <textarea
                  value={formData.additional.expectations}
                  onChange={(e) =>
                    handleInputChange(
                      "additional",
                      "expectations",
                      e.target.value
                    )
                  }
                  placeholder="Share your goals and expectations for this affiliate partnership"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  checked={formData.additional.agreeToTerms}
                  onChange={(e) =>
                    handleInputChange(
                      "additional",
                      "agreeToTerms",
                      e.target.checked
                    )
                  }
                  className="mt-1"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-700 dark:text-gray-300"
                >
                  I agree to the Terms & Conditions and Privacy Policy. I
                  understand that I must comply with FTC guidelines for
                  affiliate marketing and will disclose my relationship with the
                  brand in all promotional content. *
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
