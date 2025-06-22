import Footer from "components/layout/footer";
import { Navbar } from "components/layout/navbar";
import { getProducts } from "lib/woocommerce";
import NewInClient from "./new-in-client";

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
      <NewInClient products={products} />
      <Footer />
    </>
  );
}
