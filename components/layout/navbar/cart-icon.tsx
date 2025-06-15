"use client";

import { useCart } from "components/cart/cart-context";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartIcon() {
  const { cart } = useCart();
  const [itemCount, setItemCount] = useState(0);

  // Function to calculate item count from cart
  const calculateItemCount = (cartData: any) => {
    return (
      cartData?.lines?.reduce(
        (total: number, item: any) => total + item.quantity,
        0
      ) || 0
    );
  };

  // Update item count when cart prop changes
  useEffect(() => {
    const newItemCount = calculateItemCount(cart);
    setItemCount(newItemCount);
    console.log("CartIcon - cart prop updated:", cart);
    console.log("CartIcon - itemCount from prop:", newItemCount);
  }, [cart]);

  // Listen for cart update events as backup
  useEffect(() => {
    const handleCartUpdate = (event: CustomEvent) => {
      console.log("CartIcon - received cart update event:", event.detail);
      if (event.detail?.cart) {
        const newItemCount = calculateItemCount(event.detail.cart);
        setItemCount(newItemCount);
        console.log("CartIcon - itemCount from event:", newItemCount);
      }
    };

    const handleCartForceUpdate = (event: CustomEvent) => {
      console.log("CartIcon - received cart FORCE update event:", event.detail);
      if (event.detail?.cart) {
        const newItemCount = calculateItemCount(event.detail.cart);
        setItemCount(newItemCount);
        console.log("CartIcon - itemCount from FORCE event:", newItemCount);
      }
    };

    window.addEventListener("cartUpdated", handleCartUpdate as EventListener);
    window.addEventListener(
      "cartForceUpdate",
      handleCartForceUpdate as EventListener
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        handleCartUpdate as EventListener
      );
      window.removeEventListener(
        "cartForceUpdate",
        handleCartForceUpdate as EventListener
      );
    };
  }, []);

  // Polling mechanism as final fallback - check localStorage every 2 seconds
  useEffect(() => {
    const pollCart = () => {
      try {
        const storedCart = localStorage.getItem("wc-cart");
        if (storedCart) {
          const cartData = JSON.parse(storedCart);
          const newItemCount = calculateItemCount(cartData);
          if (newItemCount !== itemCount) {
            setItemCount(newItemCount);
            console.log("CartIcon - itemCount from polling:", newItemCount);
          }
        }
      } catch (error) {
        console.error("CartIcon - polling error:", error);
      }
    };

    const interval = setInterval(pollCart, 2000); // Poll every 2 seconds

    return () => clearInterval(interval);
  }, [itemCount]);

  return (
    <Link
      href="/cart"
      className="relative text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
    >
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
        />
      </svg>

      {/* Cart count badge */}
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}
