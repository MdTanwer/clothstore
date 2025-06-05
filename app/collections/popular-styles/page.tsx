import Footer from "components/layout/footer";
import { Navbar } from "components/layout/navbar";
import PopularStylesClient from "./popular-styles-client";

export default function PopularStylesPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        {/* <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 pt-16 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-light text-gray-900 dark:text-white mb-6">
                Popular Styles
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover our most loved pieces - carefully curated styles that
                combine elegance, comfort, and modesty for the modern woman.
              </p>
              <div className="mt-8 flex justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
                <span>✨ Trending Now</span>
                <span>🌟 Customer Favorites</span>
                <span>💎 Premium Quality</span>
              </div>
            </div>
          </div>
        </div> */}

        {/* Client Component for Interactive Features */}
        <PopularStylesClient />
      </div>

      <Footer />
    </>
  );
}
