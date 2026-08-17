import { SectionLabel } from "@/components/SectionLabel";
import { ProjectsGrid, type ProjectWithHtml } from "@/components/ProjectsGrid";
import { PROJECTS } from "@/data/projects";
import { highlightCode } from "@/lib/highlight";

export async function Projects() {
  const projects: ProjectWithHtml[] = await Promise.all(
    PROJECTS.map(async (project) => {
      if (!project.details?.codeSnippet) return project;
      const { lang, code } = project.details.codeSnippet;
      const codeSnippetHtml = await highlightCode(code, lang);
      return { ...project, codeSnippetHtml };
    })
  );

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>Selected Work</SectionLabel>
        <h2 className="mb-10 font-mono text-4xl font-bold text-foreground sm:text-5xl">
          Projects
        </h2>

        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
