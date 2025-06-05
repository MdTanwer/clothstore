"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function NewsletterPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user has already subscribed or dismissed
    const hasSubscribed = localStorage.getItem("newsletterSubscribed");
    const hasDismissed = localStorage.getItem("newsletterDismissed");
    const lastShown = localStorage.getItem("newsletterLastShown");

    if (hasSubscribed || hasDismissed) return;

    // Don't show if shown in the last 24 hours
    if (lastShown && Date.now() - parseInt(lastShown) < 24 * 60 * 60 * 1000) {
      return;
    }

    // Show popup after 30 seconds or on exit intent
    const timer = setTimeout(() => {
      setShowPopup(true);
      localStorage.setItem("newsletterLastShown", Date.now().toString());
    }, 30000);

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowPopup(true);
        localStorage.setItem("newsletterLastShown", Date.now().toString());
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would integrate with your newsletter service (Mailchimp, ConvertKit, etc.)
      // For now, we'll simulate the API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      localStorage.setItem("newsletterSubscribed", "true");
      setShowPopup(false);
      toast.success(
        "Thank you for subscribing! Check your email for a welcome message."
      );
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("newsletterDismissed", "true");
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Stay in Style!
          </h2>
          <p className="text-gray-600">
            Get exclusive access to new arrivals, special offers, and modest
            fashion inspiration.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe Now"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            By subscribing, you agree to our privacy policy. Unsubscribe at any
            time.
          </p>
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-900">15% OFF</div>
            <div className="text-xs text-gray-600">First Purchase</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-900">
              Free Shipping
            </div>
            <div className="text-xs text-gray-600">On Orders $75+</div>
          </div>
        </div>
      </div>
    </div>
  );
}
