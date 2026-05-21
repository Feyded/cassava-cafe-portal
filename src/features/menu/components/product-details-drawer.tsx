import { useEffect } from "react";
import { X } from "lucide-react";
import { formatPrice } from "@/utils/format-price";
import { cn } from "@/lib/utils";
import type { MenuProduct } from "../types/product";

type ProductDetailsDrawerProps = {
  product: MenuProduct | null;
  open: boolean;
  onClose: () => void;
};

function getStartingPrice(product: MenuProduct) {
  const firstVariant = product.variants[0];

  if (!firstVariant) {
    return "Price unavailable";
  }

  return `Starts at ${formatPrice(firstVariant.price)}`;
}

export default function ProductDetailsDrawer({
  product,
  open,
  onClose,
}: ProductDetailsDrawerProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose, open]);

  return (
    <>
      <div
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-40 bg-foreground/30 backdrop-blur-[2px] transition-opacity duration-200",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />

      <aside
        aria-hidden={!open}
        aria-label={product ? `${product.name} details` : "Product details"}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 max-h-[88vh] rounded-t-[2rem] border border-border/70 bg-background shadow-2xl transition-transform duration-300 md:inset-y-0 md:right-0 md:left-auto md:w-[30rem] md:max-h-none md:rounded-none md:border-l",
          open ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-y-0 md:translate-x-full",
        )}
        role="dialog"
      >
        {product ? (
          <div className="flex h-full flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b border-border/70 px-5 py-4 sm:px-6">
              <div>
                <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                  Product Details
                </p>
                <h2 className="mt-1 font-heading text-2xl font-semibold tracking-tight text-foreground">
                  {product.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close product details"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
              <div className="overflow-hidden rounded-[1.75rem] bg-muted">
                <img
                  src={
                    product.image ??
                    "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=900&h=600&fit=crop"
                  }
                  alt={product.name}
                  className="h-56 w-full object-cover sm:h-64"
                />
              </div>

              <div className="mt-6 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  {product.bestseller && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-secondary-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Bestseller
                    </span>
                  )}
                  <p className="text-sm font-semibold text-foreground">
                    {getStartingPrice(product)}
                  </p>
                </div>

                <section className="space-y-2">
                  <h3 className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                    Description
                  </h3>
                  <p className="text-sm leading-7 text-foreground/85">
                    {product.description}
                  </p>
                </section>

                <section className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                      Variants
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {product.variants.length} available
                    </p>
                  </div>

                  <div className="space-y-2">
                    {product.variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="flex items-center justify-between rounded-2xl border border-border/70 bg-card px-4 py-3"
                      >
                        <p className="text-sm font-medium text-foreground">
                          {variant.name}
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {formatPrice(variant.price)}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        ) : null}
      </aside>
    </>
  );
}