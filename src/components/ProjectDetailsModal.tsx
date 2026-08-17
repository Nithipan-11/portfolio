"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { useState } from "react";
import type { ProjectWithHtml } from "@/components/ProjectsGrid";

export function ProjectDetailsModal({
  project,
  open,
  onOpenChange,
}: {
  project: ProjectWithHtml | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const details = project?.details;
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null
  );

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) setLightbox(null);
        onOpenChange(next);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[88vh] w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-sm border border-border-bright bg-surface p-6 shadow-2xl focus:outline-none sm:p-8">
          {project && (
            <>
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <Dialog.Title className="font-mono text-xl font-semibold text-foreground sm:text-2xl">
                    {project.title}
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 text-sm leading-relaxed text-muted">
                    {project.description}
                  </Dialog.Description>
                </div>
                <Dialog.Close
                  aria-label="Close"
                  className="shrink-0 text-muted transition-colors hover:text-accent"
                >
                  <X size={20} />
                </Dialog.Close>
              </div>

              <div className="mb-6 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mb-6 inline-flex items-center gap-1.5 rounded-sm border border-border-bright px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  View on GitHub
                  <ArrowUpRight size={12} />
                </a>
              )}

              {details?.blockDiagram && (
                <Block label="Block Diagram">
                  <FlowDiagram steps={details.blockDiagram} />
                </Block>
              )}

              {details?.signalChain && (
                <Block label="Signal Chain">
                  <FlowDiagram steps={details.signalChain} />
                </Block>
              )}

              {details?.codeSnippet && project.codeSnippetHtml && (
                <Block label={details.codeSnippet.caption ?? "Code"}>
                  <div
                    className="shiki-wrapper overflow-hidden overflow-x-auto rounded-sm border border-border bg-background"
                    dangerouslySetInnerHTML={{ __html: project.codeSnippetHtml }}
                  />
                </Block>
              )}

              {project.codeScreenshot && (
                <Block label="Code Screenshot">
                  <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-border bg-background">
                    <Image
                      src={project.codeScreenshot}
                      alt={`${project.title} code screenshot`}
                      fill
                      sizes="(min-width: 640px) 640px, 92vw"
                      className="object-cover"
                    />
                  </div>
                </Block>
              )}

              {details?.images && (
                <Block label="Images">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {details.images.map((img) => (
                      <figure key={img.src}>
                        <button
                          type="button"
                          onClick={() => setLightbox({ src: img.src, alt: img.alt })}
                          className="relative aspect-video w-full cursor-zoom-in overflow-hidden rounded-sm border border-border bg-background transition-colors hover:border-accent/50"
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="(min-width: 640px) 320px, 92vw"
                            className="object-contain"
                          />
                        </button>
                        <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted">
                          {img.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </Block>
              )}

              {details?.bom && (
                <Block label="Parts Used (BOM)">
                  <div className="overflow-x-auto rounded-sm border border-border">
                    <table className="w-full min-w-[520px] border-collapse font-mono text-xs">
                      <thead>
                        <tr className="border-b border-border bg-surface-hover text-left uppercase tracking-widest text-accent">
                          <th className="px-3 py-2 font-medium">Ref</th>
                          <th className="px-3 py-2 font-medium">Part Number</th>
                          <th className="px-3 py-2 font-medium">Mfr.</th>
                          <th className="px-3 py-2 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {details.bom.map((item) => (
                          <tr key={item.ref} className="border-b border-border last:border-0">
                            <td className="whitespace-nowrap px-3 py-2 text-foreground">
                              {item.ref}
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-accent">
                              {item.part}
                            </td>
                            <td className="whitespace-nowrap px-3 py-2 text-muted">
                              {item.manufacturer}
                            </td>
                            <td className="px-3 py-2 text-muted">
                              {item.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Block>
              )}
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="absolute right-6 top-6 text-white/80 transition-colors hover:text-accent"
          >
            <X size={28} />
          </button>
          <div className="relative h-[85vh] w-[92vw] max-w-5xl">
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              fill
              sizes="92vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </Dialog.Root>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 last:mb-0">
      <h4 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-accent">
        {label}
      </h4>
      {children}
    </div>
  );
}

function FlowDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <span className="rounded-sm border border-border bg-background px-3 py-2 font-mono text-xs text-foreground">
            {step}
          </span>
          {i < steps.length - 1 && (
            <ArrowRight size={14} className="shrink-0 text-accent" />
          )}
        </div>
      ))}
    </div>
  );
}
