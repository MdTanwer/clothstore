import LogoSquare from "components/logo-square";
import { SizeGuideButton } from "components/size-guide";
import { getMenu } from "lib/commerce";
import { MenuItem } from "lib/woocommerce/types";
import Link from "next/link";
import { Suspense } from "react";
import CartIcon from "./cart-icon";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";
import UserMenu from "./user-menu";

// Main navigation items matching the WooCommerce categories
const mainNavItems = [
  { title: "POPULAR DRESSES", url: "/collections/popular-styles" },
  { title: "CONTACT", url: "/contact" },
  { title: "NEW IN", url: "/collections/new-in" },
  { title: "MODEST DRESSES", url: "/collections/modest-dresses" },
];

// Secondary navigation items
const secondaryNavItems = [
  { title: "About", url: "/about" },
  { title: "Contact", url: "/contact" },
  { title: "Size Guide", component: <SizeGuideButton /> },
  { title: "Affiliate Program", url: "/affiliate/apply" },
  { title: "Legal", url: "/legal" },
];

export async function Navbar() {
  const menu = await getMenu("next-js-frontend-header-menu");
  // Use WooCommerce menu if available, otherwise use default nav items
  const menuItems =
    menu && Array.isArray(menu.items) && menu.items.length > 0
      ? menu.items
      : mainNavItems;

  return (
    <>
      {/* Top Bar */}
      <div className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:flex h-10 items-center justify-between text-sm">
            <div className="hidden lg:flex items-center space-x-6">
              <span className="text-gray-600 dark:text-gray-300">
                Free shipping on orders over £75
              </span>
              <span className="text-gray-600 dark:text-gray-300">•</span>
              <span className="text-gray-600 dark:text-gray-300">
                14-day returns
              </span>
            </div>
            <div className="items-center space-x-4 hidden lg:flex">
              {secondaryNavItems.map((item) => (
                <div key={item.title}>
                  {item.component ? (
                    item.component
                  ) : (
                    <Link
                      href={item.url}
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
              <span className="text-gray-400 dark:text-gray-500">|</span>
              <Link
                href="tel:+442071234567"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                +44 20 7123 4567
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Adaptive Theme */}
      <nav className="sticky top-0 z-40 bg-white dark:bg-black shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <Suspense fallback={null}>
                <MobileMenu menu={menuItems} />
              </Suspense>
            </div>

            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                prefetch={true}
                className="flex items-center space-x-2"
              >
                <LogoSquare />
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  K&F
                </span>
              </Link>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-center">
              <div className="flex space-x-12">
                {menuItems.map((item: MenuItem) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    prefetch={true}
                    className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-8">
              {/* User Menu */}
              <Suspense fallback={null}>
                <UserMenu />
              </Suspense>

              {/* Cart Icon - Links to cart page */}
              <CartIcon />
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="border-t border-gray-100 dark:border-gray-700 px-4 py-3 lg:hidden bg-white dark:bg-black">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
      </nav>
    </>
  );
}
