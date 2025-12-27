# Amazon Clone Project 🛒

![Amazon Clone Demo](GIFS/PC-VERSION%20.gif)

Bu proje, modern web geliştirme prensipleri kullanılarak geliştirilmiş, uçtan uca fonksiyonel bir **E-Ticaret (Amazon)** klonudur. Vanilla JavaScript kullanılarak, harici bir framework bağımlılığı olmadan (No-Framework) geliştirilmiştir.

## 🌟 Özellikler

*   **Ürün Listeleme & Filtreleme:** API'den dinamik ürün çekme ve URL tabanlı arama/filtreleme özelliği.
*   **Sepet Yönetimi:** Ürün ekleme, adet güncelleme, silme ve dinamik fiyat hesaplama.
*   **Ödeme Süreci (Checkout):** Kargo seçenekleri, vergi hesaplaması ve form validasyonu içeren simüle edilmiş ödeme ekranı.
*   **Sipariş Takibi & Geçmişi:** `localStorage` tabanlı kalıcı sipariş geçmişi ve detaylı kargo takip sayfası.
*   **Responsive Tasarım:** CSS Grid ve Flexbox ile tüm cihazlarla uyumlu arayüz.

## 🛠 Kullanılan Teknolojiler ve Yöntemler

*   **Core:** HTML5, CSS3, JavaScript (ES6 Modules)
*   **Data Handling:** `fetch` API (Async/Await), `localStorage` (Data Persistence)
*   **Architecture:** MVC (Model-View-Controller) benzeri modüler yapı.
*   **Libraries:** `DayJS` (Tarih formatlama ve teslimat hesaplamaları için).
*   **Utility:** Merkezi para birimi formatlama (`formatCurrency`).

## 📂 Proje Yapısı

```
/
├── data/           # Veri yönetimi (Cart, Products, Orders)
├── scripts/        # Uygulama mantığı (DOM manipülasyonu, Event Listener'lar)
├── styles/         # Sayfa bazlı ve genel CSS dosyaları
├── index.html      # Ana Sayfa
├── checkout.html   # Ödeme Sayfası
├── orders.html     # Sipariş Geçmişi
└── tracking.html   # Kargo Takibi
```

## 🚀 Kurulum

Proje statik dosyalardan oluştuğu için herhangi bir kuruluma (npm install vb.) ihtiyaç duymaz.
1. Projeyi indirin.
2. VS Code **Live Server** eklentisi ile `index.html` dosyasını açın.
*(Not: ES Modülleri güvenlik nedeniyle doğrudan dosya sistemi üzerinden çalışmayabilir, bir yerel sunucu gereklidir.)*
