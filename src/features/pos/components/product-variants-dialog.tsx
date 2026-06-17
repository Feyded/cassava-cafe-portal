import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { CartItem } from "../types/cart-item";
import { formatPrice } from "@/utils/format-price";

type ProductVariantsDialogProps = {
  open: boolean;
  onOpen: (open: boolean) => void;
  item: CartItem | null;
  onVariantChange: (item: CartItem, variantId: number) => void;
};

export default function ProductVariantsDialog({
  open,
  onOpen,
  item,
  onVariantChange,
}: ProductVariantsDialogProps) {
  
  const handleSelectVariant = (item: CartItem, variantId: number) => {
    onVariantChange(item, variantId);
    onOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Change Variant</SheetTitle>
          <SheetDescription>
            Select a different variant for{" "}
            <span className="font-semibold">{item?.product_name}</span>
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 grid gap-3 mt-4">
          {item?.variants.map((variant) => (
            <Button
              key={variant.id}
              variant={variant.id === item.variant_id ? "default" : "outline"}
              className="w-full justify-between rounded-md"
              onClick={() => handleSelectVariant(item, variant.id)}
            >
              {variant.name}
              <span className="text-sm ">{formatPrice(variant.price)}</span>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
