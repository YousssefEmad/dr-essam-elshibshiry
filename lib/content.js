import fs from "fs/promises";
import path from "path";

const ROOT = process.cwd();

export async function readPublicText(relativePath) {
  const filePath = path.join(ROOT, "public", relativePath.replace(/^\//, ""));
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return "";
  }
}

export async function getPageContent(contentFile) {
  return readPublicText(contentFile);
}

export async function getHeaderHtml() {
  return readPublicText("/content/header.html");
}

export async function getFooterHtml() {
  return readPublicText("/content/footer.html");
}
