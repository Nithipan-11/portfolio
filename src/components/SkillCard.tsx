import type { SkillCategory } from "@/data/skills";

export function SkillCard({ category }: { category: SkillCategory }) {
  return (
    <div className="rounded-sm border border-border bg-surface p-5 transition-colors hover:border-accent/50 hover:bg-surface-hover">
      <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {category.label}
      </h3>
      <ul className="space-y-2">
        {category.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-muted">
            <span className="mt-0.5 text-accent">▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
