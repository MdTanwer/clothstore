// Use axios directly instead of WooCommerce REST API package
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { cache } from "react";
import { getEnvVar } from "../utils";
import { Cart, Collection, Menu, Page, Product } from "./types";

// Create our own simple WooCommerce API client
const wooApi = {
  baseUrl: getEnvVar("WOOCOMMERCE_URL"),
  consumerKey: getEnvVar("WOOCOMMERCE_CONSUMER_KEY"),
  consumerSecret: getEnvVar("WOOCOMMERCE_CONSUMER_SECRET"),

  get: async (endpoint: string, params?: any) => {
    try {
      // Check if we're running on the client side (browser)
      const isClient = typeof window !== "undefined";

      let url: string;
      let requestParams: any = {};

      if (isClient && endpoint === "products") {
        // Use the proxy API route for client-side requests to avoid CORS
        url = "/api/woocommerce/products";
        requestParams = params || {};
      } else if (isClient && endpoint === "products/categories") {
        // Use the proxy API route for categories
        url = "/api/woocommerce/categories";
        requestParams = params || {};
      } else {
        // Use direct API for server-side requests
        url = `${wooApi.baseUrl}/wp-json/wc/v3/${endpoint}`;
        requestParams = {
          ...params,
          consumer_key: wooApi.consumerKey,
          consumer_secret: wooApi.consumerSecret,
        };
      }

      console.log(`Making WooCommerce API request to: ${url}`);
      console.log(
        `With params:`,
        isClient
          ? requestParams
          : { ...requestParams, consumer_secret: "***hidden***" }
      );

      const response = await axios.get(url, {
        params: requestParams,
        timeout: 10000, // 10 second timeout
      });
      return { data: response.data };
    } catch (error: any) {
      console.error(`WooCommerce API GET error for ${endpoint}:`, {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url:
          typeof window !== "undefined" &&
          (endpoint === "products" || endpoint === "products/categories")
            ? endpoint === "products"
              ? "/api/woocommerce/products"
              : "/api/woocommerce/categories"
            : `${wooApi.baseUrl}/wp-json/wc/v3/${endpoint}`,
        params: params,
      });

      // Return empty array for products endpoint to prevent app crash
      if (endpoint === "products" || endpoint === "products/categories") {
        return { data: [] };
      }

      throw error;
    }
  },

  post: async (endpoint: string, data: any, params?: any) => {
    try {
      const url = `${wooApi.baseUrl}/wp-json/wc/v3/${endpoint}`;
      const response = await axios.post(url, data, {
        params: {
          ...params,
          consumer_key: wooApi.consumerKey,
          consumer_secret: wooApi.consumerSecret,
        },
        timeout: 10000,
      });
      return { data: response.data };
    } catch (error: any) {
      console.error(`WooCommerce API POST error for ${endpoint}:`, {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: `${wooApi.baseUrl}/wp-json/wc/v3/${endpoint}`,
      });
      return { data: null };
    }
  },
};

// Fetch all products
export const getProducts = cache(
  async (
    limit = 100,
    categoryId?: string,
    sortKey?: string,
    reverse?: boolean
  ): Promise<Product[]> => {
    try {
      const params: any = {
        per_page: Math.min(limit, 100), // WooCommerce has a max limit of 100
        status: "publish",
      };

      if (categoryId) {
        params.category = categoryId;
      }

      if (sortKey) {
        // Map common sort keys to WooCommerce equivalents
        const sortKeyMap: Record<string, string> = {
          title: "title",
          price: "price",
          date: "date",
          popularity: "popularity",
          rating: "rating",
          menu_order: "menu_order",
        };

        const mappedSortKey = sortKeyMap[sortKey.toLowerCase()] || "date";
        params.orderby = mappedSortKey;
        params.order = reverse ? "desc" : "asc";
      }

      console.log("Fetching products with params:", params);
      const response = await wooApi.get("products", params);

      if (!response.data || !Array.isArray(response.data)) {
        console.warn("No products data received or data is not an array");
        return [];
      }

      console.log(`Successfully fetched ${response.data.length} products`);

      return response.data.map((product: any) => ({
        id: product.id.toString(),
        handle: product.slug,
        availableForSale:
          product.stock_status === "instock" && product.purchasable,
        title: product.name,
        description: product.description || "",
        descriptionHtml: product.description || "",
        options:
          product.attributes?.map((attr: any) => ({
            id: attr.id?.toString() || attr.name,
            name: attr.name,
            values: attr.options || [],
          })) || [],
        priceRange: {
          maxVariantPrice: {
            amount: product.price || "0",
            currencyCode: "GBP",
            regularPrice: product.regular_price || "0",
            salePrice: product.sale_price ? product.sale_price : null,
          },
          minVariantPrice: {
            amount: product.price || "0",
            currencyCode: "GBP",
            regularPrice: product.regular_price || "0",
            salePrice: product.sale_price ? product.sale_price : null,
          },
        },
        variants: [
          {
            id: product.id.toString(),
            title: product.name,
            availableForSale:
              product.stock_status === "instock" && product.purchasable,
            selectedOptions:
              product.attributes?.map((attr: any) => ({
                name: attr.name,
                value: attr.options?.[0] || "",
              })) || [],
            price: {
              amount: product.price || "0",
              currencyCode: "GBP",
              regularPrice: product.regular_price || "0",
              salePrice: product.sale_price ? product.sale_price : null,
            },
          },
        ],
        featuredImage: {
          url: product.images?.[0]?.src || "",
          altText: product.images?.[0]?.alt || product.name,
          width: 800,
          height: 800,
        },
        categories:
          product.categories?.map((category: any) => ({
            slug: category.slug,
            name: category.name,
          })) || [],

        images:
          product.images?.map((image: any) => ({
            url: image.src,
            altText: image.alt || product.name,
            width: 800,
            height: 800,
          })) || [],
        seo: {
          title: product.name,
          description: product.short_description || product.description || "",
        },
        tags: product.tags?.map((tag: any) => tag.name) || [],
        updatedAt: product.date_modified || new Date().toISOString(),
        // Additional WooCommerce specific fields
        collections: product.categories
          ? {
              edges: product.categories.map((category: any) => ({
                node: {
                  handle: category.slug,
                  title: category.name,
                  description: "",
                  seo: {
                    title: category.name,
                    description: "",
                  },
                  path: `/collections/${category.slug}`,
                },
              })),
            }
          : undefined,
      }));
    } catch (error) {
      console.error("Error fetching WooCommerce products:", error);
      // Return empty array instead of throwing to prevent app crash
      return [];
    }
  }
);

// Get a product by handle (slug)
export const getProduct = cache(
  async (handle: string): Promise<Product | undefined> => {
    try {
      const response = await wooApi.get("products", {
        slug: handle,
      });

      if (!response.data.length) {
        return undefined;
      }

      const product = response.data[0];

      return {
        id: product.id.toString(),
        handle: product.slug,
        availableForSale:
          product.stock_status === "instock" && product.purchasable,
        title: product.name,
        description: product.description || "",
        descriptionHtml: product.description || "",
        options:
          product.attributes?.map((attr: any) => ({
            id: attr.id?.toString() || attr.name,
            name: attr.name,
            values: attr.options || [],
          })) || [],
        priceRange: {
          maxVariantPrice: {
            amount: product.price || "0",
            currencyCode: "GBP",
            regularPrice: product.regular_price || "0",
            salePrice:
              product.on_sale && product.sale_price ? product.sale_price : null,
          },
          minVariantPrice: {
            amount: product.price || "0",
            currencyCode: "GBP",
            regularPrice: product.regular_price || "0",
            salePrice:
              product.on_sale && product.sale_price ? product.sale_price : null,
          },
        },
        variants: [
          {
            id: product.id.toString(),
            title: product.name,
            availableForSale:
              product.stock_status === "instock" && product.purchasable,
            selectedOptions:
              product.attributes?.map((attr: any) => ({
                name: attr.name,
                value: attr.options?.[0] || "",
              })) || [],
            price: {
              amount: product.price || "0",
              currencyCode: "GBP",
              regularPrice: product.regular_price || "0",
              salePrice:
                product.on_sale && product.sale_price
                  ? product.sale_price
                  : null,
            },
          },
        ],
        featuredImage: {
          url: product.images?.[0]?.src || "",
          altText: product.images?.[0]?.alt || product.name,
          width: 800,
          height: 800,
        },
        images:
          product.images?.map((image: any) => ({
            url: image.src,
            altText: image.alt || product.name,
            width: 800,
            height: 800,
          })) || [],
        seo: {
          title: product.name,
          description: product.short_description || product.description || "",
        },
        tags: product.tags?.map((tag: any) => tag.name) || [],
        updatedAt: product.date_modified || new Date().toISOString(),
        // Additional WooCommerce specific fields
        collections: product.categories
          ? {
              edges: product.categories.map((category: any) => ({
                node: {
                  handle: category.slug,
                  title: category.name,
                  description: "",
                  seo: {
                    title: category.name,
                    description: "",
                  },
                  path: `/collections/${category.slug}`,
                },
              })),
            }
          : undefined,
      };
    } catch (error) {
      console.error("Error fetching WooCommerce product:", error);
      return undefined;
    }
  }
);

// Get collections (categories in WooCommerce)
export const getCollections = cache(async (): Promise<Collection[]> => {
  try {
    const response = await wooApi.get("products/categories", {
      per_page: 100,
    });

    return response.data.map((category: any) => ({
      handle: category.slug,
      title: category.name,
      description: category.description,
      seo: {
        title: category.name,
        description: category.description,
      },
      path: `/search/${category.slug}`,
    }));
  } catch (error) {
    console.error("Error fetching WooCommerce categories:", error);
    return [];
  }
});

// Get a collection by handle (slug)
export const getCollection = cache(
  async (handle: string): Promise<Collection | undefined> => {
    try {
      const response = await wooApi.get("products/categories", {
        slug: handle,
      });

      if (!response.data.length) {
        return undefined;
      }

      const category = response.data[0];

      return {
        handle: category.slug,
        title: category.name,
        description: category.description,
        seo: {
          title: category.name,
          description: category.description,
        },
        path: `/search/${category.slug}`,
      };
    } catch (error) {
      console.error("Error fetching WooCommerce category:", error);
      return undefined;
    }
  }
);

// Get pages
export const getPages = cache(async (): Promise<Page[]> => {
  try {
    const response = await wooApi.get("pages", {
      per_page: 100,
      status: "publish",
    });

    return response.data.map((page: any) => ({
      id: page.id.toString(),
      title: page.title.rendered,
      handle: page.slug,
      body: page.content.rendered,
      bodySummary: page.excerpt.rendered,
      seo: {
        title: page.title.rendered,
        description: page.excerpt.rendered,
      },
      createdAt: page.date,
      updatedAt: page.modified,
    }));
  } catch (error) {
    console.error("Error fetching WooCommerce pages:", error);
    return [];
  }
});

// Get a page by handle (slug)
export const getPage = cache(
  async (handle: string): Promise<Page | undefined> => {
    try {
      const response = await wooApi.get("pages", {
        slug: handle,
      });

      if (!response.data.length) {
        return undefined;
      }

      const page = response.data[0];

      return {
        id: page.id.toString(),
        title: page.title.rendered,
        handle: page.slug,
        body: page.content.rendered,
        bodySummary: page.excerpt.rendered,
        seo: {
          title: page.title.rendered,
          description: page.excerpt.rendered,
        },
        createdAt: page.date,
        updatedAt: page.modified,
      };
    } catch (error) {
      console.error("Error fetching WooCommerce page:", error);
      return undefined;
    }
  }
);

// Menu handling - this is a simplified implementation
export const getMenu = cache(
  async (handle: string): Promise<Menu | undefined> => {
    try {
      // For WooCommerce, we'll use product categories as the main menu items
      if (handle === "main-menu") {
        const response = await wooApi.get("products/categories", {
          per_page: 10,
          parent: 0, // Only top-level categories
        });

        const menuItems = response.data.map((category: any) => ({
          title: category.name,
          url: `/search/${category.slug}`,
        }));

        // Create an array with additional properties
        const menuArray = menuItems as any[];

        // Add the menu properties to the array
        Object.defineProperties(menuArray, {
          title: { value: "Main Menu", enumerable: true },
          items: { value: menuItems, enumerable: true },
        });

        return menuArray as unknown as Menu;
      }

      return undefined;
    } catch (error) {
      console.error("Error fetching WooCommerce menu:", error);
      return undefined;
    }
  }
);

// Cart functionality (simplified)
export const createCart = async (): Promise<Cart> => {
  // In WooCommerce, we can use browser storage for cart
  return {
    id: `wc-cart-${Date.now()}`,
    checkoutUrl: `${getEnvVar("WOOCOMMERCE_URL")}/checkout`,
    cost: {
      subtotalAmount: {
        amount: "0",
        currencyCode: "GBP",
      },
      totalAmount: {
        amount: "0",
        currencyCode: "GBP",
      },
      totalTaxAmount: {
        amount: "0",
        currencyCode: "GBP",
      },
    },
    lines: [],
    totalQuantity: 0,
  };
};

export const getCart = async (cartId: string): Promise<Cart | undefined> => {
  // In a real implementation, you would fetch the cart from the browser storage or WooCommerce API
  return undefined;
};

export const addToCart = async (
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> => {
  // In a real implementation, you would update the cart in browser storage or call WooCommerce API
  return {
    id: cartId,
    checkoutUrl: `${getEnvVar("WOOCOMMERCE_URL")}/checkout`,
    cost: {
      subtotalAmount: {
        amount: "0",
        currencyCode: "GBP",
      },
      totalAmount: {
        amount: "0",
        currencyCode: "GBP",
      },
      totalTaxAmount: {
        amount: "0",
        currencyCode: "GBP",
      },
    },
    lines: [],
    totalQuantity: 0,
  };
};

export const removeFromCart = async (
  cartId: string,
  lineIds: string[]
): Promise<Cart> => {
  // In a real implementation, you would update the cart in browser storage or call WooCommerce API
  return {
    id: cartId,
    checkoutUrl: `${getEnvVar("WOOCOMMERCE_URL")}/checkout`,
    cost: {
      subtotalAmount: {
        amount: "0",
        currencyCode: "GBP",
      },
      totalAmount: {
        amount: "0",
        currencyCode: "GBP",
      },
      totalTaxAmount: {
        amount: "0",
        currencyCode: "GBP",
      },
    },
    lines: [],
    totalQuantity: 0,
  };
};

export const updateCart = async (
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> => {
  // In a real implementation, you would update the cart in browser storage or call WooCommerce API
  return {
    id: cartId,
    checkoutUrl: `${getEnvVar("WOOCOMMERCE_URL")}/checkout`,
    cost: {
      subtotalAmount: {
        amount: "0",
        currencyCode: "GBP",
      },
      totalAmount: {
        amount: "0",
        currencyCode: "GBP",
      },
      totalTaxAmount: {
        amount: "0",
        currencyCode: "GBP",
      },
    },
    lines: [],
    totalQuantity: 0,
  };
};

// Get products from a collection
export const getCollectionProducts = async ({
  collection,
  reverse,
  sortKey,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> => {
  try {
    // First, get the collection ID
    const categoryResponse = await wooApi.get("products/categories", {
      slug: collection,
    });

    if (!categoryResponse.data.length) {
      return [];
    }

    const categoryId = categoryResponse.data[0].id;

    // Then get products from that category
    return getProducts(100, categoryId.toString(), sortKey, reverse);
  } catch (error) {
    console.error("Error fetching WooCommerce collection products:", error);
    return [];
  }
};

// Get product recommendations - for WooCommerce, we'll just return products from the same category
export const getProductRecommendations = async (
  productId: string
): Promise<Product[]> => {
  try {
    // Get the product to find its categories
    const productResponse = await wooApi.get(`products/${productId}`);
    const product = productResponse.data;

    if (!product || !product.categories || product.categories.length === 0) {
      return [];
    }

    // Get products from the first category
    const categoryId = product.categories[0].id;

    // Get similar products from the same category, excluding the current product
    const response = await wooApi.get("products", {
      category: categoryId,
      exclude: [productId],
      per_page: 4,
    });

    return response.data.map((product: any) => ({
      id: product.id.toString(),
      handle: product.slug,
      availableForSale:
        product.stock_status === "instock" && product.purchasable,
      title: product.name,
      description: product.description || "",
      descriptionHtml: product.description || "",
      options:
        product.attributes?.map((attr: any) => ({
          id: attr.id?.toString() || attr.name,
          name: attr.name,
          values: attr.options || [],
        })) || [],
      priceRange: {
        maxVariantPrice: {
          amount: product.price || "0",
          currencyCode: "GBP",
          regularPrice: product.regular_price || "0",
          salePrice:
            product.on_sale && product.sale_price ? product.sale_price : null,
        },
        minVariantPrice: {
          amount: product.price || "0",
          currencyCode: "GBP",
          regularPrice: product.regular_price || "0",
          salePrice:
            product.on_sale && product.sale_price ? product.sale_price : null,
        },
      },
      variants: [
        {
          id: product.id.toString(),
          title: product.name,
          availableForSale:
            product.stock_status === "instock" && product.purchasable,
          selectedOptions:
            product.attributes?.map((attr: any) => ({
              name: attr.name,
              value: attr.options?.[0] || "",
            })) || [],
          price: {
            amount: product.price || "0",
            currencyCode: "GBP",
            regularPrice: product.regular_price || "0",
            salePrice:
              product.on_sale && product.sale_price ? product.sale_price : null,
          },
        },
      ],
      featuredImage: {
        url: product.images?.[0]?.src || "",
        altText: product.images?.[0]?.alt || product.name,
        width: 800,
        height: 800,
      },
      images:
        product.images?.map((image: any) => ({
          url: image.src,
          altText: image.alt || product.name,
          width: 800,
          height: 800,
        })) || [],
      seo: {
        title: product.name,
        description: product.short_description || product.description || "",
      },
      tags: product.tags?.map((tag: any) => tag.name) || [],
      updatedAt: product.date_modified || new Date().toISOString(),
      collections: product.categories
        ? {
            edges: product.categories.map((category: any) => ({
              node: {
                handle: category.slug,
                title: category.name,
                description: "",
                seo: {
                  title: category.name,
                  description: "",
                },
                path: `/collections/${category.slug}`,
              },
            })),
          }
        : undefined,
    }));
  } catch (error) {
    console.error("Error fetching WooCommerce product recommendations:", error);
    return [];
  }
};

// Add revalidate function
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // For now, just return a simple success response
  // In a production environment, you might want to implement cache invalidation differently
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  const tag = searchParams.get("tag");

  if (secret !== process.env.WOOCOMMERCE_REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  if (!tag) {
    return NextResponse.json({ message: "No tag provided" }, { status: 400 });
  }

  // TODO: Implement cache revalidation when needed
  return NextResponse.json({
    revalidated: true,
    message: `Cache revalidation acknowledged for ${tag}`,
  });
}

// Get products by category slug
export const getProductsByCategory = cache(
  async (
    categorySlug: string,
    limit = 100,
    sortKey?: string,
    reverse?: boolean
  ): Promise<Product[]> => {
    try {
      // First, get the category ID by slug
      const categoryResponse = await wooApi.get("products/categories", {
        slug: categorySlug,
      });

      if (!categoryResponse.data.length) {
        console.log(`Category not found: ${categorySlug}`);
        return [];
      }

      const categoryId = categoryResponse.data[0].id;
      console.log(`Found category ${categorySlug} with ID: ${categoryId}`);

      // Then get products from that category
      const params: any = {
        per_page: limit,
        status: "publish",
        category: categoryId,
      };

      if (sortKey) {
        params.orderby = sortKey.toLowerCase();
        params.order = reverse ? "desc" : "asc";
      }

      const response = await wooApi.get("products", params);
      console.log(
        `Found ${response.data.length} products in category ${categorySlug}`
      );

      return response.data.map((product: any) => ({
        id: product.id.toString(),
        handle: product.slug,
        availableForSale:
          product.stock_status === "instock" && product.purchasable,
        title: product.name,
        description: product.description || "",
        descriptionHtml: product.description || "",
        options:
          product.attributes?.map((attr: any) => ({
            id: attr.id?.toString() || attr.name,
            name: attr.name,
            values: attr.options || [],
          })) || [],
        priceRange: {
          maxVariantPrice: {
            amount: product.price,
            currencyCode: "GBP",
            regularPrice: product.regular_price,
            salePrice: product.sale_price ? product.sale_price : null,
          },
          minVariantPrice: {
            amount: product.price,
            currencyCode: "GBP",
            regularPrice: product.regular_price,
            salePrice: product.sale_price ? product.sale_price : null,
          },
        },
        variants: [
          {
            id: product.id.toString(),
            title: product.name,
            availableForSale:
              product.stock_status === "instock" && product.purchasable,
            selectedOptions:
              product.attributes?.map((attr: any) => ({
                name: attr.name,
                value: attr.options?.[0] || "",
              })) || [],
            price: {
              amount: product.price,
              currencyCode: "GBP",
              regularPrice: product.regular_price,
              salePrice: product.sale_price ? product.sale_price : null,
            },
          },
        ],
        featuredImage: {
          url: product.images?.[0]?.src || "",
          altText: product.images?.[0]?.alt || product.name,
          width: 800,
          height: 800,
        },
        categories: product.categories?.map((category: any) => ({
          slug: category.slug,
          name: category.name,
        })),
        images:
          product.images?.map((image: any) => ({
            url: image.src,
            altText: image.alt || product.name,
            width: 800,
            height: 800,
          })) || [],
        seo: {
          title: product.name,
          description: product.short_description || product.description || "",
        },
        tags: product.tags?.map((tag: any) => tag.name) || [],
        updatedAt: product.date_modified || new Date().toISOString(),
        collections: product.categories
          ? {
              edges: product.categories.map((category: any) => ({
                node: {
                  handle: category.slug,
                  title: category.name,
                  description: "",
                  seo: {
                    title: category.name,
                    description: "",
                  },
                  path: `/collections/${category.slug}`,
                },
              })),
            }
          : undefined,
      }));
    } catch (error) {
      console.error("Error fetching WooCommerce products by category:", error);
      return [];
    }
  }
);
