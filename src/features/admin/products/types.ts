export interface CreateVariantDto {
  name: string;
  price: string;
  isActive: boolean;
}

export interface UpdateVariantDto extends CreateVariantDto {
  id: number;
}
