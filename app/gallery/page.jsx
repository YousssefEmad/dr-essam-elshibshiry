import NicepageView from "@/components/shared/NicepageView";
import CaseCategorySection from "@/components/gallery/CaseCategorySection";
import { buildMetadata } from "@/lib/seo";
import { caseCategories } from "@/data/cases";

export async function generateMetadata() {
  return buildMetadata({
    titleAr: "قبل وبعد | د. عصام الشبشيري",
    descriptionAr: "حالات قبل وبعد لعمليات د. عصام الشبشيري",
    path: "/gallery",
  });
}

export default function GalleryPage() {
  return (
    <>
      <link rel="stylesheet" href="/assets/css/gallery.css" />
      <link rel="stylesheet" href="/assets/css/case-sections.css" />
      <NicepageView contentFile="/content/gallery.html" />
      {caseCategories.map((category) => (
        <CaseCategorySection key={category.id} category={category} />
      ))}
    </>
  );
}
