import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/features/menu/types/product";
import { formatPrice } from "@/utils/format-price";
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card size="sm">
      <img
        src={product.image}
        alt={product.name}
        className="h-52 w-full object-cover"
      />
      <CardHeader>
        <Badge variant="secondary">{product.category.name}</Badge>
        <CardTitle className="text-base">{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="border-t border-border">
        <span className="font-heading text-base font-semibold">
          {formatPrice(
            product.variants ? parseFloat(product.variants[0].price) : 0,
          )}
        </span>
      </CardFooter>
    </Card>
  );
}
