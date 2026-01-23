# SENTAS Mühendislik Website

Bilingual (TR/EN) Next.js website for SENTAS Engineering - Mechanical and Thermal Design Solutions for Electronic Products.

## How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

   The site will automatically redirect to `/tr` (Turkish) as the default locale.

## Project Structure

- `/app/[locale]` - Locale-specific pages (tr, en)
- `/components` - Reusable React components
- `/messages` - Translation files (tr.json, en.json)
- `/public` - Static assets

## Routes

- `/` → redirects to `/tr`
- `/tr` → Turkish site
- `/en` → English site
- `/tr/services`, `/en/services` → Services page
- `/tr/how-we-work`, `/en/how-we-work` → How We Work page
- `/tr/about`, `/en/about` → About page
- `/tr/contact`, `/en/contact` → Contact page

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- next-intl (i18n)

## Build for Production

```bash
npm run build
npm start
```

## 🚀 Deployment

Sitenizi `sentasmuhendislik.com` domain'ine yüklemek için detaylı rehber:

📖 **[DEPLOYMENT.md](./DEPLOYMENT.md)** dosyasını okuyun.

### Hızlı Başlangıç (Vercel)

1. Projeyi GitHub'a yükleyin
2. [Vercel.com](https://vercel.com) hesabı oluşturun
3. GitHub repository'nizi import edin
4. Domain'i Vercel'de bağlayın
5. DNS ayarlarını domain sağlayıcınızda yapın

Detaylı adımlar için `DEPLOYMENT.md` dosyasına bakın.
# sentasmuhendislik
# sentasmuhendislik
