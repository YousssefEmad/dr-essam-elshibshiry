import { blogPosts } from "@/data/blog";
import { siteConfig } from "@/data/site";

export default function sitemap() {
  const base = siteConfig.siteUrl;
  const staticRoutes = ["", "/testimonials", "/videos", "/gallery", "/blog"];
  const now = new Date().toISOString();

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: path === "" ? 1 : 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.date || now,
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ];
}
