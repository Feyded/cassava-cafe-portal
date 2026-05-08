import { Link } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 lg:col-span-2">
            <span className="font-heading text-lg font-bold">Cassava Café</span>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Specialty coffee and wholesome bakes crafted with care. Made from
              scratch, every single day.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Menu' },
                { to: '/login', label: 'Sign in' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Visit
            </h3>
            <address className="mt-4 space-y-2 not-italic text-sm text-muted-foreground">
              <p>12 Brew Lane</p>
              <p>Melbourne VIC 3000</p>
              <p>Mon–Fri 7am – 5pm</p>
              <p>Sat–Sun 8am – 4pm</p>
            </address>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Cassava Café. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
