"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { SITE } from "@/data/site";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="font-mono text-sm font-semibold tracking-widest text-foreground"
        >
          <span className="text-accent">&gt;</span> NS
          <span className="animate-pulse text-accent">_</span>
        </a>

        <ul className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-accent"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-accent"
          >
            <LinkedinIcon size={18} />
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4 font-mono text-sm uppercase tracking-widest">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="flex gap-5 pt-3">
              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-muted hover:text-accent"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-muted hover:text-accent"
              >
                <LinkedinIcon size={20} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
