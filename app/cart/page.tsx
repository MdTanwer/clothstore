import Footer from "components/layout/footer";
import { Navbar } from "components/layout/navbar";
import CartClient from "./cart-client";

// export const metadata = {
//   title: "Cart | Klassy & Fab",
//   description: "Review and manage items in your shopping cart.",
// };

export default function CartPage() {
  return (
    <>
      <Navbar />
      <CartClient />
      <Footer />
    </>
  );
}
