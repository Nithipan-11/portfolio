export function CircuitBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-background" />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.05]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="pcb-grid"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 32 H24 V8 H64 M32 0 V24 H64 M32 64 V40 H0"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1"
            />
            <circle cx="24" cy="8" r="2" fill="var(--accent)" />
            <circle cx="32" cy="24" r="2" fill="var(--accent)" />
            <circle cx="32" cy="40" r="2" fill="var(--accent)" />
            <circle cx="0" cy="32" r="1.5" fill="var(--accent)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pcb-grid)" />
      </svg>
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, color-mix(in srgb, var(--accent) 12%, transparent), transparent)",
        }}
      />
    </div>
  );
}
