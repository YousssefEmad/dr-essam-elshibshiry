import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "public/content/blog.html"), "utf8");
const blogPath = path.join(root, "data/blog.js");
const blogModule = await import(pathToFileURL(blogPath).href);
const posts = structuredClone(blogModule.blogPosts);

const re = /u-post-content u-text u-text-\d+"><p>\s*([\s\S]*?)<\/p>/g;
const excerpts = [];
let m;
while ((m = re.exec(html))) {
  excerpts.push(m[1].replace(/&hellip;/g, "…").replace(/\s+/g, " ").trim());
}

posts.forEach((p, i) => {
  p.listExcerpt = excerpts[i] || p.excerptAr;
  p.dateDisplay = "نوفمبر 29, 2021";
});

fs.writeFileSync(blogPath, `export const blogPosts = ${JSON.stringify(posts, null, 2)};\n`, "utf8");
console.log("patched", posts.length, "posts");
