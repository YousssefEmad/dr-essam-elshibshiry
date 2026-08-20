"use client";

import { useEffect } from "react";

export default function NicepageInit() {
  useEffect(() => {
    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const s = document.createElement("script");
        s.src = src;
        s.async = false;
        s.onload = resolve;
        s.onerror = reject;
        document.body.appendChild(s);
      });

    (async () => {
      try {
        await loadScript("/assets/js/jquery.min.js");
        await loadScript("/assets/theme/zero/js/script.js");
        window.dispatchEvent(new Event("load"));
      } catch (e) {
        console.warn("[nicepage]", e);
      }
    })();
  }, []);

  return null;
}
