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
  useOptimistic,
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
      const updatedLines = currentCart.lines
        .map((item) =>
          item.merchandise.id === merchandiseId
            ? updateCartItem(item, updateType)
            : item
        )
        .filter(Boolean) as CartItem[];

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
  const initialCart = use(context.cartPromise);

  // Load cart from localStorage on client side
  const [localCart, setLocalCart] = useState<Cart | null>(null);

  useEffect(() => {
    setIsClient(true);
    const storedCart = loadCartFromStorage();
    if (storedCart) {
      setLocalCart(storedCart);
      console.log("Loaded cart from localStorage:", storedCart);
    }
  }, []);

  // Use localStorage cart if available, otherwise use initial cart or empty cart
  const validInitialCart = useMemo(() => {
    if (!isClient) return createEmptyCart();
    return localCart || initialCart || createEmptyCart();
  }, [isClient, localCart, initialCart]);

  const [optimisticCart, updateOptimisticCart] = useOptimistic(
    validInitialCart,
    cartReducer
  );
  const [isPending, startTransition] = useTransition();

  const updateCartItem = (merchandiseId: string, updateType: UpdateType) => {
    startTransition(() => {
      updateOptimisticCart({
        type: "UPDATE_ITEM",
        payload: { merchandiseId, updateType },
      });
    });
  };

  const addCartItem = (variant: ProductVariant, product: Product) => {
    console.log("addCartItem called with:", { variant, product });
    startTransition(() => {
      console.log("startTransition - calling updateOptimisticCart");
      updateOptimisticCart({ type: "ADD_ITEM", payload: { variant, product } });
    });
  };

  return useMemo(
    () => ({
      cart: optimisticCart,
      updateCartItem,
      addCartItem,
      isPending,
    }),
    [optimisticCart, isPending]
  );
}
