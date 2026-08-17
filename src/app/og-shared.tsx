import { ImageResponse } from "next/og";

export const alt = "Nithipan Sivakanthan — Nanotechnology Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BACKGROUND = "#0a0e13";
const BORDER = "#1f2932";
const ACCENT = "#4ade80";
const FOREGROUND = "#e7ebee";
const MUTED = "#8b98a3";

const NAME = "Nithipan Sivakanthan";
const TAGLINE = "Nanotechnology Engineering @ University of Waterloo";
const HOOK =
  "I build hands-on electronics projects and love figuring out how hardware and software work together.";
const NAV_LINKS = ["About", "Experience", "Skills", "Projects", "Contact"];

const FONT_SAMPLE_TEXT = Array.from(
  new Set(
    `${NAME}${TAGLINE}${HOOK}${NAV_LINKS.join("")}> NS_SYSTEM ONLINE0123456789`
  )
).join("");

const PCB_TILE = `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'>
  <path d='M0 32 H24 V8 H64 M32 0 V24 H64 M32 64 V40 H0' fill='none' stroke='${ACCENT}' stroke-width='1' opacity='0.12'/>
  <circle cx='24' cy='8' r='2' fill='${ACCENT}' opacity='0.12'/>
  <circle cx='32' cy='24' r='2' fill='${ACCENT}' opacity='0.12'/>
  <circle cx='32' cy='40' r='2' fill='${ACCENT}' opacity='0.12'/>
  <circle cx='0' cy='32' r='1.5' fill='${ACCENT}' opacity='0.12'/>
</svg>`;
const PCB_BACKGROUND_URL = `data:image/svg+xml,${encodeURIComponent(PCB_TILE)}`;

async function loadGoogleFont(family: string, weight: number, text: string) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (
    await fetch(cssUrl, {
      headers: {
        // Force Google Fonts to serve TTF (satori doesn't parse woff2 reliably)
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/538.1 (KHTML, like Gecko) Version/8.0 Safari/538.1",
      },
    })
  ).text();
  const match = css.match(/src: url\(([^)]+)\)/);
  if (!match) throw new Error(`Could not resolve font source for ${family}`);
  const fontRes = await fetch(match[1]);
  return fontRes.arrayBuffer();
}

async function loadFonts() {
  try {
    const [monoBold, monoRegular, sansRegular] = await Promise.all([
      loadGoogleFont("JetBrains Mono", 700, FONT_SAMPLE_TEXT),
      loadGoogleFont("JetBrains Mono", 400, FONT_SAMPLE_TEXT),
      loadGoogleFont("Inter", 400, FONT_SAMPLE_TEXT),
    ]);
    return [
      { name: "JetBrains Mono", data: monoBold, weight: 700 as const, style: "normal" as const },
      { name: "JetBrains Mono", data: monoRegular, weight: 400 as const, style: "normal" as const },
      { name: "Inter", data: sansRegular, weight: 400 as const, style: "normal" as const },
    ];
  } catch {
    return [];
  }
}

export async function generateOgImage() {
  const fonts = await loadFonts();
  const mono = fonts.length ? "JetBrains Mono" : undefined;
  const sans = fonts.length ? "Inter" : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: BACKGROUND,
          backgroundImage: `url("${PCB_BACKGROUND_URL}")`,
          backgroundRepeat: "repeat",
        }}
      >
        {/* Mini nav bar, mirroring the site's Nav component */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: 84,
            padding: "0 56px",
            borderBottom: `1px solid ${BORDER}`,
            backgroundColor: "rgba(10, 14, 19, 0.85)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", fontFamily: mono, fontSize: 26, fontWeight: 700 }}>
            <span style={{ color: ACCENT }}>&gt;</span>
            <span style={{ color: FOREGROUND, marginLeft: 8 }}>NS</span>
            <span style={{ color: ACCENT, marginLeft: 4 }}>_</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
            {NAV_LINKS.map((link) => (
              <span
                key={link}
                style={{
                  fontFamily: mono,
                  fontSize: 15,
                  fontWeight: 400,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: MUTED,
                }}
              >
                {link}
              </span>
            ))}
          </div>
        </div>

        {/* Hero content preview */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            padding: "0 80px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                display: "flex",
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: ACCENT,
              }}
            />
            <span
              style={{
                fontFamily: mono,
                fontSize: 17,
                fontWeight: 400,
                letterSpacing: 5,
                textTransform: "uppercase",
                color: ACCENT,
              }}
            >
              System Online
            </span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontFamily: mono,
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.1,
              color: FOREGROUND,
            }}
          >
            {NAME}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontFamily: mono,
              fontSize: 30,
              fontWeight: 400,
              color: ACCENT,
            }}
          >
            {TAGLINE}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 26,
              maxWidth: 780,
              fontFamily: sans,
              fontSize: 24,
              fontWeight: 400,
              lineHeight: 1.5,
              color: MUTED,
            }}
          >
            {HOOK}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  );
}
