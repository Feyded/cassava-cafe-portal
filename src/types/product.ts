export interface ProductImage {
  id: string
  url: string
  alt: string
}

export interface ProductVariant {
  id: string
  name: string
  options: string[]
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: ProductImage[]
  variants: ProductVariant[]
  category: string
  tags: string[]
  inStock: boolean
  featured?: boolean
}
