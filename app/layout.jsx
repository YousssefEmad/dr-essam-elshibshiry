import { Cairo } from "next/font/google";
import "@/styles/globals.css";
import SiteShell from "@/components/layout/SiteShell";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, organizationSchema } from "@/lib/seo";
import { siteSeo } from "@/data/site";
import { getSiteConfig } from "@/lib/api";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
  display: "swap",
  fallback: ["Tahoma", "Arial", "sans-serif"],
});

export async function generateMetadata() {
  const site = await getSiteConfig();
  return buildMetadata({ ...(site.seo || siteSeo), path: "/" }, site);
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  const siteConfig = await getSiteConfig();

  return (
    <html lang="ar" dir="rtl" className={cairo.className} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/images/logo.png" type="image/png" />
        <link rel="stylesheet" href="/assets/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/assets/css/site-chrome.css" />
        <link rel="stylesheet" href="/assets/theme/zero/style.css" />
        <link rel="stylesheet" href="/assets/theme/zero/css/media.css" />
        <link rel="stylesheet" href="/assets/css/brand-theme.css" />
      </head>
      <body suppressHydrationWarning>
        <JsonLd data={organizationSchema(siteConfig)} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
