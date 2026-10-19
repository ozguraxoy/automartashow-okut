# AUTOMARTASHOW · Canlı QR okutma sayfası

Martaş Otomotiv AUTOMARTASHOW 2026 katılımcı kayıt uygulamasının canlı kamera ile QR okutma sayfası.

Google, Apps Script uygulamalarının içinde canlı kameraya izin vermediği için okutma ekranı burada, GitHub Pages üzerinde çalışır:
**https://ozguraxoy.github.io/automartashow-okut/okut.html**

- Uygulamadaki **QR OKUT** düğmesi bu sayfayı oturum bilgisiyle açar (adresin `#` kısmında; bu kısım hiçbir sunucuya gönderilmez).
- Kamera sürekli tarar; QR kod görülür görülmez uygulamanın sunucusuna gönderilir ve eşleşme Google E-Tablo'ya kaydedilir.
- İnternet kesilirse okutmalar telefonda bekletilir, bağlantı gelince gönderilir.
- Sayfa yalnızca uygulamanın kendi adresine (script.google.com/macros/s/…/exec) istek gönderir.

Güncellemek için `okut.html` dosyasını yenisiyle değiştirmeniz yeterlidir.
