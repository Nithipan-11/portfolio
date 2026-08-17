import { SectionLabel } from "@/components/SectionLabel";
import { SkillCard } from "@/components/SkillCard";
import { SKILLS } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Technical Stack</SectionLabel>
        <h2 className="mb-10 font-mono text-4xl font-bold text-foreground sm:text-5xl">
          Skills
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((category) => (
            <SkillCard key={category.label} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
