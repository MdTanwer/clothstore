import HeroBanner from "@/components/hero-banner";
import { Carousel } from "components/carousel";
import ContactButton from "components/contact-button";
import CookieConsent from "components/cookie-consent";
import { ThreeItemGrid } from "components/grid/three-items";
import InteractiveBanner from "components/interactive-banner";
import Footer from "components/layout/footer";
import { Navbar } from "components/layout/navbar";
import NewsletterPopup from "components/newsletter-popup";
import ProductSlider from "components/product-slider";
// import VideoUGCSection from "components/video-ugc-section";
import React from "react";

export const metadata = {
  description:
    "Modest Clothing Store - High-performance ecommerce store built with Next.js, Vercel, and WooCommerce. Elegant modest fashion for the modern woman.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <React.Fragment>
      <Navbar />
      <main>
        {/* Hero Banner */}
        <HeroBanner />

        {/* Featured Products - Auto-Sliding New Arrivals */}
        <ProductSlider
          title="New Arrivals"
          subtitle="Discover our latest modest fashion pieces"
          limit={8}
          autoSlide={true}
          autoSlideInterval={3000}
          showDots={false}
        />

        {/* Best Sellers */}
        <ProductSlider
          title="Best Sellers"
          subtitle="Customer favorites that never go out of style"
          limit={8}
        />

        {/* Three Item Grid (existing component) */}
        <ThreeItemGrid />

        {/* Interactive Banner */}
        <InteractiveBanner />

        {/* Sale Items */}
        <ProductSlider
          title="Special Offers"
          subtitle="Limited time deals on selected items"
          limit={6}
        />

        {/* Video, Reviews & UGC Section */}
        {/* <VideoUGCSection /> */}

        {/* Existing Carousel */}
        <Carousel />
      </main>

      <Footer />

      {/* Global Components */}
      <CookieConsent />
      <NewsletterPopup />
      <ContactButton />
    </React.Fragment>
  );
}
