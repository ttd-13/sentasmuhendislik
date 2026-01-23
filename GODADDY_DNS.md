# GoDaddy DNS Ayarları - sentasmuhendislik.com

Bu rehber, GoDaddy'den satın aldığınız domain için DNS ayarlarını nasıl yapacağınızı gösterir.

## 🔧 Adım 1: GoDaddy DNS Yönetim Paneline Giriş

1. [GoDaddy.com](https://godaddy.com) → "Sign In"
2. Sağ üstteki profil ikonuna tıklayın → "My Products"
3. "Domains" sekmesine gidin
4. `sentasmuhendislik.com` domain'inizi bulun
5. "DNS" butonuna tıklayın (veya "Manage DNS")

## 📝 Adım 2: Mevcut DNS Kayıtlarını Kontrol Edin

DNS yönetim panelinde şu kayıtları göreceksiniz:
- A kayıtları
- CNAME kayıtları
- MX kayıtları (email için)
- TXT kayıtları

**ÖNEMLİ:** Email kullanıyorsanız, MX kayıtlarını silmeyin!

## ➕ Adım 3: Vercel için DNS Kayıtlarını Ekleyin

### 3.1 Ana Domain için A Kaydı

1. "Add" butonuna tıklayın
2. Şu bilgileri girin:
   - **Type:** `A`
   - **Name:** `@` (veya boş bırakın)
   - **Value:** `76.76.21.21`
   - **TTL:** `600` (veya "Auto")
3. "Save" butonuna tıklayın

### 3.2 WWW için CNAME Kaydı

1. "Add" butonuna tıklayın
2. Şu bilgileri girin:
   - **Type:** `CNAME`
   - **Name:** `www`
   - **Value:** `cname.vercel-dns.com`
   - **TTL:** `600` (veya "Auto")
3. "Save" butonuna tıklayın

## 🗑️ Adım 4: Eski A Kayıtlarını Silin (Gerekirse)

Eğer eski A kayıtları varsa (örneğin GoDaddy'nin varsayılan kayıtları):
1. Eski A kayıtlarını bulun
2. Sağ taraftaki "⋮" (üç nokta) menüsüne tıklayın
3. "Delete" seçeneğini seçin
4. Onaylayın

**DİKKAT:** Sadece ana domain (@) için A kayıtlarını silin. Alt domain'ler için olan kayıtları silmeyin.

## ✅ Adım 5: DNS Kayıtlarını Kontrol Edin

DNS kayıtlarınız şöyle görünmeli:

```
Type    Name    Value                  TTL
A       @       76.76.21.21            600
CNAME   www     cname.vercel-dns.com  600
```

## ⏱️ Adım 6: DNS Yayılımını Bekleyin

DNS değişiklikleri genellikle:
- **Hızlı:** 1-2 saat içinde
- **Normal:** 24 saat içinde
- **Maksimum:** 48 saat içinde

yayılır.

## 🔍 DNS Yayılımını Kontrol Etme

Terminal'de şu komutları çalıştırarak kontrol edebilirsiniz:

```bash
# A kaydını kontrol et
dig sentasmuhendislik.com +short

# CNAME kaydını kontrol et
dig www.sentasmuhendislik.com +short

# Veya nslookup ile
nslookup sentasmuhendislik.com
```

Beklenen çıktı:
```
sentasmuhendislik.com → 76.76.21.21
www.sentasmuhendislik.com → cname.vercel-dns.com
```

## 🔒 SSL Sertifikası

Vercel otomatik olarak SSL sertifikası sağlar. DNS kayıtları yayıldıktan sonra:
- Birkaç dakika içinde SSL aktif olur
- `https://sentasmuhendislik.com` adresi çalışır
- Tarayıcıda yeşil kilit ikonu görünür

## 🆘 Sorun Giderme

### Domain çalışmıyor

1. **DNS kayıtlarını tekrar kontrol edin:**
   - GoDaddy DNS panelinde kayıtların doğru olduğundan emin olun
   - TTL değerinin düşük olduğundan emin olun (600)

2. **Vercel'de domain durumunu kontrol edin:**
   - Vercel dashboard → Projeniz → Settings → Domains
   - Domain'in "Valid Configuration" durumunda olduğundan emin olun

3. **DNS cache'i temizleyin:**
   ```bash
   # macOS/Linux
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   
   # Veya tarayıcı cache'ini temizleyin
   ```

### "Invalid Configuration" hatası

- DNS kayıtlarının doğru girildiğinden emin olun
- TTL değerini düşürün (600)
- Birkaç dakika bekleyip tekrar kontrol edin

### Email çalışmıyor

Eğer domain'de email kullanıyorsanız:
- MX kayıtlarını silmeyin
- Email servisiniz için gerekli kayıtları koruyun
- Vercel sadece web hosting sağlar, email için ayrı servis gerekir

## 📞 Destek

- GoDaddy Destek: https://www.godaddy.com/help
- Vercel Dokümantasyon: https://vercel.com/docs
- Vercel Destek: https://vercel.com/support

## ✅ Kontrol Listesi

- [ ] GoDaddy DNS yönetim paneline giriş yapıldı
- [ ] A kaydı eklendi (@ → 76.76.21.21)
- [ ] CNAME kaydı eklendi (www → cname.vercel-dns.com)
- [ ] Eski A kayıtları silindi (gerekirse)
- [ ] DNS kayıtları kontrol edildi
- [ ] DNS yayılımı bekleniyor (1-48 saat)
- [ ] Site `https://sentasmuhendislik.com` adresinde çalışıyor
