export type Maybe<T> = T | null;

export type Money = {
  amount: string;
  currencyCode: string;
  regularPrice?: string;
  salePrice?: string | null;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  price: Money;
};

export type SEO = {
  title: string;
  description: string;
};

export type Product = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: ProductVariant[];
  featuredImage: Image;
  images: Image[];
  seo: SEO;
  tags: string[];
  updatedAt: string;
  collections?: Connection<Collection>;
  categories?: Array<{
    slug: string;
    name: string;
  }>;
};

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  path: string;
  updatedAt?: string;
  image?: Image;
  products?: Connection<Product>;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo: SEO;
  createdAt: string;
  updatedAt: string;
};

export type MenuItem = {
  title: string;
  url: string;
  items?: MenuItem[];
};

export type Menu = {
  title: string;
  items: MenuItem[];
  [index: number]: Menu;
  map: <T>(callback: (item: Menu) => T) => T[];
  length: number;
};

export type CartItem = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: SelectedOption[];
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage: Image;
    };
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: CartItem[];
  totalQuantity: number;
};
