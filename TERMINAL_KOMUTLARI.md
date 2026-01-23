# 🚀 Terminal Komutları - Hızlı Başlangıç

Proje klasöründe (`/Users/tariktahademirtas/sentas2`) şu komutları sırayla çalıştırın:

## Adım 1: Git Repository Oluştur (İlk Kez)

```bash
cd /Users/tariktahademirtas/sentas2
git init
git add .
git commit -m "SENTAS Mühendislik website"
```

## Adım 2: Vercel'e Giriş Yap

```bash
npx vercel login
```

Bu komut tarayıcı açacak, Vercel hesabınızla giriş yapın (yoksa ücretsiz hesap oluşturun).

## Adım 3: İlk Deployment (Preview)

```bash
npx vercel
```

Sorulara şöyle cevap verin:
- Set up and deploy? → **Y**
- Which scope? → **Hesabınızı seçin**
- Link to existing project? → **N** (yeni proje)
- What's your project's name? → **sentas-muhendislik** (veya istediğiniz isim)
- In which directory is your code located? → **./** (Enter'a basın)
- Want to override the settings? → **N**

## Adım 4: Production Deployment

```bash
npx vercel --prod
```

Bu komut production'a deploy eder.

## Adım 5: Domain Ekleme

Vercel dashboard'dan domain ekleyin:
1. https://vercel.com/dashboard → Projenizi seçin
2. Settings → Domains
3. "Add Domain" → `sentasmuhendislik.com` yazın
4. "Add" butonuna tıklayın

## Adım 6: GoDaddy DNS Ayarları

Detaylı talimatlar için: **GODADDY_DNS.md** dosyasını okuyun.

Kısaca:
- GoDaddy → My Products → Domains → DNS Management
- A kaydı ekle: `@` → `76.76.21.21`
- CNAME kaydı ekle: `www` → `cname.vercel-dns.com`

## ✅ Kontrol

```bash
# DNS yayılımını kontrol et
dig sentasmuhendislik.com +short
# Beklenen: 76.76.21.21

# Site çalışıyor mu kontrol et
curl -I https://sentasmuhendislik.com
```

---

## 🔄 Güncellemeler İçin

Kod değişikliği yaptıktan sonra:

```bash
git add .
git commit -m "Update"
npx vercel --prod
```

---

## 📖 Detaylı Rehberler

- **DEPLOYMENT_TERMINAL.md** - Terminal deployment detayları
- **GODADDY_DNS.md** - GoDaddy DNS ayarları detayları
