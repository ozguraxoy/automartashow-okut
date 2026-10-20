/* AUTOMARTASHOW · çevrimdışı açılış
 * Sayfalar her zaman önce internetten alınır (güncel sürüm); internet yoksa ya da çok yavaşsa son kaydedilen kopya açılır.
 * Böylece fuar alanında çekim zayıfken de uygulama açılır, kişisel QR kod görünür, okutmalar telefonda sıraya alınır.
 * Sunucuya giden istekler (Google Apps Script) ve POST'lar hiç ele alınmaz; tarayıcı onları doğrudan gönderir. */
'use strict';
var SURUM = 'ams-287f8c34fb';
var KOK = new URL('./', self.location.href).href;
var SAYFALAR = [KOK, KOK + 'okut.html'];
var DOSYALAR = ['ikon-32.png', 'ikon-180.png', 'ikon-192.png', 'ikon-512.png', 'ikon-maskable-512.png', 'manifest.webmanifest'].map(function (f) { return KOK + f; });
var KUTUPHANELER = [
  'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jsQR/1.4.0/jsQR.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'
];
var BEKLEME = 6000; // internet bu süre içinde yanıt vermezse kayıtlı kopya açılır

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(SURUM).then(function (c) {
    var hepsi = SAYFALAR.concat(DOSYALAR).map(function (u) {
      return fetch(u, { cache: 'reload' }).then(function (r) { if (r.ok) return c.put(u, r); }).catch(function () {});
    }).concat(KUTUPHANELER.map(function (u) {
      return fetch(u, { mode: 'no-cors' }).then(function (r) { return c.put(u, r); }).catch(function () {});
    }));
    return Promise.all(hepsi);
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k.indexOf('ams-') === 0 && k !== SURUM; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function sayfaAnahtari(u) { return /\/okut\.html$/.test(u.pathname) ? KOK + 'okut.html' : KOK; }

self.addEventListener('fetch', function (e) {
  var q = e.request;
  if (q.method !== 'GET') return;
  var u = new URL(q.url);
  if (u.origin === self.location.origin && u.href.indexOf(KOK) === 0) {
    if (q.mode === 'navigate') {
      var anahtar = sayfaAnahtari(u);
      e.respondWith(new Promise(function (ok) {
        var bitti = false;
        var yedek = function () { return caches.match(anahtar).then(function (r) { return r || null; }); };
        var sure = setTimeout(function () { yedek().then(function (r) { if (r && !bitti) { bitti = true; ok(r); } }); }, BEKLEME);
        fetch(q).then(function (r) {
          if (r.ok) { var kopya = r.clone(); caches.open(SURUM).then(function (c) { c.put(anahtar, kopya); }); }
          clearTimeout(sure);
          if (!bitti) { bitti = true; ok(r); }
        }, function () {
          clearTimeout(sure);
          yedek().then(function (r) { if (!bitti) { bitti = true; ok(r || Response.error()); } });
        });
      }));
      return;
    }
    // Simgeler ve bildirim dosyası: önce internet, yoksa kayıtlı kopya
    e.respondWith(fetch(q).catch(function () { return caches.match(u.href).then(function (r) { return r || Response.error(); }); }));
    return;
  }
  // Sürüm numaralı kütüphaneler değişmez: kayıtlı kopya varsa o
  if (KUTUPHANELER.indexOf(u.href) >= 0) {
    e.respondWith(caches.match(u.href).then(function (r) { return r || fetch(q); }));
  }
});
