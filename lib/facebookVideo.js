/**
 * Facebook plugin embeds only work with canonical /reel/ or /videos/ URLs.
 */
export function normalizeFacebookUrl(url = "") {
  const cleaned = String(url || "").trim();
  if (!cleaned) return "";
  try {
    const parsed = new URL(cleaned);
    parsed.search = "";
    parsed.hash = "";
    let href = parsed.toString();
    if (!href.endsWith("/")) href += "/";
    return href;
  } catch (_) {
    return cleaned.split("?")[0];
  }
}

export function isFacebookUrl(url = "") {
  return /facebook\.com/i.test(String(url));
}

export function getFacebookReelEmbedSrc(url = "") {
  const canonical = normalizeFacebookUrl(url);
  if (!canonical || !isFacebookUrl(canonical)) return "";
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    canonical
  )}&show_text=false&width=267&height=476&t=0`;
}
