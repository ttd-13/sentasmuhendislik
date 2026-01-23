import { getTranslations, setRequestLocale } from 'next-intl/server';
import Section from '@/components/Section';
import { Metadata } from 'next';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: locale === 'tr'
      ? 'Hizmetler - SENTAS Mühendislik'
      : 'Services - SENTAS Engineering',
    description: locale === 'tr'
      ? 'Kasa tasarımı, termal analiz, mekanik entegrasyon ve hızlı prototipleme hizmetleri.'
      : 'Enclosure design, thermal analysis, mechanical integration, and rapid prototyping services.',
  };
}

export default async function ServicesPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  // ✅ static render / next-intl için kritik
  setRequestLocale(locale);

  const t = await getTranslations('services');

  const services = [
    { id: 'enclosure', key: 'enclosure' },
    { id: 'thermal', key: 'thermal' },
    { id: 'integration', key: 'integration' },
    { id: 'prototyping', key: 'prototyping' },
  ];

  return (
    <>
      <Section background="pattern" className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-navy-600">
            {t('subtitle')}
          </p>
        </div>
      </Section>

      {services.map((service) => (
        <Section key={service.id} id={service.id}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-8">
              {t(`${service.key}.title`)}
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">
                  {t(`${service.key}.whatWeDo`)}
                </h3>
                <p className="text-navy-700 leading-relaxed">
                  {t(`${service.key}.whatWeDoText`)}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">
                  {t(`${service.key}.problems`)}
                </h3>
                <ul className="space-y-2">
                  {[0, 1, 2, 3, 4].map((index) => {
                    const problem = t(`${service.key}.problemsList.${index}`, { returnNull: true });
                    if (!problem) return null;
                    return (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-cyan-600 mr-3 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-navy-700">{problem}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">
                  {t(`${service.key}.approach`)}
                </h3>
                <p className="text-navy-700 leading-relaxed">
                  {t(`${service.key}.approachText`)}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">
                  {t(`${service.key}.deliverables`)}
                </h3>
                <ul className="space-y-2">
                  {[0, 1, 2, 3].map((index) => {
                    const deliverable = t(`${service.key}.deliverablesList.${index}`, { returnNull: true });
                    if (!deliverable) return null;
                    return (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-cyan-600 mr-3 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-navy-700">{deliverable}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="p-6 bg-cyan-50 rounded-lg border border-cyan-200">
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  {t(`${service.key}.whenToInvolve`)}
                </h3>
                <p className="text-navy-700">
                  {t(`${service.key}.whenToInvolveText`)}
                </p>
              </div>
            </div>
          </div>
        </Section>
      ))}
    </>
  );
}
