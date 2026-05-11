
import { useState } from 'react'
import { menuCategories, mockMenu, type MenuCategory, type MenuItem } from '../data/mock-menu'
import { formatPrice } from '@/utils/format-price'
import { cn } from '@/lib/utils'
import MenuItemDrawer from '../components/menu-item-drawer'

export default function MenuPage() {
  const [active, setActive] = useState<MenuCategory | 'all'>('all')
  const [selected, setSelected] = useState<MenuItem | null>(null)

  const items =
    active === 'all' ? mockMenu : mockMenu.filter((item) => item.category === active)

  return (
    <div className="min-h-screen bg-background">
      <MenuItemDrawer item={selected} onClose={() => setSelected(null)} />
      {/* Hero */}
      <section className="border-b border-border px-6 py-16 text-center">
        <p className="mb-2 text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
          Cassava Café
        </p>
        <h1 className="font-heading text-4xl font-light tracking-tight text-foreground md:text-5xl">
          Our Menu
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Thoughtfully crafted drinks and bites, made fresh every day.
        </p>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl overflow-x-auto">
          <div className="flex gap-0 px-6">
            {menuCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActive(cat.value)}
                className={cn(
                  'shrink-0 border-b-2 px-4 py-4 text-xs font-semibold tracking-widest uppercase transition-colors',
                  active === cat.value
                    ? 'border-foreground text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground',
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <main className="mx-auto max-w-6xl px-6 py-12">
        {active === 'all' ? (
          menuCategories
            .filter((c) => c.value !== 'all')
            .map((cat) => {
              const catItems = mockMenu.filter((i) => i.category === cat.value)
              return (
                <section key={cat.value} className="mb-16">
                  <div className="mb-6 flex items-center gap-4">
                    <h2 className="font-heading text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                      {cat.label}
                    </h2>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <ItemGrid items={catItems} onSelect={setSelected} />
                </section>
              )
            })
        ) : (
          <ItemGrid items={items} onSelect={setSelected} />
        )}
      </main>
    </div>
  )
}

function ItemGrid({ items, onSelect }: { items: typeof mockMenu; onSelect: (item: MenuItem) => void }) {
  return (
    <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className="group relative bg-background p-6 text-left transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        >
          {/* Image */}
          <div className="mb-4 overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Bestseller dot */}
          {item.bestseller && (
            <span className="mb-2 inline-flex items-center gap-1.5 text-[0.6rem] font-semibold tracking-[0.15em] uppercase text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
              Bestseller
            </span>
          )}

          <h3 className="font-heading text-sm font-semibold tracking-tight text-foreground">
            {item.name}
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {item.description}
          </p>
          <p className="mt-3 text-sm font-semibold text-foreground">
            {formatPrice(item.price)}
          </p>
          <p className="mt-1 text-[0.6rem] font-semibold tracking-widest uppercase text-muted-foreground">
            {item.sizes.length} size{item.sizes.length > 1 ? 's' : ''} available
          </p>
        </button>
      ))}
    </div>
  )
}

