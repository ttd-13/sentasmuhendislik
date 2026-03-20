import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <h2 className="text-2xl font-semibold text-navy-900 mb-3">Sayfa bulunamadı</h2>
        <p className="text-navy-700 mb-6">
          Aradığınız içerik taşınmış veya kaldırılmış olabilir.
        </p>
        <Link
          href="/tr"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-[#0089b6] text-white hover:bg-[#00769d] transition-colors"
        >
          Ana sayfaya dön
        </Link>
      </div>
    </div>
  );
}
