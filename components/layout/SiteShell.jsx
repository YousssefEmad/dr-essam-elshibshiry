import HtmlBlock from "@/components/shared/HtmlBlock";
import NicepageInit from "@/components/shared/NicepageInit";
import FloatingSocial from "@/components/shared/FloatingSocial";
import Header from "@/components/layout/Header";
import { getFooterHtml } from "@/lib/content";

export default async function SiteShell({ children }) {
  const footerHtml = await getFooterHtml();

  return (
    <>
      <Header />
      {children}
      <HtmlBlock html={footerHtml} />
      <FloatingSocial />
      <NicepageInit />
    </>
  );
}
