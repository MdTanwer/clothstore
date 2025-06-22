import LogoSquare from "components/logo-square";
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
  // { title: "CONTACT", url: "/contact" },
  { title: "NEW IN", url: "/collections/new-in" },
  { title: "MODEST DRESSES", url: "/collections/modest-dresses" },
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
            <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
              {/* User Menu */}
              <Suspense fallback={null}>
                <UserMenu />
              </Suspense>

              {/* Cart Icon - Links to cart page */}
              <CartIcon />
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Search Bar - Enhanced */}
        <div className="border-t border-gray-100 dark:border-gray-700 px-4 py-3 lg:hidden bg-white dark:bg-black">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
      </nav>
    </>
  );
}
