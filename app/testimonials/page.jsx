import NicepageView from "@/components/shared/NicepageView";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    titleAr: "اراء عملائنا | د. عصام الشبشيري",
    descriptionAr: "آراء وتقييمات مرضى د. عصام الشبشيري",
    path: "/testimonials",
  });
}

export default function TestimonialsPage() {
  return (
    <>
      <link rel="stylesheet" href="/assets/css/testimonials.css" />
      <NicepageView contentFile="/content/testimonials.html" />
    </>
  );
}
