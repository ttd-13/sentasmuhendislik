import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/routing';

/**
 * next-intl: routing nesnesi createMiddleware’in beklediği tek doğru biçim (3.22+).
 * Matcher: kök yönlendirme + locale önekli rotalar + statik dosya/api hariç.
 */
const intlMiddleware = createMiddleware(routing);

export default intlMiddleware;

export const config = {
  matcher: ['/', '/(tr|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
