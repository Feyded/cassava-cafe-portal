import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/utils/format-price'
import type { MenuItem } from '../data/mock-menu'
import { menuCategories } from '../data/mock-menu'

interface MenuItemDrawerProps {
  item: MenuItem | null
  onClose: () => void
}

export default function MenuItemDrawer({ item, onClose }: MenuItemDrawerProps) {
  const [selectedSize, setSelectedSize] = useState(0)

  // Reset selected size when item changes
  useEffect(() => {
    setSelectedSize(0)
  }, [item?.id])

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll when open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [item])

  const categoryLabel =
    menuCategories.find((c) => c.value === item?.category)?.label ?? ''

  const isOpen = item !== null

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-black/30 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={item?.name ?? 'Menu item'}
        className={cn(
          'fixed bottom-0 right-0 top-0 z-50 flex w-full flex-col bg-background shadow-2xl transition-transform duration-300 ease-in-out sm:max-w-sm',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {item && (
          <>
            {/* Image */}
            <div className="relative h-56 shrink-0 overflow-hidden sm:h-64">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col overflow-y-auto p-6">
              {/* Category + bestseller */}
              <div className="mb-3 flex items-center gap-3">
                <span className="text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                  {categoryLabel}
                </span>
                {item.bestseller && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                    <span className="inline-flex items-center gap-1 text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
                      Bestseller
                    </span>
                  </>
                )}
              </div>

              {/* Name */}
              <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground">
                {item.name}
              </h2>

              {/* Description */}
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>

              <div className="mt-6 border-t border-border pt-6">
                {/* Size heading */}
                <p className="mb-3 text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                  Choose size
                </p>

                {/* Size options */}
                <div className="flex flex-col gap-2">
                  {item.sizes.map((size, index) => (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSize(index)}
                      className={cn(
                        'flex items-center justify-between border px-4 py-3 text-left transition-colors',
                        selectedSize === index
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border bg-transparent text-foreground hover:border-foreground/50',
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {/* Radio indicator */}
                        <span
                          className={cn(
                            'flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border',
                            selectedSize === index
                              ? 'border-background'
                              : 'border-muted-foreground',
                          )}
                        >
                          {selectedSize === index && (
                            <span className="h-1.5 w-1.5 rounded-full bg-background" />
                          )}
                        </span>
                        <span className="text-sm font-medium">{size.label}</span>
                        {size.subtitle && (
                          <span
                            className={cn(
                              'text-xs',
                              selectedSize === index
                                ? 'text-background/70'
                                : 'text-muted-foreground',
                            )}
                          >
                            {size.subtitle}
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-semibold">
                        {formatPrice(size.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Spacer so footer doesn't cover content */}
              <div className="flex-1" />

              {/* Footer total */}
              <div className="mt-6 border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                    Total
                  </span>
                  <span className="font-heading text-lg font-semibold text-foreground">
                    {formatPrice(item.sizes[selectedSize].price)}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
