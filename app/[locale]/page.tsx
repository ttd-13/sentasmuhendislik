import { getTranslations, setRequestLocale } from 'next-intl/server';
import Section from '@/components/Section';
import CTA from '@/components/CTA';
import Card from '@/components/Card';
import Link from 'next/link';

export default async function HomePage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  // ✅ next-intl + static render için gerekli
  setRequestLocale(locale);

  const t = await getTranslations('home');

  return (
    <>
      {/* Hero */}
      <Section background="pattern" className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6 text-balance">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-navy-600 mb-8 text-balance">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTA primary href={`/${locale}/contact`}>
              {t('hero.ctaPrimary')}
            </CTA>
            <CTA href={`/${locale}/services`}>
              {t('hero.ctaSecondary')}
            </CTA>
          </div>
        </div>
      </Section>

      {/* Problem → Solution */}
      <Section>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              {t('problemSolution.title')}
            </h2>
            <p className="text-lg text-navy-600 max-w-2xl mx-auto">
              {t('problemSolution.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card
              title={t('problemSolution.cards.thermal.title')}
              description={t('problemSolution.cards.thermal.description')}
            />
            <Card
              title={t('problemSolution.cards.mechanical.title')}
              description={t('problemSolution.cards.mechanical.description')}
            />
            <Card
              title={t('problemSolution.cards.manufacturing.title')}
              description={t('problemSolution.cards.manufacturing.description')}
            />
          </div>
        </div>
      </Section>

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
              href={`/${locale}/services#enclosure`}
            />
            <Card
              title={t('services.items.thermal.title')}
              description={t('services.items.thermal.description')}
              href={`/${locale}/services#thermal`}
            />
            <Card
              title={t('services.items.integration.title')}
              description={t('services.items.integration.description')}
              href={`/${locale}/services#integration`}
            />
            <Card
              title={t('services.items.prototyping.title')}
              description={t('services.items.prototyping.description')}
              href={`/${locale}/services#prototyping`}
            />
          </div>
        </div>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['riskReduction', 'fewerRedesigns', 'manufacturability', 'thermalPerformance', 'costEfficiency', 'timeToMarket'].map((key) => (
              <div key={key} className="p-6 bg-navy-50 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 mt-1 mr-3">
                    <svg className="w-6 h-6 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-navy-700 font-medium">
                    {t(`whySentas.benefits.${key}`)}
                  </p>
                </div>
              </div>
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
              <div key={key} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-cyan-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-cyan-600">
                    {key === 'discovery' ? '1' : key === 'design' ? '2' : key === 'validation' ? '3' : '4'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  {t(`howWeWork.steps.${key}.title`)}
                </h3>
                <p className="text-navy-600 text-sm">
                  {t(`howWeWork.steps.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href={`/${locale}/how-we-work`}
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg bg-white text-navy-900 border-2 border-navy-300 hover:border-cyan-600 hover:text-cyan-600 transition-colors"
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
              <li key={index} className="flex items-start p-4 bg-navy-50 rounded-lg">
                <svg className="w-5 h-5 text-cyan-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-navy-700">{t(`deliverables.items.${index}`)}</span>
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
          <CTA primary href={`/${locale}/contact`}>
            {t('finalCta.button')}
          </CTA>
        </div>
      </Section>
    </>
  );
}
