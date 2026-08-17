import { SectionLabel } from "@/components/SectionLabel";
import { EXPERIENCE } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Work History</SectionLabel>
        <h2 className="mb-10 font-mono text-4xl font-bold text-foreground sm:text-5xl">
          Experience
        </h2>

        <div className="relative border-l border-border pl-8 sm:pl-10">
          {EXPERIENCE.map((job) => (
            <article key={`${job.org}-${job.period}`} className="relative mb-10 last:mb-0">
              <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background sm:-left-[calc(2.5rem+5px)]" />

              <div className="rounded-sm border border-border bg-surface p-5 transition-colors hover:border-border-bright sm:p-6">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h3 className="font-mono text-lg font-semibold text-foreground">
                    {job.role}
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-widest text-accent">
                    {job.period}
                  </span>
                </div>
                <p className="mt-1 font-mono text-sm text-muted">
                  {job.org} · {job.location}
                </p>

                <ul className="mt-4 space-y-2">
                  {job.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
