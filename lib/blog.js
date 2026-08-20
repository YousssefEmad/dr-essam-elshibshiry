const AR_MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

/** Normalize dynamic route slug (Next may pass percent-encoded Arabic). */
export function normalizeBlogSlug(slug) {
  if (!slug || typeof slug !== "string") return "";
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug.replace(/\+/g, " "));
  } catch {
    decoded = slug;
  }
  return decoded.normalize("NFC").trim();
}

export function formatBlogDate(dateStr) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  const month = AR_MONTHS[parseInt(m, 10) - 1] || m;
  return `${month} ${parseInt(d, 10)}, ${y}`;
}

export function cleanExcerpt(text, max = 220) {
  if (!text) return "";
  const plain = text
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "…")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= max) return plain;
  return `${plain.slice(0, max).trim()}…`;
}

/** Extract article body HTML from imported Nicepage post file */
export function extractPostContentHtml(html) {
  if (!html) return "";
  const match = html.match(
    /class="[^"]*u-post-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<!--\/blog_post_content-->/
  );
  return match ? match[1].trim() : "";
}
