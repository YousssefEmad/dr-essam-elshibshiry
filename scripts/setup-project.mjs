/**
 * One-time import: WordPress/Nicepage HTML → Next.js static assets + data
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";
import http from "http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const DATA = path.join(ROOT, "data");

const BASE = "https://dressamelshabshiry.com";

const PAGE_SOURCES = [
  { key: "home", file: "_scrape-dressamelshabshiry.com.html", route: "/" },
  {
    key: "testimonials",
    file: "_scrape-%d8%a7%d8%b1%d8%a7%d8%a1-%d8%b9%d9%85%d9%84%d8%a7%d8%a6%d9%86%d8%a7.html",
    route: "/testimonials",
  },
  {
    key: "videos",
    file: "_scrape-%d9%81%d9%8a%d8%af%d9%8a%d9%88%d9%87%d8%a7%d8%aa.html",
    route: "/videos",
  },
  {
    key: "gallery",
    file: "_scrape-%d9%82%d8%a8%d9%84-%d9%88%d8%a8%d8%b9%d8%af.html",
    route: "/gallery",
  },
  {
    key: "blog",
    file: "_scrape-%d9%85%d9%82%d8%a7%d9%84%d8%a7%d8%aa-%d8%b7%d8%a8%d9%8a%d8%a9.html",
    route: "/blog",
  },
];

const THEME_ASSETS = [
  "/wp-content/themes/zero/style.css",
  "/wp-content/themes/zero/css/media.css",
  "/wp-content/themes/zero/js/script.js",
  "/wp-content/themes/zero/images/favicon1.png",
];

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchUrl(res.headers.location).then(resolve).catch(reject);
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      })
      .on("error", reject);
  });
}

async function downloadFile(url, dest) {
  ensureDir(path.dirname(dest));
  if (fs.existsSync(dest)) return;
  try {
    const buf = await fetchUrl(url);
    fs.writeFileSync(dest, buf);
    console.log("  ✓", path.relative(ROOT, dest));
  } catch (e) {
    console.warn("  ✗", url, e.message);
  }
}

function extractStyles(html) {
  const styles = [];
  const re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let m;
  while ((m = re.exec(html))) styles.push(m[1].trim());
  return styles.join("\n\n");
}

function extractBetween(html, startTag, endTag) {
  const start = html.indexOf(startTag);
  if (start === -1) return "";
  const end = html.indexOf(endTag, start);
  if (end === -1) return "";
  return html.slice(start, end + endTag.length);
}

function extractMainContent(html) {
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] || html;
  const headerEnd = body.indexOf("</header>");
  const footerStart = body.indexOf("<footer");
  if (headerEnd === -1 || footerStart === -1) return body;
  return body.slice(headerEnd + 9, footerStart).trim();
}

function extractHeader(html) {
  return extractBetween(html, "<header", "</header>") || "";
}

function extractFooter(html) {
  return extractBetween(html, "<footer", "</footer>") || "";
}

const ROUTE_MAP = {
  "/": "/",
  "/%d8%a7%d9%84%d8%b1%d8%a6%d9%8a%d8%b3%d9%8a%d8%a9/": "/",
  "/%d8%a7%d8%b1%d8%a7%d8%a1-%d8%b9%d9%85%d9%84%d8%a7%d8%a6%d9%86%d8%a7/": "/testimonials",
  "/%d9%81%d9%8a%d8%af%d9%8a%d9%88%d9%87%d8%a7%d8%aa/": "/videos",
  "/%d9%82%d8%a8%d9%84-%d9%88%d8%a8%d8%b9%d8%af/": "/gallery",
  "/%d9%85%d9%82%d8%a7%d9%84%d8%a7%d8%aa-%d8%b7%d8%a8%d9%8a%d8%a9/": "/blog",
};

function rewriteUrls(html) {
  let out = html
    .replaceAll(BASE, "")
    .replaceAll(/https:\/\/dressamelshabshiry\.com/g, "")
    .replace(/href="\/feed\/"/g, 'href="#"')
    .replace(/href="\/comments\/feed\/"/g, 'href="#"')
    .replace(/\/wp-content\/uploads\//g, "/assets/uploads/")
    .replace(/\/wp-content\/themes\/zero\//g, "/assets/theme/zero/");

  for (const [from, to] of Object.entries(ROUTE_MAP)) {
    out = out.replaceAll(`href="${from}"`, `href="${to}"`);
    out = out.replaceAll(`href='${from}'`, `href='${to}'`);
  }
  return out;
}

function collectImageUrls(html) {
  const urls = new Set();
  const re = /https:\/\/dressamelshabshiry\.com\/wp-content\/uploads\/[^"'\s)>]+/g;
  let m;
  while ((m = re.exec(html))) urls.add(m[0].split("?")[0]);
  const re2 = /\/wp-content\/uploads\/[^"'\s)>]+/g;
  while ((m = re2.exec(html))) urls.add(BASE + m[0].split("?")[0]);
  return [...urls];
}

async function fetchBlogPosts() {
  const buf = await fetchUrl(`${BASE}/wp-json/wp/v2/posts?per_page=50&_embed`);
  return JSON.parse(buf.toString("utf8"));
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugFromLink(link) {
  try {
    const u = new URL(link);
    return decodeURIComponent(u.pathname.replace(/^\/|\/$/g, ""));
  } catch {
    return link;
  }
}

async function main() {
  console.log("Creating directories…");
  ensureDir(path.join(PUBLIC, "assets/css"));
  ensureDir(path.join(PUBLIC, "assets/js"));
  ensureDir(path.join(PUBLIC, "assets/images"));
  ensureDir(path.join(PUBLIC, "assets/uploads"));
  ensureDir(path.join(PUBLIC, "content"));
  ensureDir(DATA);

  console.log("\nDownloading theme assets…");
  await downloadFile(
    "https://dressamelshabshiry.com/wp-includes/js/jquery/jquery.min.js",
    path.join(PUBLIC, "assets/js/jquery.min.js")
  );
  for (const asset of THEME_ASSETS) {
    const local = asset.replace("/wp-content/themes/zero/", "/assets/theme/zero/");
    await downloadFile(BASE + asset, path.join(PUBLIC, local.replace(/^\//, "")));
  }

  await downloadFile(
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css",
    path.join(PUBLIC, "assets/css/font-awesome.min.css")
  );

  console.log("\nProcessing scraped pages…");
  let headerHtml = "";
  let footerHtml = "";
  const pageContents = {};
  const allImages = new Set();

  for (const page of PAGE_SOURCES) {
    const filePath = path.join(ROOT, page.file);
    if (!fs.existsSync(filePath)) {
      console.warn("Missing scrape file:", page.file);
      continue;
    }
    const html = fs.readFileSync(filePath, "utf8");
    if (!headerHtml) headerHtml = rewriteUrls(extractHeader(html));
    if (!footerHtml) footerHtml = rewriteUrls(extractFooter(html));

    const styles = extractStyles(html);
    const content = rewriteUrls(extractMainContent(html));
    pageContents[page.key] = { route: page.route, content };

    fs.writeFileSync(path.join(PUBLIC, "assets/css", `${page.key}.css`), styles, "utf8");
    fs.writeFileSync(path.join(PUBLIC, "content", `${page.key}.html`), content, "utf8");
    collectImageUrls(html).forEach((u) => allImages.add(u));
    console.log(`  ${page.key}: ${content.length} chars, ${styles.length} css`);
  }

  fs.writeFileSync(path.join(PUBLIC, "content", "header.html"), headerHtml, "utf8");
  fs.writeFileSync(path.join(PUBLIC, "content", "footer.html"), footerHtml, "utf8");
  collectImageUrls(headerHtml + footerHtml).forEach((u) => allImages.add(u));

  console.log("\nFetching blog posts…");
  const posts = await fetchBlogPosts();
  const blogPosts = [];

  for (const post of posts) {
    const slug = slugFromLink(post.link);
    const title = stripHtml(post.title?.rendered || "");
    const excerpt = stripHtml(post.excerpt?.rendered || "").slice(0, 280);
    const date = post.date?.slice(0, 10) || "";
    let contentHtml = post.content?.rendered || "";
    let detailStyles = "";

    try {
      const detailBuf = await fetchUrl(post.link);
      const detailHtml = detailBuf.toString("utf8");
      detailStyles = extractStyles(detailHtml);
      contentHtml = rewriteUrls(extractMainContent(detailHtml) || contentHtml);
      collectImageUrls(detailHtml).forEach((u) => allImages.add(u));
      fs.writeFileSync(path.join(PUBLIC, "assets/css", `blog-${slug.slice(0, 40)}.css`), detailStyles, "utf8");
      fs.writeFileSync(path.join(PUBLIC, "content", `blog-${slug}.html`), contentHtml, "utf8");
    } catch (e) {
      contentHtml = rewriteUrls(contentHtml);
      console.warn("  blog detail fetch failed:", slug, e.message);
    }

    const featured =
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      `/assets/images/blog-placeholder.jpg`;

    blogPosts.push({
      slug,
      titleAr: title,
      titleEn: title,
      excerptAr: excerpt,
      excerptEn: excerpt,
      date,
      image: featured.replace(BASE, ""),
      cssFile: `/assets/css/blog-${slug.slice(0, 40)}.css`,
      contentFile: `/content/blog-${slug}.html`,
    });
    console.log("  blog:", slug);
  }

  console.log(`\nDownloading ${allImages.size} images…`);
  for (const url of allImages) {
    const rel = url.replace(BASE, "").replace(/^\/wp-content\/uploads\//, "");
    await downloadFile(url, path.join(PUBLIC, "assets/uploads", rel));
  }

  // Logo from header
  await downloadFile(
    `${BASE}/wp-content/uploads/2021/11/cropped-profile-Copy-1.png`,
    path.join(PUBLIC, "assets/images/logo.png")
  );

  const siteJs = `export const siteConfig = {
  nameAr: "د. عصام الشبشيري",
  nameEn: "Dr. Essam ElShibshiry",
  titleAr: "استشاري جراحات تجميل العيون",
  titleEn: "Oculoplastic Surgery Consultant",
  siteUrl: "https://dressamelshabshiry.com",
  phone: "00201117025533",
  phoneDisplay: "00201117025533",
  whatsappHref: "https://wa.me/201117025533",
  facebook: "https://www.facebook.com/dressamelshabshiry",
  instagram: "https://www.instagram.com/essamelshabshiry",
  logo: "/assets/images/logo.png",
  favicon: "/assets/theme/zero/images/favicon1.png",
};

export const siteSeo = {
  titleAr: "دكتور عصام الشبشيري | استشاري جراحات تجميل العيون",
  titleEn: "Dr. Essam ElShibshiry | Oculoplastic Surgeon",
  descriptionAr:
    "اكبر جراح تجميل عيون في مصر والشرق الأوسط. خبرة اكثر من ٢٠ عام في عمليات تجميل وشد الجفون وعلاج جحوظ العين.",
  descriptionEn:
    "Leading oculoplastic surgeon in Egypt and the Middle East with 20+ years of experience.",
};

export const contactLocations = [
  {
    id: "egypt",
    labelAr: "مصر",
    labelEn: "Egypt",
    phones: ["00201117025533"],
  },
  {
    id: "iraq",
    labelAr: "العراق - اربيل",
    labelEn: "Iraq - Erbil",
    phones: ["+9647706238323", "+9647506628485"],
  },
  {
    id: "uae",
    labelAr: "الامارات - دبي",
    labelEn: "UAE - Dubai",
    phones: ["+971501235979", "+971565966964"],
  },
  {
    id: "libya",
    labelAr: "ليبيا – بنغازي",
    labelEn: "Libya - Benghazi",
    phones: ["0925299170", "0915299170", "0614791234", "0614781235"],
  },
];
`;

  const navJs = `export const navigation = [
  { href: "/", labelAr: "الرئيسية", labelEn: "Home" },
  { href: "/testimonials", labelAr: "اراء عملائنا", labelEn: "Testimonials" },
  { href: "/videos", labelAr: "فيديوهات", labelEn: "Videos" },
  { href: "/gallery", labelAr: "قبل وبعد", labelEn: "Before & After" },
  { href: "/blog", labelAr: "مقالات طبية", labelEn: "Medical Articles" },
];

export const uiLabels = {
  readMoreAr: "المزيد",
  readMoreEn: "Read more",
  blogTitleAr: "مقالات طبية",
  blogTitleEn: "Medical Articles",
};
`;

  const servicesJs = `export const services = [
  {
    slug: "eye-tumor-surgery",
    titleAr: "جراحات اورام العيون",
    titleEn: "Eye Tumor Surgery",
    excerptAr: "أجراء عمليات علاج اورام العيون وازالة اورام خلف العين بدقة عالية وامان تام",
    excerptEn: "Eye tumor treatment and removal with high precision and safety",
    image: "/assets/uploads/2021/11/1.jpg",
  },
  {
    slug: "proptosis-treatment",
    titleAr: "علاج وعمليات جحوظ العين",
    titleEn: "Proptosis Treatment",
    excerptAr: "المتخصص الأول في الشرق الأوسط في اجراء عمليات علاج جحوظ العين",
    excerptEn: "Leading Middle East specialist in proptosis surgery",
    image: "/assets/uploads/2021/11/2.jpg",
  },
  {
    slug: "orbital-fracture",
    titleAr: "عمليات كسور محجر العين",
    titleEn: "Orbital Fracture Surgery",
    excerptAr: "من ادق واصعب عمليات تجميل العيون وتتم لدينا بنسبة نجاح 100% وبأمان تام",
    excerptEn: "Precise orbital fracture repair with excellent outcomes",
    image: "/assets/uploads/2021/11/3.jpg",
  },
  {
    slug: "enophthalmos",
    titleAr: "عمليات تجميل العيون الضامرة",
    titleEn: "Enophthalmos Surgery",
    excerptAr: "عمليات دقيقة جدا تتم لدينا بكل امان وبدقة من خلال اصلاح العيون الضامرة",
    excerptEn: "Safe, precise enophthalmos correction",
    image: "/assets/uploads/2021/11/4.jpg",
  },
  {
    slug: "blepharoplasty",
    titleAr: "عمليات شد الجفون",
    titleEn: "Blepharoplasty",
    excerptAr: "اجراء عمليات شد وتجميل الجفون بدون ألم وبدون اثار في دقائق معدودة",
    excerptEn: "Eyelid lift with minimal downtime",
    image: "/assets/uploads/2021/11/5.jpg",
  },
  {
    slug: "ptosis",
    titleAr: "علاج وجراحات ارتخاء الجفون للكبار و الأطفال",
    titleEn: "Ptosis Surgery",
    excerptAr: "اجراء جراحات تعديل ارتخاء الجفون واصلاحها في دقائق معدودة",
    excerptEn: "Ptosis repair for adults and children",
    image: "/assets/uploads/2021/11/6.jpg",
  },
  {
    slug: "lacrimal-duct",
    titleAr: "عمليات القنوات الدمعية للكبار و الأطفال",
    titleEn: "Lacrimal Duct Surgery",
    excerptAr: "عمليات علاج انسداد القنوات الدمعية للكبار والصغار بتقنية عالية ودقيقة",
    excerptEn: "Lacrimal duct obstruction treatment for all ages",
    image: "/assets/uploads/2021/11/7.jpg",
  },
];

export const hero = {
  nameLine1Ar: "الدكتور",
  nameLine2Ar: "عصام الشبشيري",
  subtitleAr: "استشاري جراحات تجميل العيون",
  taglineAr: "اكبر جراح تجميل عيون في مصر والشرق الأوسط",
  bodyAr:
    "خبرة اكثر من ٢٠ عام في عمليات تجميل وشد الجفون و عمليات علاج جحوظ العين والجهاز الدمعي",
  footerAr: "قام باجراء الالاف من العمليات بنسبة نجاح 100 % في الوطن العربي",
};
`;

  const pagesJs =
    "export const staticPages = " +
    JSON.stringify(
      PAGE_SOURCES.map((p) => ({
        key: p.key,
        route: p.route,
        cssFile: `/assets/css/${p.key}.css`,
        contentFile: `/content/${p.key}.html`,
      })),
      null,
      2
    ) +
    ";\n";

  fs.writeFileSync(path.join(DATA, "site.js"), siteJs, "utf8");
  fs.writeFileSync(path.join(DATA, "navigation.js"), navJs, "utf8");
  fs.writeFileSync(path.join(DATA, "services.js"), servicesJs, "utf8");
  fs.writeFileSync(path.join(DATA, "pages.js"), pagesJs, "utf8");
  fs.writeFileSync(
    path.join(DATA, "blog.js"),
    `export const blogPosts = ${JSON.stringify(blogPosts, null, 2)};\n`,
    "utf8"
  );

  console.log("\nDone. Data files written.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
