# 🚀 Başlangıç Rehberi - Vercel Üyeliği Açıldı

Vercel üyeliğiniz hazır! Şimdi sitenizi yüklemek için iki yöntem var:

## Yöntem 1: Vercel Web Arayüzü (ÖNERİLEN - En Kolay)

Disk alanı sorunu olduğu için bu yöntem daha pratik.

### Adım 1: GitHub'a Yükleme

1. **GitHub'da repository oluşturun:**
   - https://github.com → Sign In
   - Sağ üstteki "+" → "New repository"
   - Repository name: `sentas-website`
   - Public veya Private seçin
   - "Create repository" butonuna tıklayın

2. **Projeyi GitHub'a yükleyin:**

Terminal'de şu komutları çalıştırın:

```bash
cd /Users/tariktahademirtas/sentas2

# GitHub repository URL'inizi ekleyin (KULLANICI_ADINIZ yerine kendi GitHub kullanıcı adınız)
git remote add origin https://github.com/KULLANICI_ADINIZ/sentas-website.git

# Kodu GitHub'a yükleyin
git branch -M main
git push -u origin main
```

**Not:** İlk kez GitHub'a push yapıyorsanız, GitHub kullanıcı adı ve şifre (veya token) isteyebilir.

### Adım 2: Vercel'e Bağlama

1. **Vercel Dashboard'a gidin:**
   - https://vercel.com/dashboard
   - "Add New..." → "Project" butonuna tıklayın

2. **GitHub repository'yi seçin:**
   - GitHub hesabınızı bağlayın (ilk kez ise)
   - `sentas-website` repository'sini seçin
   - "Import" butonuna tıklayın

3. **Proje ayarları:**
   - Vercel otomatik olarak Next.js'i algılayacak
   - Framework Preset: **Next.js** (otomatik seçilmiş olmalı)
   - Root Directory: `./` (boş bırakın)
   - Build Command: `npm run build` (otomatik)
   - Output Directory: `.next` (otomatik)
   - Install Command: `npm install` (otomatik)

4. **Deploy:**
   - "Deploy" butonuna tıklayın
   - 2-3 dakika içinde deployment tamamlanır
   - Başarılı olunca bir URL alacaksınız (örn: `sentas-website.vercel.app`)

### Adım 3: Domain Ekleme

1. **Vercel Dashboard'da:**
   - Deploy edilen projenize tıklayın
   - "Settings" sekmesine gidin
   - Sol menüden "Domains" seçin
   - "Add Domain" butonuna tıklayın
   - `sentasmuhendislik.com` yazın
   - "Add" butonuna tıklayın

2. **DNS bilgilerini not edin:**
   - Vercel size DNS kayıtlarını gösterecek
   - Genellikle:
     - **A kaydı:** `@` → `76.76.21.21`
     - **CNAME:** `www` → `cname.vercel-dns.com`

### Adım 4: GoDaddy DNS Ayarları

1. **GoDaddy'ye giriş yapın:**
   - https://godaddy.com → Sign In
   - "My Products" → "Domains"
   - `sentasmuhendislik.com` domain'inizi bulun
   - "DNS" veya "Manage DNS" butonuna tıklayın

2. **DNS kayıtlarını ekleyin:**

   **A kaydı ekle:**
   - "Add" butonuna tıklayın
   - Type: `A`
   - Name: `@` (veya boş)
   - Value: `76.76.21.21`
   - TTL: `600`
   - "Save"

   **CNAME kaydı ekle:**
   - "Add" butonuna tıklayın
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: `600`
   - "Save"

3. **Eski A kayıtlarını silin** (varsa ve GoDaddy'nin varsayılan kayıtlarıysa)

### Adım 5: Bekleme ve Kontrol

- DNS yayılımı **1-48 saat** sürebilir (genellikle 1-2 saat)
- Kontrol etmek için: `https://sentasmuhendislik.com` adresini tarayıcıda açın
- SSL sertifikası otomatik olarak aktif olur (birkaç dakika içinde)

---

## Yöntem 2: Terminal (Disk Alanı Sorunu Çözülürse)

Disk alanını temizledikten sonra terminal üzerinden de yapabilirsiniz:

```bash
# Disk alanını kontrol et
df -h

# npm cache temizle
npm cache clean --force

# node_modules temizle (gerekirse)
rm -rf node_modules
npm install

# Vercel login
npx vercel login

# Deploy
npx vercel --prod
```

---

## ✅ Kontrol Listesi

- [ ] GitHub repository oluşturuldu
- [ ] Kod GitHub'a yüklendi
- [ ] Vercel'de proje import edildi
- [ ] İlk deployment başarılı
- [ ] Domain Vercel'e eklendi (`sentasmuhendislik.com`)
- [ ] GoDaddy DNS ayarları yapıldı
- [ ] DNS yayılımı bekleniyor
- [ ] Site `https://sentasmuhendislik.com` adresinde çalışıyor

---

## 🆘 Sorun Giderme

### GitHub'a push yaparken hata

```bash
# GitHub token kullanın (Settings → Developer settings → Personal access tokens)
git remote set-url origin https://TOKEN@github.com/KULLANICI_ADINIZ/sentas-website.git
```

### Vercel deployment hatası

- Vercel dashboard'da "Deployments" sekmesinde logları kontrol edin
- Build hatalarını görebilirsiniz

### Domain çalışmıyor

- DNS kayıtlarının doğru olduğundan emin olun
- 24-48 saat bekleyin (DNS yayılımı)
- `dig sentasmuhendislik.com` komutuyla kontrol edin

---

## 📞 Yardım

- Vercel Dokümantasyon: https://vercel.com/docs
- GoDaddy DNS Rehberi: `GODADDY_DNS.md` dosyasına bakın
