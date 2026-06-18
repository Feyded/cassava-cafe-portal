export type Product = {
  id: number;
  name: string;
  description: string;
  image_path: string;
  is_available: boolean;
  category_id: number;
  created_at: string;
  updated_at: string;
  variants: Variant[];
  category: Category;
};

export type Variant = {
  id: number;
  product_id: number;
  name: string;
  price: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: number;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};


