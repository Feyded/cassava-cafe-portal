import { cn } from '@/lib/utils'
import type { ProductVariant } from '@/types/product'
import type { CartItemVariants } from '@/types/cart'

interface VariantSelectorProps {
  variants: ProductVariant[]
  selectedVariants: CartItemVariants
  onVariantChange: (variantId: string, option: string) => void
}

export function VariantSelector({
  variants,
  selectedVariants,
  onVariantChange,
}: VariantSelectorProps) {
  return (
    <div className="flex flex-col gap-5">
      {variants.map((variant) => (
        <div key={variant.id}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {variant.name}
          </p>
          <div className="flex flex-wrap gap-2">
            {variant.options.map((option) => {
              const isSelected = selectedVariants[variant.id] === option
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onVariantChange(variant.id, option)}
                  className={cn(
                    'rounded-sm border px-3 py-1.5 text-xs font-medium transition-all',
                    isSelected
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-transparent text-foreground hover:border-foreground',
                  )}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
