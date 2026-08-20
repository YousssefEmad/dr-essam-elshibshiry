import NicepageView from "@/components/shared/NicepageView";
import FacebookVideosSection from "@/components/videos/FacebookVideosSection";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    titleAr: "فيديوهات | د. عصام الشبشيري",
    descriptionAr: "فيديوهات د. عصام الشبشيري",
    path: "/videos",
  });
}

export default function VideosPage() {
  return (
    <>
      <link rel="stylesheet" href="/assets/css/videos.css" />
      <link rel="stylesheet" href="/assets/css/facebook-videos.css" />
      <NicepageView contentFile="/content/videos.html" />
      <FacebookVideosSection />
    </>
  );
}
