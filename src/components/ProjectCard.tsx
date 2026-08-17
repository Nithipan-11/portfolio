"use client";

import Image from "next/image";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import type { ProjectWithHtml } from "@/components/ProjectsGrid";

export function ProjectCard({
  project,
  onOpenDetails,
}: {
  project: ProjectWithHtml;
  onOpenDetails: (id: string) => void;
}) {
  const body = (
    <>
      <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-background">
        <Image
          src={project.thumbnail}
          alt={`${project.title} thumbnail`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain"
        />
      </div>

      <div className="p-5">
        <h3 className="font-mono text-base font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  const showInlineScreenshot =
    project.linkType !== "details" && project.codeScreenshot;

  return (
    <div className="group flex flex-col overflow-hidden rounded-sm border border-border bg-surface transition-colors hover:border-accent/50">
      {project.linkType === "details" && (
        <button
          type="button"
          onClick={() => onOpenDetails(project.id)}
          className="flex flex-1 flex-col text-left"
        >
          {body}
          <div className="mt-auto flex items-center gap-1.5 border-t border-border px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-accent">
            <Maximize2 size={12} />
            View Details
          </div>
        </button>
      )}

      {project.linkType === "github" && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 flex-col"
        >
          {body}
          {showInlineScreenshot && (
            <CodeScreenshot src={project.codeScreenshot!} title={project.title} />
          )}
          <div className="mt-auto flex items-center gap-1.5 border-t border-border px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-accent">
            <ArrowUpRight size={12} />
            View on GitHub
          </div>
        </a>
      )}

      {project.linkType === "multi-link" && (
        <div className="flex flex-1 flex-col">
          {body}
          {showInlineScreenshot && (
            <CodeScreenshot src={project.codeScreenshot!} title={project.title} />
          )}
          <div className="mt-auto flex flex-wrap gap-2 border-t border-border px-5 py-3">
            {project.links?.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="flex items-center gap-1.5 rounded-sm border border-border-bright px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {link.label}
                <ArrowUpRight size={11} />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CodePanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-t border-border">
      <div className="border-b border-border bg-surface-hover px-5 py-2 font-mono text-[11px] uppercase tracking-widest text-muted">
        Code
      </div>
      {children}
    </div>
  );
}

function CodeScreenshot({ src, title }: { src: string; title: string }) {
  return (
    <CodePanel>
      <div className="relative aspect-video w-full bg-background">
        <Image
          src={src}
          alt={`${title} code screenshot`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </CodePanel>
  );
}
