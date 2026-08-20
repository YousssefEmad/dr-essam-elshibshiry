import NicepageView from "@/components/shared/NicepageView";
import { buildMetadata } from "@/lib/seo";
import { siteSeo } from "@/data/site";

export async function generateMetadata() {
  return buildMetadata({ ...siteSeo, path: "/" });
}

export default function HomePage() {
  return (
    <>
      <link rel="stylesheet" href="/assets/css/home.css" />
      <NicepageView contentFile="/content/home.html" />
    </>
  );
}
