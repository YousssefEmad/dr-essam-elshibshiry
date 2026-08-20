import { getFacebookReelEmbedSrc } from "@/lib/facebookVideo";
import { facebookVideos } from "@/data/videos";

export default function FacebookVideosSection() {
  if (!facebookVideos.length) return null;

  return (
    <section className="essam-fb-videos" id="facebook-videos">
      <div className="essam-fb-videos__sheet">
        <h2 className="essam-fb-videos__title">فيديوهات إضافية</h2>
        <div className="essam-fb-videos__line" aria-hidden="true" />

        <div className="essam-fb-videos__grid">
          {facebookVideos.map((video) => {
            const embedSrc = getFacebookReelEmbedSrc(video.url);
            if (!embedSrc) return null;

            return (
              <article key={video.id} className="essam-fb-video-card">
                <div className="essam-fb-video-card__frame">
                  <iframe
                    src={embedSrc}
                    title={video.titleAr}
                    loading="lazy"
                    scrolling="no"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <h3 className="essam-fb-video-card__title">
                  <a href={video.url} target="_blank" rel="noopener noreferrer">
                    {video.titleAr}
                  </a>
                </h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
