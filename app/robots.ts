import type { MetadataRoute } from "next";
import { church } from "../lib/church";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", church.url).href,
  };
}
