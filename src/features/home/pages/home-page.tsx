import { Link } from 'react-router-dom'
import { ArrowRight, Coffee, Leaf, Star } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ProductCard } from '@/components/products/ProductCard'
import { ProductCardSkeleton } from '@/components/products/ProductCardSkeleton'
import { useAllProducts } from '@/hooks/useProducts'
import { FEATURED_PRODUCTS } from '@/data/products'
import { cn } from '@/lib/utils'

const PERKS = [
  {
    icon: Coffee,
    title: 'Single-Origin Beans',
    body: 'Ethically sourced from farms we know by name. Roasted in-house every week.',
  },
  {
    icon: Leaf,
    title: 'Cassava-Based Bakes',
    body: 'Gluten-free, naturally. Our signature flour gives each bite a uniquely soft crumb.',
  },
  {
    icon: Star,
    title: 'Made From Scratch Daily',
    body: 'No frozen pastries. Everything you taste was prepared this morning.',
  },
]

export function HomePage() {
  const { data: products, isLoading } = useAllProducts()
  const featured = products?.filter((p) => p.featured) ?? FEATURED_PRODUCTS

  return (
    <>
      {/* ── Hero ────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-secondary/40 py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-6">
              Now open in Melbourne
            </Badge>
            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Coffee worth
              <br />
              <span className="italic">waking up for.</span>
            </h1>
            <p className="mt-6 text-base text-muted-foreground sm:text-lg">
              Specialty espresso, single-origin pour overs, and cassava-flour bakes
              crafted fresh each morning. Come as you are.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link to="/products" className={buttonVariants({ size: 'lg' })}>
                Explore the menu <ArrowRight className="size-4" />
              </Link>
              <Link to="/login" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
                Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary/5 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-primary/5 blur-3xl"
        />
      </section>

      {/* ── Perks ───────────────────────────────────── */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {PERKS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex flex-col gap-3">
                <div className="flex size-10 items-center justify-center rounded-md border border-border bg-secondary">
                  <Icon className="size-5 text-foreground" />
                </div>
                <h3 className="font-heading text-base font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured products ───────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Favourites
              </p>
              <h2 className="mt-1 font-heading text-2xl font-bold sm:text-3xl">
                From the menu
              </h2>
            </div>
            <Link
              to="/products"
              className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
            >
              See all <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : featured
                  .slice(0, 4)
                  .map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────── */}
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-primary-foreground sm:text-3xl">
            Order online. Pick up in 10 minutes.
          </h2>
          <p className="mt-3 text-sm text-primary-foreground/70">
            Browse the full menu, customise your order, and skip the queue.
          </p>
          <Link
            to="/products"
            className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'mt-8')}
          >
            Order now
          </Link>
        </div>
      </section>

      <Separator />
    </>
  )
}
