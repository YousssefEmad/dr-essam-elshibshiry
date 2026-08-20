import { siteConfig } from "@/data/site";
import { blogPosts } from "@/data/blog";
import { services } from "@/data/services";
import { normalizeBlogSlug } from "@/lib/blog";

export async function getSiteConfig() {
  return siteConfig;
}

export async function getBlogPosts() {
  return blogPosts;
}

export async function getBlogPost(slug) {
  const normalized = normalizeBlogSlug(slug);
  if (!normalized) return null;
  return blogPosts.find((p) => normalizeBlogSlug(p.slug) === normalized) || null;
}

export async function getServices() {
  return services;
}
