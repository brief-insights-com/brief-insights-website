import { useId } from "react";
import { useTranslation } from "react-i18next";
import { useLang } from "@/hooks/use-locale";
import { DEMO_VIDEO, DEMO_VIDEO_HEIGHT, DEMO_VIDEO_WIDTH } from "@/lib/demoVideo";
import { cn } from "@/lib/utils";

/**
 * The product walkthrough in the page's language. Nothing downloads until the
 * visitor presses play, and nothing loads from a third party. The video has no
 * audio track, so the caption describes what it shows. (No `muted` attribute:
 * React hydrates it as a property and reports a mismatch.)
 */
export default function DemoVideo({ className }: { className?: string }) {
  const { t } = useTranslation();
  const lang = useLang();
  const captionId = useId();
  const video = DEMO_VIDEO[lang];

  return (
    <figure className={cn("mx-auto w-full max-w-[1000px]", className)}>
      <video
        controls
        playsInline
        preload="none"
        poster={video.poster}
        width={DEMO_VIDEO_WIDTH}
        height={DEMO_VIDEO_HEIGHT}
        aria-label={t("video.title")}
        aria-describedby={captionId}
        className="block aspect-video h-auto w-full rounded-lg border border-hairline bg-surface"
      >
        <source src={video.src} type="video/mp4" />
        <a href={video.src}>{t("video.fallback")}</a>
      </video>
      <figcaption id={captionId} className="mt-3 text-caption text-steel">
        {t("video.description")}
      </figcaption>
    </figure>
  );
}
