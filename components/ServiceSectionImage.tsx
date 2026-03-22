'use client';

import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';

type Props = {
  /** Önce birincil, sonra fallback sırasıyla denenir */
  sources: readonly string[];
  imageClassName?: string;
};

export default function ServiceSectionImage({ sources, imageClassName }: Props) {
  const unique = useMemo(() => [...new Set(sources.filter(Boolean))], [sources]);
  const [index, setIndex] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  const currentSrc = unique[index];

  const onError = useCallback(() => {
    setIndex((i) => {
      if (i < unique.length - 1) return i + 1;
      setAllFailed(true);
      return i;
    });
  }, [unique.length]);

  const shellClass =
    'relative w-full aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-100 via-slate-50 to-cyan-50/40 shadow-sm';

  const imgClass = ['h-full w-full object-cover object-center', imageClassName].filter(Boolean).join(' ');

  if (allFailed || unique.length === 0 || !currentSrc) {
    return (
      <div className={shellClass} aria-hidden>
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,137,182,0.14),transparent_52%),radial-gradient(ellipse_at_72%_78%,rgba(15,23,42,0.07),transparent_48%)]" />
      </div>
    );
  }

  return (
    <div className={shellClass}>
      <Image
        key={currentSrc}
        src={currentSrc}
        alt=""
        fill
        sizes="(max-width: 896px) 100vw, 896px"
        className={imgClass}
        onError={onError}
        quality={90}
      />
    </div>
  );
}
