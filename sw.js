/* sw.js — Beresin online + offline (v83, dipercepat + lisensi + terjemahan menyeluruh).
   - Aset berversi (?v=NN), ikon, dan pdf.js: CACHE-FIRST — langsung dari cache tanpa tanya jaringan (dulu: tiap aset diunduh ulang di setiap buka).
   - Halaman (index.html): LANGSUNG dari cache (instan), lalu diam-diam disegarkan hanya bila versi asetnya sama.
     Versi baru tetap sampai lewat sw.js (nama cache V berubah) → tombol "Muat ulang".
   - Aset berat (pdf.js) dihangatkan saat aplikasi sudah tenang (pesan 'WARM'), bukan saat instal pertama.
   - Yang tidak berversi (manifest, font): stale-while-revalidate. */
const V = 'beresin-v84';
const CORE = ['./', 'index.html', 'lic-config.js?v=84', 'lic.js?v=84', 'lic.css?v=84', 'app.css?v=84', 'perf2.js?v=84', 'perf3.js?v=84', 'app.js?v=84', 'habit.js?v=84', 'habit.css?v=84', 'note.css?v=84', 'note.js?v=84', 'hicons.webp?v=84', 'online.js?v=84', 'activity.js?v=84', 'inbox.js?v=84', 'inbox.css?v=84', 'smart.js?v=84', 'smart.css?v=84', 'scan.js?v=84', 'scan.css?v=84', 'pages.css?v=84', 'pages.js?v=84', 'study.css?v=84', 'campus.css?v=84', 'study.js?v=84', 'quick.css?v=84', 'tasks.css?v=84', 'lite.css?v=84', 'i18n.css?v=84', 'i18n-dict.js?v=84', 'i18n-dict2.js?v=84', 'i18n-dict3.js?v=84', 'i18n-dict4.js?v=84', 'i18n-tpl.js?v=84', 'i18n-bank.js?v=84', 'i18n.js?v=84', 'quick.js?v=84', 'banks.js?v=84', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-192.png', 'icon-maskable-512.png'];
const HEAVY = ['pdfjs/pdf.min.mjs', 'pdfjs/pdf.worker.min.mjs'];
const ver = t => { const m = /app\.js\?v=(\d+)/.exec(t); return m && m[1]; };
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => Promise.all(CORE.map(u => c.add(u).catch(() => {}))))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
  else if (e.data === 'WARM') e.waitUntil(caches.open(V).then(c => Promise.all(HEAVY.map(u => c.match(u).then(h => h || c.add(u).catch(() => {}))))));
});
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url), same = u.origin === location.origin, font = /(fonts\.(googleapis|gstatic)\.com|cdn\.jsdelivr\.net)$/.test(u.hostname);
  if (!same && !font) return;
  if (r.mode === 'navigate') {
    e.respondWith((async () => {
      const cached = await caches.match('index.html') || await caches.match('./');
      if (!cached) return fetch(r);
      /* segarkan di latar belakang; simpan hanya bila versi aset sama (agar cache tetap satu set yang konsisten) */
      e.waitUntil(fetch('index.html', { cache: 'no-cache' }).then(async x => {
        if (!x || !x.ok) return; const t = await x.clone().text(), old = await cached.clone().text();
        if (ver(t) && ver(t) === ver(old) && t !== old) (await caches.open(V)).put('index.html', x);
      }).catch(() => {}));
      return cached;
    })());
    return;
  }
  const versioned = same && (u.searchParams.has('v') || /\.(png|webp|woff2?)$/.test(u.pathname) || u.pathname.includes('/pdfjs/'));
  if (versioned) {
    e.respondWith(caches.match(r).then(hit => hit || fetch(r).then(x => { if (x && x.ok) { const c = x.clone(); caches.open(V).then(k => k.put(r, c)); } return x; })));
    return;
  }
  e.respondWith(caches.match(r).then(hit => {
    const net = fetch(r).then(x => { if (x && (x.ok || x.type === 'opaque')) { const c = x.clone(); caches.open(V).then(k => k.put(r, c)); } return x; }).catch(() => hit);
    return hit || net;
  }));
});
