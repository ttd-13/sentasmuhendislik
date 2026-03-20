'use client';

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="tr">
      <body>
        <div className="min-h-screen flex items-center justify-center px-6 bg-white">
          <div className="max-w-xl text-center">
            <h2 className="text-2xl font-semibold text-navy-900 mb-3">Kritik bir hata oluştu</h2>
            <p className="text-navy-700 mb-6">
              Sayfa yüklenirken bir sorun oluştu. Yeniden denemek için aşağıdaki butonu kullanın.
            </p>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-[#0089b6] text-white hover:bg-[#00769d] transition-colors"
            >
              Yeniden dene
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
