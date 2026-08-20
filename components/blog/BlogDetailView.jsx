import Link from "next/link";
import { formatBlogDate } from "@/lib/blog";

export default function BlogDetailView({ post, contentHtml }) {
  const dateLabel = post.dateDisplay || formatBlogDate(post.date);

  return (
    <div className="u-page-root essam-blog-detail">
      <section className="u-align-center u-clearfix u-section-1 u-blog-detail" id="sec-72a7">
        <div className="u-clearfix u-sheet u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-sheet-1">
          <div className="u-container-style u-expanded-width u-post-details u-post-details-1">
            <div className="u-container-layout u-container-layout-1">
              <h2 className="u-blog-control u-text u-text-1">{post.titleAr}</h2>
              <div className="none-post-image" style={{ display: "none" }} />
              <div className="u-blog-control u-metadata u-text-grey-30 u-metadata-1">
                <span className="u-meta-date u-meta-icon">{dateLabel}</span>
                <span className="u-meta-sep" aria-hidden="true">
                  |
                </span>
                <span className="u-meta-category u-meta-icon">Uncategorized</span>
                <span className="u-meta-sep" aria-hidden="true">
                  |
                </span>
                <span className="u-meta-comments u-meta-icon">
                  <Link className="u-textlink" href="#comments">
                    Comments (0)
                  </Link>
                </span>
              </div>
              <div
                className="u-align-justify u-blog-control u-post-content u-text u-text-2"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="u-align-center u-clearfix u-section-1 u-blog-comments essam-blog-comments" id="comments">
        <div className="u-clearfix u-sheet u-sheet-1">
          <div id="comments" className="comments-area">
            <div id="respond" className="comment-respond">
              <h3 id="reply-title" className="comment-reply-title">
                اترك تعليقاً
              </h3>
              <form id="commentform" className="comment-form essam-comment-form" action="#" method="post">
                <p className="comment-notes">
                  <span id="email-notes">لن يتم نشر عنوان بريدك الإلكتروني.</span>{" "}
                  <span className="required-field-message">
                    الحقول الإلزامية مشار إليها بـ <span className="required">*</span>
                  </span>
                </p>
                <p className="comment-form-comment">
                  <label htmlFor="comment">
                    التعليق <span className="required">*</span>
                  </label>
                  <textarea id="comment" name="comment" cols={45} rows={8} maxLength={65525} required />
                </p>
                <p className="comment-form-author">
                  <label htmlFor="author">
                    الاسم <span className="required">*</span>
                  </label>
                  <input id="author" name="author" type="text" autoComplete="name" required />
                </p>
                <p className="comment-form-email">
                  <label htmlFor="email">
                    البريد الإلكتروني <span className="required">*</span>
                  </label>
                  <input id="email" name="email" type="email" autoComplete="email" required />
                </p>
                <p className="comment-form-url">
                  <label htmlFor="url">الموقع الإلكتروني</label>
                  <input id="url" name="url" type="url" autoComplete="url" />
                </p>
                <p className="comment-form-cookies-consent">
                  <input id="wp-comment-cookies-consent" name="wp-comment-cookies-consent" type="checkbox" value="yes" />
                  <label htmlFor="wp-comment-cookies-consent">
                    احفظ اسمي، بريدي الإلكتروني، والموقع الإلكتروني في هذا المتصفح لاستخدامها المرة المقبلة في
                    تعليقي.
                  </label>
                </p>
                <p className="form-submit">
                  <button name="submit" type="submit" id="submit" className="u-btn">
                    إرسال التعليق
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
