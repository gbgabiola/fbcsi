import type { MetadataRoute } from "next";
import { church } from "../lib/church";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: new URL("/", church.url).href }];
}
