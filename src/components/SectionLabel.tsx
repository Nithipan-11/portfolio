export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
      <span className="h-px w-6 bg-accent" />
      {children}
    </div>
  );
}
