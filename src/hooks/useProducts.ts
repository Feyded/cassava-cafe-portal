import { useQuery } from '@tanstack/react-query'
import { fetchProducts, fetchProductsByCategory } from '@/services/products.service'

export function useProducts(category = 'All') {
  return useQuery({
    queryKey: ['products', category],
    queryFn: () => fetchProductsByCategory(category),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useAllProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  })
}
