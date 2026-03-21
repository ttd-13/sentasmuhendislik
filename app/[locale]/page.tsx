import { getTranslations, setRequestLocale } from 'next-intl/server';
import Section from '@/components/Section';
import CTA from '@/components/CTA';
import Card from '@/components/Card';
import RenderShowcase from '@/components/RenderShowcase';
export default async function HomePage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  // ✅ next-intl + static render için gerekli
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const whySentasKeys = [
    'riskReduction',
    'fewerRedesigns',
    'manufacturability',
    'thermalPerformance',
    'costEfficiency',
    'timeToMarket'
  ] as const;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-24 min-h-[70vh]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-[position:68%_center]" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.6),rgba(0,137,182,0.4))]" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-[rgba(255,255,255,0.82)] mb-8 text-balance">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTA href={locale === 'tr' ? '/hizmetler' : '/services'}>
                {t('hero.ctaSecondary')}
              </CTA>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <Section background="gray">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1f2933] mb-4">
              {t('services.title')}
            </h2>
            <p className="text-lg text-[#5f6b76] max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              title={t('services.items.enclosure.title')}
              description={t('services.items.enclosure.description')}
              href={locale === 'tr' ? `/${locale}/hizmetler#enclosure` : `/${locale}/services#enclosure`}
            />
            <Card
              title={t('services.items.thermal.title')}
              description={t('services.items.thermal.description')}
              href={locale === 'tr' ? `/${locale}/hizmetler#thermal` : `/${locale}/services#thermal`}
            />
            <Card
              title={t('services.items.integration.title')}
              description={t('services.items.integration.description')}
              href={locale === 'tr' ? `/${locale}/hizmetler#integration` : `/${locale}/services#integration`}
            />
            <Card
              title={t('services.items.prototyping.title')}
              description={t('services.items.prototyping.description')}
              href={locale === 'tr' ? `/${locale}/hizmetler#prototyping` : `/${locale}/services#prototyping`}
            />
          </div>
          <div className="mt-14 lg:mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-semibold text-navy-900">
                Çözüm Örnekleri
              </h3>
            </div>
            <RenderShowcase
              items={[0, 1, 2, 3, 4, 5].map((i) => ({
                image: i === 0 ? '/renders/elektronik-muhafaza-tasarimi.png' : null,
                caption: t(`renders.items.${i}`)
              }))}
            />
          </div>
        </div>
      </Section>

      {/* Why SENTAS */}
      <Section className="bg-[#eef7fb]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              {t('whySentas.title')}
            </h2>
            <p className="text-lg text-navy-600 max-w-2xl mx-auto">
              {t('whySentas.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whySentasKeys.map((key) => (
              <article
                key={key}
                className="h-full p-7 bg-white border border-[#e7e7e7] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_28px_rgba(0,0,0,0.1)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 mt-0.5 rounded-full bg-[rgba(0,137,182,0.1)] p-2 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#0089b6]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy-900 leading-snug mb-2">
                      {t(`whySentas.cards.${key}.title`)}
                    </h3>
                    <p className="text-sm text-navy-600 leading-relaxed">
                      {t(`whySentas.cards.${key}.description`)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section background="pattern">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            {t('finalCta.title')}
          </h2>
          <p className="text-lg text-navy-600 mb-8">
            {t('finalCta.description')}
          </p>
          <CTA primary href={locale === 'tr' ? '/iletisim' : '/contact'}>
            {t('finalCta.button')}
          </CTA>
        </div>
      </Section>
    </>
  );
}
