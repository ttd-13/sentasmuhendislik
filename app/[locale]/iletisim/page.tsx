import { getTranslations, setRequestLocale } from 'next-intl/server';
import Section from '@/components/Section';
import ContactForm from '@/components/ContactForm';
import { CONTACT_EMAIL } from '@/lib/contactEmail';
import { CONTACT_LINKEDIN_URL } from '@/lib/contactLinks';
import { Metadata } from 'next';

function IconPin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-4.35 7-10a7 7 0 1 0-14 0c0 5.65 7 10 7 10Z"
      />
      <circle cx="12" cy="11" r="2.25" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16v12H4V6Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4 7 8 6 8-6"
      />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

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
      ? 'Projeniz için bizimle e-posta üzerinden iletişime geçin.'
      : 'Get in touch with us by email for your project.'
  };
}

export default async function IletisimPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  const t = await getTranslations('contact');

  const rowClass =
    'flex items-center gap-4 text-left';

  const iconWrapClass =
    'flex-shrink-0 w-11 h-11 rounded-lg border border-white/12 bg-white/[0.06] flex items-center justify-center text-cyan-400';

  return (
    <Section
      background="white"
      className="!bg-gradient-to-b !from-navy-950 !via-navy-900 !to-[#1a222c] !shadow-none text-white pt-24 pb-20 lg:pb-28"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center text-4xl md:text-5xl font-bold tracking-tight text-white mb-14 md:mb-16">
          {t('pageTitle')}
        </h1>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-0 md:pr-4">
            <div className={`${rowClass} pb-8`}>
              <span className={iconWrapClass} aria-hidden>
                <IconPin className="w-5 h-5" />
              </span>
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-medium text-white/55 uppercase tracking-wide mb-1">
                  {t('locationLabel')}
                </p>
                <p className="text-lg text-white/95">{t('location')}</p>
              </div>
            </div>

            <div className={`${rowClass} border-t border-white/10 py-8`}>
              <span className={iconWrapClass} aria-hidden>
                <IconMail className="w-5 h-5" />
              </span>
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-medium text-white/55 uppercase tracking-wide mb-1">
                  {t('emailLabel')}
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-lg text-cyan-400 hover:text-cyan-300 break-all transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            <div className={`${rowClass} border-t border-white/10 pt-8`}>
              <span className={iconWrapClass} aria-hidden>
                <IconLinkedIn className="w-5 h-5" />
              </span>
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-medium text-white/55 uppercase tracking-wide mb-1">
                  {t('linkedinLabelHeading')}
                </p>
                <a
                  href={CONTACT_LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-cyan-400 hover:text-cyan-300 transition-colors inline-block"
                >
                  {t('linkedinLabel')}
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-navy-700/80 bg-white p-8 md:p-10 shadow-[0_24px_48px_rgba(0,0,0,0.35)]">
            <ContactForm />
          </div>
        </div>

        <p className="mt-14 text-center text-sm text-white/55 max-w-xl mx-auto leading-relaxed">
          {t('footerNote')}
        </p>
      </div>
    </Section>
  );
}
