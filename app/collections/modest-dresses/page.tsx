import Footer from "components/layout/footer";
import { Navbar } from "components/layout/navbar";
import dynamic from "next/dynamic";

const ModestDressesClient = dynamic(() => import("./modest-dresses-client"), {
  loading: () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dresses...</p>
        </div>
      </div>
    </div>
  ),
});

export default function ModestDressesPage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900 dark:to-pink-900 pt-16 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-rose-100 dark:bg-rose-800 text-rose-800 dark:text-rose-200 rounded-full text-sm font-medium mb-6">
                👗 Elegant & Modest
              </div>
              <h1 className="text-4xl md:text-6xl font-light text-gray-900 dark:text-white mb-6">
                Modest Dresses
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Discover our exquisite collection of modest dresses - where
                elegance meets coverage. From flowing maxis to sophisticated
                midi dresses, each piece is designed to celebrate femininity
                with grace and style.
              </p>
              <div className="mt-8 flex justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
                <span>🌸 Elegant Coverage</span>
                <span>✨ Sophisticated Style</span>
                <span>💫 Timeless Beauty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Client Component for Interactive Features */}
        <ModestDressesClient />
      </div>

      <Footer />
    </>
  );
}
