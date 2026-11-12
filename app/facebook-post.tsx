"use client";

import { useEffect, useRef, useState } from "react";

const frameHeight = 540;

export function FacebookPost({ title, url }: { title: string; url: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!container.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.floor(Math.min(500, entry.contentRect.width)));
    });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  const query = new URLSearchParams({ href: url, show_text: "true", width: String(width) });

  return (
    <div ref={container} className="facebook-post-frame">
      {width >= 180 && (
        <iframe
          title={title + " on Facebook"}
          src={`https://www.facebook.com/plugins/post.php?${query}`}
          width={width}
          height={frameHeight}
          loading="lazy"
          allowFullScreen
        />
      )}
    </div>
  );
}
