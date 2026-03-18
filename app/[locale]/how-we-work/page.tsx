import { getTranslations, setRequestLocale } from 'next-intl/server';
import Section from '@/components/Section';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: locale === 'tr'
      ? 'Nasıl Çalışırız - SENTAS Mühendislik'
      : 'How We Work - SENTAS Engineering',
    description: locale === 'tr'
      ? 'Sistematik ve şeffaf bir süreç ile projelerinizi başarıya taşıyoruz.'
      : 'We take your projects to success with a systematic and transparent process.',
  };
}

export default async function HowWeWorkPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  if (locale === 'tr') redirect('/tr/nasil-calisiriz');
  setRequestLocale(locale);

  const t = await getTranslations('howWeWork');

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

      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-900 mb-8">
            {t('workflow.title')}
          </h2>

          <div className="space-y-8">
            {['step1', 'step2', 'step3', 'step4', 'step5'].map((stepKey, index) => (
              <div key={stepKey} className="relative pl-8 border-l-2 border-cyan-500">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-cyan-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-navy-900 mb-4">
                  {t(`workflow.steps.${stepKey}.title`)}
                </h3>
                <ul className="space-y-2">
                  {[0, 1, 2, 3].map((itemIndex) => {
                    const item = t(`workflow.steps.${stepKey}.items.${itemIndex}`, { returnNull: true });
                    if (!item) return null;
                    return (
                      <li key={itemIndex} className="flex items-start text-navy-700">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section background="gray">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-900 mb-4">
            {t('communication.title')}
          </h2>
          <p className="text-lg text-navy-700 mb-6">
            {t('communication.description')}
          </p>
          <ul className="space-y-3">
            {[0, 1, 2, 3].map((index) => {
              const item = t(`communication.items.${index}`, { returnNull: true });
              if (!item) return null;
              return (
                <li key={index} className="flex items-start p-4 bg-white rounded-lg">
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
                  <span className="text-navy-700">{item}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>
    </>
  );
}
