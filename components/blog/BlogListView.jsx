"use client";

import Link from "next/link";
import { cleanExcerpt, formatBlogDate } from "@/lib/blog";

export default function BlogListView({ posts }) {
  return (
    <section className="u-clearfix u-section-2 essam-blog-grid" id="sec-fd13">
      <div className="u-clearfix u-sheet u-sheet-1">
        <div className="u-blog u-container-style u-expanded-width u-blog-1">
          <div className="u-repeater u-repeater-1">
            {posts.map((post, index) => {
              const n = index + 1;
              const itemClass = n <= 6 ? `u-repeater-item-${n}` : "u-repeater-item-extra";
              const layoutClass = n <= 6 ? `u-container-layout-${n}` : "u-container-layout-extra";
              const textTitleClass = n <= 6 ? (n === 1 ? "u-text-1" : `u-text-${n * 2 - 1}`) : "u-text-title";
              const textBodyClass = n <= 6 ? (n === 1 ? "u-text-2" : `u-text-${n * 2}`) : "u-text-body";
              const metaClass = n <= 6 ? `u-metadata-${n}` : "u-metadata-extra";
              const btnClass = n <= 6 ? `u-btn-${n}` : "u-btn-extra";
              const href = `/blog/${post.slug}`;
              const excerpt = post.listExcerpt || cleanExcerpt(post.excerptAr);
              const dateLabel = post.dateDisplay || formatBlogDate(post.date);

              return (
                <div
                  key={post.slug}
                  className={`u-align-left-xs u-blog-post u-container-style u-repeater-item u-white ${itemClass}`}
                >
                  <div className={`u-container-layout u-similar-container ${layoutClass}`}>
                    <div className="none-post-image" style={{ display: "none" }} />
                    <h4 className={`u-align-left-lg u-align-left-md u-align-left-sm u-align-left-xl u-blog-control u-text ${textTitleClass}`}>
                      <Link className="u-post-header-link" href={href}>
                        {post.titleAr}
                      </Link>
                    </h4>
                    <div className={`u-blog-control u-metadata u-text-grey-40 ${metaClass}`}>
                      <span className="u-meta-date u-meta-icon">{dateLabel}</span>
                      <span className="u-meta-comments u-meta-icon">Comments (0)</span>
                    </div>
                    <div className={`u-align-left-lg u-align-left-md u-align-left-sm u-align-left-xl u-blog-control u-post-content u-text ${textBodyClass}`}>
                      <p>{excerpt}</p>
                    </div>
                    <Link href={href} className={`u-blog-control u-btn u-button-style ${btnClass}`}>
                      المزيد
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
