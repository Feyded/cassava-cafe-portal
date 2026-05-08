import { PRODUCTS } from '@/data/products'
import type { Product } from '@/types/product'

const SIMULATED_DELAY_MS = 600

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchProducts(): Promise<Product[]> {
  await delay(SIMULATED_DELAY_MS)
  return PRODUCTS
}

export async function fetchProductById(id: string): Promise<Product | undefined> {
  await delay(SIMULATED_DELAY_MS)
  return PRODUCTS.find((p) => p.id === id)
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  await delay(SIMULATED_DELAY_MS)
  if (category === 'All') return PRODUCTS
  return PRODUCTS.filter((p) => p.category === category)
}
