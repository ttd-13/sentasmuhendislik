import { getTranslations, setRequestLocale } from 'next-intl/server';
import Section from '@/components/Section';
import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: locale === 'tr'
      ? 'İletişim - SENTAS Mühendislik'
      : 'Contact - SENTAS Engineering',
    description: locale === 'tr'
      ? 'Projenizi birlikte geliştirelim. Bizimle iletişime geçin.'
      : "Let's develop your project together. Get in touch with us."
  };
}

export default async function ContactPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  if (locale === 'tr') redirect('/tr/iletisim');
  setRequestLocale(locale);

  const t = await getTranslations('contact');

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
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <ContactForm />
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-navy-900 mb-6">
                  {t('whatHappensNext.title')}
                </h2>
                <div className="space-y-6">
                  {['step1', 'step2', 'step3'].map((stepKey, index) => (
                    <div key={stepKey} className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy-900 mb-1">
                          {t(`whatHappensNext.steps.${stepKey}.title`)}
                        </h3>
                        <p className="text-navy-700 text-sm">
                          {t(`whatHappensNext.steps.${stepKey}.description`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-navy-900 mb-6">
                  {t('faq.title')}
                </h2>
                <div className="space-y-4">
                  {['q1', 'q2', 'q3', 'q4'].map((qKey) => {
                    const question = t(`faq.items.${qKey}.question`, { returnNull: true });
                    const answer = t(`faq.items.${qKey}.answer`, { returnNull: true });
                    if (!question || !answer) return null;

                    return (
                      <div key={qKey} className="p-4 bg-navy-50 rounded-lg">
                        <h3 className="font-semibold text-navy-900 mb-2">
                          {question}
                        </h3>
                        <p className="text-sm text-navy-700">{answer}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
