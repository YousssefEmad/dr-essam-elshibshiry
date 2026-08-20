import BlogListView from "@/components/blog/BlogListView";
import { buildMetadata } from "@/lib/seo";
import { getBlogPosts } from "@/lib/api";

export async function generateMetadata() {
  return buildMetadata({
    titleAr: "مقالات طبية | د. عصام الشبشيري",
    descriptionAr: "مقالات طبية عن تجميل وجراحة العيون",
    path: "/blog",
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <link rel="stylesheet" href="/assets/css/blog.css" />
      <link rel="stylesheet" href="/assets/css/blog-pages.css" />
      <BlogListView posts={posts} />
    </>
  );
}
