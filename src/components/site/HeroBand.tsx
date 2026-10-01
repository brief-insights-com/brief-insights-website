import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Layout";

/** Paper-edge shapes per page, so each band is related but not identical. */
const ARRANGEMENTS = [
  [
    { x: -90, y: 110, w: 430, h: 560, r: -8, mid: false },
    { x: -30, y: 250, w: 350, h: 470, r: 5, mid: true },
    { x: 1110, y: 50, w: 450, h: 580, r: 7, mid: false },
    { x: 1175, y: 180, w: 385, h: 500, r: -4, mid: true },
  ],
  [
    { x: -70, y: -60, w: 400, h: 460, r: -6, mid: false },
    { x: -20, y: 120, w: 330, h: 420, r: 6, mid: true },
    { x: 1140, y: -80, w: 420, h: 470, r: 6, mid: false },
    { x: 1190, y: 100, w: 370, h: 420, r: -5, mid: true },
  ],
  [
    { x: -60, y: -40, w: 390, h: 440, r: 5, mid: false },
    { x: -10, y: 140, w: 330, h: 410, r: -6, mid: true },
    { x: 1150, y: -70, w: 410, h: 450, r: -6, mid: false },
    { x: 1200, y: 110, w: 360, h: 410, r: 5, mid: true },
  ],
  [
    { x: -80, y: -50, w: 410, h: 450, r: -7, mid: false },
    { x: -20, y: 130, w: 340, h: 420, r: 4, mid: true },
    { x: 1130, y: -60, w: 430, h: 460, r: 8, mid: false },
    { x: 1185, y: 120, w: 375, h: 420, r: -5, mid: true },
  ],
];

function Decoration({ variant }: { variant: number }) {
  const shapes = ARRANGEMENTS[variant % ARRANGEMENTS.length];
  const patternId = `hero-dots-${variant}`;
  return (
    <svg
      viewBox="0 0 1440 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <pattern id={patternId} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" className="fill-brand-navy-mid" />
        </pattern>
      </defs>
      <rect width="1440" height="600" fill={`url(#${patternId})`} opacity="0.5" />
      <g opacity="0.75">
        {shapes.map((s, i) => (
          <rect
            key={i}
            x={s.x}
            y={s.y}
            width={s.w}
            height={s.h}
            rx="12"
            className={s.mid ? "fill-brand-navy-mid" : "fill-brand-navy-deep"}
            opacity={s.mid ? 0.45 : 1}
            transform={`rotate(${s.r} ${s.x + s.w / 2} ${s.y + s.h / 2})`}
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * The brand-navy band that opens every marketing page. Centred, one hero-display headline,
 * a subtitle, optional actions, and on the home page the product mockup breaking out below.
 */
export default function HeroBand({
  title,
  subtitle,
  actions,
  breakout,
  variant = 0,
}: {
  title: ReactNode;
  subtitle: ReactNode;
  actions?: ReactNode;
  breakout?: ReactNode;
  variant?: number;
}) {
  return (
    <section className={cn("on-dark relative bg-brand-navy", breakout ? "pt-16 md:pt-24 xl:pt-[120px]" : "py-16 md:py-24")}>
      <Decoration variant={variant} />
      <Container className="relative z-[1] flex flex-col items-center text-center">
        <h1 className="max-w-[1000px] text-h2 text-on-dark md:text-h1 lg:text-display xl:text-hero">{title}</h1>
        <p className="mt-4 max-w-[640px] text-body text-on-dark-muted md:mt-6 md:text-subtitle">{subtitle}</p>
        {actions ? (
          <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">{actions}</div>
        ) : null}
      </Container>
      {breakout ? (
        <Container className="relative z-[2] -mb-[120px] mt-10 flex justify-center md:-mb-[200px] md:mt-16">{breakout}</Container>
      ) : null}
    </section>
  );
}
