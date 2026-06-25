import type { ProductVariant } from "@/entities/product";
import { formatPrice } from "@/utils/format-price";

export function getPriceLabel(variants: ProductVariant[]) {
  if (variants.length === 0) {
    return "Price unavailable";
  }

  const firstPrice = variants[0].price;
  const lastPrice = variants.at(-1)?.price ?? firstPrice;

  if (firstPrice === lastPrice) {
    return formatPrice(firstPrice);
  }

  return `${formatPrice(firstPrice)} - ${formatPrice(lastPrice)}`;
}