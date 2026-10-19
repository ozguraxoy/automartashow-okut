# AUTOMARTASHOW · Katılımcı kayıt ve QR eşleşme uygulaması

Martaş Otomotiv AUTOMARTASHOW 2026 uygulamasının ekranları. Veriler Martaş'ın Google E-Tablo'sunda tutulur; sunucu tarafı aynı e-tabloya bağlı Google Apps Script'tir.

- **Uygulama:** https://ozguraxoy.github.io/automartashow-okut/
- **Fuar kayıt bağlantısı:** https://ozguraxoy.github.io/automartashow-okut/?kayit
- **Canlı QR okutma:** https://ozguraxoy.github.io/automartashow-okut/okut.html

Neden Google adresinde değil: Google, Apps Script sayfalarını kendi çerçevesinin içinde açar. iPhone Safari bu çerçevedeki
oturum bilgisini Safari kapanınca siler, canlı kamera bu çerçevede çalışmaz ve sayfanın üstünde Google uyarı şeridi çıkar.
Burada uygulama kendi adresinde çalışır; sunucuya Apps Script'in `doPost` kapısından bağlanır (`{fn, arg}` isteği,
yalnızca uygulamanın kullandığı işlevler açıktır ve her biri kendi oturum ve yetki kontrolünü yapar).

Telefonda **ANA EKRANA EKLE** düğmesi uygulamayı Martaş M simgesiyle ana ekrana ekler. iPhone'da ana ekran uygulaması Safari'den
ayrı bir depolama kullandığı için kısayolun adresine oturum anahtarı (`?s=`) yazılır; anahtar yalnızca uygulama ana ekrandan
açıldığında ve telefonda oturum yokken kullanılır, sonra adresten silinir. Android'de `manifest.webmanifest` ile Chrome'un
yükleme penceresi açılır. `sw.js` sayfaları önce internetten alır, internet yoksa son kopyayı açar (çevrimdışı açılış).

Eski Google bağlantısı ve basılı QR kodları çalışmaya devam eder: açan kişi bu adrese aktarılır
(e-tablodaki AYARLAR > `UYGULAMA_ADRESI`; boşaltılırsa uygulama eskisi gibi Google adresinde açılır).

Sayfalar `gh-pages` dalından yayınlanır; değişiklikler `main` ve `gh-pages` dallarının ikisine de gönderilir.
