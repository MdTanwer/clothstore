"use client";

import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, Suspense, useEffect, useState } from "react";

import {
  Bars3Icon,
  HeartIcon,
  InformationCircleIcon,
  PhoneIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MenuItem } from "lib/woocommerce/types";
import Search, { SearchSkeleton } from "./search";

// Secondary navigation items for mobile
const mobileSecondaryItems = [
  { title: "About Us", url: "/about", icon: InformationCircleIcon },
  { title: "Contact", url: "/contact", icon: PhoneIcon },
  { title: "Size Guide", url: "/size-guide", icon: InformationCircleIcon },
  { title: "Affiliate Program", url: "/affiliate/apply", icon: UserIcon },
];

export default function MobileMenu({ menu }: { menu: MenuItem[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would come from your auth context

  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Bars3Icon className="h-5 w-5" />
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white">
              <div className="flex-1 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={closeMobileMenu}
                    aria-label="Close mobile menu"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-gray-200">
                  <Suspense fallback={<SearchSkeleton />}>
                    <Search />
                  </Suspense>
                </div>

                {/* Account Section */}
                <div className="p-4 border-b border-gray-200">
                  {!isLoggedIn ? (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">
                        Sign in to access your account and orders
                      </p>
                      <div className="flex space-x-3">
                        <Link
                          href="/login"
                          onClick={closeMobileMenu}
                          className="flex-1 bg-black text-white text-center py-2 px-4 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/register"
                          onClick={closeMobileMenu}
                          className="flex-1 border border-gray-300 text-gray-700 text-center py-2 px-4 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
                        >
                          Register
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-900">
                        Welcome back!
                      </p>
                      <div className="space-y-2">
                        <Link
                          href="/account"
                          onClick={closeMobileMenu}
                          className="flex items-center space-x-3 text-gray-700 hover:text-gray-900"
                        >
                          <UserIcon className="h-5 w-5" />
                          <span>My Account</span>
                        </Link>
                        <Link
                          href="/wishlist"
                          onClick={closeMobileMenu}
                          className="flex items-center space-x-3 text-gray-700 hover:text-gray-900"
                        >
                          <HeartIcon className="h-5 w-5" />
                          <span>Wishlist (0)</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Main Navigation */}
                {menu.length ? (
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                      Shop
                    </h3>
                    <ul className="space-y-1">
                      {menu.map((item: MenuItem) => (
                        <li key={item.title}>
                          <Link
                            href={item.url}
                            prefetch={true}
                            onClick={closeMobileMenu}
                            className="block py-3 text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors border-b border-gray-100 last:border-b-0"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {/* Secondary Navigation */}
                <div className="p-4 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                    Help & Info
                  </h3>
                  <ul className="space-y-1">
                    {mobileSecondaryItems.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.url}
                          onClick={closeMobileMenu}
                          className="flex items-center space-x-3 py-3 text-gray-700 hover:text-gray-900 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">Need help?</p>
                  <Link
                    href="tel:+442071234567"
                    className="block text-sm font-medium text-gray-900 hover:text-gray-700"
                  >
                    +44 20 7123 4567
                  </Link>
                  <p className="text-xs text-gray-500">Mon-Fri, 9AM-6PM GMT</p>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
