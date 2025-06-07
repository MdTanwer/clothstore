"use client";

import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCart } from "components/cart/cart-context";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}

function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  productName,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Remove Item
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1">
            <div className="mb-6">
              <TrashIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <p className="text-center text-gray-700 dark:text-gray-300 mb-2">
                Are you sure you want to remove this item from your cart?
              </p>
              <p className="text-center font-medium text-gray-900 dark:text-white">
                {productName}
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function CartClient() {
  const { cart, updateCartItem } = useCart();
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    itemId: string | null;
    productName: string;
  }>({
    isOpen: false,
    itemId: null,
    productName: "",
  });

  // New state for coupon and delivery address
  const [showCouponSection, setShowCouponSection] = useState(false);
  const [couponCode, setCouponCode] = useState("");
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

  const openDeleteModal = (itemId: string, productName: string) => {
    setDeleteModal({
      isOpen: true,
      itemId,
      productName,
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      itemId: null,
      productName: "",
    });
  };

  const confirmDelete = () => {
    if (deleteModal.itemId) {
      updateCartItem(deleteModal.itemId, "delete");
      // Show coupon section after product removal
      setShowCouponSection(true);
    }
    closeDeleteModal();
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

    // Here you would proceed with checkout
    alert("Proceeding to checkout with delivery address provided");
  };

  const formatPrice = (amount: string) => {
    return parseFloat(amount).toFixed(2);
  };

  const subtotal = cart?.cost.subtotalAmount.amount || "0";
  const shippingFast = "20.00";
  const shippingStandard = "15.00";
  const [selectedShipping, setSelectedShipping] = useState("fast");
  const shippingCost =
    selectedShipping === "fast" ? shippingFast : shippingStandard;
  const total = (parseFloat(subtotal) + parseFloat(shippingCost)).toFixed(2);

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Cart
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
          ) : (
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
                                £{formatPrice(item.cost.totalAmount.amount)}{" "}
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
                                  updateCartItem(item.merchandise.id, "minus")
                                }
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <MinusIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              </button>
                              <span className="px-4 py-2 text-center min-w-[3rem] text-gray-900 dark:text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateCartItem(item.merchandise.id, "plus")
                                }
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                <PlusIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              </button>
                            </div>
                          </div>

                          {/* Subtotal */}
                          <div className="md:col-span-2 text-right">
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                              £{formatPrice(item.cost.totalAmount.amount)}
                            </p>
                          </div>

                          {/* Delete Button */}
                          <div className="md:col-span-2 flex justify-end">
                            <button
                              onClick={() =>
                                openDeleteModal(
                                  item.merchandise.id,
                                  item.merchandise.product.title
                                )
                              }
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
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

                {/* Coupon Code - Show after product removal */}
                {showCouponSection && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Have a coupon code?
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
                      />
                      <button
                        onClick={applyCoupon}
                        className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                      >
                        Apply coupon
                      </button>
                    </div>
                  </div>
                )}

                {/* Delivery Address Form */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Delivery Address <span className="text-red-500">*</span>
                  </h3>
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
                        placeholder="Enter your full name"
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
                        placeholder="Street address, P.O. box, company name"
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
                      <span>£{formatPrice(subtotal)}</span>
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
                            Fast delivery 3-5 working days: £{shippingFast}
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
                            Standard delivery 5-7 working days: £
                            {shippingStandard}
                          </span>
                        </label>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Shipping to{" "}
                        <strong>{deliveryAddress.country || "UK"}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                    <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span>£{total}</span>
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

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        productName={deleteModal.productName}
      />
    </>
  );
}
