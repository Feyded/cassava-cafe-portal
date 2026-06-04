export interface CreateProductPayload {
  name: string;
  price: number;
  categoryId: number;
  description: string;
  isAvailable: boolean;
  image?: File | undefined;
  variants: CreateProductVariantPayload[];
}

export interface CreateProductVariantPayload {
  name: string;
  price: number;
}
