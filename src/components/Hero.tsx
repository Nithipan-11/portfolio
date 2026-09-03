import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { HeroTablet } from "@/components/HeroTablet";
import { SITE, TECH_TAGS } from "@/data/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] flex-col justify-center px-6 pt-20 pb-16"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_18rem] lg:items-center">
        <div>
          <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            System Online
          </div>

          <h1 className="font-mono text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl">
            {SITE.name}
          </h1>

          <p className="mt-4 font-mono text-base text-accent sm:text-lg">
            {SITE.role}
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {SITE.hook}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-sm border border-border-bright px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <GithubIcon size={16} />
              GitHub
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-sm border border-border-bright px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <LinkedinIcon size={16} />
              LinkedIn
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-2 rounded-sm border border-border-bright px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <Mail size={16} />
              Email
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-2">
            {TECH_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-border px-2.5 py-1 font-mono text-[11px] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <HeroTablet />
      </div>
    </section>
  );
}
