import { getTranslations, setRequestLocale } from 'next-intl/server';
import Section from '@/components/Section';
import CTA from '@/components/CTA';
import Card from '@/components/Card';
import RenderShowcase from '@/components/RenderShowcase';
import Link from 'next/link';

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
      <section className="relative overflow-hidden py-20 lg:py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-[position:68%_center] scale-105 opacity-70 [filter:brightness(0.88)_contrast(1.08)_saturate(0.96)]" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(246,243,238,0.5),rgba(244,240,235,0.42))]" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6 text-balance">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-navy-600 mb-8 text-balance">
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
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              {t('services.title')}
            </h2>
            <p className="text-lg text-navy-600 max-w-2xl mx-auto">
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
        </div>
      </Section>

      {/* Render Showcase */}
      <Section>
        <RenderShowcase
          items={[0, 1, 2, 3, 4, 5].map((i) => ({
            image: i === 0 ? '/renders/elektronik-muhafaza-tasarimi.png' : null,
            caption: t(`renders.items.${i}`)
          }))}
        />
      </Section>

      {/* Why SENTAS */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              {t('whySentas.title')}
            </h2>
            <p className="text-lg text-navy-600 max-w-2xl mx-auto">
              {t('whySentas.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {whySentasKeys.map((key) => (
              <article
                key={key}
                className="h-full p-7 bg-white border border-[#e7e7e7] rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 mt-0.5">
                    <svg className="w-8 h-8 text-[#0089b6]" fill="currentColor" viewBox="0 0 20 20">
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

      {/* How We Work Summary */}
      <Section background="gray">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              {t('howWeWork.title')}
            </h2>
            <p className="text-lg text-navy-600 max-w-2xl mx-auto">
              {t('howWeWork.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['discovery', 'design', 'validation', 'delivery'].map((key) => (
              <div key={key} className="text-center p-6 bg-white border border-navy-200 rounded-md shadow-sm">
                <div className="w-16 h-16 mx-auto mb-4 bg-cyan-500 text-white rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold">
                    {key === 'discovery' ? '1' : key === 'design' ? '2' : key === 'validation' ? '3' : '4'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  {t(`howWeWork.steps.${key}.title`)}
                </h3>
                <p className="text-navy-700 text-sm">
                  {t(`howWeWork.steps.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href={locale === 'tr' ? `/${locale}/nasil-calisiriz` : `/${locale}/how-we-work`}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md bg-white text-navy-900 border border-navy-200 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
            >
              {locale === 'tr' ? 'Detaylı Süreç' : 'Detailed Process'}
            </Link>
          </div>
        </div>
      </Section>

      {/* Deliverables */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            {t('deliverables.title')}
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <li key={index} className="flex items-start p-4 bg-white border border-navy-200 rounded-md shadow-sm">
                <svg className="w-5 h-5 text-cyan-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-navy-900">{t(`deliverables.items.${index}`)}</span>
              </li>
            ))}
          </ul>
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
