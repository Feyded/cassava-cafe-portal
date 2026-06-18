import type { Product } from "@/types/models/product";

export type CartItem = {
  product_id: number;
  variant_id: number;
  product_name: string;
  variant_name: string;
  category: string;
  price: string;
  quantity: number;
  variants: Product["variants"];
};