import { redirect } from 'next/navigation';

/** Eski URL; artık bu sayfa yok — ana sayfaya yönlendir */
export default function HowWeWorkRedirect({
  params: { locale },
}: {
  params: { locale: string };
}) {
  redirect(`/${locale}`);
}
