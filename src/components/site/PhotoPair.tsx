export interface Photo {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

/**
 * The system's pairing rule: a "before" frame never runs alone. Photographs sit unmodified in a
 * radius-lg frame, with no tint or overlay.
 */
export default function PhotoPair({ before, after }: { before: Photo; after: Photo }) {
  return (
    <div className="mt-12 grid gap-8 md:grid-cols-2">
      {[before, after].map((photo) => (
        <figure key={photo.src}>
          <img
            src={photo.src}
            srcSet={photo.srcSet}
            sizes="(min-width: 1280px) 592px, (min-width: 768px) 50vw, 100vw"
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            className="h-56 w-full rounded-lg bg-surface object-cover md:h-[360px]"
          />
          <figcaption className="mt-3 text-caption text-steel">{photo.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
