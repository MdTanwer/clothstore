declare module "@woocommerce/woocommerce-rest-api" {
  export class WooCommerceRestApi {
    constructor(options: {
      url: string;
      consumerKey: string;
      consumerSecret: string;
      version: string;
    });

    get(
      endpoint: string,
      params?: any
    ): Promise<{
      data: any;
      headers: any;
    }>;

    post(
      endpoint: string,
      data: any,
      params?: any
    ): Promise<{
      data: any;
      headers: any;
    }>;

    put(
      endpoint: string,
      data: any,
      params?: any
    ): Promise<{
      data: any;
      headers: any;
    }>;

    delete(
      endpoint: string,
      params?: any
    ): Promise<{
      data: any;
      headers: any;
    }>;

    options(
      endpoint: string,
      params?: any
    ): Promise<{
      data: any;
      headers: any;
    }>;
  }
}
