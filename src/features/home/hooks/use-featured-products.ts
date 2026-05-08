import { useEffect, useState } from 'react'
import { mockProducts, type Product } from '../data/mock-products'

export function useFeaturedProducts() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<Product[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockProducts)
      setIsLoading(false)
    }, 1400)

    return () => clearTimeout(timer)
  }, [])

  return { data, isLoading }
}
