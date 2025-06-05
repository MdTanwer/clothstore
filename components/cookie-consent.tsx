"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookieConsent", "all");
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem("cookieConsent", "necessary");
    setShowBanner(false);
  };

  const rejectAll = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 mr-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              We use cookies to enhance your experience
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              We use cookies and similar technologies to provide the best
              experience on our website. Some are necessary for the site to
              function, while others help us improve your experience.
            </p>

            {showDetails && (
              <div className="text-xs text-gray-600 mb-3 space-y-2">
                <div>
                  <strong>Necessary:</strong> Essential for website
                  functionality, security, and legal compliance.
                </div>
                <div>
                  <strong>Analytics:</strong> Help us understand how visitors
                  interact with our website.
                </div>
                <div>
                  <strong>Marketing:</strong> Used to deliver relevant
                  advertisements and measure their effectiveness.
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <button
                onClick={acceptAll}
                className="bg-black text-white px-4 py-2 text-xs font-medium rounded hover:bg-gray-800 transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={acceptNecessary}
                className="bg-gray-100 text-gray-900 px-4 py-2 text-xs font-medium rounded hover:bg-gray-200 transition-colors"
              >
                Necessary Only
              </button>
              <button
                onClick={rejectAll}
                className="bg-gray-100 text-gray-900 px-4 py-2 text-xs font-medium rounded hover:bg-gray-200 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-gray-600 px-4 py-2 text-xs underline hover:text-gray-800 transition-colors"
              >
                {showDetails ? "Hide Details" : "More Details"}
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowBanner(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
