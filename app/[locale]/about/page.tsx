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
      ? 'Hakkımızda - SENTAS Mühendislik'
      : 'About Us - SENTAS Engineering',
    description: locale === 'tr'
      ? 'Elektronik ürün geliştirme süreçlerinde mekanik ve termal tasarım uzmanlığı.'
      : 'Expertise in mechanical and thermal design for electronic product development processes.'
  };
}

export default async function AboutPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  // ✅ static render için kritik
  setRequestLocale(locale);

  const t = await getTranslations('about');

  const values = [
    'technicalDepth',
    'practicalExperience',
    'systematicApproach',
    'transparentCommunication'
  ];

  return (
    <>
      <Section background="pattern" className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-navy-600">{t('subtitle')}</p>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">
            {t('story.title')}
          </h2>
          <p className="text-lg text-navy-700 leading-relaxed">
            {t('story.text')}
          </p>
        </div>
      </Section>

      <Section background="gray">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
            {t('values.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((key) => (
              <div
                key={key}
                className="p-6 bg-white rounded-lg border border-navy-200"
              >
                <h3 className="text-xl font-semibold text-navy-900 mb-3">
                  {t(`values.items.${key}.title`)}
                </h3>
                <p className="text-navy-700">
                  {t(`values.items.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-900 mb-6 text-center">
            {t('roles.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-navy-50 rounded-lg">
              <h3 className="font-semibold text-navy-900 mb-2">
                {t('roles.mechanicalEngineer')}
              </h3>
            </div>
            <div className="text-center p-6 bg-navy-50 rounded-lg">
              <h3 className="font-semibold text-navy-900 mb-2">
                {t('roles.thermalEngineer')}
              </h3>
            </div>
            <div className="text-center p-6 bg-navy-50 rounded-lg">
              <h3 className="font-semibold text-navy-900 mb-2">
                {t('roles.projectManager')}
              </h3>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
