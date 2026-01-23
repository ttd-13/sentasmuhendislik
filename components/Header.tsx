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

  useEffect(() => {
    setMounted(true);
  }, []);

  const switchLocale = (newLocale: string) => {
    if (!mounted) return;
    const currentPath = pathname.replace(`/${locale}`, '');
    const newPath = `/${newLocale}${currentPath || ''}`;
    window.location.href = newPath;
  };

  const navItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'services', href: `/${locale}/services` },
    { key: 'howWeWork', href: `/${locale}/how-we-work` },
    { key: 'about', href: `/${locale}/about` },
    { key: 'contact', href: `/${locale}/contact` },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-navy-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-navy-900">
              SENTAS
            </div>
            <div className="hidden sm:block text-sm text-navy-600">
              Mühendislik
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm font-medium text-navy-700 hover:text-cyan-600 transition-colors"
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
                  ? 'bg-navy-900 text-white'
                  : 'text-navy-700 hover:bg-navy-50'
              }`}
            >
              TR
            </button>
            <button
              onClick={() => switchLocale('en')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                locale === 'en'
                  ? 'bg-navy-900 text-white'
                  : 'text-navy-700 hover:bg-navy-50'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <nav className="md:hidden border-t border-navy-200 bg-white">
        <div className="container mx-auto px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="block py-2 text-sm font-medium text-navy-700 hover:text-cyan-600 transition-colors"
            >
              {t(item.key)}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
