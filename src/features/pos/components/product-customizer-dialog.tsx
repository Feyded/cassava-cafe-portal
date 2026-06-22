import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Modifier, ModifierGroup } from "@/types/models/modifier-group";
import type { Product, Variant } from "@/types/models/product";
import { formatPrice } from "@/utils/format-price";
import { Check, ShoppingCart, X } from "lucide-react";
import { useState } from "react";

type ProductCustomizerDialogProps = {
  isOpen: boolean;
  onOpen: (isOpen: boolean) => void;
  product: Product;
};

export default function ProductCustomizerDialog({
  isOpen,
  onOpen,
  product,
}: ProductCustomizerDialogProps) {
  const [selectedVariant, setselectedVariant] = useState<
    Product["variants"][number]
  >(product.variants[0]);
  const [selectedModifiers, setselectedModifiers] = useState<Modifier[]>([]);

  const handleModifierToggle = (item: Modifier) => {
    if (selectedModifiers.some((m) => m.id === item.id)) {
      setselectedModifiers((prev) => prev.filter((m) => m.id !== item.id));
    } else {
      setselectedModifiers((prev) => [...prev, item]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogContent>
        {/* Header Panel */}
        <div className="p-5 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">⚡</span>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {product.name} Customizer
              </h3>
          
            </div>
          </div>
        </div>

        {/* Form Content Area */}
        <div className="p-5 space-y-5 max-h-[60vh] overflow-y-auto">
          {/* 1. VARIANT SELECTION (SIZE) */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <span>Choose Size Variant</span>
            </label>
            <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-xl">
              {product.variants.map((v: Variant) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setselectedVariant(v)}
                  className={cn(
                    "py-2 text-xs font-semibold rounded-lg text-center transition-all",
                    selectedVariant?.id === v.id
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200/50"
                      : "text-slate-500 hover:text-slate-800",
                  )}
                >
                  <div>{v.name}</div>
                  <div className="text-[10px] text-amber-800 font-medium">
                    ₱{parseFloat(v.price).toFixed(0)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {product.modifier_groups &&
            product.modifier_groups.map((group: ModifierGroup) => {
              return (
                <div key={group.id} className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {group.name}
                    </label>
                    <span className="text-[10px] text-slate-400 italic">
                      {group.max_selection === 1
                        ? "Choose 1"
                        : `Max ${group.max_selection} options`}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {group.modifiers.map((modifier: Modifier) => {
                      const isChecked = selectedModifiers.some(
                        (m: Modifier) => m.id === modifier.id,
                      );

                      return (
                        <div
                          key={modifier.id}
                          onClick={() => handleModifierToggle(modifier)}
                          className={cn(
                            "p-3 rounded-xl border text-xs font-medium flex justify-between items-center cursor-pointer transition-all",
                            isChecked
                              ? "border-amber-600 bg-amber-50/60 text-amber-900"
                              : "border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-700",
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                "w-4 h-4 rounded flex items-center justify-center border transition-all",
                                isChecked
                                  ? "bg-amber-700 border-amber-700 text-white"
                                  : "border-slate-300 bg-white",
                              )}
                            >
                              {isChecked && (
                                <Check className="w-3 h-3 stroke-[3]" />
                              )}
                            </div>
                            <span>{modifier.name}</span>
                          </div>
                          {parseFloat(modifier.price) > 0 && (
                            <span className="font-bold text-amber-800">
                              +{formatPrice(modifier.price)}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Action Total Summary Panel */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              Calculated Line Total
            </p>
            <p className="text-xl font-black text-slate-900">
              {/* ₱{currentTotalPrice.toFixed(2)} */}
              10
            </p>
          </div>
          <button
            //   onClick={handleAddToCart}
            className="flex-1 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold py-3 px-4 rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add Items to Bill</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
