export interface CreateProductPayload {
  name: string;
  price: number;
  categoryId: number;
  description: string;
  image: File;
  variants: CreateProductVariantPayload[];
}

export interface CreateProductVariantPayload {
  name: string;
  price: number;
}
