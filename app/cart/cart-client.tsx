"use client";

import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCart } from "components/cart/cart-context";
import StripeCheckout from "components/checkout/stripe-checkout";
import { useCurrency } from "components/currency/currency-context";
import { convertPrice } from "lib/currency/exchange-rates";
import { SUPPORTED_CURRENCIES } from "lib/currency/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartClient() {
  const { cart, updateCartItem, addCartItem } = useCart();
  const { selectedCurrency, exchangeRates, setCurrency } = useCurrency();

  // New state for coupon and delivery address
  const [showCouponSection, setShowCouponSection] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "United Kingdom",
    phone: "",
  });
  const [addressErrors, setAddressErrors] = useState<{ [key: string]: string }>(
    {}
  );

  // Debug function to log cart structure
  const debugCart = () => {
    console.log("=== CART DEBUG ===");
    console.log("Full cart object:", cart);
    if (cart?.lines) {
      cart.lines.forEach((item, index) => {
        console.log(`Item ${index}:`, {
          id: item.id,
          merchandiseId: item.merchandise.id,
          merchandiseIdType: typeof item.merchandise.id,
          title: item.merchandise.title,
          quantity: item.quantity,
        });
      });
    }
    console.log("=== END CART DEBUG ===");
  };

  // Call debug on component mount and when cart changes
  useEffect(() => {
    debugCart();
  }, [cart]);

  const handleDeleteItem = (itemId: string) => {
    console.log("=== DELETE ITEM START ===");
    console.log("Deleting item:", itemId);
    console.log("Current cart before delete:", cart);
    console.log("Cart lines before delete:", cart?.lines);
    console.log("Cart lines count before:", cart?.lines?.length);

    updateCartItem(itemId, "delete");

    // Add a timeout to check the result
    setTimeout(() => {
      console.log("=== DELETE ITEM RESULT CHECK ===");
      console.log("Cart after delete:", cart);
      console.log("Cart lines after delete:", cart?.lines);
      console.log("Cart lines count after:", cart?.lines?.length);
      console.log("=== DELETE ITEM END ===");
    }, 500);
  };

  const handleQuantityChange = (itemId: string, type: "plus" | "minus") => {
    console.log("Quantity change:", { itemId, type });
    updateCartItem(itemId, type);
  };

  const validateAddress = () => {
    const errors: { [key: string]: string } = {};

    if (!deliveryAddress.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    if (!deliveryAddress.addressLine1.trim()) {
      errors.addressLine1 = "Address line 1 is required";
    }
    if (!deliveryAddress.city.trim()) {
      errors.city = "City is required";
    }
    if (!deliveryAddress.postalCode.trim()) {
      errors.postalCode = "Postal code is required";
    }
    if (!deliveryAddress.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddressChange = (field: string, value: string) => {
    setDeliveryAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (addressErrors[field]) {
      setAddressErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const applyCoupon = () => {
    if (couponCode.trim()) {
      // Here you would typically validate the coupon with your backend
      alert(`Coupon "${couponCode}" applied successfully!`);
    }
  };

  const proceedToCheckout = () => {
    if (!validateAddress()) {
      alert("Please fill in all required delivery address fields");
      return;
    }
    setShowCheckout(true);
    setPaymentError("");
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    setPaymentSuccess(true);
    setShowCheckout(false);
    console.log("Payment successful:", paymentIntentId);
    // Here you would typically:
    // 1. Clear the cart
    // 2. Send order confirmation email
    // 3. Redirect to success page
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
    console.error("Payment error:", error);
  };

  const formatPrice = (amount: string) => {
    return parseFloat(amount).toFixed(2);
  };

  const convertPriceToSelectedCurrency = (amount: string): number => {
    if (!exchangeRates) return parseFloat(amount);

    const convertedAmount = convertPrice(
      amount,
      "GBP", // Assuming cart prices are in GBP
      selectedCurrency,
      exchangeRates
    );

    return parseFloat(convertedAmount);
  };

  const subtotal = cart?.cost.subtotalAmount.amount || "0";
  const shippingFast = "20.00";
  const shippingStandard = "15.00";
  const [selectedShipping, setSelectedShipping] = useState("fast");
  const shippingCost =
    selectedShipping === "fast" ? shippingFast : shippingStandard;

  // Convert prices to selected currency
  const convertedSubtotal = convertPriceToSelectedCurrency(subtotal);
  const convertedShippingCost = convertPriceToSelectedCurrency(shippingCost);
  const convertedTotal = convertedSubtotal + convertedShippingCost;

  // Payment success screen
  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-4 text-green-500">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you for your order. You will receive a confirmation email
            shortly.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            {showCheckout ? "Checkout" : "Cart"}
          </h1>

          {!cart || !cart.lines || cart.lines.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : showCheckout ? (
            // Checkout View
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    {cart.lines.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4"
                      >
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.merchandise.product.featuredImage.url}
                            alt={
                              item.merchandise.product.featuredImage.altText ||
                              item.merchandise.product.title
                            }
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {item.merchandise.product.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>Subtotal</span>
                      <span>
                        {selectedCurrency} {convertedSubtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>Shipping</span>
                      <span>
                        {selectedCurrency} {convertedShippingCost.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-2">
                      <span>Total</span>
                      <span>
                        {selectedCurrency} {convertedTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowCheckout(false)}
                    className="mt-4 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    ← Back to Cart
                  </button>
                </div>

                {/* Payment Form */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  {paymentError && (
                    <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-red-600 dark:text-red-400 text-sm">
                        {paymentError}
                      </p>
                    </div>
                  )}

                  <StripeCheckout
                    totalAmount={convertedTotal}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </div>
              </div>
            </div>
          ) : (
            // Cart View (existing code continues...)
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                  {/* Table Header */}
                  <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Subtotal</div>
                    <div className="col-span-2"></div>
                  </div>

                  {/* Cart Items */}
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {cart.lines.map((item) => (
                      <div key={item.id} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          {/* Product Info */}
                          <div className="md:col-span-6 flex items-center space-x-4">
                            <div className="relative w-20 h-20 flex-shrink-0">
                              <Image
                                src={item.merchandise.product.featuredImage.url}
                                alt={
                                  item.merchandise.product.featuredImage
                                    .altText || item.merchandise.product.title
                                }
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                                {item.merchandise.product.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {selectedCurrency}{" "}
                                {convertPriceToSelectedCurrency(
                                  item.cost.totalAmount.amount
                                ).toFixed(2)}{" "}
                                each
                              </p>
                              {item.merchandise.title !== "Default" && (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {item.merchandise.title}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="md:col-span-2 flex items-center justify-center">
                            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.merchandise.id,
                                    "minus"
                                  )
                                }
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                <MinusIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              </button>
                              <span className="px-4 py-2 text-center min-w-[3rem] text-gray-900 dark:text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.merchandise.id,
                                    "plus"
                                  )
                                }
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                <PlusIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              </button>
                            </div>
                          </div>

                          {/* Subtotal */}
                          <div className="md:col-span-2 text-right">
                            <p className="text-lg font-medium text-gray-900 dark:text-white">
                              {selectedCurrency}{" "}
                              {(
                                convertPriceToSelectedCurrency(
                                  item.cost.totalAmount.amount
                                ) * item.quantity
                              ).toFixed(2)}
                            </p>
                          </div>

                          {/* Delete Button */}
                          <div className="md:col-span-2 flex justify-end">
                            <button
                              onClick={() =>
                                handleDeleteItem(item.merchandise.id)
                              }
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              title="Remove item"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coupon Section - Only show after product deletion */}

                {/* Delivery Address Form */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Delivery Address
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Please provide your delivery address to proceed with
                    checkout.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress.fullName}
                        onChange={(e) =>
                          handleAddressChange("fullName", e.target.value)
                        }
                        className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent ${
                          addressErrors.fullName
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        placeholder="John Doe"
                      />
                      {addressErrors.fullName && (
                        <p className="text-red-500 text-sm mt-1">
                          {addressErrors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address Line 1 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress.addressLine1}
                        onChange={(e) =>
                          handleAddressChange("addressLine1", e.target.value)
                        }
                        className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent ${
                          addressErrors.addressLine1
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        placeholder="123 Main Street"
                      />
                      {addressErrors.addressLine1 && (
                        <p className="text-red-500 text-sm mt-1">
                          {addressErrors.addressLine1}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address Line 2 (Optional)
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress.addressLine2}
                        onChange={(e) =>
                          handleAddressChange("addressLine2", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                        placeholder="Apartment, suite, unit, building, floor, etc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress.city}
                        onChange={(e) =>
                          handleAddressChange("city", e.target.value)
                        }
                        className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent ${
                          addressErrors.city
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        placeholder="City"
                      />
                      {addressErrors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {addressErrors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Postal Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress.postalCode}
                        onChange={(e) =>
                          handleAddressChange("postalCode", e.target.value)
                        }
                        className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent ${
                          addressErrors.postalCode
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        placeholder="Postal code"
                      />
                      {addressErrors.postalCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {addressErrors.postalCode}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Country
                      </label>
                      <select
                        value={deliveryAddress.country}
                        onChange={(e) =>
                          handleAddressChange("country", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                      >
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Ireland">Ireland</option>
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                        <option value="Spain">Spain</option>
                        <option value="Italy">Italy</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Belgium">Belgium</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={deliveryAddress.phone}
                        onChange={(e) =>
                          handleAddressChange("phone", e.target.value)
                        }
                        className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent ${
                          addressErrors.phone
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                        placeholder="+44 20 1234 5678"
                      />
                      {addressErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {addressErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-8">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Basket totals
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>Subtotal</span>
                      <span>
                        {selectedCurrency} {convertedSubtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <p className="font-medium text-gray-900 dark:text-white mb-3">
                        Shipping
                      </p>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="shipping"
                            value="fast"
                            checked={selectedShipping === "fast"}
                            onChange={(e) =>
                              setSelectedShipping(e.target.value)
                            }
                            className="mr-3 text-black dark:text-white focus:ring-black dark:focus:ring-white"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            Fast delivery 3-5 working days: {selectedCurrency}{" "}
                            {convertPriceToSelectedCurrency(
                              shippingFast
                            ).toFixed(2)}
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="shipping"
                            value="standard"
                            checked={selectedShipping === "standard"}
                            onChange={(e) =>
                              setSelectedShipping(e.target.value)
                            }
                            className="mr-3 text-black dark:text-white focus:ring-black dark:focus:ring-white"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            Standard delivery 5-7 working days:{" "}
                            {selectedCurrency}{" "}
                            {convertPriceToSelectedCurrency(
                              shippingStandard
                            ).toFixed(2)}
                          </span>
                        </label>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Shipping to{" "}
                        <strong>{deliveryAddress.country || "UK"}</strong>
                      </p>

                      {/* Currency Selector */}
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Currency
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {SUPPORTED_CURRENCIES.map((currency) => (
                            <button
                              key={currency.code}
                              onClick={() => setCurrency(currency.code)}
                              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                                selectedCurrency === currency.code
                                  ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                              }`}
                            >
                              <span className="text-base">{currency.flag}</span>
                              <span>{currency.code}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {currency.symbol}
                              </span>
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Prices will be converted using current exchange rates
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                    <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span>
                        {selectedCurrency} {convertedTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={proceedToCheckout}
                    className="w-full bg-black dark:bg-white text-white dark:text-black font-medium py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    Proceed to checkout
                  </button>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    * Delivery address is required to proceed
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
