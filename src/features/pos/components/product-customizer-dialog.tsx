import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import type { Product, Variant } from "@/types/models/product";
import { useEffect, useMemo, useState } from "react";
import { formatPrice } from "@/utils/format-price";
import type { Modifier } from "@/types/models/modifier-group";
import type { CartItem } from "../types/cart-item";

type ProductCustomizerDialogProps = {
  isOpen: boolean;
  product: Product;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
};

export function ProductCustomizerDialog({
  isOpen,
  product,
  onClose,
  onAddToCart,
}: ProductCustomizerDialogProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedModifiers, setSelectedModifiers] = useState<Modifier[] | []>(
    [],
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen && product) {
      setSelectedVariant(product.variants[0]);
      setSelectedModifiers([]);
      setQuantity(1);
    }
  }, [isOpen, product]);

  const handleCheckedChange = (modifier: Modifier) => {
    setSelectedModifiers((prev) => {
      const exist = prev.find((m) => m.id === modifier.id);

      if (exist) {
        return prev.filter((m) => m.id !== modifier.id);
      }

      return [
        ...prev,
        {
          ...modifier,
          quantity: 1,
        },
      ];
    });
  };

  const totalPrice = useMemo(() => {
    if (!product || !selectedVariant) return 0;
    const modifiersPrice = selectedModifiers.reduce(
      (acc, modifier) => acc + Number(modifier.price),
      0,
    );
    const variantPrice = selectedVariant ? Number(selectedVariant.price) : 0;
    return (variantPrice + modifiersPrice) * quantity;
  }, [quantity, selectedVariant, selectedModifiers, product]);

  const handleAddToCart = () => {
    const item: CartItem = {
      id: crypto.randomUUID(),
      product_id: product.id,
      variant_id: selectedVariant?.id!,
      product_name: product.name,
      variant_name: selectedVariant?.name!,
      quantity: quantity,
      price: totalPrice.toString(),
      modifiers: selectedModifiers,
    };

    onAddToCart(item);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden bg-white max-h-[90vh] flex flex-col gap-0 border-none shadow-xl">
        {/* Product Details Header */}
        <DialogHeader className="p-6 pb-4 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-xl font-bold tracking-tight text-gray-900">
                {product?.name}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 mt-1">
                {product?.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Scrollable Customizer Form */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[50vh]">
          {/* Section: Size Variants */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Select Size
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-black text-white px-2 py-0.5 rounded">
                Required
              </span>
            </div>

            <RadioGroup
              defaultValue="medium"
              className="grid grid-cols-1 gap-2"
              value={selectedVariant ? String(selectedVariant.id) : undefined}
              onValueChange={(value) => {
                const variant = product?.variants.find(
                  (v) => v.id === Number(value),
                );
                if (variant) setSelectedVariant(variant);
              }}
            >
              {product?.variants.map((variant) => (
                <Label
                  key={variant.id}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem
                      value={String(variant.id)}
                      id={`v-${variant.id}`}
                    />
                    <span className="text-sm font-medium text-gray-800">
                      {variant.name}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    {formatPrice(variant.price)}
                  </span>
                </Label>
              ))}
            </RadioGroup>
          </div>

          {/* Section: Modifiers */}
          {product?.modifier_groups &&
            product.modifier_groups.length > 0 &&
            product.modifier_groups.map((modifierGroup) => (
              <div
                key={modifierGroup.id}
                className="space-y-3 pt-2 border-t border-gray-100"
              >
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      {modifierGroup.name}
                    </h3>
                  </div>
                  <span className="text-[11px] font-medium text-gray-400 italic">
                    Optional
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {modifierGroup.modifiers.map((modifier) => (
                    <Label
                      key={modifier.id}
                      className="flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={`m-${modifier.id}`}
                          checked={
                            selectedModifiers.find(
                              (m) => m.id === modifier.id,
                            ) !== undefined
                          }
                          onCheckedChange={() => handleCheckedChange(modifier)}
                        />
                        <span className="text-sm font-bold text-gray-900">
                          {modifier.name}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-500">
                        {formatPrice(modifier.price)}
                      </span>
                    </Label>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Footer actions for POS Screen */}
        <DialogFooter className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between sm:justify-between gap-4">
          {/* POS Touch Quantity Counter */}
          <div className="flex items-center border border-gray-300 rounded-xl bg-white h-12 shadow-sm overflow-hidden">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-full px-4 text-gray-600 hover:bg-gray-50 rounded-none"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-10 text-center text-sm font-bold select-none text-gray-800">
              {quantity}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-full px-4 text-gray-600 hover:bg-gray-50 rounded-none"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Action Call Button */}
          <Button
            type="button"
            className="flex-1 h-12 text-white transition-colors rounded-xl font-medium shadow-sm flex items-center justify-center gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Order</span>
            <span className="ml-auto pl-3 border-l border-white/20 font-bold">
              {formatPrice(Number(totalPrice))}
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
