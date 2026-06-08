export function formatPrice(price: string | number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(Number(price));
}
