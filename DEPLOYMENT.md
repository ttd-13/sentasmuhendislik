# Deployment Rehberi - SENTAS Mühendislik

Bu rehber, sitenizi `sentasmuhendislik.com` domain'ine yüklemek için adım adım talimatlar içerir.

## 🚀 Vercel ile Deployment (Önerilen - En Kolay)

Vercel, Next.js için en uygun hosting platformudur ve ücretsiz planı mevcuttur.

### Adım 1: GitHub'a Yükleme (Önerilen)

1. **GitHub'da yeni bir repository oluşturun:**
   - GitHub.com'a gidin
   - "New repository" butonuna tıklayın
   - Repository adı: `sentas-website` (veya istediğiniz bir isim)
   - Public veya Private seçin
   - "Create repository" butonuna tıklayın

2. **Projeyi GitHub'a yükleyin:**
   ```bash
   cd /Users/tariktahademirtas/sentas2
   git init
   git add .
   git commit -m "Initial commit - SENTAS Mühendislik website"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADINIZ/sentas-website.git
   git push -u origin main
   ```
   
   Not: `KULLANICI_ADINIZ` yerine kendi GitHub kullanıcı adınızı yazın.

### Adım 2: Vercel'e Deploy Etme

1. **Vercel hesabı oluşturun:**
   - [vercel.com](https://vercel.com) adresine gidin
   - "Sign Up" butonuna tıklayın
   - GitHub hesabınızla giriş yapın (önerilen)

2. **Projeyi import edin:**
   - Vercel dashboard'da "Add New..." → "Project" seçin
   - GitHub repository'nizi seçin
   - Vercel otomatik olarak Next.js'i algılayacak
   - "Deploy" butonuna tıklayın

3. **İlk deployment:**
   - Vercel projeyi otomatik olarak build edip deploy edecek
   - 2-3 dakika sürebilir
   - Deployment tamamlandığında bir URL alacaksınız (örn: `sentas-website.vercel.app`)

### Adım 3: Domain Bağlama

1. **Vercel'de domain ekleyin:**
   - Proje sayfasında "Settings" → "Domains" sekmesine gidin
   - "Add Domain" butonuna tıklayın
   - `sentasmuhendislik.com` yazın ve "Add" butonuna tıklayın

2. **DNS ayarlarını yapın:**
   Vercel size DNS kayıtlarını gösterecek. Domain sağlayıcınızda (örneğin Namecheap, GoDaddy) şu kayıtları ekleyin:

   **Seçenek 1: A Record (Önerilen)**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   TTL: Auto
   ```

   **Seçenek 2: CNAME (Alternatif)**
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   TTL: Auto
   ```

   **WWW için:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: Auto
   ```

3. **SSL sertifikası:**
   - Vercel otomatik olarak SSL sertifikası sağlar (Let's Encrypt)
   - DNS kayıtları yayıldıktan sonra (24-48 saat içinde) HTTPS aktif olur

### Adım 4: Doğrulama**

DNS kayıtlarının yayılması 24-48 saat sürebilir. Kontrol etmek için:
```bash
# Terminal'de kontrol edin
nslookup sentasmuhendislik.com
```

## 🔄 Güncellemeler

Kodunuzu güncellediğinizde:
```bash
git add .
git commit -m "Update website"
git push
```

Vercel otomatik olarak yeni deployment yapacaktır.

## 📧 Contact Form İçin Email Ayarları

Contact form şu anda sadece simüle ediyor. Gerçek email göndermek için:

### Seçenek 1: Vercel Serverless Function + Email Service

1. **Resend veya SendGrid gibi bir email servisi kullanın**
2. **API route oluşturun:** `app/api/contact/route.ts`
3. **ContactForm'u güncelleyin** - API endpoint'e POST request göndersin

### Seçenek 2: Formspree veya Netlify Forms

Form servisleri kullanarak form gönderimlerini yönetebilirsiniz.

## 🌐 Alternatif Deployment Seçenekleri

### Netlify
- GitHub'a yükleyin
- Netlify.com'a gidin ve projeyi import edin
- Domain'i bağlayın

### DigitalOcean App Platform
- GitHub repository'yi bağlayın
- Next.js template seçin
- Domain'i bağlayın

### Kendi Sunucunuz (VPS)
```bash
# Sunucuda
git clone https://github.com/KULLANICI_ADINIZ/sentas-website.git
cd sentas-website
npm install
npm run build
npm start
# PM2 veya systemd ile process'i yönetin
```

## ✅ Deployment Sonrası Kontrol Listesi

- [ ] Site `sentasmuhendislik.com` adresinde açılıyor
- [ ] HTTPS çalışıyor (yeşil kilit ikonu)
- [ ] `/tr` ve `/en` rotaları çalışıyor
- [ ] Dil değiştirme butonu çalışıyor
- [ ] Tüm sayfalar yükleniyor
- [ ] Mobil görünüm düzgün çalışıyor
- [ ] Contact form çalışıyor (email entegrasyonu yapıldıysa)

## 🆘 Sorun Giderme

**Domain çalışmıyor:**
- DNS kayıtlarının yayılmasını bekleyin (24-48 saat)
- DNS kayıtlarını kontrol edin: `nslookup sentasmuhendislik.com`
- Vercel'de domain doğrulamasını kontrol edin

**Build hatası:**
- Vercel dashboard'da "Deployments" sekmesinde logları kontrol edin
- Local'de `npm run build` komutunu çalıştırıp hataları kontrol edin

**Sayfa bulunamadı (404):**
- Middleware'in doğru çalıştığından emin olun
- `next.config.js` dosyasını kontrol edin

## 📞 Destek

Sorun yaşarsanız:
- Vercel dokümantasyonu: https://vercel.com/docs
- Next.js dokümantasyonu: https://nextjs.org/docs
