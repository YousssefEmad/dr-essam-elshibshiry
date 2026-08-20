export default function HtmlBlock({ html, className = "" }) {
  if (!html) return null;
  return (
    <div className={className} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />
  );
}
