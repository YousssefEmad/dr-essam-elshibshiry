import Link from "next/link";

export default function NotFound() {
  return (
    <section className="u-align-center u-clearfix u-section-1" style={{ padding: "80px 20px" }}>
      <h1>الصفحة غير موجودة</h1>
      <p style={{ marginTop: 16 }}>
        <Link href="/">العودة للرئيسية</Link>
      </p>
    </section>
  );
}
