'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface RenderItem {
  image: string | null;
  caption: string;
}

interface RenderShowcaseProps {
  items: RenderItem[];
}

function RenderCard({ item }: { item: RenderItem }) {
  return (
    <div className="flex flex-col h-[360px] rounded-md overflow-hidden border border-navy-200 bg-white shadow-sm">
      <div className="flex-1 min-h-0 relative">
        {item.image ? (
          <Image src={item.image} alt="" fill className="object-contain" quality={100} />
        ) : (
          <div className="w-full h-full bg-navy-50 flex items-center justify-center text-navy-400 text-sm">
            Görsel
          </div>
        )}
      </div>
      <div className="min-h-[56px] flex items-center justify-center px-4 text-center shrink-0 border-t border-navy-200">
        <p className="text-sm text-navy-900">{item.caption}</p>
      </div>
    </div>
  );
}

export default function RenderShowcase({ items }: RenderShowcaseProps) {
  const [visibleCount, setVisibleCount] = useState(3);
  const t = useTranslations('home.renders');

  const displayed = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;
  const canCollapse = visibleCount > 3;
  const showPreviewRow = visibleCount === 3 && items.length >= 6;
  const previewItems = showPreviewRow ? items.slice(3, 6) : [];

  const loadMore = () => setVisibleCount((n) => Math.min(n + 3, items.length));
  const collapse = () => setVisibleCount(3);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayed.map((item, i) => (
          <RenderCard key={i} item={item} />
        ))}
      </div>

      {showPreviewRow && previewItems.length > 0 && (
        <div className="relative overflow-hidden max-h-[72px] mt-6" aria-hidden>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-40 pointer-events-none">
            {previewItems.map((item, i) => (
              <RenderCard key={`preview-${i}`} item={item} />
            ))}
          </div>
          <div
            className="absolute inset-x-0 bottom-0 h-12 pointer-events-none bg-gradient-to-t from-navy-50 to-transparent"
            aria-hidden
          />
        </div>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {hasMore && (
          <button
            type="button"
            onClick={loadMore}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md bg-cyan-500 text-white hover:bg-cyan-400 transition-colors"
          >
            {t('loadMore')}
          </button>
        )}
        {canCollapse && (
          <button
            type="button"
            onClick={collapse}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md bg-white text-navy-900 border border-navy-200 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
          >
            {t('collapse')}
          </button>
        )}
      </div>
    </div>
  );
}
