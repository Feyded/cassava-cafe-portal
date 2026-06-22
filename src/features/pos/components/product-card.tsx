import { Card, CardContent } from "@/components/ui/card"

interface ProductCardProps {
  name: string;
  price: string;
  imageUrl: string;
  category?: string;
}

export default function ProductCard({ name, price, imageUrl, category }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden rounded-md border border-neutral-100 bg-white transition-all duration-300 hover:shadow-sm max-w-sm">
      {/* Image Container */}
      <div className="aspect-square w-full overflow-hidden bg-neutral-50">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <CardContent className="p-4">
        {/* Optional Category */}
        {category && (
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
            {category}
          </span>
        )}
        
        <div className="mt-1 flex items-baseline justify-between gap-4">
          <h3 className="text-sm font-medium text-neutral-800 transition-colors group-hover:text-neutral-900">
            {name}
          </h3>
          <p className="text-sm font-semibold text-neutral-900">
            {price}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}