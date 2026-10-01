import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** 1280px container with 24px (mobile) and 32px gutters. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-container px-6 md:px-8", className)}>{children}</div>;
}

type Tone = "canvas" | "surface";

export function Section({
  tone = "canvas",
  className,
  containerClassName,
  children,
  ...rest
}: { tone?: Tone; containerClassName?: string } & ComponentPropsWithoutRef<"section">) {
  return (
    <section className={cn("py-16 md:py-24", tone === "surface" ? "bg-surface" : "bg-canvas", className)} {...rest}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

const titleSizes = {
  // The first section on a page opens at display size; later sections use heading-2.
  display: "text-h2 md:text-h1 lg:text-display",
  h2: "text-h3 md:text-h2",
};

export function SectionHeader({
  title,
  lead,
  size = "h2",
  as: Heading = "h2",
  className,
}: {
  title: ReactNode;
  lead?: ReactNode;
  size?: keyof typeof titleSizes;
  as?: ElementType;
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <Heading className={cn(titleSizes[size], "text-ink")}>{title}</Heading>
      {lead ? <p className="mx-auto mt-4 max-w-[620px] text-body text-slate md:text-subtitle">{lead}</p> : null}
    </div>
  );
}

/** White bands: a 2px ink rule over each item, no box. */
export function RuledItem({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cn("border-t-2 border-ink pt-5", className)}>{children}</Tag>;
}

/** Grey bands: white cards on a hairline border, no shadow. */
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-lg border border-hairline bg-canvas p-6 md:p-8", className)}>{children}</div>;
}

export function Caption({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn("text-caption text-steel", className)}>{children}</p>;
}
