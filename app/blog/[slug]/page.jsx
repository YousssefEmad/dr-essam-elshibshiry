import { notFound } from "next/navigation";
import BlogDetailView from "@/components/blog/BlogDetailView";
import { buildMetadata } from "@/lib/seo";
import { getBlogPost } from "@/lib/api";
import { extractPostContentHtml } from "@/lib/blog";
import { getPageContent } from "@/lib/content";

export async function generateStaticParams() {
  const { blogPosts } = await import("@/data/blog");
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return buildMetadata({
    titleAr: `${post.titleAr} | د. عصام الشبشيري`,
    descriptionAr: post.excerptAr,
    path: `/blog/${slug}`,
  });
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const rawHtml = await getPageContent(post.contentFile);
  const contentHtml = extractPostContentHtml(rawHtml);

  return (
    <>
      <link rel="stylesheet" href="/assets/css/blog-pages.css" />
      <BlogDetailView post={post} contentHtml={contentHtml} />
    </>
  );
}
