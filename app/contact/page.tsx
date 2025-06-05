"use client";

import {
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ClockIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import Footer from "components/layout/footer";
import { Navbar } from "components/layout/navbar";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    orderNumber: "",
    category: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        orderNumber: "",
        category: "general",
      });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: PhoneIcon,
      title: "Phone Support",
      content: "+44 20 7123 4567",
      subtitle: "Mon-Fri: 9AM-6PM GMT",
      action: "tel:+442071234567",
    },
    {
      icon: EnvelopeIcon,
      title: "Email Support",
      content: "hello@modestclothing.com",
      subtitle: "Response within 24 hours",
      action: "mailto:hello@modestclothing.com",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Live Chat",
      content: "Chat with our team",
      subtitle: "Available Mon-Fri: 9AM-6PM",
      action: "#",
    },
    {
      icon: MapPinIcon,
      title: "Visit Our Showroom",
      content: "123 Fashion Street, London",
      subtitle: "By appointment only",
      action: "#",
    },
  ];

  const faqs = [
    {
      question: "What are your shipping times?",
      answer:
        "We offer free standard shipping (3-5 business days) on orders over £75. Express shipping (1-2 business days) is available for £9.99.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer free returns within 14 days of delivery. Items must be unworn with tags attached. Start your return through your account or contact us.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location. Check our shipping page for details.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order ships, you'll receive a tracking email with your tracking number. You can also track orders through your account dashboard.",
    },
    {
      question: "Do you offer size exchanges?",
      answer:
        "Yes! If the size isn't quite right, we offer free size exchanges within 14 days. The item must be unworn with tags attached.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay. All payments are secure and encrypted.",
    },
  ];

  return (
    <>
      {/* Header/Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 pt-16 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
                Get In Touch
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                We're here to help with any questions about our modest fashion
                collection, sizing guidance, or styling advice. Our dedicated
                team is ready to assist you.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 -mt-10">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-black dark:bg-white rounded-full flex items-center justify-center mb-4">
                    <method.icon className="w-6 h-6 text-white dark:text-black" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-900 dark:text-white font-medium mb-1">
                    {method.content}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {method.subtitle}
                  </p>
                  <a
                    href={method.action}
                    className="inline-flex items-center text-sm font-medium text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    Contact Now →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">
                  Send us a message
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Support</option>
                      <option value="sizing">Sizing Help</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="styling">Styling Advice</option>
                      <option value="wholesale">Wholesale Inquiry</option>
                    </select>
                  </div>

                  {formData.category === "order" && (
                    <div>
                      <label
                        htmlFor="orderNumber"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Order Number
                      </label>
                      <input
                        type="text"
                        id="orderNumber"
                        name="orderNumber"
                        value={formData.orderNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                        placeholder="e.g., #12345"
                      />
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                      placeholder="Please provide as much detail as possible..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-6 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
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
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>

                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    By submitting this form, you agree to our privacy policy and
                    terms of service.
                  </p>
                </form>
              )}
            </div>

            {/* FAQ Section */}
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Quick answers to common questions about our products and
                  services.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-lg">
                      <h3 className="font-medium text-gray-900 dark:text-white pr-4">
                        {faq.question}
                      </h3>
                      <QuestionMarkCircleIcon className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>

              {/* Business Hours */}
              <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <ClockIcon className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-3" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Monday - Friday
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      9:00 AM - 6:00 PM GMT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Saturday
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      10:00 AM - 4:00 PM GMT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Sunday
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      Closed
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Email support:</strong> Available 24/7 with
                    responses within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
