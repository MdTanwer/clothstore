"use client";

import { QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const sizeCharts = {
  tops: {
    title: "Tops & Dresses",
    measurements: [
      "UK Size",
      "US Size",
      "EU Size",
      "Bust (cm)",
      "Waist (cm)",
      "Hips (cm)",
    ],
    sizes: [
      ["6", "2", "34", "78-82", "62-66", "86-90"],
      ["8", "4", "36", "82-86", "66-70", "90-94"],
      ["10", "6", "38", "86-90", "70-74", "94-98"],
      ["12", "8", "40", "90-94", "74-78", "98-102"],
      ["14", "10", "42", "94-98", "78-82", "102-106"],
      ["16", "12", "44", "98-102", "82-86", "106-110"],
      ["18", "14", "46", "102-106", "86-90", "110-114"],
      ["20", "16", "48", "106-110", "90-94", "114-118"],
    ],
  },
  bottoms: {
    title: "Bottoms & Skirts",
    measurements: [
      "UK Size",
      "US Size",
      "EU Size",
      "Waist (cm)",
      "Hips (cm)",
      "Inside Leg (cm)",
    ],
    sizes: [
      ["6", "2", "34", "62-66", "86-90", "76"],
      ["8", "4", "36", "66-70", "90-94", "76"],
      ["10", "6", "38", "70-74", "94-98", "78"],
      ["12", "8", "40", "74-78", "98-102", "78"],
      ["14", "10", "42", "78-82", "102-106", "80"],
      ["16", "12", "44", "82-86", "106-110", "80"],
      ["18", "14", "46", "86-90", "110-114", "82"],
      ["20", "16", "48", "90-94", "114-118", "82"],
    ],
  },
};

const measurementTips = [
  {
    title: "Bust",
    description: "Measure around the fullest part of your bust",
  },
  {
    title: "Waist",
    description: "Measure around the narrowest part of your waist",
  },
  {
    title: "Hips",
    description: "Measure around the fullest part of your hips",
  },
  {
    title: "Inside Leg",
    description: "Measure from the crotch to the ankle bone",
  },
];

export default function SizeGuide({ isOpen, onClose }: SizeGuideProps) {
  const [activeTab, setActiveTab] = useState<"tops" | "bottoms">("tops");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Size Guide</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Measurement Tips */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-3">
              <QuestionMarkCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  How to Measure
                </h3>
                <p className="text-blue-800 text-sm mb-3">
                  For the most accurate fit, measure yourself wearing your usual
                  undergarments. Use a soft measuring tape and keep it parallel
                  to the floor.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {measurementTips.map((tip) => (
                    <div key={tip.title} className="flex gap-2">
                      <span className="font-medium text-blue-900">
                        {tip.title}:
                      </span>
                      <span className="text-blue-800">{tip.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex mb-6 border-b border-gray-200">
            {Object.entries(sizeCharts).map(([key, chart]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as "tops" | "bottoms")}
                className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                  activeTab === key
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {chart.title}
              </button>
            ))}
          </div>

          {/* Size Chart */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  {sizeCharts[activeTab].measurements.map((measurement) => (
                    <th
                      key={measurement}
                      className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200"
                    >
                      {measurement}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizeCharts[activeTab].sizes.map((size, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-25"}
                  >
                    {size.map((value, valueIndex) => (
                      <td
                        key={valueIndex}
                        className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Additional Information */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Fit Guide</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>
                  • Our clothes are designed for a comfortable, modest fit
                </li>
                <li>• If you're between sizes, we recommend sizing up</li>
                <li>
                  • Check individual product descriptions for specific fit notes
                </li>
                <li>• All measurements are approximate and may vary by ±2cm</li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                Still Need Help?
              </h3>
              <p className="text-sm text-gray-700 mb-3">
                Our customer service team is here to help you find the perfect
                fit.
              </p>
              <div className="space-y-2">
                <a
                  href="mailto:hello@modestclothing.com"
                  className="block text-sm text-purple-600 hover:underline"
                >
                  Email: hello@modestclothing.com
                </a>
                <a
                  href="tel:+442071234567"
                  className="block text-sm text-purple-600 hover:underline"
                >
                  Phone: +44 20 7123 4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Size Guide Button Component
export function SizeGuideButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 underline"
      >
        <QuestionMarkCircleIcon className="h-4 w-4 mr-1" />
        Size Guide
      </button>

      <SizeGuide isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
