export const routeKeys = ['home', 'about', 'services', 'howWeWork', 'contact'] as const;
export type RouteKey = (typeof routeKeys)[number];
import type { Locale } from '@/lib/routing';

const localizedSlugs: Record<RouteKey, Record<Locale, string>> = {
  home: { tr: '', en: '' },
  about: { tr: 'hakkimizda', en: 'about' },
  services: { tr: 'hizmetler', en: 'services' },
  howWeWork: { tr: 'nasil-calisiriz', en: 'how-we-work' },
  contact: { tr: 'iletisim', en: 'contact' }
};

function trimSlashes(value: string): string {
  return value.replace(/^\/+|\/+$/g, '');
}

export function getRouteKeyFromPath(locale: Locale, slug: string): RouteKey | null {
  const normalizedSlug = trimSlashes(slug);
  for (const key of routeKeys) {
    if (localizedSlugs[key][locale] === normalizedSlug) return key;
  }
  return null;
}

export function getLocalizedPath(routeKey: RouteKey, locale: Locale): string {
  const localizedSlug = localizedSlugs[routeKey][locale];
  return localizedSlug ? `/${locale}/${localizedSlug}` : `/${locale}`;
}

export function getRouteKeyFromPathname(pathname: string): { locale: Locale; routeKey: RouteKey } | null {
  const parts = trimSlashes(pathname).split('/').filter(Boolean);
  const locale = parts[0];
  if (locale !== 'tr' && locale !== 'en') return null;
  const slug = parts.slice(1).join('/');
  const routeKey = getRouteKeyFromPath(locale, slug);
  if (!routeKey) return null;
  return { locale, routeKey };
}
