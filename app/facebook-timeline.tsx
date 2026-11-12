"use client";

import { useEffect, useRef, useState } from "react";

export function FacebookTimeline({ pageUrl }: { pageUrl: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    if (!container.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.floor(Math.min(500, entry.contentRect.width)));
    });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  const height = 620;
  const query = new URLSearchParams({
    href: pageUrl,
    tabs: "timeline",
    width: String(width ?? 0),
    height: String(height),
    adapt_container_width: "true",
    show_facepile: "false",
  });

  return (
    <div ref={container} className="facebook-timeline">
      {width !== undefined && width >= 180 && (
        <iframe
          title="Fundamental Baptist Church Facebook posts and photos"
          src={`https://www.facebook.com/plugins/page.php?${query}`}
          width={width}
          height={height}
          loading="lazy"
          allowFullScreen
        />
      )}
    </div>
  );
}
