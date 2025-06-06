import Footer from "components/layout/footer";
import { Navbar } from "components/layout/navbar";
import { getProductsByCategory } from "lib/woocommerce";
import PopularStylesClient from "../popular-styles/popular-styles-client";

export const metadata = {
  title: "Modest Dresses | Klassy & Fab",
  description:
    "Discover our collection of modest dresses. Elegant, comfortable, and fashionable clothing for the modern woman.",
};

export default async function ModestDressesPage() {
  // Fetch products from the modest-dresses category
  const products = await getProductsByCategory(
    "modest-dresses",
    50,
    "date",
    true
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Header */}

        {/* Products */}
        <PopularStylesClient
          products={products}
          categoryTitle="Modest Dresses"
        />
      </div>

      <Footer />
    </>
  );
}
