"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site";

function IconYoutube() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1 31.5 31.5 0 0 0 .5-5.8 31.5 31.5 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12 9.6 15.6z"
      />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6zm9.7 1.5a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
      />
    </svg>
  );
}

function IconWhatsapp() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M17.5 14.4c-.3-.1-1.6-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 .9-.2 0-.5 0-1.6-.6-1.5-.8-2.5-2.3-2.8-2.7-.1-.2 0-.4.1-.5.1-.1.3-.3.4-.5.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-1-2.3-.3-.6-.6-.5-.7-.5h-.6c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 1.9 2.9 4.6 4.1.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.7 14.9L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2A8.2 8.2 0 1 1 20.2 12 8.2 8.2 0 0 1 12 20.2z"
      />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.2-1.5 1.5-1.5H17V4.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H8v3h2.3v8h3.2z"
      />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

const ICONS = {
  youtube: IconYoutube,
  instagram: IconInstagram,
  whatsapp: IconWhatsapp,
  facebook: IconFacebook,
};

const SOCIAL_LINKS = [
  { id: "youtube", label: "YouTube", href: siteConfig.youtube, variant: "filled" },
  { id: "instagram", label: "Instagram", href: siteConfig.instagram, variant: "filled" },
  { id: "whatsapp", label: "WhatsApp", href: siteConfig.whatsappHref, variant: "filled" },
  { id: "facebook", label: "Facebook", href: siteConfig.facebook, variant: "outline" },
];

export default function FloatingSocial() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`essam-floating-social${open ? " is-open" : ""}`} dir="ltr">
      <div className="essam-floating-social__stack" aria-hidden={!open}>
        {SOCIAL_LINKS.map((item) => {
          const Icon = ICONS[item.id];
          return (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`essam-floating-social__link essam-floating-social__link--${item.variant}`}
              aria-label={item.label}
              title={item.label}
            >
              <Icon />
            </a>
          );
        })}
      </div>

      <div className="essam-floating-social__main">
        {!open ? <span className="essam-floating-social__label">تواصل معنا</span> : null}
        <button
          type="button"
          className="essam-floating-social__toggle"
          aria-expanded={open}
          aria-label={open ? "إغلاق روابط التواصل" : "فتح روابط التواصل"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconPlus />}
        </button>
      </div>
    </div>
  );
}
