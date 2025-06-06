"use client";

import { useCart } from "components/cart/cart-context";
import { getProduct } from "lib/woocommerce";
import { Product } from "lib/woocommerce/types";
import { useEffect, useState } from "react";

export default function CartDebugPage() {
  const { cart, addCartItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Load a test product
    getProduct("hannah-modest-embellished-sequin-maxi-dress").then(
      (product) => {
        setProduct(product || null);
      }
    );
  }, []);

  const handleAddToCart = () => {
    if (product && product.variants.length > 0) {
      const variant = product.variants[0];
      if (variant) {
        addCartItem(variant, product);
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Cart Debug Page</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Current Cart:</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(cart, null, 2)}
        </pre>
      </div>

      {product && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Test Product:</h2>
          <div className="bg-gray-100 p-4 rounded mb-4">
            <p>
              <strong>Title:</strong> {product.title}
            </p>
            <p>
              <strong>Price:</strong> £{product.variants[0]?.price.amount}
            </p>
            <p>
              <strong>Sale Price:</strong>{" "}
              {product.variants[0]?.price.salePrice || "None"}
            </p>
            <p>
              <strong>Available:</strong>{" "}
              {product.availableForSale ? "Yes" : "No"}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold mb-2">Cart Items:</h2>
        {cart?.lines.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <ul>
            {cart?.lines.map((item, index) => (
              <li key={index} className="mb-2 p-2 bg-gray-50 rounded">
                <p>
                  <strong>{item.merchandise.product.title}</strong>
                </p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: £{item.cost.totalAmount.amount}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
