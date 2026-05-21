export type ProductVariant = {
  id: number;
  name: string;
  price: number;
};

export type MenuProduct = {
  id: number;
  name: string;
  description: string;
  image?: string | null;
  bestseller?: boolean;
  category_id: number;
  variants: ProductVariant[];
};

export type GetProductsResponse = {
  data: MenuProduct[];
};