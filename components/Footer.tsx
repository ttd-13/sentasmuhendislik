'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="bg-navy-800 text-navy-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              {t('company')}
            </h3>
            <p className="text-sm text-navy-300">{t('tagline')}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Bağlantılar</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={locale === 'tr' ? `/${locale}/hizmetler` : `/${locale}/services`}
                  className="text-sm text-navy-300 hover:text-cyan-400 transition-colors"
                >
                  {t('links.services')}
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'tr' ? `/${locale}/hakkimizda` : `/${locale}/about`}
                  className="text-sm text-navy-300 hover:text-cyan-400 transition-colors"
                >
                  {t('links.about')}
                </Link>
              </li>
              <li>
                <Link
                  href={locale === 'tr' ? `/${locale}/iletisim` : `/${locale}/contact`}
                  className="text-sm text-navy-300 hover:text-cyan-400 transition-colors"
                >
                  {t('links.contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">İletişim</h4>
            <p className="text-sm text-navy-300">
              sentasmuhendislik.com
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-navy-800 text-center text-sm text-navy-400">
          <p>&copy; {new Date().getFullYear()} {t('company')}. {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}
