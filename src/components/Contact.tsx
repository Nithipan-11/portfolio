import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { SectionLabel } from "@/components/SectionLabel";
import { SITE } from "@/data/site";

export function Contact() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Get In Touch</SectionLabel>
        <h2 className="mb-6 font-mono text-4xl font-bold text-foreground sm:text-5xl">
          Contact
        </h2>
        <p className="mb-10 max-w-xl text-base leading-relaxed text-muted">
          I like building things that move, wiring up hardware, and figuring
          out why things don&apos;t work the first time. If you&apos;re
          hiring for an internship, or just want to talk hardware and
          firmware, my inbox is open.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ContactLink
            icon={<Mail size={18} />}
            label="Email"
            value={SITE.email}
            href={`mailto:${SITE.email}`}
          />
          <ContactLink
            icon={<LinkedinIcon size={18} />}
            label="LinkedIn"
            value="nithipan-sivakanthan"
            href={SITE.linkedin}
            external
          />
          <ContactLink
            icon={<GithubIcon size={18} />}
            label="GitHub"
            value="Nithipan-11"
            href={SITE.github}
            external
          />
        </div>
      </div>

      <footer className="mx-auto mt-20 max-w-6xl border-t border-border pt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          © 2026 · Waterloo, ON
        </p>
      </footer>
    </section>
  );
}

function ContactLink({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group rounded-sm border border-border bg-surface p-5 transition-colors hover:border-accent/50 hover:bg-surface-hover"
    >
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
        {icon}
        {label}
      </div>
      <div className="mt-3 truncate text-sm text-muted group-hover:text-foreground">
        {value}
      </div>
    </a>
  );
}
