import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ProductImage } from '@/types/product'

interface ProductGalleryProps {
  images: ProductImage[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = images[activeIndex]

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="aspect-square overflow-hidden rounded-lg bg-secondary">
        <img
          src={activeImage.url}
          alt={activeImage.alt}
          className="size-full object-cover transition-opacity duration-300"
          key={activeImage.id}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(idx)}
              aria-label={`View image ${idx + 1} of ${productName}`}
              className={cn(
                'aspect-square w-20 overflow-hidden rounded-md border-2 transition-all',
                idx === activeIndex
                  ? 'border-primary'
                  : 'border-transparent opacity-60 hover:opacity-100',
              )}
            >
              <img src={img.url} alt={img.alt} className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
