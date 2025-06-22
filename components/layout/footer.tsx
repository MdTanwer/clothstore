import Link from "next/link";

import CurrencySwitcher from "components/currency/currency-switcher";
import FooterMenu from "components/layout/footer-menu";
import LogoSquare from "components/logo-square";
import { SizeGuideButton } from "components/size-guide";
import { getMenu } from "lib/commerce";
import { Suspense } from "react";

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : "");
  const skeleton =
    "w-full h-6 animate-pulse rounded-sm bg-neutral-200 dark:bg-neutral-700";
  const menuData = await getMenu("next-js-frontend-footer-menu");
  const menuItems = menuData ? menuData.items || [] : [];
  const copyrightName = COMPANY_NAME || SITE_NAME || "";

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link
              className="flex items-center gap-3 text-black dark:text-white mb-6"
              href="/"
            >
              <LogoSquare size="sm" />
              <span className="text-xl font-bold tracking-tight uppercase">
                {SITE_NAME}
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-md">
              Elegant modest fashion for the modern woman. Discover
              sophistication in every stitch with our carefully curated
              collection.
            </p>

            {/* Newsletter Signup */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Stay Updated
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Subscribe to get special offers, free giveaways, and exclusive
                deals.
              </p>
              <div className="flex max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-l-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                />
                <button className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-r-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/collections/new-in"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  New In
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/modest-dresses"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Modest Dresses
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/popular-styles"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Popular Styles
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/workwear"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Workwear
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Customer Service
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <div className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <SizeGuideButton />
                </div>
              </li>
              <li>
                <Link
                  href="/care-instructions"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Care Instructions
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Connect */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Company
            </h4>
            <ul className="space-y-3 mb-8">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/our-story"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/affiliate/apply"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Affiliate Program
                </Link>
              </li>
            </ul>

            {/* Connect Section */}
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Connect
            </h4>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.316-1.296-.875-.815-1.316-1.984-1.316-3.486 0-1.297.49-2.448 1.296-3.316.815-.875 1.984-1.316 3.486-1.316 1.297 0 2.448.49 3.316 1.296.875.815 1.316 1.984 1.316 3.486 0 1.297-.49 2.448-1.296 3.316-.815.875-1.984 1.316-3.486 1.316zm7.072-8.655c-.304 0-.555-.251-.555-.555s.251-.555.555-.555.555.251.555.555-.251.555-.555.555zm-2.618 5.461c0-1.663-1.351-3.015-3.015-3.015s-3.015 1.351-3.015 3.015 1.351 3.015 3.015 3.015 3.015-1.351 3.015-3.015z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <span className="sr-only">Pinterest</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <span className="sr-only">TikTok</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>

            {/* Contact Info & Currency */}
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                  Contact
                </h5>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Email: hello@modestclothing.com
                  </p>
                  <Link
                    href="tel:+442071234567"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Phone: +44 20 7123 4567
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Mon-Fri: 9AM-6PM GMT
                  </p>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                  Currency
                </h5>
                <CurrencySwitcher />
              </div>
            </div>
          </div>

          {/* WooCommerce Menu if available */}
          {menuItems.length > 0 && (
            <Suspense
              fallback={
                <div className="flex h-[188px] w-[200px] flex-col gap-2">
                  <div className={skeleton} />
                  <div className={skeleton} />
                  <div className={skeleton} />
                  <div className={skeleton} />
                  <div className={skeleton} />
                  <div className={skeleton} />
                </div>
              }
            >
              <FooterMenu menu={menuItems} />
            </Suspense>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                &copy; {copyrightDate} {copyrightName}. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link
                  href="/privacy"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookies"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>

            {/* Payment Methods & Security */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  We accept:
                </span>
                <div className="flex space-x-1">
                  <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div className="w-10 h-6 bg-gradient-to-r from-red-600 to-orange-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">MC</span>
                  </div>
                  <div className="w-10 h-6 bg-gradient-to-r from-blue-400 to-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AMEX</span>
                  </div>
                  <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">PayPal</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  SSL Secured
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
