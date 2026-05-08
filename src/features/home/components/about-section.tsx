import { Separator } from '@/components/ui/separator'

const stats = [
  { value: '2019', label: 'Est.' },
  { value: '12+', label: 'Origins sourced' },
  { value: 'Daily', label: 'Baked in-house' },
]

export default function AboutSection() {
  return (
    <section id="about" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Our story
            </p>
            <h2 className="font-heading mb-6 text-3xl font-semibold leading-snug md:text-4xl">
              Rooted in craft,
              <br />
              served with care.
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Cassava Café was born from a simple belief — that great coffee and honest
              food should be accessible to everyone. We work directly with farmers
              across Ethiopia, Colombia, and Indonesia to bring you beans with a story.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Every pastry is baked in-house before dawn. Our menu shifts with the
              seasons to reflect what's fresh, local, and worth celebrating.
            </p>
          </div>

          <div>
            {stats.map((stat, i) => (
              <div key={stat.label}>
                <div className="flex items-baseline gap-4 py-7">
                  <span className="font-heading text-5xl font-semibold">
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
                {i < stats.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
