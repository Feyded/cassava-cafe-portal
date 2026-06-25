import type { Category } from "../category";
import type { ModifierGroup } from "../modifier";

export interface Product {
  id: number;
  name: string;
  description: string;
  image_path: string;
  is_available: boolean;
  category_id: number;
  created_at: string;
  updated_at: string;
  variants: ProductVariant[];
  category: Category;
  modifier_groups?: ModifierGroup[] | [];
}

export interface ProductVariant {
  id: number;
  product_id: number;
  name: string;
  price: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
