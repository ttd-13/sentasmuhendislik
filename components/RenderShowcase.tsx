'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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
    <div className="flex flex-col h-[360px] rounded-md overflow-hidden border border-[#e3e9ee] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
      <div className="relative h-[304px]">
        {item.image ? (
          <Image src={item.image} alt="" fill className="object-cover object-[center_40%]" quality={100} />
        ) : (
          <div className="w-full h-full bg-navy-50 flex items-center justify-center text-navy-400 text-sm">
            Görsel
          </div>
        )}
      </div>
      <div className="min-h-[56px] flex items-center justify-center px-4 text-center shrink-0 border-t border-[#e8edf2]">
        <p className="text-sm text-navy-700">{item.caption}</p>
      </div>
    </div>
  );
}

const GAP_PX = 16;

/**
 * lg: ~max-w-6xl iç alanında 3 tam kart + 4. için hafif peek (≈100px)
 * md: 2 kart + peek; mobil: tek sütun genişliği
 */
const cardWidthClass =
  'shrink-0 w-[min(268px,calc(100vw-2.75rem))] sm:w-[284px] md:w-[296px] lg:w-[318px]';

export default function RenderShowcase({ items }: RenderShowcaseProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('home.renders');
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      ro.disconnect();
    };
  }, [updateArrows, items.length]);

  const scrollStep = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    const card = el?.querySelector('[data-ccard]') as HTMLElement | null;
    const step = card ? card.offsetWidth + GAP_PX : 320;
    el?.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  if (items.length === 0) {
    return null;
  }

  const arrowClass =
    'absolute top-[calc(50%-1.125rem)] z-10 hidden h-9 w-9 items-center justify-center rounded-full border border-navy-200/90 bg-white text-navy-800 shadow-[0_1px_3px_rgba(42,41,42,0.08)] transition-colors hover:border-navy-300 hover:bg-[#fafbfc] md:flex';

  return (
    <div className="relative max-w-6xl mx-auto md:px-11">
      <button
        type="button"
        aria-label={t('prev')}
        onClick={() => scrollStep(-1)}
        disabled={!canPrev}
        className={`${arrowClass} left-0 disabled:pointer-events-none disabled:opacity-30`}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        aria-label={t('next')}
        onClick={() => scrollStep(1)}
        disabled={!canNext}
        className={`${arrowClass} right-0 disabled:pointer-events-none disabled:opacity-30`}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div
        ref={scrollerRef}
        className="w-full overflow-x-auto overflow-y-hidden scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x"
      >
        <div className="flex w-max gap-4 pr-1">
          {items.map((item, i) => (
            <div key={i} data-ccard className={cardWidthClass}>
              <RenderCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
