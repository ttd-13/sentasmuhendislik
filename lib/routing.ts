import { defineRouting } from 'next-intl/routing';

/**
 * Tek kaynak: next-intl middleware + locale doğrulama (i18n request, layout).
 * Sayfa slug eşlemeleri için bkz. lib/localizedRoutes.ts
 */
export const routing = defineRouting({
  locales: ['tr', 'en'] as const,
  defaultLocale: 'tr',
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];

export const locales = routing.locales;

export const defaultLocale: Locale = routing.defaultLocale;
