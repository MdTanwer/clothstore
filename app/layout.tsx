import { CartProvider } from "components/cart/cart-context";
import { CurrencyProvider } from "components/currency/currency-context";
import { createCart } from "lib/woocommerce";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const { SITE_NAME } = process.env;
const { COMPANY_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME || "K&F",
    template: `%s | ${SITE_NAME || "K&F"}`,
  },
  robots: {
    follow: true,
    index: true,
  },
  description: `${COMPANY_NAME || "Modest Wear Co."} - Online Store for Modest Clothing`,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create the cart - don't await it, pass the Promise to the context provider
  const cartPromise = createCart();

  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-neutral-50 text-black selection:bg-purple-500 selection:text-white dark:bg-neutral-900 dark:text-white">
        <CurrencyProvider>
          <CartProvider cartPromise={cartPromise}>
            <Toaster closeButton richColors />
            {children}
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
