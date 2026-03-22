/**
 * Hizmetler sayfası — tek kaynak: sıra, slug (anchor), i18n anahtarı, görseller.
 * Görsel path’leri elle sabit; uzantı projedeki gerçek dosyaya göre + alternatifler.
 */
export type ServiceMessageKey =
  | 'bilesenYerlesimi'
  | 'termalAnaliz'
  | 'aktifSogutma'
  | 'kablaj'
  | 'dfm';

export type ServiceCatalogEntry = {
  slug: string;
  messageKey: ServiceMessageKey;
  /** Birincil dosya (public altında var olan uzantı) */
  image: string;
  /** Yükleme hatasında denenecek ek path’ler */
  imageFallbacks: readonly string[];
  /** Opsiyonel: kadraj (object-position vb.) */
  imageClassName?: string;
};

export const SERVICE_SECTIONS: readonly ServiceCatalogEntry[] = [
  {
    slug: 'bilesen-yerlesimi',
    messageKey: 'bilesenYerlesimi',
    image: '/renders/bilesen-yerlesimi.png',
    imageFallbacks: [
      '/renders/bilesen-yerlesimi.jpg',
      '/renders/bilesen-yerlesimi.jpeg',
      '/renders/bilesen-yerlesimi.webp',
    ],
  },
  {
    slug: 'termal-analiz',
    messageKey: 'termalAnaliz',
    image: '/renders/termal.jpg',
    imageFallbacks: ['/renders/termal.png', '/renders/termal.jpeg', '/renders/termal.webp'],
  },
  {
    slug: 'aktif-sogutma',
    messageKey: 'aktifSogutma',
    image: '/renders/aktif-sogutma.png',
    imageFallbacks: [
      '/renders/aktif-sogutma.jpg',
      '/renders/aktif-sogutma.jpeg',
      '/renders/aktif-sogutma.webp',
    ],
  },
  {
    slug: 'kablaj',
    messageKey: 'kablaj',
    image: '/renders/kablaj.jpg',
    imageFallbacks: ['/renders/kablaj.png', '/renders/kablaj.jpeg', '/renders/kablaj.webp'],
  },
  {
    slug: 'dfm',
    messageKey: 'dfm',
    image: '/renders/dfm.jpg',
    imageFallbacks: ['/renders/dfm.png', '/renders/dfm.jpeg', '/renders/dfm.webp'],
  },
] as const;

export type ServiceSlug = (typeof SERVICE_SECTIONS)[number]['slug'];
