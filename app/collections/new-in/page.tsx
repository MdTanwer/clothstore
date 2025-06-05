import Footer from "components/layout/footer";
import { Navbar } from "components/layout/navbar";
import NewInClient from "./new-in-client";

export default function NewInPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        {/* <div className="relative bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900 dark:to-teal-900 pt-16 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-full text-sm font-medium mb-6">
                ✨ Fresh Arrivals
              </div>
              <h1 className="text-4xl md:text-6xl font-light text-gray-900 dark:text-white mb-6">
                New In
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover our latest collection of modest fashion pieces - fresh
                designs that blend contemporary style with timeless elegance,
                just arrived for the discerning modern woman.
              </p>
              <div className="mt-8 flex justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
                <span>🆕 Just Landed</span>
                <span>🎨 Latest Designs</span>
                <span>⚡ Limited Stock</span>
              </div>
            </div>
          </div>
        </div> */}

        {/* Client Component for Interactive Features */}
        <NewInClient />
      </div>

      <Footer />
    </>
  );
}
