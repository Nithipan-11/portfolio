"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectDetailsModal } from "@/components/ProjectDetailsModal";
import type { Project } from "@/data/projects";

export type ProjectWithHtml = Project & { codeSnippetHtml?: string };

export function ProjectsGrid({ projects }: { projects: ProjectWithHtml[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const openProject = projects.find((p) => p.id === openId) ?? null;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenDetails={setOpenId}
          />
        ))}
      </div>

      <ProjectDetailsModal
        project={openProject}
        open={openId !== null}
        onOpenChange={(open) => !open && setOpenId(null)}
      />
    </>
  );
}
