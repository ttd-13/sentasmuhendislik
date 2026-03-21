/**
 * next-intl Next.js eklentisi için kök giriş dosyası (createNextIntlPlugin).
 * Asıl getRequestConfig ve mesaj yükleme: ./i18n/request.ts
 *
 * Kökte bu dosyanın bulunması; eski önbellek / araçların hâlâ i18n.ts yolunu
 * araması durumunda "dosya bulunamadı" hatalarını önler.
 */
export { default } from './i18n/request';
