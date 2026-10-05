export interface Photo {
  /** JPEG fallback. */
  src: string;
  srcSet?: string;
  /** WebP versions, served to every browser that supports them. */
  webpSrcSet: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

const SIZES = "(min-width: 1280px) 592px, (min-width: 768px) 50vw, 100vw";

/**
 * The system's pairing rule: a "before" frame never runs alone. Photographs sit unmodified in a
 * radius-lg frame, with no tint or overlay.
 */
export default function PhotoPair({ before, after }: { before: Photo; after: Photo }) {
  return (
    <div className="mt-12 grid gap-8 md:grid-cols-2">
      {[before, after].map((photo) => (
        <figure key={photo.src}>
          <picture>
            <source type="image/webp" srcSet={photo.webpSrcSet} sizes={SIZES} />
            <img
              src={photo.src}
              srcSet={photo.srcSet}
              sizes={SIZES}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              className="h-56 w-full rounded-lg bg-surface object-cover md:h-[360px]"
            />
          </picture>
          <figcaption className="mt-3 text-caption text-steel">{photo.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
