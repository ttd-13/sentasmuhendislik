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
  if (locale === 'tr') redirect('/tr/hakkimizda');
  setRequestLocale(locale);

  const t = await getTranslations('about');

  return (
    <>
      <Section background="pattern" className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-navy-600 leading-relaxed">
            SENTAS Engineering was founded with the goal of delivering more
            practical, reliable, and manufacturable solutions in mechanical
            design, thermal analysis, and integration for electronic systems.
            We aim to address mechanical and thermal challenges early in the
            product development process, improving design accuracy and
            minimizing engineering risks.
          </p>
        </div>
      </Section>

      <Section className="!py-10 lg:!py-12">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-3">
                Mission
              </h2>
              <p className="text-navy-700 leading-relaxed max-w-md mx-auto">
                We deliver reliable, manufacturable, and highly practical
                engineering solutions in mechanical design and thermal analysis
                for electronic systems.
              </p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-3">
                Vision
              </h2>
              <p className="text-navy-700 leading-relaxed max-w-md mx-auto">
                We aim to become a trusted engineering partner recognized for
                technical expertise, reliability, and a solution-oriented
                approach in electronic product development.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
