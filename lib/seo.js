import { siteConfig, siteSeo } from "@/data/site";

export function buildMetadata({ titleAr, titleEn, descriptionAr, descriptionEn, path = "" }, site = siteConfig) {
  const title = titleAr || siteSeo.titleAr;
  const description = descriptionAr || siteSeo.descriptionAr;
  const url = `${site.siteUrl}${path}`;

  return {
    title,
    description,
    metadataBase: new URL(site.siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.nameAr,
      locale: "ar_EG",
      type: "website",
    },
  };
}

export function organizationSchema(site = siteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: site.nameAr,
    url: site.siteUrl,
    telephone: site.phone,
    image: `${site.siteUrl}${site.logo}`,
    sameAs: [site.facebook, site.instagram].filter(Boolean),
  };
}
