import Footer from "components/layout/footer";
import { Navbar } from "components/layout/navbar";
import dynamic from "next/dynamic";

const WishlistClient = dynamic(() => import("./wishlist-client"), {
  loading: () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading your wishlist...
          </p>
        </div>
      </div>
    </div>
  ),
});

export default function WishlistPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900 dark:to-rose-900 pt-16 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-pink-100 dark:bg-pink-800 text-pink-800 dark:text-pink-200 rounded-full text-sm font-medium mb-6">
                💖 Your Favorites
              </div>
              <h1 className="text-4xl md:text-6xl font-light text-gray-900 dark:text-white mb-6">
                Wishlist
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Keep track of your favorite modest fashion pieces. Save items
                you love and come back to them anytime. Your style dreams,
                curated in one place.
              </p>
              <div className="mt-8 flex justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
                <span>💝 Save for Later</span>
                <span>🛍️ Easy Shopping</span>
                <span>❤️ Your Style</span>
              </div>
            </div>
          </div>
        </div>

        {/* Client Component for Interactive Features */}
        <WishlistClient />
      </div>

      <Footer />
    </>
  );
}
