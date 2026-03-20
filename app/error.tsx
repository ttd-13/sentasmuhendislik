'use client';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <h2 className="text-2xl font-semibold text-navy-900 mb-3">Bir hata oluştu</h2>
        <p className="text-navy-700 mb-6">
          Beklenmeyen bir sorun oluştu. Lütfen tekrar deneyin.
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-[#0089b6] text-white hover:bg-[#00769d] transition-colors"
        >
          Tekrar dene
        </button>
      </div>
    </div>
  );
}
