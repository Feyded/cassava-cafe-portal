import { useState, useCallback } from 'react'
import { AlertCircle } from 'lucide-react'
import { ProductCard } from '@/components/products/ProductCard'
import { ProductCardSkeleton } from '@/components/products/ProductCardSkeleton'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useProducts } from '@/hooks/useProducts'
import { CATEGORIES } from '@/data/products'
import { cn } from '@/lib/utils'

export function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const { data: products, isLoading, isError, refetch } = useProducts(activeCategory)

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category)
    setSearch('')
  }, [])

  const filtered = products?.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Cassava Café
        </p>
        <h1 className="mt-1 font-heading text-3xl font-bold sm:text-4xl">Our Menu</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Seasonal drinks, single-origin coffees, and freshly baked goods.
        </p>
      </div>

      {/* Filters + search */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={cn(
                'rounded-sm border px-3 py-1 text-xs font-medium transition-all',
                activeCategory === cat
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-transparent text-foreground hover:border-foreground',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <Input
          placeholder="Search menu…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
          aria-label="Search products"
        />
      </div>

      {/* Result count */}
      {!isLoading && !isError && (
        <p className="mb-4 text-xs text-muted-foreground">
          {filtered?.length ?? 0} item{(filtered?.length ?? 0) !== 1 ? 's' : ''}
        </p>
      )}

      {/* Error state */}
      {isError && (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <AlertCircle className="size-8 text-destructive" />
          <p className="text-sm font-medium">Failed to load products.</p>
          <Button variant="outline" size="sm" onClick={() => void refetch()}>
            Try again
          </Button>
        </div>
      )}

      {/* Loading skeleton */}
      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Products grid */}
      {!isLoading && !isError && (
        <>
          {filtered?.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-sm text-muted-foreground">
                No items match{search ? ` "${search}"` : ' this category'}.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
