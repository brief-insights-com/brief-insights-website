import type { Lang } from "@/routes";

/**
 * The 37-second BriefXtract walkthrough, one file per language, served from
 * public/videos so the addresses stay stable for search engines. Silent, H.264,
 * 1920x1080, with the index at the front so playback starts before the download ends.
 */
export const DEMO_VIDEO: Record<Lang, { src: string; poster: string; uploadDate: string }> = {
  de: {
    src: "/videos/briefxtract-demo-de.mp4",
    poster: "/videos/briefxtract-demo-de.jpg",
    uploadDate: "2026-08-12T11:28:27Z",
  },
  en: {
    src: "/videos/briefxtract-demo-en.mp4",
    poster: "/videos/briefxtract-demo-en.jpg",
    uploadDate: "2026-08-12T11:27:41Z",
  },
};

export const DEMO_VIDEO_DURATION = "PT37S";
export const DEMO_VIDEO_WIDTH = 1920;
export const DEMO_VIDEO_HEIGHT = 1080;
