import { CurrencyCode } from "lib/currency/types";
import {
  formatAmountForStripe,
  getStripeCurrency,
  stripe,
} from "lib/stripe/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, metadata = {} } = await request.json();

    if (!amount || !currency) {
      return NextResponse.json(
        { error: "Amount and currency are required" },
        { status: 400 }
      );
    }

    // Validate currency
    const supportedCurrencies: CurrencyCode[] = ["GBP", "USD", "EUR"];
    if (!supportedCurrencies.includes(currency)) {
      return NextResponse.json(
        { error: "Unsupported currency" },
        { status: 400 }
      );
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(parseFloat(amount), currency),
      currency: getStripeCurrency(currency),
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        ...metadata,
        originalCurrency: currency,
        originalAmount: amount,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
