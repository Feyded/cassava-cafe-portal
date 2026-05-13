import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function HeroSection() {
  return (
    <section className="bg-secondary">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-40">
        <div>
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Specialty Coffee &amp; Pastries
          </p>
          <h1 className="font-heading mb-8 text-5xl font-semibold leading-[1.1] md:text-7xl">
            A place to
            <br />
            slow down.
          </h1>
          <p className="mb-10 max-w-md leading-relaxed text-muted-foreground">
            We source the finest single-origin beans and bake everything in-house.
            Come for the coffee, stay for the quiet.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/menu"
              className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}
            >
              Explore Menu
              <ArrowRight className="size-4" />
            </Link>
            <a
              href="#about"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              Our Story
            </a>
          </div>
        </div>

        <div className="relative hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=900&fit=crop"
            alt="A warm cup of coffee on a wooden table"
            className="h-130 w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
