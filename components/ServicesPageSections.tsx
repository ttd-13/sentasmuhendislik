import Section from '@/components/Section';
import ServiceSectionImage from '@/components/ServiceSectionImage';
import { SERVICE_SECTIONS } from '@/lib/servicesCatalog';

type ServicesTranslator = {
  (key: string): string;
  (key: string, opts: { returnNull: true }): string | null;
};

export default function ServicesPageSections({ t }: { t: ServicesTranslator }) {
  return (
    <>
      {SERVICE_SECTIONS.map((service) => (
        <Section key={service.slug} id={service.slug}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              {t(`${service.messageKey}.title`)}
            </h2>

            <div className="mb-8">
              <ServiceSectionImage
                sources={[service.image, ...service.imageFallbacks]}
                imageClassName={service.imageClassName}
              />
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">
                  {t(`${service.messageKey}.whatWeDo`)}
                </h3>
                <p className="text-navy-700 leading-relaxed">
                  {t(`${service.messageKey}.whatWeDoText`)}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-navy-900 mb-3">
                  {t(`${service.messageKey}.problems`)}
                </h3>
                <ul className="space-y-2">
                  {[0, 1, 2, 3, 4].map((index) => {
                    const problem = t(`${service.messageKey}.problemsList.${index}`, {
                      returnNull: true,
                    });
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
                  {t(`${service.messageKey}.approach`)}
                </h3>
                <p className="text-navy-700 leading-relaxed">
                  {t(`${service.messageKey}.approachText`)}
                </p>
              </div>

              <div className="p-6 bg-cyan-50 rounded-lg border border-cyan-200">
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  {t(`${service.messageKey}.whenToInvolve`)}
                </h3>
                <p className="text-navy-700">{t(`${service.messageKey}.whenToInvolveText`)}</p>
              </div>
            </div>
          </div>
        </Section>
      ))}
    </>
  );
}
