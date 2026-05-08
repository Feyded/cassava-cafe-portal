import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "../data/mock-products";
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
        <Badge variant="secondary">{product.category}</Badge>
        <CardTitle className="text-base">{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="border-t border-border">
        <span className="font-heading text-base font-semibold">
          {formatPrice(product.price)}
        </span>
      </CardFooter>
    </Card>
  );
}
