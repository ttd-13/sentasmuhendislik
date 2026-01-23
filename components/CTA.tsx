'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

interface CTAProps {
  primary?: boolean;
  href: string;
  children: React.ReactNode;
}

export default function CTA({ primary = false, href, children }: CTAProps) {
  const locale = useLocale();
  const fullHref = href.startsWith('/') ? `/${locale}${href}` : href;

  const baseClasses = "inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg transition-colors";
  const primaryClasses = "bg-cyan-600 text-white hover:bg-cyan-700";
  const secondaryClasses = "bg-white text-navy-900 border-2 border-navy-300 hover:border-cyan-600 hover:text-cyan-600";

  return (
    <Link
      href={fullHref}
      className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses}`}
    >
      {children}
    </Link>
  );
}
