import HtmlBlock from "@/components/shared/HtmlBlock";
import { getPageContent } from "@/lib/content";

export default async function NicepageView({ contentFile, extraCss = null }) {
  const html = await getPageContent(contentFile);

  return (
    <>
      {extraCss ? <link rel="stylesheet" href={extraCss} /> : null}
      <HtmlBlock html={html} />
    </>
  );
}
