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

export default async function HakkimizdaPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
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
            SENTAS Mühendislik, elektronik sistemler için mekanik tasarım,
            termal analiz ve entegrasyon süreçlerinde daha uygulanabilir,
            güvenilir ve üretilebilir çözümler geliştirme hedefiyle
            kurulmuştur. Ürün geliştirme süreçlerinde karşılaşılan mekanik ve
            ısıl problemleri erken aşamada ele alarak, tasarım doğruluğunu
            artırmayı ve mühendislik risklerini minimize etmeyi amaçlarız.
          </p>
        </div>
      </Section>

      <Section className="!py-10 lg:!py-12">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-3">
                Misyon
              </h2>
              <p className="text-navy-700 leading-relaxed max-w-md mx-auto">
                Elektronik sistemler için mekanik tasarım ve termal analiz
                süreçlerinde, uygulanabilirliği yüksek, güvenilir ve üretilebilir
                mühendislik çözümleri sunuyoruz.
              </p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-3">
                Vizyon
              </h2>
              <p className="text-navy-700 leading-relaxed max-w-md mx-auto">
                Elektronik ürün geliştirme alanında, teknik yetkinliği,
                güvenilir yaklaşımı ve çözüm odaklı bakış açısıyla öne çıkan bir
                mühendislik partneri olmayı hedefliyoruz.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
