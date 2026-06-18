import { formatPrice } from "@/utils/format-price";
import type { Variant } from "../../../types/models/product";

export function getPriceLabel(variants: Variant[]) {
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