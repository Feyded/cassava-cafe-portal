export type ProductCategory = 'coffee' | 'tea' | 'pastry'

export type Product = {
  id: number
  name: string
  description: string
  price: number
  category: ProductCategory
  image: string
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Single Origin Espresso',
    description: 'Bright and complex, sourced from Ethiopian highlands with notes of jasmine.',
    price: 150,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Oat Milk Latte',
    description: 'Double shot espresso with velvety steamed oat milk, lightly sweetened.',
    price: 180,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Cold Brew',
    description: '18-hour cold steep served over ice with a pinch of fleur de sel.',
    price: 175,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Ceremonial Matcha',
    description: 'Grade A matcha whisked to order and poured over steamed oat milk.',
    price: 165,
    category: 'tea',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    name: 'Butter Croissant',
    description: 'Seventy-two layer laminated dough baked fresh before sunrise, daily.',
    price: 150,
    category: 'pastry',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=400&fit=crop',
  },
  {
    id: 6,
    name: 'Almond Financier',
    description: 'Classic French petit four with browned butter, almond flour, and honey.',
    price: 150,
    category: 'pastry',
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&h=400&fit=crop',
  },
]
