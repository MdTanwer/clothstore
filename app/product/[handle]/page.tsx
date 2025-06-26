import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GridTileImage } from "components/grid/tile";
import Footer from "components/layout/footer";
import { Navbar } from "components/layout/navbar";
import { Gallery } from "components/product/gallery";
import { ProductProvider } from "components/product/product-context";
import { ProductDescription } from "components/product/product-description";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { CurrencyCode, DEFAULT_CURRENCY } from "lib/currency/types";
import { getProduct, getProductRecommendations } from "lib/woocommerce";
import { Image } from "lib/woocommerce/types";
import Link from "next/link";
import { Suspense } from "react";

// Helper function to safely convert string to CurrencyCode
const toCurrencyCode = (code: string): CurrencyCode => {
  const upperCode = code.toUpperCase();
  if (upperCode === "GBP" || upperCode === "USD" || upperCode === "EUR") {
    return upperCode as CurrencyCode;
  }
  return DEFAULT_CURRENCY;
};

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <ProductProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      {/* Header */}
      <Navbar />

      {/* Main Product Section */}
      <div className="bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
            {/* Product Images */}
            <div className="lg:sticky lg:top-8">
              <Suspense
                fallback={
                  <div className="aspect-square w-full bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
                }
              >
                <Gallery
                  images={product.images.slice(0, 5).map((image: Image) => ({
                    src: image.url,
                    altText: image.altText,
                  }))}
                />
              </Suspense>
            </div>

            {/* Product Info */}
            <div className="mt-8 lg:mt-0">
              <Suspense
                fallback={
                  <div className="space-y-6">
                    <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                  </div>
                }
              >
                <ProductDescription product={product} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <RelatedProducts id={product.id} />
        </div>
      </div>

      <Footer />
    </ProductProvider>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        You May Also Like
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.slice(0, 4).map((product) => (
          <div
            key={product.handle}
            className="group border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 rounded-lg overflow-hidden transition-all duration-300"
          >
            <Link
              href={`/product/${product.handle}`}
              prefetch={true}
              className="block"
            >
              <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800 group-hover:opacity-75 transition-opacity">
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode: toCurrencyCode(
                      product.priceRange.maxVariantPrice.currencyCode
                    ),
                    regularPrice:
                      product.priceRange.maxVariantPrice.regularPrice,
                    salePrice:
                      product.priceRange.maxVariantPrice.salePrice || undefined,
                  }}
                  src={product.featuredImage?.url}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </div>
              <div className="mt-4 px-3 pb-3 space-y-2">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300">
                  {product.title}
                </h3>
                <div className="flex items-center space-x-2">
                  {product.priceRange.maxVariantPrice.salePrice ? (
                    <>
                      <span className="text-sm font-semibold text-red-600">
                        £
                        {parseFloat(
                          product.priceRange.maxVariantPrice.salePrice
                        ).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        £
                        {parseFloat(
                          product.priceRange.maxVariantPrice.regularPrice ||
                            product.priceRange.maxVariantPrice.amount
                        ).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      £
                      {parseFloat(
                        product.priceRange.maxVariantPrice.amount
                      ).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
