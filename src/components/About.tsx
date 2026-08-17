import { SectionLabel } from "@/components/SectionLabel";
import { ABOUT_TEXT, STATS } from "@/data/site";

export function About() {
  return (
    <section id="about" className="px-6 pb-24 pt-6">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>About</SectionLabel>
        <h2 className="mb-12 font-mono text-5xl font-bold text-foreground sm:text-6xl">
          Who I Am
        </h2>

        <div className="grid gap-14 lg:grid-cols-5">
          <p className="text-lg leading-relaxed text-muted sm:text-xl lg:col-span-3">
            {ABOUT_TEXT}
          </p>

          <div className="grid grid-cols-2 gap-5 lg:col-span-2">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-sm border border-border bg-surface px-5 py-6 transition-colors hover:border-accent/50"
              >
                <div className="font-mono text-3xl font-bold text-accent sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1.5 font-mono text-xs uppercase tracking-widest text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
