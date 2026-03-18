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

  const baseClasses = "inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md transition-colors";
  const primaryClasses = "bg-cyan-500 text-white hover:bg-cyan-400";
  const secondaryClasses = "bg-white text-navy-900 border border-navy-200 hover:border-cyan-400 hover:text-cyan-400";

  return (
    <Link
      href={fullHref}
      className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses}`}
    >
      {children}
    </Link>
  );
}
