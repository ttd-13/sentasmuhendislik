# Terminal Üzerinden Deployment - GoDaddy Domain

Bu rehber, terminal üzerinden Vercel CLI kullanarak sitenizi `sentasmuhendislik.com` domain'ine yüklemek için adım adım talimatlar içerir.

## 📋 Ön Gereksinimler

- Node.js yüklü olmalı (zaten var)
- Git yüklü olmalı
- GoDaddy'de domain satın alınmış olmalı

## 🚀 Adım 1: Vercel CLI Kurulumu

Terminal'de şu komutu çalıştırın:

```bash
npm install -g vercel
```

Kurulumu doğrulamak için:
```bash
vercel --version
```

## 🔐 Adım 2: Vercel'e Giriş Yapma

```bash
cd /Users/tariktahademirtas/sentas2
vercel login
```

Bu komut sizi tarayıcıda açılacak bir sayfaya yönlendirecek. Vercel hesabınızla giriş yapın (yoksa ücretsiz hesap oluşturun).

## 📦 Adım 3: Projeyi Deploy Etme

Proje klasöründe şu komutu çalıştırın:

```bash
vercel
```

Vercel size birkaç soru soracak:

1. **Set up and deploy?** → `Y` (Yes)
2. **Which scope?** → Vercel hesabınızı seçin
3. **Link to existing project?** → `N` (No - yeni proje)
4. **What's your project's name?** → `sentas-muhendislik` (veya istediğiniz isim)
5. **In which directory is your code located?** → `./` (mevcut dizin)
6. **Want to override the settings?** → `N` (No)

Vercel otomatik olarak:
- Next.js'i algılayacak
- Build edecek
- Deploy edecek

İlk deployment tamamlandığında bir URL alacaksınız (örn: `sentas-muhendislik.vercel.app`)

## 🌐 Adım 4: Production Deployment

İlk deployment preview environment'ta olur. Production'a deploy etmek için:

```bash
vercel --prod
```

## 🔗 Adım 5: Domain Bağlama (Terminal Üzerinden)

### 5.1 Domain'i Vercel'e Ekle

```bash
vercel domains add sentasmuhendislik.com
```

Eğer bu komut çalışmazsa, Vercel dashboard'dan yapabilirsiniz:
- https://vercel.com/dashboard → Projenizi seçin → Settings → Domains → Add Domain

### 5.2 Vercel'den DNS Bilgilerini Al

Domain'i ekledikten sonra Vercel size DNS kayıtlarını gösterecek. Terminal'de kontrol etmek için:

```bash
vercel domains inspect sentasmuhendislik.com
```

Veya Vercel dashboard'dan DNS kayıtlarını görebilirsiniz.

**Genellikle şu kayıtlar gerekir:**

**Ana domain için (sentasmuhendislik.com):**
- Type: A
- Name: @
- Value: 76.76.21.21

**WWW için:**
- Type: CNAME  
- Name: www
- Value: cname.vercel-dns.com

## 🔧 Adım 6: GoDaddy DNS Ayarları

### 6.1 GoDaddy'ye Giriş Yapın

1. [GoDaddy.com](https://godaddy.com) → "Sign In"
2. "My Products" → "DNS" veya "Domains" → DNS Management

### 6.2 DNS Kayıtlarını Ekleyin

GoDaddy DNS yönetim panelinde:

1. **Mevcut A kayıtlarını silin veya düzenleyin** (varsa)
2. **Yeni A kaydı ekleyin:**
   - Type: `A`
   - Name: `@` (veya boş bırakın)
   - Value: `76.76.21.21`
   - TTL: `600` (veya Auto)

3. **WWW için CNAME ekleyin:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: `600` (veya Auto)

4. **Kaydet** butonuna tıklayın

### 6.3 DNS Yayılımını Kontrol Etme

Terminal'de DNS kayıtlarının yayıldığını kontrol edin:

```bash
# A kaydını kontrol et
dig sentasmuhendislik.com +short

# CNAME kaydını kontrol et
dig www.sentasmuhendislik.com +short

# Veya nslookup ile
nslookup sentasmuhendislik.com
```

DNS yayılımı 24-48 saat sürebilir, ancak genellikle 1-2 saat içinde aktif olur.

## ✅ Adım 7: SSL Sertifikası

Vercel otomatik olarak SSL sertifikası sağlar. DNS kayıtları yayıldıktan sonra SSL aktif olur (birkaç dakika sürebilir).

Kontrol etmek için:
```bash
curl -I https://sentasmuhendislik.com
```

## 🔄 Güncellemeler

Kodunuzu güncelledikten sonra:

```bash
# Production'a deploy
vercel --prod

# Veya sadece preview
vercel
```

## 📊 Deployment Durumunu Kontrol Etme

```bash
# Tüm deployment'ları listele
vercel ls

# Belirli bir deployment'ı incele
vercel inspect [deployment-url]
```

## 🆘 Sorun Giderme

### Domain çalışmıyor

1. **DNS kayıtlarını kontrol edin:**
   ```bash
   dig sentasmuhendislik.com
   nslookup sentasmuhendislik.com
   ```

2. **Vercel'de domain durumunu kontrol edin:**
   ```bash
   vercel domains ls
   vercel domains inspect sentasmuhendislik.com
   ```

3. **GoDaddy'de DNS kayıtlarını tekrar kontrol edin**

### Build hatası

```bash
# Local'de build test edin
npm run build

# Hataları kontrol edin
npm run lint
```

### Vercel CLI komutları

```bash
# Yardım
vercel --help

# Mevcut projeleri listele
vercel ls

# Environment variables ekle
vercel env add VARIABLE_NAME

# Logları görüntüle
vercel logs
```

## 📝 Özet Komutlar

```bash
# 1. Vercel CLI kur
npm install -g vercel

# 2. Giriş yap
vercel login

# 3. Deploy et
vercel --prod

# 4. Domain ekle (dashboard'dan veya)
vercel domains add sentasmuhendislik.com

# 5. DNS kontrol
dig sentasmuhendislik.com
```

## 🎯 Sonraki Adımlar

1. ✅ Vercel CLI kuruldu
2. ✅ Proje deploy edildi
3. ✅ Domain Vercel'e eklendi
4. ✅ GoDaddy DNS ayarları yapıldı
5. ⏳ DNS yayılımını bekleyin (1-48 saat)
6. ✅ Site `https://sentasmuhendislik.com` adresinde çalışıyor

## 📧 Contact Form Email Entegrasyonu

Contact form şu anda API endpoint'e bağlı. Email göndermek için `app/api/contact/route.ts` dosyasını güncelleyin.

Örnek Resend entegrasyonu için:
```bash
npm install resend
```

Sonra `app/api/contact/route.ts` dosyasını düzenleyin.
