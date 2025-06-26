"use client";

import {
  ChatBubbleLeftEllipsisIcon,
  EnvelopeIcon,
  PhoneIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function ContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      icon: PhoneIcon,
      label: "Call Us",
      value: "+44 20 7123 4567",
      action: "tel:+442071234567",
      description: "Mon-Fri, 9AM-6PM GMT",
    },
    {
      icon: EnvelopeIcon,
      label: "Email Us",
      value: "hello@modestclothing.com",
      action: "mailto:hello@modestclothing.com",
      description: "We respond within 24 hours",
    },
    {
      icon: ChatBubbleLeftEllipsisIcon,
      label: "WhatsApp",
      value: "Chat with us",
      action: "https://wa.me/442071234567",
      description: "Quick responses during business hours",
    },
  ];

  return (
    <>
      {/* Floating Contact Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-black hover:bg-gray-900 cursor-pointer text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Contact Options Panel */}
      {isOpen && (
        <div className="fixed   bottom-24 right-6 z-40 bg-white backdrop-blur-md rounded-lg shadow-xl border border-white/20 p-6 w-80">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Need Help?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Our customer service team is here to assist you
            </p>
          </div>

          <div className="space-y-3">
            {contactOptions.map((option) => (
              <a
                key={option.label}
                href={option.action}
                target={option.action.startsWith("http") ? "_blank" : "_self"}
                rel={
                  option.action.startsWith("http") ? "noopener noreferrer" : ""
                }
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/20 dark:hover:bg-black/20 transition-colors group backdrop-blur-sm"
              >
                <div className="flex-shrink-0 p-2 bg-purple-100/80 dark:bg-purple-900/50 rounded-lg group-hover:bg-purple-200/80 dark:group-hover:bg-purple-800/50 transition-colors backdrop-blur-sm">
                  <option.icon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    {option.label}
                  </div>
                  <div className="text-purple-600 dark:text-purple-400 text-sm truncate">
                    {option.value}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {option.description}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100/50 dark:border-gray-700/50">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              You can also visit our{" "}
              <a
                href="/faq"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                FAQ page
              </a>{" "}
              for quick answers
            </p>
          </div>
        </div>
      )}
    </>
  );
}
