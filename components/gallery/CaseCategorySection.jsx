"use client";

import { useState } from "react";

export default function CaseCategorySection({ category }) {
  const [active, setActive] = useState(0);
  const images = category.images || [];
  if (!images.length) return null;

  const carouselId = `carousel-case-${category.id}`;
  const go = (dir) => {
    setActive((i) => {
      const next = i + dir;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  };

  return (
    <section className="u-align-center u-clearfix u-white essam-case-section" id={`case-${category.id}`}>
      <div className="u-clearfix u-sheet essam-case-section__sheet">
        <h2 className="essam-case-section__title">{category.titleAr}</h2>
        <div className="essam-case-section__line" aria-hidden="true" />

        <div className="essam-case-gallery" id={carouselId}>
          <div className="essam-case-gallery__main">
            <button
              type="button"
              className="essam-case-gallery__nav essam-case-gallery__nav--prev"
              onClick={() => go(-1)}
              aria-label="السابق"
            >
              ‹
            </button>
            <img
              key={images[active]}
              src={images[active]}
              alt={`${category.titleAr} — حالة ${active + 1}`}
              className="essam-case-gallery__image"
              loading="lazy"
            />
            <button
              type="button"
              className="essam-case-gallery__nav essam-case-gallery__nav--next"
              onClick={() => go(1)}
              aria-label="التالي"
            >
              ›
            </button>
          </div>

          <div className="essam-case-gallery__thumbs" role="tablist" aria-label={category.titleAr}>
            {images.map((src, index) => (
              <button
                key={src}
                type="button"
                role="tab"
                aria-selected={index === active}
                className={
                  index === active
                    ? "essam-case-gallery__thumb essam-case-gallery__thumb--active"
                    : "essam-case-gallery__thumb"
                }
                onClick={() => setActive(index)}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
