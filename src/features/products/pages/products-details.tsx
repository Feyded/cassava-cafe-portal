import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { fetchProductById } from '@/services/products.service'
import { ProductGallery } from '@/components/products/ProductGallery'
import { VariantSelector } from '@/components/products/VariantSelector'
import { AddToCartButton } from '@/components/products/AddToCartButton'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import type { CartItemVariants } from '@/types/cart'

function ProductDetailSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <Skeleton className="aspect-square w-full rounded-lg" />
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="size-20 rounded-md" />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  )
}

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  })

  const [selectedVariants, setSelectedVariants] = useState<CartItemVariants>({})

  const handleVariantChange = (variantId: string, option: string) => {
    setSelectedVariants((prev) => ({ ...prev, [variantId]: option }))
  }

  // Merge defaults with explicit user selections
  const resolvedVariants: CartItemVariants = product
    ? {
        ...Object.fromEntries(product.variants.map((v) => [v.id, v.options[0]])),
        ...selectedVariants,
      }
    : {}

  if (isError || (!isLoading && !product)) {
    return (
      <div className="flex flex-col items-center gap-4 py-32 text-center">
        <AlertCircle className="size-8 text-destructive" />
        <p className="text-sm font-medium">Product not found.</p>
        <Button variant="outline" size="sm" onClick={() => navigate('/products')}>
          Back to menu
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        to="/products"
        className="mb-8 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> Back to menu
      </Link>

      {isLoading && <ProductDetailSkeleton />}

      {product && (
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Details */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary">{product.category}</Badge>
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
                {!product.inStock && <Badge variant="destructive">Out of stock</Badge>}
              </div>
              <h1 className="mt-3 font-heading text-3xl font-bold leading-tight">
                {product.name}
              </h1>
              <p className="mt-2 text-2xl font-semibold">${product.price.toFixed(2)}</p>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <Separator />

            {product.variants.length > 0 && (
              <>
                <VariantSelector
                  variants={product.variants}
                  selectedVariants={resolvedVariants}
                  onVariantChange={handleVariantChange}
                />
                <Separator />
              </>
            )}

            <AddToCartButton
              product={product}
              selectedVariants={resolvedVariants}
            />
          </div>
        </div>
      )}
    </div>
  )
}
