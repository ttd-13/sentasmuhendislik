'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    if (!mounted) return;
    const currentPath = pathname.replace(`/${locale}`, '');
    const newPath = `/${newLocale}${currentPath || ''}`;
    window.location.href = newPath;
  };

  const navItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'services', href: locale === 'tr' ? `/${locale}/hizmetler` : `/${locale}/services` },
    { key: 'howWeWork', href: locale === 'tr' ? `/${locale}/nasil-calisiriz` : `/${locale}/how-we-work` },
    { key: 'about', href: locale === 'tr' ? `/${locale}/hakkimizda` : `/${locale}/about` },
    { key: 'contact', href: locale === 'tr' ? `/${locale}/iletisim` : `/${locale}/contact` },
  ];

  return (
    <header className={`sticky top-0 z-50 border-b border-navy-800 ${scrolled ? 'bg-navy-800/95 shadow-md' : 'bg-navy-800'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <img src="/sentas-logo.png" alt="SENTAS Mühendislik Logo" className="h-12 md:h-14 w-auto object-contain" />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm font-medium text-white hover:text-cyan-400 transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => switchLocale('tr')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                locale === 'tr'
                  ? 'bg-white text-navy-800'
                  : 'text-white hover:bg-navy-700/60'
              }`}
            >
              TR
            </button>
            <button
              onClick={() => switchLocale('en')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                locale === 'en'
                  ? 'bg-white text-navy-800'
                  : 'text-white hover:bg-navy-700/60'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <nav className="md:hidden border-t border-navy-800 bg-navy-800">
        <div className="container mx-auto px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="block py-2 text-sm font-medium text-white hover:text-cyan-400 transition-colors"
            >
              {t(item.key)}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
