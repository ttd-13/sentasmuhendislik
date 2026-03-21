const createNextIntlPlugin = require('next-intl/plugin');

// Kök i18n.ts → ./i18n/request.ts re-export (tek kaynak: request.ts)
const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withNextIntl(nextConfig);
