"use client";

import {
  ArrowRightOnRectangleIcon,
  CogIcon,
  HeartIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from your auth context

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="flex items-center">
      {/* User Menu Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors"
        aria-label="User menu"
      >
        <UserIcon className="h-6 w-6" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-30"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div className="absolute right-0 z-40 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
            {!isLoggedIn ? (
              // Guest Menu
              <div className="px-4 py-3">
                <p className="text-sm text-gray-600 mb-3">
                  Sign in to access your account, orders, and wishlist.
                </p>
                <div className="space-y-2">
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="block w-full bg-black text-white text-center py-2 px-4 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMenu}
                    className="block w-full border border-gray-300 text-gray-700 text-center py-2 px-4 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            ) : (
              // Logged In Menu
              <div>
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    Welcome back!
                  </p>
                  <p className="text-sm text-gray-600">user@example.com</p>
                </div>

                <div className="py-1">
                  <Link
                    href="/account"
                    onClick={closeMenu}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <UserIcon className="h-4 w-4 mr-3" />
                    My Account
                  </Link>

                  <Link
                    href="/account/orders"
                    onClick={closeMenu}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <ShoppingBagIcon className="h-4 w-4 mr-3" />
                    Order History
                  </Link>

                  <Link
                    href="/account/settings"
                    onClick={closeMenu}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <CogIcon className="h-4 w-4 mr-3" />
                    Settings
                  </Link>

                  <button
                    onClick={() => {
                      // Handle logout
                      setIsLoggedIn(false);
                      closeMenu();
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}

            {/* Wishlist - Always shown */}
            <div className="border-t border-gray-100 py-1">
              <Link
                href="/wishlist"
                onClick={closeMenu}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <HeartIcon className="h-4 w-4 mr-3" />
                Wishlist
                <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  0
                </span>
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Wishlist Quick Access (separate button) */}
      <Link
        href="/wishlist"
        className="ml-2 p-2  text-gray-700 hover:text-red-500 transition-colors relative"
        aria-label="Wishlist"
      >
        <HeartIcon className="h-6 w-6" />
        {/* Wishlist count badge */}
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          0
        </span>
      </Link>
    </div>
  );
}
