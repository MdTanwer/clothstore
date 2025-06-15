"use client";

import type {
  Cart,
  CartItem,
  Product,
  ProductVariant,
} from "lib/woocommerce/types";
import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

type UpdateType = "plus" | "minus" | "delete";

type CartAction =
  | {
      type: "UPDATE_ITEM";
      payload: { merchandiseId: string; updateType: UpdateType };
    }
  | {
      type: "ADD_ITEM";
      payload: { variant: ProductVariant; product: Product };
    };

type CartContextType = {
  cartPromise: Promise<Cart | undefined>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// localStorage utilities
const CART_STORAGE_KEY = "wc-cart";

function saveCartToStorage(cart: Cart) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      console.log("Cart saved to localStorage:", cart);

      // Dispatch custom event to notify all cart components
      window.dispatchEvent(
        new CustomEvent("cartUpdated", {
          detail: { cart },
        })
      );
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }
}

function loadCartFromStorage(): Cart | null {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const cart = JSON.parse(stored);
        console.log("Cart loaded from localStorage:", cart);
        return cart;
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
  }
  return null;
}

function calculateItemCost(quantity: number, price: string): string {
  return (Number(price) * quantity).toString();
}

function updateCartItem(
  item: CartItem,
  updateType: UpdateType
): CartItem | null {
  if (updateType === "delete") return null;

  const newQuantity =
    updateType === "plus" ? item.quantity + 1 : item.quantity - 1;
  if (newQuantity === 0) return null;

  const singleItemAmount = Number(item.cost.totalAmount.amount) / item.quantity;
  const newTotalAmount = calculateItemCost(
    newQuantity,
    singleItemAmount.toString()
  );

  return {
    ...item,
    quantity: newQuantity,
    cost: {
      ...item.cost,
      totalAmount: {
        ...item.cost.totalAmount,
        amount: newTotalAmount,
      },
    },
  };
}

function createOrUpdateCartItem(
  existingItem: CartItem | undefined,
  variant: ProductVariant,
  product: Product
): CartItem {
  const quantity = existingItem ? existingItem.quantity + 1 : 1;

  // Use sale price if available, otherwise use regular price or amount
  const priceAmount = variant.price.salePrice || variant.price.amount;
  const totalAmount = calculateItemCost(quantity, priceAmount);

  console.log("createOrUpdateCartItem - inputs:", {
    existingItem,
    variant,
    product,
    quantity,
    priceAmount,
    totalAmount,
  });

  const cartItem = {
    id: existingItem?.id || `temp-${Date.now()}-${Math.random()}`,
    quantity,
    cost: {
      totalAmount: {
        amount: totalAmount,
        currencyCode: variant.price.currencyCode || "GBP",
      },
    },
    merchandise: {
      id: variant.id,
      title: variant.title,
      selectedOptions: variant.selectedOptions,
      product: {
        id: product.id,
        handle: product.handle,
        title: product.title,
        featuredImage: product.featuredImage,
      },
    },
  };

  console.log("createOrUpdateCartItem - result:", cartItem);
  return cartItem;
}

function updateCartTotals(
  lines: CartItem[]
): Pick<Cart, "totalQuantity" | "cost"> {
  const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = lines.reduce(
    (sum, item) => sum + Number(item.cost.totalAmount.amount),
    0
  );
  const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? "GBP";

  return {
    totalQuantity,
    cost: {
      subtotalAmount: { amount: totalAmount.toString(), currencyCode },
      totalAmount: { amount: totalAmount.toString(), currencyCode },
      totalTaxAmount: { amount: "0", currencyCode },
    },
  };
}

function createEmptyCart(): Cart {
  return {
    id: `wc-cart-${Date.now()}`,
    checkoutUrl: "https://klassyandfab.co/checkout",
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: { amount: "0", currencyCode: "GBP" },
      totalAmount: { amount: "0", currencyCode: "GBP" },
      totalTaxAmount: { amount: "0", currencyCode: "GBP" },
    },
  };
}

function cartReducer(state: Cart | undefined, action: CartAction): Cart {
  const currentCart = state || createEmptyCart();

  switch (action.type) {
    case "UPDATE_ITEM": {
      const { merchandiseId, updateType } = action.payload;
      console.log("UPDATE_ITEM action:", { merchandiseId, updateType });
      console.log("Current cart lines:", currentCart.lines);

      const updatedLines = currentCart.lines
        .map((item) => {
          console.log(
            "Checking item:",
            item.merchandise.id,
            "vs",
            merchandiseId
          );
          console.log("Item merchandise ID type:", typeof item.merchandise.id);
          console.log("Merchandise ID type:", typeof merchandiseId);
          console.log("Exact match:", item.merchandise.id === merchandiseId);

          if (item.merchandise.id === merchandiseId) {
            const updatedItem = updateCartItem(item, updateType);
            console.log("Updated item:", updatedItem);
            return updatedItem;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];

      console.log("Updated lines:", updatedLines);

      if (updatedLines.length === 0) {
        const emptyCart = createEmptyCart();
        saveCartToStorage(emptyCart);
        return emptyCart;
      }

      const updatedCart = {
        ...currentCart,
        ...updateCartTotals(updatedLines),
        lines: updatedLines,
      };

      console.log("Final updated cart:", updatedCart);
      saveCartToStorage(updatedCart);
      return updatedCart;
    }
    case "ADD_ITEM": {
      const { variant, product } = action.payload;

      console.log("ADD_ITEM - currentCart:", currentCart);
      console.log("ADD_ITEM - variant:", variant);
      console.log("ADD_ITEM - product:", product);

      const existingItem = currentCart.lines.find(
        (item) => item.merchandise.id === variant.id
      );

      console.log("ADD_ITEM - existingItem:", existingItem);

      const updatedItem = createOrUpdateCartItem(
        existingItem,
        variant,
        product
      );

      console.log("ADD_ITEM - updatedItem:", updatedItem);

      const updatedLines = existingItem
        ? currentCart.lines.map((item) =>
            item.merchandise.id === variant.id ? updatedItem : item
          )
        : [...currentCart.lines, updatedItem];

      console.log("ADD_ITEM - updatedLines:", updatedLines);

      const newCart = {
        ...currentCart,
        ...updateCartTotals(updatedLines),
        lines: updatedLines,
      };

      console.log("ADD_ITEM - newCart:", newCart);
      saveCartToStorage(newCart);
      return newCart;
    }
    default:
      return currentCart;
  }
}

export function CartProvider({
  children,
  cartPromise,
}: {
  children: React.ReactNode;
  cartPromise: Promise<Cart | undefined>;
}) {
  return (
    <CartContext.Provider value={{ cartPromise }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  const [isClient, setIsClient] = useState(false);
  const [cart, setCart] = useState<Cart | null>(null);
  const [isPending, startTransition] = useTransition();
  const initialCart = use(context.cartPromise);

  // Load cart from localStorage on client side
  useEffect(() => {
    setIsClient(true);
    const storedCart = loadCartFromStorage();
    if (storedCart) {
      setCart(storedCart);
      console.log("Loaded cart from localStorage:", storedCart);
    } else if (initialCart) {
      setCart(initialCart);
    } else {
      setCart(createEmptyCart());
    }
  }, [initialCart]);

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY && e.newValue) {
        try {
          const updatedCart = JSON.parse(e.newValue);
          setCart(updatedCart);
          console.log("Cart updated from storage event:", updatedCart);
        } catch (error) {
          console.error("Error parsing cart from storage event:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Listen for custom cart update events
  useEffect(() => {
    const handleCartUpdate = (event: CustomEvent) => {
      console.log("Received cart update event:", event.detail);
      const updatedCart = loadCartFromStorage();
      if (updatedCart) {
        setCart(updatedCart);
      }
    };

    window.addEventListener("cartUpdated", handleCartUpdate as EventListener);
    return () =>
      window.removeEventListener(
        "cartUpdated",
        handleCartUpdate as EventListener
      );
  }, []);

  const updateCartItem = (merchandiseId: string, updateType: UpdateType) => {
    console.log("=== updateCartItem CALLED ===");
    console.log("updateCartItem called:", { merchandiseId, updateType });
    console.log("Current cart state:", cart);

    if (!cart) {
      console.log("No cart available, returning early");
      return;
    }

    startTransition(() => {
      console.log("=== STARTING TRANSITION ===");

      // Apply the update directly to current cart
      const updatedCart = cartReducer(cart, {
        type: "UPDATE_ITEM",
        payload: { merchandiseId, updateType },
      });

      console.log("=== CART REDUCER RESULT ===");
      console.log("Updated cart from reducer:", updatedCart);
      console.log("Updated cart lines:", updatedCart.lines);
      console.log("Updated cart lines count:", updatedCart.lines.length);

      // Update state immediately
      setCart(updatedCart);
      console.log("=== STATE SET ===");

      // Save to localStorage (this will trigger the custom event)
      saveCartToStorage(updatedCart);
      console.log("=== SAVED TO STORAGE ===");

      // For delete operations, add an extra force refresh
      if (updateType === "delete") {
        console.log("=== DELETE OPERATION - FORCE REFRESH ===");
        setTimeout(() => {
          const freshCart = loadCartFromStorage();
          if (freshCart) {
            console.log("Force refreshing cart after delete:", freshCart);
            setCart(freshCart);
            // Dispatch another event to ensure all components update
            window.dispatchEvent(
              new CustomEvent("cartForceUpdate", {
                detail: { cart: freshCart },
              })
            );
          }
        }, 100);
      }

      console.log("=== updateCartItem COMPLETE ===");
    });
  };

  const addCartItem = (variant: ProductVariant, product: Product) => {
    console.log("addCartItem called with:", { variant, product });

    if (!cart) return;

    startTransition(() => {
      // Apply the update directly to current cart
      const updatedCart = cartReducer(cart, {
        type: "ADD_ITEM",
        payload: { variant, product },
      });

      // Update state immediately
      setCart(updatedCart);

      // Save to localStorage (this will trigger the custom event)
      saveCartToStorage(updatedCart);

      console.log("Item added to cart:", updatedCart);
    });
  };

  return useMemo(
    () => ({
      cart: cart || createEmptyCart(),
      updateCartItem,
      addCartItem,
      isPending,
    }),
    [cart, isPending]
  );
}
