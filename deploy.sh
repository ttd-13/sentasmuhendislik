#!/bin/bash

# SENTAS Mühendislik - Terminal Deployment Script
# GoDaddy Domain için Vercel Deployment

echo "🚀 SENTAS Mühendislik - Deployment Başlatılıyor..."
echo ""

# Renkler
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Vercel CLI kontrolü
echo -e "${BLUE}📦 Vercel CLI kontrol ediliyor...${NC}"
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI bulunamadı. Kuruluyor...${NC}"
    echo "İki seçenek var:"
    echo "1. Global kurulum (sudo gerekir): sudo npm install -g vercel"
    echo "2. npx ile kullanım (önerilen): npx vercel"
    echo ""
    read -p "Global kurulum yapmak istiyor musunuz? (y/n): " install_global
    
    if [ "$install_global" = "y" ]; then
        sudo npm install -g vercel
    else
        echo -e "${GREEN}✅ npx vercel kullanılacak (global kurulum gerekmez)${NC}"
    fi
else
    echo -e "${GREEN}✅ Vercel CLI zaten yüklü${NC}"
fi

echo ""

# 2. Git repository kontrolü
echo -e "${BLUE}📂 Git repository kontrol ediliyor...${NC}"
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}⚠️  Git repository bulunamadı. Oluşturuluyor...${NC}"
    git init
    git add .
    git commit -m "Initial commit - SENTAS Mühendislik website"
    echo -e "${GREEN}✅ Git repository oluşturuldu${NC}"
else
    echo -e "${GREEN}✅ Git repository mevcut${NC}"
fi

echo ""

# 3. Vercel login kontrolü
echo -e "${BLUE}🔐 Vercel giriş kontrolü...${NC}"
echo "Vercel'e giriş yapmanız gerekecek."
read -p "Devam etmek için Enter'a basın..."

# 4. Deployment
echo ""
echo -e "${BLUE}🚀 Deployment başlatılıyor...${NC}"
echo ""

if command -v vercel &> /dev/null; then
    vercel --prod
else
    npx vercel --prod
fi

echo ""
echo -e "${GREEN}✅ Deployment tamamlandı!${NC}"
echo ""
echo -e "${YELLOW}📋 Sonraki Adımlar:${NC}"
echo "1. Vercel dashboard'dan domain ekleyin: sentasmuhendislik.com"
echo "2. GoDaddy DNS ayarlarını yapın (DEPLOYMENT_TERMINAL.md dosyasına bakın)"
echo "3. DNS yayılımını bekleyin (1-48 saat)"
echo ""
echo -e "${BLUE}📖 Detaylı bilgi için: DEPLOYMENT_TERMINAL.md${NC}"
