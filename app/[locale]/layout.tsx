import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}

export function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  return {
    title: locale === 'tr' 
      ? 'SENTAS Mühendislik - Elektronik Ürünler için Mekanik ve Termal Tasarım'
      : 'SENTAS Engineering - Mechanical and Thermal Design for Electronic Products',
    description: locale === 'tr'
      ? 'Elektronik ürün geliştirme süreçlerinde mekanik entegrasyon ve termal tasarım çözümleri.'
      : 'Mechanical integration and thermal design solutions for electronic product development processes.',
  };
}
