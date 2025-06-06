"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { addItem } from "components/cart/actions";
import { useCart } from "components/cart/cart-context";
import { useProduct } from "components/product/product-context";
import Prose from "components/prose";
import { Product, ProductVariant } from "lib/woocommerce/types";
import { useActionState, useState, useTransition } from "react";

export function ProductDescription({ product }: { product: Product }) {
  const { variants, availableForSale, options } = product;
  const { addCartItem, isPending: cartPending } = useCart();
  const { state, updateOption } = useProduct();
  const [message, formAction] = useActionState(addItem, null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Find the selected variant
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  );

  // Check if product is on sale
  const isOnSale =
    finalVariant?.price.salePrice &&
    parseFloat(finalVariant.price.salePrice) <
      parseFloat(finalVariant.price.regularPrice || finalVariant.price.amount);

  // Calculate savings
  const savings =
    isOnSale && finalVariant?.price.regularPrice
      ? (
          parseFloat(finalVariant.price.regularPrice) -
          parseFloat(finalVariant.price.salePrice!)
        ).toFixed(2)
      : null;

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    if (finalVariant) {
      setIsAddingToCart(true);
      try {
        // Add multiple items based on quantity
        for (let i = 0; i < quantity; i++) {
          addCartItem(finalVariant, product);
        }
        // Call the form action for any additional server-side logic
        if (selectedVariantId) {
          startTransition(() => {
            formAction(selectedVariantId);
          });
        }

        // Show success feedback
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
      } catch (error) {
        console.error("Error adding to cart:", error);
      } finally {
        setIsAddingToCart(false);
      }
    }
  };

  const canAddToCart = availableForSale && selectedVariantId;
  const isLoading = isAddingToCart || cartPending || isPending;

  return (
    <div className="flex flex-col space-y-6">
      {/* Product Title and Price */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {product.title}
          </h1>
          {product.categories && product.categories.length > 0 && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {product.categories[0]?.name}
            </p>
          )}
        </div>

        {/* Price Section */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            {isOnSale ? (
              <>
                <span className="text-3xl font-bold text-red-600">
                  £{parseFloat(finalVariant?.price.salePrice || "0").toFixed(2)}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  £
                  {parseFloat(
                    finalVariant?.price.regularPrice ||
                      finalVariant?.price.amount ||
                      "0"
                  ).toFixed(2)}
                </span>
                {savings && (
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                    Save £{savings}
                  </span>
                )}
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                £
                {parseFloat(
                  finalVariant?.price.amount ||
                    product.priceRange.minVariantPrice.amount
                ).toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                availableForSale ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                availableForSale ? "text-green-600" : "text-red-600"
              }`}
            >
              {availableForSale ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>
      </div>

      {/* Size/Variant Selection */}
      {options.length > 0 && (
        <div className="space-y-4">
          {options.map((option) => (
            <div key={option.id}>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                {option.name}
                {state[option.name.toLowerCase()] && (
                  <span className="ml-2 text-gray-600">
                    ({state[option.name.toLowerCase()]})
                  </span>
                )}
              </h3>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const isActive = state[option.name.toLowerCase()] === value;
                  const optionNameLowerCase = option.name.toLowerCase();

                  return (
                    <button
                      key={value}
                      onClick={() => updateOption(optionNameLowerCase, value)}
                      className={clsx(
                        "px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200",
                        {
                          "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black":
                            isActive,
                          "border-gray-300 bg-white text-gray-900 hover:border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-500":
                            !isActive,
                        }
                      )}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quantity Selection */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          Quantity
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg"
            >
              <MinusIcon className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 text-center min-w-[60px] border-x border-gray-300 dark:border-gray-600">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Total: £
            {(
              parseFloat(
                finalVariant?.price.salePrice ||
                  finalVariant?.price.amount ||
                  "0"
              ) * quantity
            ).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Add to Cart and Actions */}
      <div className="space-y-4">
        <button
          onClick={handleAddToCart}
          disabled={!canAddToCart || isLoading}
          className={clsx(
            "w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 cursor-pointer",
            {
              "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200":
                canAddToCart && !isLoading && !addedToCart,
              "bg-green-600 text-white": addedToCart,
              "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400":
                !canAddToCart || isLoading,
            }
          )}
        >
          {isLoading
            ? "Adding to Cart..."
            : addedToCart
              ? `Added ${quantity} to Cart ✓`
              : !availableForSale
                ? "Out of Stock"
                : !selectedVariantId
                  ? "Please Select Options"
                  : `Add ${quantity} to Cart`}
        </button>
      </div>

      {/* Product Description */}
      {product.descriptionHtml && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Product Details
          </h3>
          <Prose
            className="text-sm leading-relaxed text-gray-600 dark:text-gray-300"
            html={product.descriptionHtml}
          />
        </div>
      )}

      {message && (
        <p aria-live="polite" className="text-green-600 text-sm font-medium">
          {message}
        </p>
      )}
    </div>
  );
}
