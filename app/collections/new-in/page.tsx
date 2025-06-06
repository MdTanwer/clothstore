import Footer from "components/layout/footer";
import { Navbar } from "components/layout/navbar";
import { getProducts } from "lib/woocommerce";
import PopularStylesClient from "../popular-styles/popular-styles-client";

export const metadata = {
  title: "New In | Klassy & Fab",
  description:
    "Discover our latest arrivals. Fresh styles and trending fashion pieces just added to our collection.",
};

export default async function NewInPage() {
  // Fetch newest products (sorted by date, descending)
  const products = await getProducts(50, undefined, "date", true);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Header */}

        {/* Products */}
        <PopularStylesClient products={products} categoryTitle="New In" />
      </div>

      <Footer />
    </>
  );
}
