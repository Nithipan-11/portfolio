"use client";

import { useEffect, useState } from "react";

const BODY = { x: 20, y: 10, width: 200, height: 300 };
const SCREEN = { x: 36, y: 46, width: 168, height: 228 };

export function HeroTablet() {
  const [revealed, setRevealed] = useState(false);
  const [canHover, setCanHover] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handleChange = () => setCanHover(mq.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const interactionProps = canHover
    ? {
        onMouseEnter: () => setRevealed(true),
        onMouseLeave: () => setRevealed(false),
      }
    : {
        onClick: () => setRevealed((v) => !v),
      };

  return (
    <svg
      aria-hidden
      viewBox="0 0 240 320"
      className="hidden opacity-80 lg:absolute lg:block lg:right-[11%] lg:top-1/2 lg:w-72 lg:-translate-y-1/2 xl:right-[26%]"
      fill="none"
    >
      <defs>
        <linearGradient id="heroTabletScreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--surface)" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="heroTabletXray" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
          <stop offset="55%" stopColor="var(--accent-strong)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.22" />
        </linearGradient>
        <clipPath id="heroTabletScreenClip">
          <rect
            x={SCREEN.x}
            y={SCREEN.y}
            width={SCREEN.width}
            height={SCREEN.height}
            rx="10"
          />
        </clipPath>
      </defs>

      <g style={{ pointerEvents: "auto", cursor: "pointer" }} {...interactionProps}>
        {/* Always-visible flat device body: frame + camera dot */}
        <rect
          x={BODY.x}
          y={BODY.y}
          width={BODY.width}
          height={BODY.height}
          rx="26"
          stroke="var(--accent)"
          strokeWidth="2.5"
          fill="var(--surface)"
        />
        <circle cx={BODY.x + BODY.width / 2} cy={BODY.y + 22} r="3.5" fill="var(--accent)" />

        <g clipPath="url(#heroTabletScreenClip)">
          {/* Shell content: gradient screen + diagonal accent stripes */}
          <g
            className={`hero-tablet-fade ${revealed ? "hero-tablet-fade-hidden" : ""}`}
          >
            <rect
              x={SCREEN.x}
              y={SCREEN.y}
              width={SCREEN.width}
              height={SCREEN.height}
              fill="url(#heroTabletScreen)"
            />
            <line x1="20" y1="300" x2="140" y2="20" stroke="var(--accent)" strokeWidth="8" strokeOpacity="0.4" strokeLinecap="round" />
            <line x1="70" y1="300" x2="190" y2="20" stroke="var(--accent)" strokeWidth="8" strokeOpacity="0.4" strokeLinecap="round" />
            <line x1="120" y1="300" x2="240" y2="20" stroke="var(--accent)" strokeWidth="8" strokeOpacity="0.4" strokeLinecap="round" />
            <rect x="100" y="258" width="40" height="4" rx="2" fill="var(--foreground)" opacity="0.5" />
          </g>

          {/* Internal circuitry, revealed on hover/tap: battery left, logic board right */}
          <g
            className={`hero-tablet-fade ${revealed ? "" : "hero-tablet-fade-hidden"}`}
          >
            <rect x={SCREEN.x} y={SCREEN.y} width={SCREEN.width} height={SCREEN.height} fill="var(--surface)" />
            <rect x={SCREEN.x} y={SCREEN.y} width={SCREEN.width} height={SCREEN.height} fill="url(#heroTabletXray)" />

            {/* Battery pack */}
            <rect x="44" y="60" width="68" height="200" rx="6" stroke="var(--accent)" strokeWidth="1.75" fill="var(--surface)" />
            <line x1="44" y1="160" x2="112" y2="160" stroke="var(--accent)" strokeWidth="1.25" strokeOpacity="0.7" />
            <rect x="54" y="228" width="48" height="20" rx="2" stroke="var(--border-bright)" strokeWidth="1" fill="none" />
            <line x1="60" y1="234" x2="94" y2="234" stroke="var(--border-bright)" strokeWidth="1" />
            <line x1="60" y1="240" x2="86" y2="240" stroke="var(--border-bright)" strokeWidth="1" />
            <rect x="98" y="52" width="10" height="10" fill="var(--accent)" />

            {/* Board traces from battery into the logic board */}
            <path d="M108 57 H128 V70" stroke="var(--accent)" strokeWidth="1.5" />

            {/* Logic board: main SoC + supporting chips */}
            <rect x="128" y="70" width="52" height="40" rx="3" stroke="var(--accent)" strokeWidth="1.75" fill="var(--surface)" />
            <rect x="130" y="118" width="34" height="24" rx="2" stroke="var(--accent)" strokeWidth="1.5" fill="var(--surface)" />
            <rect x="170" y="118" width="22" height="20" rx="2" stroke="var(--accent-strong)" strokeWidth="1.5" fill="var(--surface)" />
            <rect x="130" y="150" width="24" height="18" rx="2" stroke="var(--accent-strong)" strokeWidth="1.5" fill="var(--surface)" />
            <rect x="160" y="146" width="30" height="30" rx="2" stroke="var(--accent)" strokeWidth="1.5" fill="var(--surface)" />
            <rect x="132" y="190" width="46" height="16" rx="2" stroke="var(--accent)" strokeWidth="1.5" fill="var(--surface)" />

            <path d="M154 108 V118" stroke="var(--accent)" strokeWidth="1.25" />
            <path d="M164 130 H170" stroke="var(--accent)" strokeWidth="1.25" />
            <path d="M142 142 V150" stroke="var(--accent)" strokeWidth="1.25" />
            <path d="M175 176 V190" stroke="var(--accent)" strokeWidth="1.25" />
            <path d="M154 168 V190" stroke="var(--accent)" strokeWidth="1.25" />

            <circle cx="145" cy="215" r="2" fill="var(--accent-strong)" />
            <circle cx="160" cy="220" r="2" fill="var(--accent-strong)" />
            <circle cx="175" cy="210" r="2" fill="var(--accent-strong)" />
            <circle cx="140" cy="230" r="2" fill="var(--accent-strong)" />
            <circle cx="180" cy="228" r="2" fill="var(--accent-strong)" />

            {/* Bottom flex connector */}
            {[130, 140, 150, 160, 170, 180].map((x) => (
              <rect key={x} x={x} y="252" width="4" height="9" fill="var(--border-bright)" />
            ))}
          </g>
        </g>
      </g>
    </svg>
  );
}
