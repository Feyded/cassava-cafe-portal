import { Coffee } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'

const footerGroups = [
  {
    label: 'Navigate',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Menu', href: '/menu' },
    ],
  },
  {
    label: 'Info',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Visit Us', href: '#visit' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="mb-4 inline-flex items-center gap-2.5">
              <Coffee className="size-4" />
              <span className="font-heading text-base font-semibold tracking-wider">
                Cassava Café
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Specialty coffee and handmade pastries, served daily from sunrise.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {group.label}
              </p>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator />

        <p className="mt-8 text-xs tracking-wide text-muted-foreground">
          © {new Date().getFullYear()} Cassava Café. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
