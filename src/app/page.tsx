import { CircuitBackground } from "@/components/CircuitBackground";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <CircuitBackground />
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
