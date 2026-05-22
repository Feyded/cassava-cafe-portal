import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPriceLabel } from "@/features/menu/hooks/get-price-label";
import type { Product } from "@/features/menu/types/product";
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
          {getPriceLabel(product.variants)}
        </span>
      </CardFooter>
    </Card>
  );
}
