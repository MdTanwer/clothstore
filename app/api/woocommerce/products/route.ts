import axios from "axios";
import { getEnvVar } from "lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const baseUrl = getEnvVar("WOOCOMMERCE_URL");
    const consumerKey = getEnvVar("WOOCOMMERCE_CONSUMER_KEY");
    const consumerSecret = getEnvVar("WOOCOMMERCE_CONSUMER_SECRET");

    // Build the API URL
    const url = `${baseUrl}/wp-json/wc/v3/products`;

    // Get all query parameters and add authentication
    const params: any = {
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
    };

    // Add all search parameters from the original request
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    console.log(`Proxying WooCommerce API request to: ${url}`);
    console.log(`With params:`, { ...params, consumer_secret: "***hidden***" });

    const response = await axios.get(url, {
      params,
      timeout: 10000, // 10 second timeout
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // Return the data with proper CORS headers
    return NextResponse.json(response.data, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error: any) {
    console.error(`WooCommerce API proxy error:`, {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });

    return NextResponse.json(
      {
        error: "Failed to fetch products",
        details: {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
        },
      },
      {
        status: error.response?.status || 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
