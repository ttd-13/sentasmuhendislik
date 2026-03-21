'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { getLocalizedPath, getRouteKeyFromPath, routeKeys } from '@/lib/localizedRoutes';
import type { Locale } from '@/lib/routing';

const SERVICE_IDS = ['enclosure', 'thermal', 'integration', 'prototyping'] as const;

type MegaServiceId = (typeof SERVICE_IDS)[number];

/** Sağ önizleme: logo (varsayılan) veya hizmet kartı */
type MegaPreviewVisualId = 'logo' | MegaServiceId;

const MEGA_PREVIEW_LOGO_SRC = '/SENTAS-logo.png';

/** Gerçek görsel tanımlı önizlemeler (beyaz alan üzerinde; kısa etiket yok) */
const MEGA_PREVIEW_PHOTOS: Partial<Record<MegaServiceId, string>> = {
  enclosure: '/hizmetler-dropdown/mekanik-tasarim.png',
  thermal: '/hizmetler-dropdown/termal-analiz-sogutma.png',
  integration: '/hizmetler-dropdown/mekanik-entegrasyon-3d-kablo.png',
  prototyping: '/hizmetler-dropdown/tasarim-dogrulama-uretime-hazirlik.png',
};

/** Sağ önizleme enter/exit (önceki ~380ms × 3) */
const MEGA_PREVIEW_DURATION_MS = 1140;

const MEGA_PREVIEW_TRANSITION =
  'transition-[transform,opacity] duration-[1140ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none';

function megaPreviewShortLabel(id: MegaServiceId, loc: string) {
  if (id === 'enclosure') return loc === 'tr' ? 'Kasa' : 'Enclosure';
  if (id === 'thermal') return loc === 'tr' ? 'Termal' : 'Thermal';
  if (id === 'integration') return loc === 'tr' ? 'Entegrasyon' : 'Integration';
  return loc === 'tr' ? 'Doğrulama' : 'Validation';
}

function MegaPreviewSlide({
  visualId,
  phase,
  zClass,
  locale,
}: {
  visualId: MegaPreviewVisualId;
  phase: 'idle' | 'enter' | 'exit';
  zClass: string;
  locale: string;
}) {
  const [motionReady, setMotionReady] = useState(phase === 'idle');

  useLayoutEffect(() => {
    if (phase === 'idle') {
      setMotionReady(true);
      return;
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMotionReady(true);
      return;
    }
    setMotionReady(false);
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setMotionReady(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      if (inner) cancelAnimationFrame(inner);
    };
  }, [phase, visualId]);

  /** Yalnızca X + opacity; translate-y-0 ile dikey eksen sabit (flex+transform birleşiminde oluşan kaymayı önler) */
  let motionClass = 'translate-x-0 translate-y-0 opacity-100';
  if (phase === 'enter') {
    motionClass = motionReady
      ? 'translate-x-0 translate-y-0 opacity-100'
      : 'translate-x-2.5 translate-y-0 opacity-0';
  } else if (phase === 'exit') {
    motionClass = motionReady
      ? '-translate-x-2.5 translate-y-0 opacity-0'
      : 'translate-x-0 translate-y-0 opacity-100';
  }

  const isLogo = visualId === 'logo';
  const sid = isLogo ? null : visualId;
  const photoSrc = sid ? MEGA_PREVIEW_PHOTOS[sid] : undefined;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-[#ffffff] ${zClass}`}
    >
      <div
        className={`absolute inset-0 ${MEGA_PREVIEW_TRANSITION} will-change-transform ${motionClass}`}
      >
        <div className="absolute inset-0 min-h-0 leading-none [&_img]:block">
          {isLogo ? (
            <div className="absolute inset-0 flex items-center justify-center leading-none">
              <img
                src={MEGA_PREVIEW_LOGO_SRC}
                alt=""
                className="z-[1] block max-h-[55%] max-w-[72%] object-contain"
              />
            </div>
          ) : photoSrc ? (
            <>
              <img
                src={photoSrc}
                alt=""
                width={800}
                height={600}
                className="absolute inset-0 z-0 block h-full w-full object-cover"
              />
              <div
                className="absolute inset-0 z-[1] bg-gradient-to-br from-black/15 via-transparent to-black/25 pointer-events-none"
                aria-hidden
              />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="relative z-[2] px-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b0b8c0]">
                {sid ? megaPreviewShortLabel(sid, locale) : ''}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** TR “Mekanik Entegrasyon ve 3D …” başlığında satır kırılımı: “3D”den sonra. */
function serviceMegaTitle(id: string, title: string, locale: string): ReactNode {
  if (id === 'integration' && locale === 'tr') {
    const i = title.indexOf('3D');
    if (i !== -1) {
      const before = title.slice(0, i + 2);
      const after = title.slice(i + 2).replace(/^\s+/, '');
      return (
        <>
          {before}
          <br />
          <span className="block">{after}</span>
        </>
      );
    }
  }
  return title;
}

export default function Header() {
  const tNav = useTranslations('nav');
  const tServices = useTranslations('services');
  const locale = useLocale();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [megaPanelEnterReady, setMegaPanelEnterReady] = useState(false);
  /** Menü açıkken son odaklanan/hover edilen hizmet; satırdan çıkınca sıfırlanmaz, yalnızca menü kapanınca temizlenir */
  const [megaStickyServiceId, setMegaStickyServiceId] = useState<MegaServiceId | null>(null);
  const [megaPreviewPair, setMegaPreviewPair] = useState<{
    incoming: MegaPreviewVisualId;
    outgoing: MegaPreviewVisualId | null;
  }>({ incoming: 'logo', outgoing: null });
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const desktopWrapRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const servicesBaseHref = getLocalizedPath('services', locale as Locale);
  const serviceMegaItems = SERVICE_IDS.map((id) => ({
    id,
    href: `${servicesBaseHref}#${id}`,
    title:
      id === 'prototyping'
        ? locale === 'tr'
          ? 'Tasarım Doğrulama ve Üretime Hazırlık'
          : 'Design Validation & Production Readiness'
        : tServices(`${id}.title`),
  }));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openDesktopServices = () => {
    clearCloseTimer();
    setDesktopServicesOpen(true);
  };

  const scheduleCloseDesktopServices = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setDesktopServicesOpen(false);
      closeTimerRef.current = null;
    }, 160);
  };

  const toggleDesktopServices = () => {
    clearCloseTimer();
    setDesktopServicesOpen((v) => !v);
  };

  useEffect(() => {
    setDesktopServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!desktopServicesOpen) {
      setMegaStickyServiceId(null);
    }
  }, [desktopServicesOpen]);

  useLayoutEffect(() => {
    if (!desktopServicesOpen) {
      setMegaPanelEnterReady(false);
      return;
    }
    setMegaPanelEnterReady(false);
    let innerRaf = 0;
    const outerRaf = requestAnimationFrame(() => {
      innerRaf = requestAnimationFrame(() => setMegaPanelEnterReady(true));
    });
    return () => {
      cancelAnimationFrame(outerRaf);
      if (innerRaf) cancelAnimationFrame(innerRaf);
    };
  }, [desktopServicesOpen]);

  useLayoutEffect(() => {
    if (!desktopServicesOpen) {
      setMegaPreviewPair({ incoming: 'logo', outgoing: null });
      return;
    }
    const active: MegaPreviewVisualId = megaStickyServiceId ?? 'logo';
    setMegaPreviewPair((p) => {
      if (p.incoming === active) return p;
      return { incoming: active, outgoing: p.incoming };
    });
  }, [megaStickyServiceId, desktopServicesOpen]);

  useEffect(() => {
    if (!megaPreviewPair.outgoing) return;
    const t = window.setTimeout(() => {
      setMegaPreviewPair((p) => ({ incoming: p.incoming, outgoing: null }));
    }, MEGA_PREVIEW_DURATION_MS);
    return () => window.clearTimeout(t);
  }, [megaPreviewPair.outgoing]);

  useEffect(() => {
    if (!desktopServicesOpen) return;
    const onDocMouseDown = (e: MouseEvent) => {
      if (!desktopWrapRef.current?.contains(e.target as Node)) {
        setDesktopServicesOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDesktopServicesOpen(false);
    };
    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [desktopServicesOpen]);

  useEffect(() => () => clearCloseTimer(), []);

  const switchLocale = (newLocale: string) => {
    if (!mounted) return;
    const targetLocale = newLocale as Locale;
    const currentSlug = pathname.replace(/^\/(tr|en)\/?/, '');
    const routeKey = getRouteKeyFromPath(locale as Locale, currentSlug);

    const localizedPath = routeKey
      ? getLocalizedPath(routeKey, targetLocale)
      : `/${targetLocale}${currentSlug ? `/${currentSlug}` : ''}`;

    const query = window.location.search || '';
    const hash = window.location.hash || '';
    window.location.href = `${localizedPath}${query}${hash}`;
  };

  const navItems = routeKeys.map((key) => ({
    key,
    href: getLocalizedPath(key, locale as Locale),
  }));

  const linkClass =
    'text-sm font-medium text-[#2a292a] hover:text-[#0089b6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0089b6] focus-visible:ring-offset-2 rounded-sm';

  const megaLinkClass =
    'block rounded-md px-3 py-3.5 text-left transition-colors hover:bg-[#f5f9fb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0089b6]';

  /** Masaüstü mega menü satırları: ::before ile soldan sağa dolan #314f6f, metin beyaz */
  const megaServiceRowClass =
    `group relative z-0 block overflow-hidden rounded-md px-3 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0089b6] before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-0 before:block before:w-full before:origin-left before:scale-x-0 before:rounded-md before:bg-[#314f6f] before:transition-transform before:duration-[380ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:before:transition-none hover:before:scale-x-100 focus-visible:before:scale-x-100 before:content-['']`;

  return (
    <header className={`sticky top-0 z-50 border-b border-[#e5e5e5] bg-white ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <img src="/SENTAS-logo.png" alt="SENTAS Mühendislik Logo" className="h-12 md:h-14 w-auto object-contain" />
          </Link>

          <nav
            className="hidden md:flex h-full self-stretch items-center space-x-8"
            aria-label={tNav('mainNav')}
          >
            {navItems.map((item) =>
              item.key === 'services' ? (
                <div
                  key={item.key}
                  ref={desktopWrapRef}
                  className="relative flex min-h-16 h-full items-center self-stretch"
                  onMouseEnter={openDesktopServices}
                  onMouseLeave={scheduleCloseDesktopServices}
                >
                  <button
                    type="button"
                    className={linkClass}
                    aria-expanded={desktopServicesOpen}
                    aria-haspopup="true"
                    aria-controls="nav-services-mega"
                    id="nav-services-trigger"
                    onClick={toggleDesktopServices}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        clearCloseTimer();
                        setDesktopServicesOpen(true);
                        requestAnimationFrame(() => {
                          document.getElementById('nav-services-first')?.focus();
                        });
                        return;
                      }
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (desktopServicesOpen) {
                          setDesktopServicesOpen(false);
                        } else {
                          clearCloseTimer();
                          setDesktopServicesOpen(true);
                          requestAnimationFrame(() => {
                            document.getElementById('nav-services-first')?.focus();
                          });
                        }
                      }
                    }}
                  >
                    {tNav('services')}
                  </button>
                  {desktopServicesOpen ? (
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute left-1/2 top-full z-[55] -translate-x-1/2 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                        megaPanelEnterReady
                          ? '-translate-y-1/2 opacity-100 motion-reduce:opacity-100'
                          : '-translate-y-[calc(50%+10px)] opacity-0 motion-reduce:-translate-y-1/2 motion-reduce:opacity-100'
                      }`}
                    >
                      <div
                        className="h-3 w-3 rotate-45 rounded-[3px] border border-[#e5e5e5]/90 bg-gradient-to-br from-white/95 via-[#fafcfd]/95 to-[#eef2f5]/95 shadow-[0_2px_10px_rgba(42,41,42,0.1),0_0_0_1px_rgba(255,255,255,0.65)_inset] drop-shadow-[0_1px_2px_rgba(42,41,42,0.06)] backdrop-blur-[2px]"
                      />
                    </div>
                  ) : null}
                  <div
                    id="nav-services-mega"
                    role="region"
                    aria-labelledby="nav-services-trigger"
                    className={`absolute left-1/2 top-full z-50 flex w-max max-w-[calc(100vw-2rem)] flex-col items-stretch pb-5 -translate-x-1/2 ${
                      desktopServicesOpen
                        ? 'pointer-events-auto visible'
                        : 'pointer-events-none invisible'
                    }`}
                  >
                    {desktopServicesOpen ? (
                      <>
                        {/*
                          top-full = self-stretch Hizmetler hücresinin altı (= header h-16 alt hattı).
                          Köprü yok: panel üst kenarı navbar alt çizgisiyle hizalı.
                        */}
                        <div
                          className={`flex w-[min(100vw-2rem,42rem)] items-stretch gap-4 rounded-lg border border-[#e5e5e5] bg-white px-6 pb-6 pt-7 shadow-[0_12px_48px_-12px_rgba(42,41,42,0.2)] transition-[transform,opacity] duration-200 ease-out motion-reduce:transition-none ${
                            megaPanelEnterReady
                              ? 'translate-y-0 opacity-100'
                              : '-translate-y-2 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
                          }`}
                        >
                          <div className="min-w-0 flex-1 flex flex-col justify-center py-1 min-h-0">
                            <div className="space-y-1.5">
                              {serviceMegaItems.map((sub, index) => (
                                <Link
                                  key={sub.id}
                                  id={index === 0 ? 'nav-services-first' : undefined}
                                  href={sub.href}
                                  className={megaServiceRowClass}
                                  onMouseEnter={() => setMegaStickyServiceId(sub.id)}
                                  onFocus={() => setMegaStickyServiceId(sub.id)}
                                  onClick={() => setDesktopServicesOpen(false)}
                                >
                                  <span className="relative z-[1] block text-sm font-semibold leading-snug text-[#2a292a] transition-colors duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover:text-white group-focus-visible:text-white">
                                    {serviceMegaTitle(sub.id, sub.title, locale)}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div
                            className="hidden w-[min(19.5rem,46%)] max-w-[21rem] shrink-0 sm:flex sm:items-start"
                            aria-hidden="true"
                          >
                            <div className="relative aspect-[4/3] w-full min-h-0 overflow-hidden rounded-md border border-[#e0e4e8] bg-[#ffffff]">
                              {megaPreviewPair.outgoing ? (
                                <MegaPreviewSlide
                                  key={`mega-out-${megaPreviewPair.outgoing}`}
                                  visualId={megaPreviewPair.outgoing}
                                  phase="exit"
                                  zClass="z-[1]"
                                  locale={locale}
                                />
                              ) : null}
                              <MegaPreviewSlide
                                key={`mega-in-${megaPreviewPair.incoming}`}
                                visualId={megaPreviewPair.incoming}
                                phase={megaPreviewPair.outgoing ? 'enter' : 'idle'}
                                zClass={megaPreviewPair.outgoing ? 'z-[2]' : 'z-[1]'}
                                locale={locale}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              ) : (
                <Link key={item.key} href={item.href} className={linkClass}>
                  {tNav(item.key)}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => switchLocale('tr')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0089b6] focus-visible:ring-offset-2 ${
                locale === 'tr' ? 'bg-[#2a292a] text-white' : 'text-[#2a292a] hover:bg-[#f5f5f5]'
              }`}
            >
              TR
            </button>
            <button
              type="button"
              onClick={() => switchLocale('en')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0089b6] focus-visible:ring-offset-2 ${
                locale === 'en' ? 'bg-[#2a292a] text-white' : 'text-[#2a292a] hover:bg-[#f5f5f5]'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <nav className="md:hidden border-t border-[#e5e5e5] bg-white" aria-label={tNav('mainNav')}>
        <div className="container mx-auto px-4 py-3 space-y-1">
          {navItems.map((item) =>
            item.key === 'services' ? (
              <div key={item.key} className="border-b border-[#f0f0f0] pb-2 mb-1 last:border-0">
                <button
                  type="button"
                  className={`w-full py-2 text-left ${linkClass}`}
                  aria-expanded={mobileServicesOpen}
                  aria-controls="nav-mobile-services-panel"
                  id="nav-mobile-services-trigger"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                >
                  {tNav('services')}
                </button>
                <div
                  id="nav-mobile-services-panel"
                  role="region"
                  aria-labelledby="nav-mobile-services-trigger"
                  hidden={!mobileServicesOpen}
                  className={mobileServicesOpen ? 'mt-2 space-y-3 border-l-2 border-[#e8eef2] pl-3' : ''}
                >
                  {mobileServicesOpen ? (
                    <>
                      {serviceMegaItems.map((sub) => (
                        <Link
                          key={sub.id}
                          href={sub.href}
                          className={`${megaLinkClass} !py-2.5`}
                          onClick={() => setMobileServicesOpen(false)}
                        >
                          <span className="block text-sm font-semibold leading-snug text-[#2a292a]">
                            {serviceMegaTitle(sub.id, sub.title, locale)}
                          </span>
                        </Link>
                      ))}
                      <div
                        className="mx-auto mt-3 w-full max-w-[18rem] sm:max-w-sm"
                        aria-hidden="true"
                      >
                        <div className="flex aspect-[4/3] w-full items-center justify-center rounded-md border border-dashed border-[#e0e4e8] bg-[#f7f9fb]">
                          <span className="px-2 text-center text-[10px] font-medium uppercase tracking-wider text-[#9ca3af]">
                            {locale === 'tr' ? 'Görsel alanı' : 'Image area'}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            ) : (
              <Link
                key={item.key}
                href={item.href}
                className="block py-2 text-sm font-medium text-[#2a292a] hover:text-[#0089b6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0089b6] focus-visible:ring-offset-2 rounded-sm"
              >
                {tNav(item.key)}
              </Link>
            ),
          )}
        </div>
      </nav>
    </header>
  );
}
