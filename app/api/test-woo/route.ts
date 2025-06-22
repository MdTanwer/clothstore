import axios from "axios";
import { getEnvVar } from "lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl = getEnvVar("WOOCOMMERCE_URL");
    const consumerKey = getEnvVar("WOOCOMMERCE_CONSUMER_KEY");
    const consumerSecret = getEnvVar("WOOCOMMERCE_CONSUMER_SECRET");

    console.log("Testing WooCommerce API connection...");
    console.log("Base URL:", baseUrl);
    console.log(
      "Consumer Key (first 10 chars):",
      consumerKey.substring(0, 10) + "..."
    );

    // Test the API connection
    const url = `${baseUrl}/wp-json/wc/v3/products`;
    const params = {
      per_page: 5,
      status: "publish",
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
    };

    console.log("Making request to:", url);
    console.log("With params:", { ...params, consumer_secret: "***hidden***" });

    const response = await axios.get(url, {
      params,
      timeout: 10000,
    });

    return NextResponse.json({
      success: true,
      status: response.status,
      statusText: response.statusText,
      dataLength: response.data?.length || 0,
      data: response.data?.slice(0, 2), // Return first 2 products for debugging
      config: {
        baseUrl,
        consumerKeyPreview: consumerKey.substring(0, 10) + "...",
        url,
      },
    });
  } catch (error: any) {
    console.error("WooCommerce API test failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          code: error.code,
        },
        config: {
          baseUrl: getEnvVar("WOOCOMMERCE_URL"),
          consumerKeyPreview:
            getEnvVar("WOOCOMMERCE_CONSUMER_KEY").substring(0, 10) + "...",
        },
      },
      { status: 500 }
    );
  }
}
