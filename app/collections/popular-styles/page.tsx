import Footer from "components/layout/footer";
import { Navbar } from "components/layout/navbar";
import { getProductsByCategory } from "lib/woocommerce";
import PopularStylesClient from "./popular-styles-client";

export const metadata = {
  title: "Modest Dresses - Popular Styles | Klassy & Fab",
  description:
    "Discover our collection of modest dresses and popular styles. Elegant, comfortable, and fashionable clothing for the modern woman.",
};

export default async function PopularStylesPage() {
  // Fetch products from the modest-dresses category
  const products = await getProductsByCategory(
    "modest-dresses",
    20,
    "date",
    true
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white dark:bg-gray-900">
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
