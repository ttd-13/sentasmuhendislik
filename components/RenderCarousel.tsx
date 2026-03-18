'use client';

import { useRef, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface RenderItem {
  image: string | null;
  caption: string;
}

interface RenderCarouselProps {
  items: RenderItem[];
}

const VISIBLE = 3;
const CARD_W = 320;
const GAP = 24;
const STEP = CARD_W + GAP;
const CLONES = VISIBLE;

function Card({ item }: { item: RenderItem }) {
  return (
    <div className="flex flex-col h-[360px] rounded-lg overflow-hidden border border-navy-200 bg-navy-50">
      <div className="flex-1 min-h-0">
        {item.image ? (
          <img src={item.image} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-navy-100 flex items-center justify-center text-navy-400 text-sm">
            Görsel
          </div>
        )}
      </div>
      <div className="min-h-[56px] flex items-center justify-center px-4 text-center shrink-0">
        <p className="text-sm text-navy-700">{item.caption}</p>
      </div>
    </div>
  );
}

export default function RenderCarousel({ items: realItems }: RenderCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('home.renders');

  const headClones = realItems.slice(-CLONES);
  const tailClones = realItems.slice(0, CLONES);
  const items = [...headClones, ...realItems, ...tailClones];

  const realStart = CLONES * STEP;
  const realLen = realItems.length * STEP;
  const realEnd = realStart + realLen;
  const threshold = STEP / 2;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = realStart;
  }, [realStart]);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const left = track.scrollLeft;

    if (left < realStart - threshold) {
      track.scrollLeft = left + realLen;
    } else if (left >= realEnd + threshold) {
      track.scrollLeft = left - realLen;
    }
  }, [realStart, realEnd, realLen, threshold]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    const debounced = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };

    track.addEventListener('scroll', debounced, { passive: true });
    return () => {
      track.removeEventListener('scroll', debounced);
      clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  const scrollNext = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const left = el.scrollLeft;
    if (left >= realEnd - threshold) {
      el.scrollLeft = left - realLen;
    }
    el.scrollBy({ left: STEP, behavior: 'smooth' });
  }, [realEnd, realLen, threshold]);

  const scrollPrev = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const left = el.scrollLeft;
    if (left <= realStart + threshold) {
      el.scrollLeft = left + realLen;
    }
    el.scrollBy({ left: -STEP, behavior: 'smooth' });
  }, [realStart, realLen, threshold]);

  return (
    <div className="relative py-4 pl-12 pr-12">
      <button
        type="button"
        onClick={scrollPrev}
        aria-label={t('prev')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-navy-200 text-navy-700 hover:border-cyan-500 hover:text-cyan-600 shadow-sm pointer-events-auto"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth scrollbar-none"
      >
        {items.map((item, i) => (
          <div key={i} className="w-[320px] shrink-0 snap-start">
            <Card item={item} />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={scrollNext}
        aria-label={t('next')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-navy-200 text-navy-700 hover:border-cyan-500 hover:text-cyan-600 shadow-sm pointer-events-auto"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
