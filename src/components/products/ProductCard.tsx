import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCartContext } from '@/context/CartContext'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartContext()
  const defaultVariants = Object.fromEntries(
    product.variants.map((v) => [v.id, v.options[0]]),
  )

  return (
    <Card className="group flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-4/3 overflow-hidden bg-secondary">
          <img
            src={product.images[0].url}
            alt={product.images[0].alt}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <CardContent className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/products/${product.id}`}>
            <h3 className="font-heading text-base font-semibold leading-tight hover:underline">
              {product.name}
            </h3>
          </Link>
          <span className="shrink-0 text-sm font-semibold">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="line-clamp-2 text-xs text-muted-foreground">{product.description}</p>

        <div className="mt-auto flex flex-wrap gap-1 pt-2">
          <Badge variant="secondary">{product.category}</Badge>
          {product.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          size="sm"
          disabled={!product.inStock}
          onClick={() => addItem(product, defaultVariants)}
        >
          {product.inStock ? 'Quick add' : 'Out of stock'}
        </Button>
      </CardFooter>
    </Card>
  )
}
