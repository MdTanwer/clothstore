"use client";

import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCurrency } from "components/currency/currency-context";
import { formatPrice } from "lib/currency/exchange-rates";
import { STRIPE_CONFIG } from "lib/stripe/config";
import { useEffect, useState } from "react";

// Initialize Stripe with hardcoded key
const getStripePromise = () => {
  const publishableKey = STRIPE_CONFIG.publishableKey;

  if (!publishableKey) {
    console.error("Stripe publishable key is not available");
    return null;
  }

  return loadStripe(publishableKey);
};

// export const STRIPE_CONFIG = {
//   publishableKey:
//     "pk_test_51RaEpuAlPUuV7a5FDTzwCwAiNOCzXWBs39NAqnOeDw2WTrknO13ow95cXoHKOejvu2Cc9RpdJIIKabpIukcTNRU700XQfpPoOn",
//   webhookSecret:
//     "sk_test_51RaEpuAlPUuV7a5FSz2hDdKrTE0K0e1CQbxD7w8UoggtBpXBdZeOFVnP9cn80Rmu9Y1vcCVW6v6peqWRiUPanoOi00bJWHKVqF",
//   supportedCurrencies: ["gbp", "usd", "eur"] as const,
// };

const stripePromise = getStripePromise();

interface CheckoutFormProps {
  totalAmount: number;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}

function CheckoutForm({ totalAmount, onSuccess, onError }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { selectedCurrency } = useCurrency();
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>("");

  // Create payment intent when component mounts or amount/currency changes
  useEffect(() => {
    createPaymentIntent();
  }, [totalAmount, selectedCurrency]);

  const createPaymentIntent = async () => {
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount,
          currency: selectedCurrency,
          metadata: {
            source: "web_checkout",
          },
        }),
      });

      const data = await response.json();

      if (data.error) {
        onError(data.error);
        return;
      }

      setClientSecret(data.clientSecret);
    } catch (error) {
      onError("Failed to initialize payment");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      onError("Card element not found");
      setIsProcessing(false);
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        onError(error.message || "Payment failed");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        onSuccess(paymentIntent.id);
      }
    } catch (error) {
      onError("Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
        <div className="border border-gray-300 dark:border-gray-600 rounded-md p-3 bg-white dark:bg-gray-700">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      <div className="flex justify-between items-center text-lg font-semibold">
        <span>Total:</span>
        <span>{formatPrice(totalAmount, selectedCurrency)}</span>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing || !clientSecret}
        className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-6 rounded-md font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing
          ? "Processing..."
          : `Pay ${formatPrice(totalAmount, selectedCurrency)}`}
      </button>
    </form>
  );
}

interface StripeCheckoutProps {
  totalAmount: number;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}

export default function StripeCheckout({
  totalAmount,
  onSuccess,
  onError,
}: StripeCheckoutProps) {
  // Handle case where Stripe couldn't be initialized
  if (!stripePromise) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <p className="text-red-600 dark:text-red-400">
          Payment system is not properly configured. Please contact support.
        </p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        totalAmount={totalAmount}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
}
