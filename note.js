/* note.js — menu My Note v8.3. Catatan teks & checklist, warna, kategori, sematkan, arsip, sampah (30 hari), cari, urutkan, tampilan grid/daftar.
   v8.3: editor teks kaya (kutipan, blok kode, H1-H3, tebal, miring, garis bawah, coret, tautan); isi tersimpan di n.html (disanitasi) + n.body (teks polos untuk cari/salin/kartu).
   Data: localStorage "mo-note-v1" (otomatis ikut Cadangan & Sambung Perangkat karena awalan "mo-"). */
(function () {
  "use strict";
  var KEY = "mo-note-v1", M = window.MyOffice = window.MyOffice || {};
  var DAY = 864e5, PAGE = 60;
  var COLORS = [["", "Putih"], ["kuning", "Kuning"], ["persik", "Persik"], ["pink", "Merah muda"], ["ungu", "Ungu"], ["biru", "Biru"], ["hijau", "Hijau"], ["abu", "Abu-abu"]];
  var SORTS = [["upd", "Terakhir diubah"], ["cre", "Terakhir dibuat"], ["ttl", "Judul A-Z"]];
  var DEFCATS = ["Pribadi", "Kuliah", "Kerja", "Ide"];
  var I = {
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 3h6l-1 6 3 3v2H7v-2l3-3-1-6z"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 11v6M14 11v6"/></svg>',
    arch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="5" rx="1.5"/><path d="M5 9v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9M10 13h4"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2.5"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
    dup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="13" height="13" rx="2.5"/><path d="M4 16a2 2 0 0 1-1-1.7V5a2 2 0 0 1 2-2h9.3a2 2 0 0 1 1.7 1M14.5 12v6M11.5 15h6"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3M7 8l5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    undo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-15-6.7L3 13"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.2"/></svg>',
    cl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m3.5 6.5 2 2 3.5-4M3.5 16.5l2 2 3.5-4M13 7h8M13 17h8"/></svg>',
    quote: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 17.5v-5.2c0-3.6 1.8-6 5-6.8l.7 1.5c-1.8.7-2.7 2-2.8 3.5H10a1.6 1.6 0 0 1 1.6 1.6v4.4a1.6 1.6 0 0 1-1.6 1.6H6.1a1.6 1.6 0 0 1-1.6-1.6zm9 0v-5.2c0-3.6 1.8-6 5-6.8l.7 1.5c-1.8.7-2.7 2-2.8 3.5H19a1.6 1.6 0 0 1 1.6 1.6v4.4a1.6 1.6 0 0 1-1.6 1.6h-3.9a1.6 1.6 0 0 1-1.6-1.6z"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M13.2 5.5l-2.4 13"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3.1-3.1a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3.1 3.1a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2"/></svg>',
    txt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>'
  };
  var NOTE = '<svg class="nt-lg" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-note"/></svg>';

  var S = load(), ui = { f: "all", cat: "", q: "", edit: null, shown: PAGE, isNew: false }, ov, body, sheet, dlg, toastEl, toastT, saveT, undoFn, listEl, dirty = false, lnk, lnkCtx = null, savedRange = null, richDirty = false, selRaf = 0;

  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function load() {
    var d; try { d = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
    d = d && typeof d === "object" ? d : {};
    d.notes = Array.isArray(d.notes) ? d.notes : [];
    if (!Array.isArray(d.cats)) d.cats = DEFCATS.map(function (n) { return { id: uid(), name: n }; });
    d.view = d.view === "list" ? "list" : "grid"; d.sort = SORTS.some(function (s) { return s[0] === d.sort; }) ? d.sort : "upd";
    var now = Date.now(), n0 = d.notes.length;
    d.notes = d.notes.filter(function (n) { return n && n.id && !(n.trash && now - n.trash > 30 * DAY); });
    d.notes.forEach(function (n) { n.items = Array.isArray(n.items) ? n.items : []; n.type = n.type === "list" ? "list" : "text"; n.title = n.title || ""; n.body = n.body || ""; });
    if (n0 !== d.notes.length) try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
    return d;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast("Penyimpanan penuh"); } }
  function byId(id) { for (var i = 0; i < S.notes.length; i++) if (S.notes[i].id === id) return S.notes[i]; return null; }
  function catName(id) { for (var i = 0; i < S.cats.length; i++) if (S.cats[i].id === id) return S.cats[i].name; return ""; }
  function isEmpty(n) { return !n.title.trim() && !n.body.trim() && !n.items.some(function (i) { return i.t.trim(); }); }
  function plain(n) { return n.type === "list" ? n.items.map(function (i) { return (i.d ? "[x] " : "[ ] ") + i.t; }).join("\n") : n.body; }
  function words(n) { var t = (n.title + " " + (n.type === "list" ? n.items.map(function (i) { return i.t; }).join(" ") : n.body)).trim(); return t ? t.split(/\s+/).length : 0; }
  function dayStart(t) { var d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); }
  function when(t, long) {
    var d = new Date(t), diff = Math.round((dayStart(Date.now()) - dayStart(t)) / DAY), tm = "";
    try { tm = d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }); } catch (e) {}
    if (long) { try { return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) + " · " + tm; } catch (e) { return ""; } }
    if (diff === 0) return "Hari ini"; if (diff === 1) return "Kemarin";
    try { return d.toLocaleDateString("id-ID", d.getFullYear() === new Date().getFullYear() ? { day: "numeric", month: "short" } : { day: "numeric", month: "short", year: "numeric" }); } catch (e) { return ""; }
  }

  /* ---------- daftar ---------- */
  function visible() {
    var q = ui.q.trim().toLowerCase(), f = ui.f, c = ui.cat;
    var l = S.notes.filter(function (n) {
      if (f === "trash") return !!n.trash; if (n.trash) return false;
      if (f === "arch") { if (!n.arch) return false; } else if (n.arch) return false;
      if (c && n.cat !== c) return false;
      if (!q) return true;
      return (n.title + " " + plain(n) + " " + catName(n.cat)).toLowerCase().indexOf(q) >= 0;
    });
    var k = S.sort;
    l.sort(function (a, b) {
      if (f === "all" && !!a.pin !== !!b.pin) return a.pin ? -1 : 1;
      if (f === "trash") return b.trash - a.trash;
      if (k === "ttl") return (a.title || "~").localeCompare(b.title || "~", "id");
      return (k === "cre" ? b.cre - a.cre : b.upd - a.upd);
    });
    return l;
  }
  function counts() {
    var c = { all: 0, arch: 0, trash: 0, pin: 0 };
    S.notes.forEach(function (n) { if (n.trash) c.trash++; else if (n.arch) c.arch++; else { c.all++; if (n.pin) c.pin++; } });
    return c;
  }
  function card(n, i) {
    var tr = !!n.trash, h = '<article class="nt-nc" data-c="' + esc(n.color) + '" data-id="' + n.id + '" style="--i:' + Math.min(i, 12) + '">';
    h += '<button class="nt-open" data-act="open" aria-label="' + esc(n.title || "(Tanpa judul)") + '"></button>';
    if (!tr) h += '<button class="nt-pinb' + (n.pin ? " on" : "") + '" data-act="pin" aria-label="' + (n.pin ? "Lepas sematan" : "Sematkan") + '" aria-pressed="' + !!n.pin + '">' + I.pin + "</button>";
    h += '<h3 dir="auto"' + (n.title.trim() ? " data-no-i18n" : "") + ">" + (n.title.trim() ? esc(n.title) : '<i class="nt-untitled">(Tanpa judul)</i>') + "</h3>";
    var thumb = tr || n.type === "list" ? "" : firstImg(n);
    if (thumb) h += '<img class="nt-thumb" alt="" src="' + thumb + '">';
    if (n.type === "list") {
      var its = n.items.filter(function (x) { return x.t.trim(); }), dn = its.filter(function (x) { return x.d; }).length;
      if (!its.length) h += '<p class="nt-pv nt-dim">Checklist kosong</p>';
      else {
        h += '<ul class="nt-cl">' + its.slice(0, 5).map(function (x) { return '<li class="' + (x.d ? "d" : "") + '"><i>' + (x.d ? I.check : "") + '</i><span dir="auto" data-no-i18n>' + esc(x.t) + "</span></li>"; }).join("") + "</ul>";
        if (its.length > 5) h += '<p class="nt-more">+' + (its.length - 5) + " item lagi</p>";
        h += '<div class="nt-prog"><i style="width:' + Math.round(dn / its.length * 100) + '%"></i></div><p class="nt-more">' + dn + " dari " + its.length + " selesai</p>";
      }
    } else if (n.body.trim()) h += '<p class="nt-pv" dir="auto" data-no-i18n>' + esc(n.body.trim().slice(0, 360)) + "</p>";
    else if (!n.title.trim() && !thumb) h += '<p class="nt-pv nt-dim">Kosong</p>';
    h += '<footer>' + (n.cat && catName(n.cat) ? '<span class="nt-pill">' + esc(catName(n.cat)) + "</span>" : "") + '<time>' + when(tr ? n.trash : n.upd) + "</time></footer>";
    if (tr) h += '<div class="nt-tracts"><button data-act="restore">Pulihkan</button><button class="bad" data-act="purge">Hapus permanen</button></div>';
    return h + "</article>";
  }
  /* tata letak masonry: kartu dibagi ke kolom terpendek (stabil di semua browser) */
  function nCols() { var w = body ? body.clientWidth : 390, list = S.view === "list"; if (list) return w >= 900 ? 2 : 1; return w >= 960 ? 4 : w >= 680 ? 3 : 2; }
  function est(n) {
    var h = 92 + (n.title.length > 22 ? 22 : 0);
    if (n.type === "list") h += Math.min(n.items.filter(function (i) { return i.t.trim(); }).length, 5) * 25 + 28; else h += Math.min(Math.ceil(n.body.length / 26) + (n.body.split("\n").length - 1), 7) * 21;
    return h;
  }
  function grid(l, k0) {
    var c = nCols(), cols = [], hs = [], i, k = k0;
    for (i = 0; i < c; i++) { cols.push(""); hs.push(0); }
    l.forEach(function (n) { var m = 0; for (i = 1; i < c; i++) if (hs[i] < hs[m]) m = i; cols[m] += card(n, k++); hs[m] += est(n) + 12; });
    return '<div class="nt-grid" data-n="' + c + '">' + cols.map(function (x) { return '<div class="nt-col">' + x + "</div>"; }).join("") + "</div>";
  }
  function emptyHtml() {
    var m = { all: ["Belum ada catatan", "Mulai dengan menulis catatan pertamamu."], arch: ["Arsip kosong", "Catatan yang kamu arsipkan akan muncul di sini."], trash: ["Sampah kosong", "Catatan yang dihapus disimpan 30 hari sebelum dihapus permanen."] }[ui.f];
    if (ui.q.trim() || (ui.cat && ui.f === "all" && S.notes.length)) m = ["Tidak ada hasil", "Coba kata kunci atau kategori lain."];
    return '<div class="nt-empty">' + NOTE + "<h3>" + m[0] + "</h3><p>" + m[1] + "</p>" + (ui.f === "all" && !ui.q.trim() && !ui.cat ? '<button class="nt-cta" data-act="new">' + I.plus + "<span>Buat catatan</span></button>" : "") + "</div>";
  }
  function listHtml() {
    var l = visible(), h = "";
    if (!l.length) return emptyHtml();
    if (ui.f === "trash") h += '<div class="nt-note"><span>Catatan di sampah dihapus otomatis setelah 30 hari.</span><button data-act="empty">Kosongkan sampah</button></div>';
    var shown = l.slice(0, ui.shown), pin = ui.f === "all" ? shown.filter(function (n) { return n.pin; }) : [], rest = ui.f === "all" ? shown.filter(function (n) { return !n.pin; }) : shown, k = 0;
    if (pin.length) { h += '<h4 class="nt-sh">Disematkan</h4>' + grid(pin, k); k += pin.length; }
    if (rest.length) { h += (pin.length ? '<h4 class="nt-sh">Catatan lain</h4>' : "") + grid(rest, k); }
    if (l.length > shown.length) h += '<button class="nt-moreb" data-act="more">Tampilkan lebih banyak</button>';
    return h;
  }
  function chipsHtml() {
    var c = counts(), h = '<button type="button" data-act="f" data-v="all" aria-pressed="' + (ui.f === "all" && !ui.cat) + '">Semua<b>' + c.all + "</b></button>";
    S.cats.forEach(function (x) { h += '<button type="button" data-act="cat" data-v="' + x.id + '" aria-pressed="' + (ui.f === "all" && ui.cat === x.id) + '">' + esc(x.name) + "</button>"; });
    h += '<button type="button" class="ed" data-act="cats" aria-label="Kelola kategori">' + I.tag + "</button><i class=\"sp\"></i>";
    h += '<button type="button" data-act="f" data-v="arch" aria-pressed="' + (ui.f === "arch") + '">' + I.arch + "<span>Arsip</span>" + (c.arch ? "<b>" + c.arch + "</b>" : "") + "</button>";
    h += '<button type="button" data-act="f" data-v="trash" aria-pressed="' + (ui.f === "trash") + '">' + I.trash + "<span>Sampah</span>" + (c.trash ? "<b>" + c.trash + "</b>" : "") + "</button>";
    return h;
  }
  function heroHtml() {
    var c = counts();
    return '<section class="nt-hero"><div class="nt-hero-t"><h1>Catatanku</h1><p>Tulis, simpan, dan temukan idemu kapan saja.</p><div class="nt-stat"><span><b>' + c.all + "</b> catatan</span><span><b>" + c.pin + "</b> disematkan</span></div></div>" + NOTE.replace("nt-lg", "nt-lg nt-float") + "</section>";
  }
  function sortLabel() { for (var i = 0; i < SORTS.length; i++) if (SORTS[i][0] === S.sort) return SORTS[i][1]; return ""; }
  function render() {
    if (!ov) return;
    ov.querySelector(".nt-chips").innerHTML = chipsHtml();
    ov.querySelector("[data-act=view]").innerHTML = S.view === "grid" ? I.list : I.grid;
    ov.querySelector("[data-act=view]").setAttribute("aria-label", S.view === "grid" ? "Tampilan daftar" : "Tampilan grid");
    ov.querySelector("[data-act=sort] span").textContent = sortLabel();
    body.setAttribute("data-view", S.view);
    var hero = ui.f === "all" && !ui.q.trim() && !ui.cat && S.notes.some(function (n) { return !n.trash && !n.arch; });
    body.innerHTML = (hero ? heroHtml() : "") + '<div class="nt-list">' + listHtml() + "</div>";
    listEl = body.querySelector(".nt-list");
    refreshLang();
  }
  function renderList() { if (!listEl) return render(); lastC = nCols(); listEl.innerHTML = listHtml(); refreshLang(); }
  function refreshLang() { /* terjemahan elemen baru ditangani MutationObserver i18n.js */ }

  /* ---------- toast ---------- */
  function toast(msg, undo) {
    if (!ov) return; if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "nt-toast"; toastEl.setAttribute("role", "status"); ov.querySelector(".nt-win").appendChild(toastEl); }
    undoFn = undo || null; toastEl.innerHTML = "<span>" + esc(msg) + "</span>" + (undo ? '<button data-act="undo">' + I.undo + "<span>Urungkan</span></button>" : "");
    toastEl.classList.remove("on"); void toastEl.offsetWidth; toastEl.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove("on"); undoFn = null; }, undo ? 5200 : 2200); refreshLang();
  }

  /* ---------- aksi catatan ---------- */
  function touch(n) { n.upd = Date.now(); }
  function act(a, id) {
    var n = id ? byId(id) : null;
    if (a === "pin" && n) { n.pin = !n.pin; save(); renderList(); updHero(); toast(n.pin ? "Disematkan" : "Sematan dilepas"); }
    else if (a === "restore" && n) { n.trash = 0; save(); render(); toast("Dipulihkan"); }
    else if (a === "purge" && n) { if (confirm("Hapus catatan ini secara permanen?")) { S.notes = S.notes.filter(function (x) { return x !== n; }); save(); render(); toast("Dihapus permanen"); } }
  }
  function updHero() { var h = body.querySelector(".nt-hero"); if (h) { var c = counts(), b = h.querySelectorAll(".nt-stat b"); if (b[0]) b[0].textContent = c.all; if (b[1]) b[1].textContent = c.pin; } }
  function toTrash(n) {
    var was = { pin: n.pin }; n.trash = Date.now(); n.pin = false; save(); closeEditor(true); render();
    toast("Dipindahkan ke sampah", function () { n.trash = 0; n.pin = was.pin; save(); render(); });
  }

  /* ---------- editor ---------- */
  function newNote(type) { var t = Date.now(); return { id: uid(), title: "", type: type || "text", body: "", items: [], color: "", cat: ui.cat || "", pin: false, arch: false, trash: 0, cre: t, upd: t }; }
  function openEditor(id, isNew) {
    var n = isNew ? newNote() : byId(id); if (!n) return;
    if (isNew) { S.notes.unshift(n); } ui.edit = n.id; ui.isNew = !!isNew; dirty = false; buildSheet(n);
    sheet.hidden = false; requestAnimationFrame(function () { sheet.classList.add("on"); if (isNew) { var t = sheet.querySelector(".nt-ti"); if (t) t.focus(); } });
    refreshLang();
  }
  function colorDots(n) { return COLORS.map(function (c) { return '<button type="button" class="nt-dot" data-act="color" data-v="' + c[0] + '" data-c="' + c[0] + '" aria-label="' + c[1] + '" aria-pressed="' + (n.color === c[0]) + '">' + I.check + "</button>"; }).join(""); }
  function catChips(n) {
    return '<button type="button" data-act="setcat" data-v="" aria-pressed="' + !n.cat + '">Tanpa kategori</button>' + S.cats.map(function (c) { return '<button type="button" data-act="setcat" data-v="' + c.id + '" aria-pressed="' + (n.cat === c.id) + '">' + esc(c.name) + "</button>"; }).join("") + '<button type="button" class="ed" data-act="cats" aria-label="Kelola kategori">' + I.plus + "</button>";
  }
  function itemRow(it) { return '<li class="nt-it' + (it.d ? " d" : "") + '" data-i="' + it.id + '"><button type="button" class="nt-ck" data-act="tick" aria-label="Tandai selesai" aria-pressed="' + !!it.d + '">' + I.check + '</button><input type="text" dir="auto" data-f="it" value="' + esc(it.t) + '" placeholder="Item baru" maxlength="300"><button type="button" class="nt-rm" data-act="rmit" aria-label="Hapus item">' + I.x + "</button></li>"; }
  function bodyHtml(n) {
    if (n.type === "list") return '<ul class="nt-items">' + n.items.map(itemRow).join("") + '</ul><button type="button" class="nt-addit" data-act="addit">' + I.plus + "<span>Tambah item</span></button>";
    var h = richHtml(n);
    return '<div class="nt-rw" data-empty="' + (blankRich(h) ? 1 : 0) + '"><div class="nt-rte" contenteditable="true" role="textbox" aria-multiline="true" aria-label="Isi catatan" data-f="rich" spellcheck="true" autocapitalize="sentences">' + h + '</div><span class="nt-ph" aria-hidden="true">Tulis sesuatu di sini</span></div>';
  }
  function buildSheet(n) {
    sheet.setAttribute("data-c", n.color);
    sheet.innerHTML = '<div class="nt-ed" role="dialog" aria-modal="true" aria-label="Editor catatan">' +
      '<header class="nt-eh"><button class="nt-ic" data-act="eclose" aria-label="Kembali">' + I.back + '</button><span class="nt-st" aria-live="polite">Tersimpan</span><button class="nt-ic nt-pinx' + (n.pin ? " on" : "") + '" data-act="epin" aria-label="' + (n.pin ? "Lepas sematan" : "Sematkan") + '" aria-pressed="' + !!n.pin + '">' + I.pin + '</button><button class="nt-ic" data-act="edone" aria-label="Selesai">' + I.check + "</button></header>" +
      (n.type === "text" ? fmtBar() + tbarHtml() : "") + '<div class="nt-eb"><input class="nt-ti" type="text" dir="auto" data-f="title" maxlength="120" placeholder="Judul" value="' + esc(n.title) + '">' +
      '<div class="nt-mode" role="tablist"><button type="button" data-act="type" data-v="text" aria-pressed="' + (n.type === "text") + '">' + I.txt + "<span>Teks</span></button><button type=\"button\" data-act=\"type\" data-v=\"list\" aria-pressed=\"" + (n.type === "list") + '">' + I.cl + "<span>Checklist</span></button></div>" +
      '<div class="nt-content">' + bodyHtml(n) + "</div></div>" +
      '<footer class="nt-ef"><div class="nt-row nt-colors" aria-label="Warna">' + colorDots(n) + '</div><div class="nt-row nt-cats">' + catChips(n) + "</div>" +
      '<div class="nt-bar"><span class="nt-meta"></span><div class="nt-tools2">' +
      '<button class="nt-ic" data-act="dup" aria-label="Duplikat">' + I.dup + '</button><button class="nt-ic" data-act="copy" aria-label="Salin">' + I.copy + "</button>" +
      (navigator.share ? '<button class="nt-ic" data-act="share" aria-label="Bagikan">' + I.share + "</button>" : "") +
      '<button class="nt-ic" data-act="earch" aria-label="' + (n.arch ? "Keluarkan dari arsip" : "Arsipkan") + '">' + I.arch + '</button><button class="nt-ic bad" data-act="edel" aria-label="Hapus">' + I.trash + "</button></div></div></footer></div>";
    meta(n); autosize();
  }
  function meta(n) { var m = sheet.querySelector(".nt-meta"); if (m) m.textContent = "Diubah " + when(n.upd, true) + " · " + words(n) + " kata"; }
  function autosize() { var t = sheet.querySelector(".nt-ta"); if (t) { t.style.height = "auto"; t.style.height = Math.max(t.scrollHeight, 160) + "px"; } }
  function status(s) { var e = sheet && sheet.querySelector(".nt-st"); if (e && e.textContent !== s) { e.textContent = s; refreshLang(); } }
  function queueSave(n) { dirty = true; status("Menyimpan…"); clearTimeout(saveT); saveT = setTimeout(function () { flush(n); }, 450); }
  function flush(n) { clearTimeout(saveT); if (!n || !dirty) return; if (richDirty) syncRich(n); touch(n); dirty = false; if (!(ui.isNew && isEmpty(n))) save(); status("Tersimpan"); meta(n); }
  function cur() { return ui.edit ? byId(ui.edit) : null; }
  function closeEditor(silent) {
    voiceStop(); closePop(false); if (dr && !dr.hidden) drawClose();
    var n = cur();
    if (n) { flush(n); if (isEmpty(n) && !n.trash) { S.notes = S.notes.filter(function (x) { return x !== n; }); save(); } }
    if (lnk) { lnk.hidden = true; lnk.innerHTML = ""; } richDirty = false; savedRange = null; ui.edit = null; ui.isNew = false; sheet.classList.remove("on"); sheet.hidden = true; sheet.innerHTML = "";
    ov.setAttribute("data-pg-keep", "1"); setTimeout(function () { ov && ov.removeAttribute("data-pg-keep"); }, 600);
    if (!silent) render();
  }
  function convert(n, to) {
    if (n.type === to) return;
    if (to === "list") { n.items = n.body.split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean).map(function (l) { var d = /^\[x\]\s*/i.test(l); return { id: uid(), t: l.replace(/^\[( |x)\]\s*/i, ""), d: d }; }); n.body = ""; if (!n.items.length) n.items.push({ id: uid(), t: "", d: false }); }
    else { n.body = n.items.filter(function (i) { return i.t.trim(); }).map(function (i) { return (i.d ? "[x] " : "") + i.t; }).join("\n"); n.items = []; }
    n.type = to; n.html = ""; dirty = true; flush(n); buildSheet(n);
    var f = sheet.querySelector(to === "list" ? ".nt-it input" : ".nt-rte"); if (f) f.focus(); refreshLang();
  }
  function onInput(e) {
    var f = e.target.getAttribute("data-f");
    if (f === "q") { ui.q = e.target.value; ui.shown = PAGE; clearTimeout(onInput.t); onInput.t = setTimeout(render2, 120); return; }
    var n = cur(); if (!n) return;
    if (f === "title") { n.title = e.target.value; queueSave(n); }
    else if (f === "body") { n.body = e.target.value; autosize(); queueSave(n); }
    else if (f === "rich") { richDirty = true; fixRoot(e.target); blankMark(e.target); queueSave(n); updFmt(); }
    else if (f === "it") { var it = findItem(n, e.target.closest(".nt-it")); if (it) { it.t = e.target.value; queueSave(n); } }
  }
  function render2() { if (ui.q.trim()) { var h = body.querySelector(".nt-hero"); if (h) h.remove(); renderList(); } else render(); }
  function findItem(n, li) { if (!li) return null; var id = li.getAttribute("data-i"); for (var i = 0; i < n.items.length; i++) if (n.items[i].id === id) return n.items[i]; return null; }
  function addItem(n, after) {
    var it = { id: uid(), t: "", d: false }, ix = n.items.length, ul = sheet.querySelector(".nt-items");
    if (after) { for (var i = 0; i < n.items.length; i++) if (n.items[i] === after) ix = i + 1; }
    n.items.splice(ix, 0, it); var tmp = document.createElement("div"); tmp.innerHTML = itemRow(it); var li = tmp.firstChild;
    var ref = ul.children[ix] || null; ul.insertBefore(li, ref); li.querySelector("input").focus(); dirty = true; queueSave(n); refreshLang();
  }
  function onKey(e) {
    var t = e.target;
    if (e.key === "Escape" && ov && !ov.hidden) {
      if (dr && !dr.hidden) { drawClose(); restoreEd(drRng); keep(); return; }
      if (popEl && !popEl.hidden) { closePop(true); keep(); return; }
      if (lnk && !lnk.hidden) { closeLink(); keep(); return; }
      if (dlg && !dlg.hidden) { closeDlg(); keep(); return; }
      if (ui.edit) { closeEditor(); return; }
      close(); return;
    }
    if (!ov || ov.hidden || !t || t.getAttribute("data-f") !== "it") return;
    var n = cur(), li = t.closest(".nt-it"), it = n && findItem(n, li); if (!it) return;
    if (e.key === "Enter") { e.preventDefault(); addItem(n, it); }
    else if (e.key === "Backspace" && !t.value && n.items.length > 1) { e.preventDefault(); var pr = li.previousElementSibling; n.items = n.items.filter(function (x) { return x !== it; }); li.remove(); var f = (pr || sheet.querySelector(".nt-it")); if (f) { var inp = f.querySelector("input"); inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); } queueSave(n); }
  }
  function keep() { ov.setAttribute("data-pg-keep", "1"); setTimeout(function () { ov && ov.removeAttribute("data-pg-keep"); }, 600); }

  /* ---------- kategori ---------- */
  function openDlg() {
    if (!dlg) { dlg = document.createElement("div"); dlg.className = "nt-dlg"; dlg.hidden = true; ov.querySelector(".nt-win").appendChild(dlg); dlg.addEventListener("click", click); dlg.addEventListener("input", dlgInput); dlg.addEventListener("keydown", function (e) { if (e.key === "Enter" && e.target.getAttribute("data-f") === "newcat") { e.preventDefault(); addCat(); } }); }
    drawDlg(); dlg.hidden = false; keep();
  }
  function drawDlg() {
    dlg.innerHTML = '<div class="nt-dc" role="dialog" aria-modal="true" aria-label="Kelola kategori"><h3>Kelola kategori</h3><ul>' +
      S.cats.map(function (c) { return '<li data-id="' + c.id + '"><input type="text" dir="auto" data-f="cn" maxlength="24" value="' + esc(c.name) + '" aria-label="Nama kategori"><button class="nt-ic bad" data-act="rmcat" aria-label="Hapus kategori">' + I.trash + "</button></li>"; }).join("") +
      '</ul><div class="nt-addc"><input type="text" dir="auto" data-f="newcat" maxlength="24" placeholder="Nama kategori"><button class="nt-cta sm" data-act="addcat">' + I.plus + "<span>Tambah</span></button></div><button class=\"nt-done\" data-act=\"dclose\">Selesai</button></div>";
    refreshLang();
  }
  function dlgInput(e) { if (e.target.getAttribute("data-f") === "cn") { var li = e.target.closest("li"), c = S.cats.filter(function (x) { return x.id === li.getAttribute("data-id"); })[0]; if (c) { c.name = e.target.value.trim() || c.name; save(); } } }
  function addCat() { var i = dlg.querySelector("[data-f=newcat]"), v = i.value.trim(); if (!v) { i.focus(); return; } if (S.cats.some(function (c) { return c.name.toLowerCase() === v.toLowerCase(); })) { i.select(); return; } S.cats.push({ id: uid(), name: v }); save(); drawDlg(); dlg.querySelector("[data-f=newcat]").focus(); }
  function closeDlg() { if (dlg) { dlg.hidden = true; dlg.innerHTML = ""; } var n = cur(); if (n && sheet.querySelector(".nt-cats")) sheet.querySelector(".nt-cats").innerHTML = catChips(n); render(); keep(); refreshLang(); }


  /* ---------- teks kaya (v8.4) ---------- */
  var BLK = { h1: "h1", h2: "h2", h3: "h3", h4: "h3", h5: "h3", h6: "h3", blockquote: "blockquote", pre: "pre" };
  var BLOCKISH = /^(div|p|h[1-6]|blockquote|pre|li|ul|ol|dl|dt|dd|table|thead|tbody|tfoot|tr|td|th|section|article|header|footer|main|nav|aside|figure|figcaption|address|details|summary|hr)$/;
  var SKIP = /^(script|style|meta|link|head|title|iframe|object|embed|noscript|template|svg|canvas|audio|video|img|input|button|select|textarea|form)$/;
  var SPAN_OK = /^(f-sans|f-serif|f-mono|z-s|z-l|z-xl)$/;
  var IMG_OK = /^data:image\/(png|jpe?g|gif|webp);base64,[A-Za-z0-9+\/=]+$/;
  var LEAF = "div,h1,h2,h3,blockquote,pre,li,td,th";
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  var FMT = [["quote", "Kutipan blok"], ["icode", "Kode sebaris"], ["code", "Blok kode"], 0, ["ul", "Daftar tidak bernomor"], ["ol", "Daftar bernomor"], 0, ["hr", "Garis pemisah"], ["table", "Tabel"], 0, ["h1", "Judul 1"], ["h2", "Judul 2"], ["h3", "Judul 3"], 0, ["bold", "Tebal"], ["italic", "Miring"], ["underline", "Garis bawah"], ["strike", "Coret"], 0, ["link", "Sisipkan tautan"], 0, ["voice", "Input suara"], ["image", "Sisipkan gambar"], ["draw", "Gambar / sketsa"], ["font", "Gaya teks"]];
  var IC = {
    icode: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7 3.5 12 8 17M16 7l4.5 5-4.5 5"/></svg>',
    ul: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M9.5 6.5h11M9.5 12h11M9.5 17.5h11"/><circle cx="4.5" cy="6.5" r="1.3" fill="currentColor" stroke="none"/><circle cx="4.5" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="4.5" cy="17.5" r="1.3" fill="currentColor" stroke="none"/></svg>',
    ol: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M10 6.5h10M10 12h10M10 17.5h10"/><path d="M3.2 5.6 4.6 4.8v4.4M3 14.2c0-1 3.4-1.3 3.4.8 0 .6-.5.9-1.1 1.4L3 18.4h3.6"/></svg>',
    hr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 12h16"/></svg>',
    table: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 10h18M3 15h18M9.5 4v16M14.5 4v16"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/></svg>',
    image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.7"/><path d="m21 16-5-5L6 20"/></svg>',
    pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4.5L19 9.5a2.1 2.1 0 0 0-3-3L5.5 17 4 20z"/><path d="M14 7l3 3"/></svg>',
    aa: '<span class="nt-aa">Aa</span>',
    eraser: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20H9L3.5 14.5a2 2 0 0 1 0-2.8L13 2.2a2 2 0 0 1 2.8 0L21 7.4a2 2 0 0 1 0 2.8L11 20"/></svg>'
  };
  var ICON = { quote: I.quote, icode: IC.icode, code: I.code, ul: IC.ul, ol: IC.ol, hr: IC.hr, table: IC.table, h1: '<span class="nt-hh">H<small>1</small></span>', h2: '<span class="nt-hh">H<small>2</small></span>', h3: '<span class="nt-hh">H<small>3</small></span>', bold: "B", italic: "I", underline: "U", strike: "S", link: I.link, voice: IC.mic, image: IC.image, draw: IC.pen, font: IC.aa };
  var DCOL = ["#1d2540", "#e5484d", "#2f6bff", "#27a86b", "#f5a524", "#8b5cf6"], DSZ = [2, 4, 8, 14];
  var popEl = null, popFn = null, popRng = null, popImg = null, imgIn = null, imgRng = null, recRng = null, rec = null, recWant = false;
  var dr = null, drC = null, drX = null, drT = { c: DCOL[0], w: DSZ[1], e: false }, drU = [], drOn = false, drLast = null, drDrawn = false, drRng = null, drW = 1, drH = 1, drDpr = 1;

    function safeHref(u) {
    u = String(u == null ? "" : u).trim();
    if (!u || /[\s\u0000-\u001f"<>]/.test(u)) return "";
    if (/^(https?:\/\/|mailto:|tel:)/i.test(u)) return /^https?:\/\/$/i.test(u) ? "" : u;
    if (/^[^\/\s]+:\d+(\/|$)/.test(u) && !/^[a-z][a-z0-9+.\-]*:\/\//i.test(u)) return "https://" + u;
    if (/^[a-z][a-z0-9+.\-]*:/i.test(u)) return "";
    if (/^[^\s@\/]+@[^\s@\/]+\.[^\s@\/]+$/.test(u)) return "mailto:" + u;
    if (u.slice(0, 2) === "//") u = u.slice(2);
    if (/^([a-z0-9\-]+\.)+[a-z]{2,}([\/?#:].*)?$/i.test(u) || /^localhost([\/?#:].*)?$/i.test(u)) return "https://" + u;
    return "";
  }
    function plainToHtml(t) {
    return String(t == null ? "" : t).replace(/\r/g, "").split("\n").map(function (l) { return '<div dir="auto">' + (l ? esc(l) : "<br>") + "</div>"; }).join("");
  }
  function mk(tag) { var el = document.createElement(tag); if (tag !== "hr" && tag !== "img" && tag !== "table" && tag !== "tbody" && tag !== "tr") el.setAttribute("dir", tag === "pre" ? "ltr" : "auto"); return el; }
  /* membersihkan HTML (isi sendiri / tempelan) jadi blok: div, h1-h3, blockquote, pre, ul/ol/li, table, hr, img + b/i/u/s/a/code/span(kelas f- dan z-)/br */
  function cleanEl(html) {
    var src; try { src = new DOMParser().parseFromString(String(html == null ? "" : html), "text/html").body; } catch (e) { src = document.createElement("div"); src.textContent = String(html || ""); }
    var out = document.createElement("div");
    function newBlock(H, tag) { var el = mk(tag); H.c.appendChild(el); return el; }
    function addText(d, fmt, H, tag, inPre) {
      if (!inPre) d = d.replace(/[\t\r\n\f]+/g, " "); else d = d.replace(/\r/g, "");
      if (!d) return;
      if (!H.cur) { if (!inPre && !d.trim()) return; H.cur = newBlock(H, tag); }
      else if (!inPre && !H.cur.firstChild && !d.trim()) return;
      var p = H.cur;
      fmt.forEach(function (f) {
        var tg = f.t;
        if (tg === "b" && /^h/.test(tag)) return;
        var last = p.lastChild;
        if (last && last.nodeType === 1 && last.tagName.toLowerCase() === tg && (tg !== "a" || last.getAttribute("href") === f.h) && (tg !== "span" || last.getAttribute("class") === f.c)) p = last;
        else { var el = document.createElement(tg); if (tg === "a") { el.setAttribute("href", f.h); el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener noreferrer"); } if (tg === "span") el.setAttribute("class", f.c); p.appendChild(el); p = el; }
      });
      if (inPre && d.indexOf("\n") >= 0) d.split("\n").forEach(function (part, i) { if (i) p.appendChild(document.createElement("br")); if (part) p.appendChild(document.createTextNode(part)); });
      else p.appendChild(document.createTextNode(d));
    }
    function addImg(el, H, tag) {
      var s = el.getAttribute("src") || "";
      if (!IMG_OK.test(s)) return;
      if (!H.cur) H.cur = newBlock(H, tag);
      var im = document.createElement("img"); im.setAttribute("src", s); im.setAttribute("alt", String(el.getAttribute("alt") || "").slice(0, 200)); H.cur.appendChild(im);
    }
    function addList(c, t, fmt, H, tag, inPre) {
      H.cur = null;
      var L = mk(t); H.c.appendChild(L);
      Array.prototype.forEach.call(c.childNodes, function (ch) {
        if (ch.nodeType === 3 && !ch.data.trim()) return;
        var li = mk("li"); L.appendChild(li);
        var sub = { c: li, cur: null };
        if (ch.nodeType === 1 && ch.tagName.toLowerCase() === "li") walkKids(ch, fmt, sub, "div", inPre); else one(ch, fmt, sub, "div", inPre);
        if (!li.firstChild) li.appendChild(document.createElement("br"));
      });
      if (!L.firstChild) H.c.removeChild(L);
      H.cur = null;
    }
    function addTable(c, fmt, H, tag, inPre) {
      var rows = Array.prototype.filter.call(c.querySelectorAll("tr"), function (r) { return r.closest("table") === c; });
      if (!rows.length) { walkKids(c, fmt, H, tag, inPre); return; }
      H.cur = null;
      var T = document.createElement("table"), TB = document.createElement("tbody"); T.appendChild(TB); H.c.appendChild(T);
      rows.forEach(function (r) {
        var tr = document.createElement("tr"); TB.appendChild(tr);
        Array.prototype.forEach.call(r.children, function (cell) {
          var t = cell.tagName.toLowerCase(); if (t !== "td" && t !== "th") return;
          var td = document.createElement(t); td.setAttribute("dir", "auto"); tr.appendChild(td);
          walkKids(cell, fmt, { c: td, cur: null }, "div", false);
          if (!td.firstChild) td.appendChild(document.createElement("br"));
        });
        if (!tr.firstChild) { var td0 = document.createElement("td"); td0.setAttribute("dir", "auto"); td0.appendChild(document.createElement("br")); tr.appendChild(td0); }
      });
      H.cur = null;
    }
    function one(c, fmt, H, tag, inPre) {
      if (c.nodeType === 3) { addText(c.data, fmt, H, tag, inPre); return; }
      if (c.nodeType !== 1) return;
      var t = c.tagName.toLowerCase();
      if (t === "img") { addImg(c, H, tag); return; }
      if (SKIP.test(t)) return;
      if (t === "br") { if (!H.cur) H.cur = newBlock(H, tag); H.cur.appendChild(document.createElement("br")); return; }
      if (t === "hr") { H.cur = null; H.c.appendChild(document.createElement("hr")); return; }
      if (t === "ul" || t === "ol") { addList(c, t, fmt, H, tag, inPre); return; }
      if (t === "table") { addTable(c, fmt, H, tag, inPre); return; }
      if (BLOCKISH.test(t)) { H.cur = null; walkKids(c, fmt, H, BLK[t] || tag, inPre || t === "pre"); H.cur = null; return; }
      var f = fmt.slice(), st = (c.getAttribute("style") || "").toLowerCase();
      function has(x) { return f.some(function (y) { return y.t === x; }); }
      if ((t === "b" || t === "strong" || /font-weight:\s*(bold|[6-9]00)/.test(st)) && !has("b")) f.push({ t: "b" });
      if ((t === "i" || t === "em" || t === "cite" || /font-style:\s*italic/.test(st)) && !has("i")) f.push({ t: "i" });
      if ((t === "u" || t === "ins" || /text-decoration[^;]*underline/.test(st)) && !has("u")) f.push({ t: "u" });
      if ((t === "s" || t === "strike" || t === "del" || /text-decoration[^;]*line-through/.test(st)) && !has("s")) f.push({ t: "s" });
      if (t === "code" && !inPre && !has("code")) f.push({ t: "code" });
      if (t === "span" && !inPre) { var k = (c.getAttribute("class") || "").split(/\s+/).filter(function (x) { return SPAN_OK.test(x); })[0]; if (k) f.push({ t: "span", c: k }); }
      if (t === "a") { var h = safeHref(c.getAttribute("href")); if (h) f.push({ t: "a", h: h }); }
      walkKids(c, f, H, tag, inPre);
    }
    function walkKids(node, fmt, H, tag, inPre) { for (var c = node.firstChild; c; c = c.nextSibling) one(c, fmt, H, tag, inPre); }
    walkKids(src, [], { c: out, cur: null }, "div", false);
    Array.prototype.forEach.call(out.querySelectorAll("div,h1,h2,h3,blockquote,pre"), function (b) { if (!b.firstChild) b.appendChild(document.createElement("br")); });
    if (!out.firstChild) out.appendChild(mk("div")).appendChild(document.createElement("br"));
    return out;
  }
  function blockText(b) {
    var t = "";
    (function w(n) { for (var c = n.firstChild; c; c = c.nextSibling) { if (c.nodeType === 3) t += c.data; else if (c.nodeType === 1) { if (c.tagName === "BR") t += "\n"; else if (["UL", "OL", "TABLE", "IMG", "HR"].indexOf(c.tagName) < 0) w(c); } } })(b);
    return t.replace(/\u200b/g, "").replace(/\n$/, "");
  }
  /* teks polos (untuk kartu, cari, salin): daftar bernomor/bullet, tabel dengan " | ", gambar dilewati */
  function plainLines(box, ind, out) {
    Array.prototype.forEach.call(box.childNodes, function (c) {
      if (c.nodeType !== 1) { if (c.nodeType === 3 && c.data.trim()) out.push(ind + c.data.trim()); return; }
      var t = c.tagName;
      if (t === "UL" || t === "OL") {
        var k = 0;
        Array.prototype.forEach.call(c.children, function (li) {
          if (li.tagName !== "LI") return;
          k++;
          var sub = []; plainLines(li, "", sub); if (!sub.length) sub.push("");
          var bul = t === "OL" ? k + ". " : "• ", pad = new Array(bul.length + 1).join(" ");
          sub.forEach(function (ln, i) { out.push(ind + (i ? pad : bul) + ln); });
        });
      } else if (t === "TABLE") {
        Array.prototype.forEach.call(c.rows, function (row) {
          var cells = Array.prototype.map.call(row.cells, function (td) { var s = []; plainLines(td, "", s); return s.join(" ").trim(); });
          out.push(ind + cells.join(" | "));
        });
      } else if (t === "HR" || t === "IMG") return;
      else blockText(c).split("\n").forEach(function (ln) { out.push(ind + ln); });
    });
  }
  function plainOf(box) { var out = []; plainLines(box, "", out); return out.join("\n").replace(/\u00a0/g, " ").replace(/\s+$/, ""); }
  function firstImg(n) { var m = n.html && /<img src="(data:image\/[a-z+]+;base64,[^"]+)"/i.exec(n.html); return m ? m[1] : ""; }
    function richHtml(n) { return n.html ? cleanEl(n.html).innerHTML : plainToHtml(n.body); }
  function blankRich(h) { return !/<(h[1-3]|blockquote|pre|ul|ol|table|hr|img)[ >\/]/i.test(h) && !plainOf(cleanEl(h)).trim(); }
    function syncRich(n) {
    var e = RTE(); if (!e) return;
    var box = cleanEl(e.innerHTML); n.html = box.innerHTML; n.body = plainOf(box); richDirty = false;
  }
    function RTE() { return sheet ? sheet.querySelector(".nt-rte") : null; }
  function blankMark(e) {
    var w = e.parentNode; if (!w) return;
    var blank = !e.textContent.replace(/[\u200b\s]/g, "") && !e.querySelector("h1,h2,h3,blockquote,pre,ul,ol,table,img,hr");
    var v = blank ? "1" : "0"; if (w.getAttribute("data-empty") !== v) w.setAttribute("data-empty", v);
  }
    function fixRoot(e) {
    if (!e.firstChild || (!e.children.length && !e.textContent)) { e.innerHTML = '<div dir="auto"><br></div>'; var r = document.createRange(); r.setStart(e.firstChild, 0); r.collapse(true); setRange(r); return; }
    for (var c = e.firstElementChild; c; c = c.nextElementSibling) if (!c.hasAttribute("dir")) c.setAttribute("dir", c.tagName === "PRE" ? "ltr" : "auto");
  }
    function normRoot(e) {
    var run = null;
    Array.prototype.slice.call(e.childNodes).forEach(function (c) {
      if (c.nodeType === 1 && BLOCKISH.test(c.tagName.toLowerCase())) { run = null; return; }
      if (c.nodeType === 8) return;
      if (c.nodeType === 3 && !run && !/\S/.test(c.data) && c.data.indexOf("\u00a0") < 0) { e.removeChild(c); return; }
      if (!run) { run = document.createElement("div"); run.setAttribute("dir", "auto"); e.insertBefore(run, c); }
      run.appendChild(c);
    });
    if (!e.firstChild) e.innerHTML = '<div dir="auto"><br></div>';
  }
    function topOf(node, e) { while (node && node.parentNode !== e) node = node.parentNode; return node; }
    function selRange() {
    var e = RTE(), s = window.getSelection(); if (!e || !s || !s.rangeCount) return null;
    var r = s.getRangeAt(0); return e.contains(r.startContainer) && e.contains(r.endContainer) ? r : null;
  }
    function setRange(r) { var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); }
    function endRange(e) { var l = e.lastElementChild || e, r = document.createRange(); r.selectNodeContents(l); r.collapse(false); return r; }
    function focusEd() {
    var e = RTE(); if (!e) return null;
    if (document.activeElement !== e) { try { e.focus({ preventScroll: true }); } catch (x) { e.focus(); } }
    if (!selRange()) setRange(savedRange && e.contains(savedRange.startContainer) && e.contains(savedRange.endContainer) ? savedRange : endRange(e));
    try { document.execCommand("defaultParagraphSeparator", false, "div"); document.execCommand("styleWithCSS", false, false); } catch (x) {}
    return e;
  }
    function afterEdit() { var e = RTE(), n = cur(); if (!e || !n) return; richDirty = true; fixRoot(e); blankMark(e); queueSave(n); updFmt(); }
  function keepRange() { var r = selRange() || savedRange; return r ? r.cloneRange() : null; }
  function restoreEd(rng) {
    var e = RTE(); if (!e) return null;
    try { e.focus({ preventScroll: true }); } catch (x) { e.focus(); }
    if (rng && e.contains(rng.startContainer) && e.contains(rng.endContainer)) setRange(rng); else setRange(endRange(e));
    return e;
  }
  function caretIn(el) {
    var e = RTE(); if (!el || !e) return;
    var r = document.createRange(); r.selectNodeContents(el); r.collapse(true);
    try { e.focus({ preventScroll: true }); } catch (x) { e.focus(); }
    setRange(r);
  }
  function insertAt(rng, html) { var e = restoreEd(rng); if (!e || !cur()) return; document.execCommand("insertHTML", false, html); afterEdit(); }
  function ancestorIn(names) {
    var e = RTE(), r = selRange(); if (!e || !r) return null;
    var n = r.startContainer; if (n.nodeType === 3) n = n.parentNode;
    for (; n && n !== e; n = n.parentNode) if (n.nodeType === 1 && names.indexOf(n.tagName) >= 0) return n;
    return null;
  }
  function fmtBar() {
    var h = '<div class="nt-fmt" role="toolbar" aria-label="Format teks">';
    FMT.forEach(function (f) {
      if (!f) { h += '<i class="nt-fs"></i>'; return; }
      if (f[0] === "voice" && !SR) return;
      h += '<button type="button" class="nt-fb" data-fmt="' + f[0] + '" aria-label="' + f[1] + '" title="' + f[1] + '" aria-pressed="false" tabindex="-1">' + ICON[f[0]] + "</button>";
    });
    return h + "</div>";
  }
  function tbarHtml() {
    var b = [["row+", "+ Baris"], ["col+", "+ Kolom"], ["row-", "− Baris"], ["col-", "− Kolom"], ["table-", "Hapus tabel", "bad"]];
    return '<div class="nt-tbar" role="toolbar" aria-label="Tabel" hidden>' + b.map(function (x) { return '<button type="button" data-tb="' + x[0] + '" class="' + (x[2] || "") + '">' + x[1] + "</button>"; }).join("") + "</div>";
  }
    function curBlockTag() { var e = RTE(), r = selRange(); if (!e || !r) return ""; var b = topOf(r.startContainer, e); return b && b.nodeType === 1 ? b.tagName.toLowerCase() : ""; }
  function updFmt() {
    var bar = sheet && sheet.querySelector(".nt-fmt"); if (!bar) return;
    var e = RTE(), r = selRange(), tag = r ? curBlockTag() : "", st = {};
    if (r) { try { st.bold = document.queryCommandState("bold"); st.italic = document.queryCommandState("italic"); st.underline = document.queryCommandState("underline"); st.strike = document.queryCommandState("strikeThrough"); } catch (x) {} }
    var code = tag === "pre", head = /^h[1-3]$/.test(tag);
    var inCell = !!ancestorIn(["TD", "TH", "LI"]), inTbl = !!ancestorIn(["TD", "TH"]);
    var on = { quote: tag === "blockquote", code: code, icode: !code && !!ancestorIn(["CODE"]), ul: !!ancestorIn(["UL"]), ol: !!ancestorIn(["OL"]), h1: tag === "h1", h2: tag === "h2", h3: tag === "h3", bold: !!st.bold && !head, italic: !!st.italic, underline: !!st.underline, strike: !!st.strike, link: !!ancestorIn(["A"]), voice: !!rec };
    var off = { quote: code || inCell, code: inCell, icode: code, ul: code, ol: code, hr: code, table: code || inTbl, h1: code || inCell, h2: code || inCell, h3: code || inCell, bold: code || head, italic: code, underline: code, strike: code, link: code, image: code, font: code, draw: false, voice: false };
    Array.prototype.forEach.call(bar.querySelectorAll("[data-fmt]"), function (b) {
      var k = b.getAttribute("data-fmt"), p = !!on[k], d = !!off[k];
      if (b.getAttribute("aria-pressed") !== String(p)) b.setAttribute("aria-pressed", String(p));
      if (k === "voice") b.classList.toggle("on", !!rec);
      if (b.disabled !== d) b.disabled = d;
    });
    var tb = sheet.querySelector(".nt-tbar"); if (tb) tb.hidden = !(inTbl && !code);
  }
  function inline(cmd) { var e = focusEd(); if (!e) return; document.execCommand(cmd, false, null); afterEdit(); }
    function setBlock(tag) {
    var e = focusEd(); if (!e) return;
    var r0 = selRange(); if (!r0) return;
    var s = { sc: r0.startContainer, so: r0.startOffset, ec: r0.endContainer, eo: r0.endOffset };
    normRoot(e);
    var kids = e.children, last = kids.length - 1; if (last < 0) return;
    var a = s.sc === e ? kids[Math.min(s.so, last)] : topOf(s.sc, e), z = s.ec === e ? kids[Math.max(0, Math.min(s.eo - (s.ec === s.sc && s.eo === s.so ? 0 : 1), last))] : topOf(s.ec, e);
    if (!a || !z) return;
    if (z !== a && s.ec !== e) { var t = document.createRange(); t.setStart(z, 0); t.setEnd(s.ec, s.eo); if (!t.toString() && z.previousElementSibling) z = z.previousElementSibling; }
    var list = [], c = a; while (c) { list.push(c); if (c === z) break; c = c.nextElementSibling; }
    var same = list.every(function (b) { return b.tagName.toLowerCase() === tag; }), to = same ? "div" : tag;
    list.forEach(function (b) {
      if (b.tagName.toLowerCase() === to) return;
      var q = document.createRange(); q.setStart(b, 0); q.collapse(true); setRange(q);
      document.execCommand("formatBlock", false, to);
    });
    try { var q2 = document.createRange(); q2.setStart(s.sc, Math.min(s.so, s.sc.nodeType === 3 ? s.sc.data.length : s.sc.childNodes.length)); q2.setEnd(s.ec, Math.min(s.eo, s.ec.nodeType === 3 ? s.ec.data.length : s.ec.childNodes.length)); if (!e.contains(q2.startContainer) || !e.contains(q2.endContainer)) throw 0; setRange(q2); }
    catch (x) { setRange(endRange(e)); }
    afterEdit();
  }
  /* jalankan perintah editor lalu kembalikan kursor ke posisi semula (Chromium memindahkannya ke awal baris saat membuat daftar) */
  function keepSel(fn) {
    var r = selRange(), sc = r && r.startContainer, so = r && r.startOffset, ec = r && r.endContainer, eo = r && r.endOffset;
    fn();
    var e = RTE(); if (!e) return;
    function clamp(n, o) { return Math.min(o, n.nodeType === 3 ? n.data.length : n.childNodes.length); }
    if (sc && e.contains(sc) && e.contains(ec)) { var q = document.createRange(); q.setStart(sc, clamp(sc, so)); q.setEnd(ec, clamp(ec, eo)); setRange(q); }
    else setRange(endRange(e));
  }
  function listCmd(cmd) { var e = focusEd(); if (!e) return; keepSel(function () { document.execCommand(cmd, false, null); }); afterEdit(); }
  function insertHr() { var e = focusEd(); if (!e) return; document.execCommand("insertHTML", false, "<hr><div><br></div>"); afterEdit(); }
  function unwrapEl(el) { var p = el.parentNode; if (!p) return; while (el.firstChild) p.insertBefore(el.firstChild, el); p.removeChild(el); }
  /* kode sebaris: bungkus / lepas <code> pada pilihan (satu baris) */
  function toggleCode() {
    var e = focusEd(); if (!e) return;
    var r = selRange(); if (!r) return;
    var ex = ancestorIn(["CODE"]);
    if (ex) { unwrapEl(ex); afterEdit(); return; }
    if (r.collapsed) {
      var c0 = document.createElement("code"); c0.appendChild(document.createTextNode("\u200b")); r.insertNode(c0);
      var q = document.createRange(); q.setStart(c0.firstChild, 1); q.collapse(true); setRange(q); afterEdit(); return;
    }
    if (topOf(r.startContainer, e) !== topOf(r.endContainer, e)) { toast("Kode sebaris hanya untuk satu baris"); return; }
    var frag = r.extractContents(), c = document.createElement("code"); c.appendChild(frag); r.insertNode(c);
    var s = document.createRange(); s.selectNodeContents(c); setRange(s); afterEdit();
  }
  /* gaya teks: font (f-*) dan ukuran (z-*) sebagai <span class> di setiap baris pilihan */
  function styleSel(cls, grp, rng) {
    var e = restoreEd(rng); if (!e) return;
    var r = selRange(); if (!r) return;
    var leaves;
    if (r.collapsed) { var n = r.startContainer; n = n.nodeType === 1 ? n : n.parentNode; var lf = n && n.closest ? n.closest(LEAF) : null; if (!lf || !e.contains(lf)) return; leaves = [lf]; }
    else leaves = Array.prototype.filter.call(e.querySelectorAll(LEAF), function (l) { return r.intersectsNode(l); });
    var rx = grp === "*" ? /^(f|z)-/ : new RegExp("^" + grp + "-"), last = null;
    leaves.forEach(function (l) {
      var rr = document.createRange(); rr.selectNodeContents(l);
      if (!r.collapsed) { if (l.contains(r.startContainer)) rr.setStart(r.startContainer, r.startOffset); if (l.contains(r.endContainer)) rr.setEnd(r.endContainer, r.endOffset); }
      if (rr.collapsed) return;
      var frag = rr.extractContents();
      Array.prototype.forEach.call(frag.querySelectorAll("span"), function (sp) { if (rx.test(sp.getAttribute("class") || "")) unwrapEl(sp); });
      if (cls) { var sp2 = document.createElement("span"); sp2.setAttribute("class", cls); sp2.appendChild(frag); rr.insertNode(sp2); }
      else rr.insertNode(frag);
      last = l;
    });
    if (last) { var q = document.createRange(); q.selectNodeContents(last); q.collapse(false); setRange(q); }
    afterEdit();
  }
  /* popup kecil (pola dialog tautan): judul, isi HTML, tombol Batal; fn(kind, el) dipanggil saat [data-pop] diklik */
  function showPop(title, inner, fn, rng) {
    if (!popEl) {
      popEl = document.createElement("div"); popEl.className = "nt-dlg nt-lnk nt-pop"; popEl.hidden = true;
      ov.querySelector(".nt-win").appendChild(popEl);
      popEl.addEventListener("click", popClick); popEl.addEventListener("mouseover", popHover);
    }
    popFn = fn; popRng = rng || null;
    popEl.innerHTML = '<div class="nt-dc" role="dialog" aria-modal="true" aria-label="' + esc(title) + '"><h3>' + esc(title) + "</h3>" + inner + '<button type="button" class="nt-done" data-pop="cancel">Batal</button></div>';
    popEl.hidden = false; keep(); refreshLang();
  }
  function closePop(restore) {
    if (!popEl || popEl.hidden) return;
    popEl.hidden = true; popEl.innerHTML = ""; popFn = null; keep();
    if (restore) restoreEd(popRng);
    popRng = null; popImg = null;
  }
  function popClick(ev) {
    if (ev.target === popEl) { closePop(true); return; }
    var b = ev.target.closest && ev.target.closest("[data-pop]"); if (!b) return;
    var k = b.getAttribute("data-pop");
    if (k === "cancel") { closePop(true); return; }
    if (popFn) popFn(k, b);
  }
  function popHover(ev) {
    var b = ev.target.closest && ev.target.closest('[data-pop="tg"]'); if (!b) return;
    var R = +b.getAttribute("data-r"), C = +b.getAttribute("data-c");
    Array.prototype.forEach.call(popEl.querySelectorAll('[data-pop="tg"]'), function (x) { x.classList.toggle("hl", +x.getAttribute("data-r") <= R && +x.getAttribute("data-c") <= C); });
    var lb = popEl.querySelector(".nt-tlabel"); if (lb) lb.textContent = R + " × " + C;
  }
  function tableHtml(R, C) {
    var cells = new Array(C + 1).join('<td dir="auto"><br></td>'), first = cells.replace('<td dir="auto">', '<td dir="auto" data-ntc="1">'), rows = "";
    for (var r = 0; r < R; r++) rows += "<tr>" + (r ? cells : first) + "</tr>";
    return "<table><tbody>" + rows + "</tbody></table><div><br></div>";
  }
  function openTable() {
    var rg = keepRange(), g = "";
    for (var r = 1; r <= 6; r++) for (var c = 1; c <= 6; c++) g += '<button type="button" class="nt-tg" data-pop="tg" data-r="' + r + '" data-c="' + c + '" aria-label="Tabel"></button>';
    showPop("Sisipkan tabel", '<div class="nt-tgrid">' + g + '</div><p class="nt-tlabel">Pilih ukuran</p>', function (k, b) {
      if (k !== "tg") return;
      var R = +b.getAttribute("data-r"), C = +b.getAttribute("data-c"), keep0 = popRng;
      closePop(false); insertAt(keep0 || rg, tableHtml(R, C));
      var ed = RTE(), m = ed && ed.querySelector("[data-ntc]");
      if (m) { m.removeAttribute("data-ntc"); caretIn(m); afterEdit(); }
    }, rg);
  }
  function openFont() {
    var rg = keepRange();
    var opt = function (g, c, label) { return '<button type="button" data-pop="st" data-g="' + g + '" data-c="' + c + '">' + label + "</button>"; };
    var inner = '<p class="nt-pl">Font</p><div class="nt-pg">' + opt("f", "f-sans", "Sans") + opt("f", "f-serif", "Serif") + opt("f", "f-mono", "Mono") + '</div><p class="nt-pl">Ukuran</p><div class="nt-pg">' + opt("z", "z-s", "Kecil") + opt("z", "", "Normal") + opt("z", "z-l", "Besar") + opt("z", "z-xl", "Sangat besar") + '</div><button type="button" class="nt-lb" data-pop="st" data-g="*" data-c="">Hapus gaya</button>';
    showPop("Gaya teks", inner, function (k, b) {
      if (k !== "st") return;
      var rg2 = popRng, g = b.getAttribute("data-g"), c = b.getAttribute("data-c");
      closePop(false); styleSel(c, g, rg2);
      var e = RTE(); if (e) try { e.focus({ preventScroll: true }); } catch (x) {}
    }, rg);
  }
  /* tabel: Tab / Shift+Tab pindah sel, Tab di sel terakhir menambah baris */
  function blankCell(tagName) { var td = document.createElement(tagName === "TH" ? "th" : "td"); td.setAttribute("dir", "auto"); td.appendChild(document.createElement("br")); return td; }
  function tabCell(cell, back) {
    var row = cell.closest("tr"), table = cell.closest("table"), ci = cell.cellIndex, ri = row.rowIndex;
    if (!back) {
      if (row.cells[ci + 1]) return row.cells[ci + 1];
      if (table.rows[ri + 1]) return table.rows[ri + 1].cells[0];
      var nr = row.cloneNode(false); for (var i = 0; i < row.cells.length; i++) nr.appendChild(blankCell(row.cells[i].tagName)); row.parentNode.insertBefore(nr, row.nextSibling);
      return nr.cells[0];
    }
    if (ci > 0) return row.cells[ci - 1];
    if (ri > 0) { var pr = table.rows[ri - 1]; return pr.cells[pr.cells.length - 1]; }
    return cell;
  }
  function tbOp(k) {
    var cell = ancestorIn(["TD", "TH"]); if (!cell) return;
    var row = cell.closest("tr"), table = cell.closest("table"), ci = cell.cellIndex;
    if (k === "row+") {
      var nr = row.cloneNode(false); for (var i = 0; i < row.cells.length; i++) nr.appendChild(blankCell(row.cells[i].tagName));
      row.parentNode.insertBefore(nr, row.nextSibling); caretIn(nr.cells[Math.min(ci, nr.cells.length - 1)]);
    } else if (k === "col+") {
      Array.prototype.forEach.call(table.rows, function (rw) { var ref = rw.cells[ci + 1] || null; rw.insertBefore(blankCell(rw.cells[ci] ? rw.cells[ci].tagName : "TD"), ref); });
      caretIn(row.cells[ci + 1]);
    } else if (k === "row-") {
      if (table.rows.length <= 1) return tbOp("table-");
      var tgt = row.nextElementSibling || row.previousElementSibling; row.parentNode.removeChild(row);
      if (tgt && tgt.cells) caretIn(tgt.cells[Math.min(ci, tgt.cells.length - 1)]);
    } else if (k === "col-") {
      if (row.cells.length <= 1) return tbOp("table-");
      Array.prototype.forEach.call(table.rows, function (rw) { if (rw.cells[ci]) rw.removeChild(rw.cells[ci]); });
      caretIn(row.cells[Math.min(ci, row.cells.length - 1)]);
    } else if (k === "table-") {
      var d = mk("div"); d.appendChild(document.createElement("br")); table.parentNode.replaceChild(d, table); caretIn(d);
    }
    afterEdit();
  }
  /* voice */
  function voiceLang() { var l = (document.documentElement.lang || "id").toLowerCase(); return l.indexOf("en") === 0 ? "en-US" : l.indexOf("ar") === 0 ? "ar-SA" : "id-ID"; }
  function setVoice(on) { if (!sheet) return; var b = sheet.querySelector('[data-fmt="voice"]'); if (b) { b.classList.toggle("on", on); b.setAttribute("aria-pressed", String(on)); } }
  function voiceStop() {
    recWant = false; var r = rec; rec = null;
    if (r) { r.onend = null; r.onerror = null; try { r.stop(); } catch (x) {} }
    setVoice(false);
  }
  function voiceInsert(t) {
    if (!cur() || !sheet || sheet.hidden) return;
    var e = restoreEd(recRng); if (!e) return;
    document.execCommand("insertText", false, t + " ");
    recRng = keepRange(); afterEdit();
  }
  function voiceToggle() {
    if (rec) { voiceStop(); return; }
    if (!SR) { toast("Input suara tidak didukung di browser ini"); return; }
    if (!cur() || cur().type !== "text") return;
    restoreEd(keepRange()); recRng = keepRange();
    var R = new SR(); R.lang = voiceLang(); R.continuous = true; R.interimResults = false; R.maxAlternatives = 1;
    R.onresult = function (ev) {
      var t = ""; for (var i = ev.resultIndex; i < ev.results.length; i++) if (ev.results[i].isFinal) t += ev.results[i][0].transcript;
      t = t.trim(); if (t && rec === R) voiceInsert(t);
    };
    R.onerror = function (ev) {
      var k = ev && ev.error; if (k === "aborted") return;
      toast(k === "not-allowed" || k === "service-not-allowed" ? "Izin mikrofon ditolak" : k === "no-speech" ? "Tidak ada suara terdengar" : "Input suara gagal");
      voiceStop();
    };
    R.onend = function () { if (rec === R && recWant) { try { R.start(); } catch (x) { voiceStop(); } } else if (rec === R) voiceStop(); };
    rec = R; recWant = true;
    try { R.start(); setVoice(true); } catch (x) { voiceStop(); toast("Input suara gagal"); }
  }
  /* gambar: dikecilkan ke maks 1024 px (JPEG, PNG bila transparan) lalu disisipkan sebagai data URL */
  function shrinkImg(file, cb) {
    var url = URL.createObjectURL(file), im = new Image();
    im.onload = function () {
      URL.revokeObjectURL(url);
      var w = im.naturalWidth || im.width || 1, h = im.naturalHeight || im.height || 1, k = Math.min(1, 1024 / Math.max(w, h));
      var c = document.createElement("canvas"); c.width = Math.max(1, Math.round(w * k)); c.height = Math.max(1, Math.round(h * k));
      var g = c.getContext("2d"), png = file.type === "image/png";
      if (!png) { g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); }
      g.drawImage(im, 0, 0, c.width, c.height);
      var src = ""; try { src = png ? c.toDataURL("image/png") : c.toDataURL("image/jpeg", 0.86); } catch (x) {}
      cb(src && src.length > 30 ? src : null);
    };
    im.onerror = function () { URL.revokeObjectURL(url); cb(null); };
    im.src = url;
  }
  function openImage() { imgRng = keepRange(); if (imgIn) imgIn.click(); }
  function imgPicked() {
    var f = imgIn && imgIn.files && imgIn.files[0]; if (imgIn) imgIn.value = "";
    if (!f) return;
    if (f.type && !/^image\//.test(f.type)) { toast("Pilih berkas gambar"); return; }
    var rg = imgRng; imgRng = null;
    shrinkImg(f, function (src) { if (!src) { toast("Gambar tidak bisa dibuka"); return; } insertAt(rg, '<img src="' + src + '" alt=""><div><br></div>'); });
  }
  /* sketsa: kanvas di layar penuh; hasil disisipkan sebagai gambar JPEG (latar putih) */
  function drawOpen() {
    var rg = keepRange();
    if (!dr) { dr = document.createElement("div"); dr.className = "nt-draw"; dr.hidden = true; ov.querySelector(".nt-win").appendChild(dr); dr.addEventListener("click", drawClick); }
    var dots = DCOL.map(function (c) { return '<button type="button" class="nt-dsw" data-dt="c" data-v="' + c + '" style="--c:' + c + '" aria-label="Warna"></button>'; }).join("");
    var sizes = DSZ.map(function (w) { return '<button type="button" class="nt-dsz" data-dt="w" data-v="' + w + '" aria-label="Ukuran"><i style="width:' + (w + 4) + "px;height:" + (w + 4) + 'px"></i></button>'; }).join("");
    dr.innerHTML = '<header class="nt-draw-h"><button type="button" class="nt-ic" data-d="close" aria-label="Batal">' + I.x + '</button><h3>Gambar</h3><button type="button" class="nt-ic" data-d="undo" aria-label="Urungkan">' + I.undo + '</button><button type="button" class="nt-ic" data-d="clear" aria-label="Hapus semua">' + I.trash + '</button><button type="button" class="nt-cta sm" data-d="done">' + I.check + "<span>Sisipkan</span></button></header>" +
      '<div class="nt-draw-pad"><canvas class="nt-draw-c"></canvas></div>' +
      '<div class="nt-draw-t"><div class="nt-draw-cols">' + dots + '</div><div class="nt-draw-sz">' + sizes + '<button type="button" class="nt-dsz" data-dt="e" aria-label="Penghapus">' + IC.eraser + "</button></div></div>";
    drRng = rg; drU = []; drT = { c: DCOL[0], w: DSZ[1], e: false }; drDrawn = false;
    dr.hidden = false; keep();
    drC = dr.querySelector(".nt-draw-c"); drSetup(); drPaintTools();
    drC.addEventListener("pointerdown", drDown); drC.addEventListener("pointermove", drMove); drC.addEventListener("pointerup", drUp); drC.addEventListener("pointercancel", drUp);
  }
  function drSetup() {
    var r = dr.querySelector(".nt-draw-pad").getBoundingClientRect();
    drW = Math.max(1, r.width); drH = Math.max(1, r.height); drDpr = Math.min(2, window.devicePixelRatio || 1);
    drC.style.width = drW + "px"; drC.style.height = drH + "px";
    drC.width = Math.round(drW * drDpr); drC.height = Math.round(drH * drDpr);
    drX = drC.getContext("2d"); drX.setTransform(drDpr, 0, 0, drDpr, 0, 0); drX.lineCap = "round"; drX.lineJoin = "round";
  }
  function drPaintTools() {
    if (!dr) return;
    Array.prototype.forEach.call(dr.querySelectorAll("[data-dt]"), function (b) {
      var t = b.getAttribute("data-dt"), v = b.getAttribute("data-v"), on = t === "c" ? (!drT.e && v === drT.c) : t === "w" ? (!drT.e && +v === drT.w) : !!drT.e;
      b.setAttribute("aria-pressed", String(on));
    });
  }
  function drPt(e) { var r = drC.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  function drSeg(a, b) {
    var x = drX; if (!x) return;
    x.save();
    if (drT.e) { x.globalCompositeOperation = "destination-out"; x.strokeStyle = "#000"; x.lineWidth = drT.w * 3; }
    else { x.strokeStyle = drT.c; x.lineWidth = drT.w; }
    x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x + 0.01, b.y + 0.01); x.stroke(); x.restore();
  }
  function drSnap() { if (!drC) return; if (drU.length >= 25) drU.shift(); drU.push(drC.toDataURL("image/png")); }
  function drDown(e) { if (e.button > 0 || !drC) return; drOn = true; try { drC.setPointerCapture(e.pointerId); } catch (x) {} drSnap(); drLast = drPt(e); drSeg(drLast, drLast); drDrawn = true; }
  function drMove(e) { if (!drOn || !drC) return; var p = drPt(e); drSeg(drLast, p); drLast = p; }
  function drUp() { drOn = false; drLast = null; }
  function drUndo() {
    if (!drU.length || !drC) return;
    var src = drU.pop(), img = new Image();
    img.onload = function () { if (!drC) return; drX.save(); drX.setTransform(1, 0, 0, 1, 0, 0); drX.clearRect(0, 0, drC.width, drC.height); drX.drawImage(img, 0, 0, drC.width, drC.height); drX.restore(); };
    img.src = src;
  }
  function drDone() {
    if (!drC) return;
    if (!drDrawn) { toast("Belum ada coretan"); return; }
    var k = Math.min(1, 900 / drC.width), o = document.createElement("canvas");
    o.width = Math.max(1, Math.round(drC.width * k)); o.height = Math.max(1, Math.round(drC.height * k));
    var g = o.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, o.width, o.height); g.drawImage(drC, 0, 0, o.width, o.height);
    var src = o.toDataURL("image/jpeg", 0.9), rg = drRng;
    drawClose(); insertAt(rg, '<img src="' + src + '" alt="Gambar"><div><br></div>');
  }
  function drawClose() { if (dr) { dr.hidden = true; dr.innerHTML = ""; } drC = null; drX = null; drOn = false; keep(); }
  function drResize() {
    if (!drC) return;
    var snap = drC.toDataURL("image/png"); drSetup();
    var img = new Image(); img.onload = function () { if (!drC) return; drX.save(); drX.setTransform(1, 0, 0, 1, 0, 0); drX.drawImage(img, 0, 0, drC.width, drC.height); drX.restore(); }; img.src = snap;
  }
  function drawClick(ev) {
    var b = ev.target.closest && ev.target.closest("[data-d],[data-dt]"); if (!b) return;
    var d = b.getAttribute("data-d"), t = b.getAttribute("data-dt");
    if (t === "c") { drT.c = b.getAttribute("data-v"); drT.e = false; }
    else if (t === "w") { drT.w = +b.getAttribute("data-v"); drT.e = false; }
    else if (t === "e") drT.e = !drT.e;
    if (t) { drPaintTools(); return; }
    if (d === "close") { var rg = drRng; drawClose(); restoreEd(rg); }
    else if (d === "undo") drUndo();
    else if (d === "clear") { if (!drC) return; drSnap(); drX.save(); drX.setTransform(1, 0, 0, 1, 0, 0); drX.clearRect(0, 0, drC.width, drC.height); drX.restore(); drDrawn = false; }
    else if (d === "done") drDone();
  }
  function doFmt(k) {
    var inCell = !!ancestorIn(["LI", "TD", "TH"]);
    if (k === "quote") { if (!inCell) setBlock("blockquote"); }
    else if (k === "code") setBlock("pre");
    else if (/^h[1-3]$/.test(k)) { if (!inCell) setBlock(k); }
    else if (k === "bold") { if (!/^h[1-3]$/.test(curBlockTag())) inline("bold"); }
    else if (k === "italic") inline("italic");
    else if (k === "underline") inline("underline");
    else if (k === "strike") inline("strikeThrough");
    else if (k === "link") openLink();
    else if (k === "icode") toggleCode();
    else if (k === "ul") listCmd("insertUnorderedList");
    else if (k === "ol") listCmd("insertOrderedList");
    else if (k === "hr") insertHr();
    else if (k === "table") openTable();
    else if (k === "voice") voiceToggle();
    else if (k === "image") openImage();
    else if (k === "draw") drawOpen();
    else if (k === "font") openFont();
  }
  /* gambar yang diketuk di editor: pilihan hapus */
  function imgTapped(im) {
    popImg = im;
    showPop("Gambar", '<button type="button" class="nt-lb bad" data-pop="delimg">Hapus gambar</button>', function (k) {
      if (k !== "delimg" || !popImg) return;
      var p = popImg.parentNode; popImg.parentNode.removeChild(popImg); popImg = null;
      closePop(false); if (p) { var e = RTE(); if (e) try { e.focus({ preventScroll: true }); } catch (x) {} }
      afterEdit();
    }, null);
  }

  /* ---------- tautan ---------- */
  function anchorIn(r, e) {
    if (!r) return null;
    var n = [r.startContainer, r.endContainer, r.commonAncestorContainer];
    for (var i = 0; i < n.length; i++) { var el = n[i].nodeType === 1 ? n[i] : n[i].parentNode, a = el && el.closest ? el.closest("a") : null; if (a && e.contains(a)) return a; }
    return null;
  }
  function openLink(aEl) {
    var e = focusEd(); if (!e) return;
    var r = selRange() || savedRange, a = aEl || anchorIn(r, e);
    lnkCtx = { range: r ? r.cloneRange() : null, a: a, sel: !!(r && !r.collapsed && !a) };
    if (!lnk) { lnk = document.createElement("div"); lnk.className = "nt-dlg nt-lnk"; lnk.hidden = true; ov.querySelector(".nt-win").appendChild(lnk); lnk.addEventListener("click", linkClick); lnk.addEventListener("keydown", function (ev) { if (ev.key === "Enter" && ev.target.tagName === "INPUT") { ev.preventDefault(); applyLink(); } }); lnk.addEventListener("input", function () { var er = lnk.querySelector(".nt-lerr"); if (er) er.hidden = true; }); }
    var url = a ? a.getAttribute("href") || "" : "";
    lnk.innerHTML = '<div class="nt-dc" role="dialog" aria-modal="true" aria-label="' + (a ? "Ubah tautan" : "Sisipkan tautan") + '"><h3>' + (a ? "Ubah tautan" : "Sisipkan tautan") + "</h3>" +
      '<label class="nt-lf"><span>Alamat tautan</span><input type="text" data-f="lurl" inputmode="url" autocapitalize="none" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="https://" value="' + esc(url) + '"></label>' +
      (lnkCtx.sel ? "" : '<label class="nt-lf"><span>Teks tautan</span><input type="text" dir="auto" data-f="ltxt" autocomplete="off" value="' + esc(a ? a.textContent : "") + '"></label>') +
      '<p class="nt-lerr" hidden>Tautan tidak valid</p><div class="nt-lact"><button type="button" class="nt-cta sm" data-l="save">' + I.check + "<span>Simpan</span></button>" +
      (a ? '<button type="button" class="nt-lb" data-l="open">Buka tautan</button><button type="button" class="nt-lb bad" data-l="unlink">Hapus tautan</button>' : "") + '</div><button type="button" class="nt-done" data-l="cancel">Batal</button></div>';
    lnk.hidden = false; keep();
    setTimeout(function () { var i = lnk && lnk.querySelector("[data-f=lurl]"); if (i && !lnk.hidden) { i.focus(); i.select(); } }, 60);
  }
  function closeLink() { if (lnk) { lnk.hidden = true; lnk.innerHTML = ""; } keep(); }
  function linkClick(ev) {
    if (ev.target === lnk) { closeLink(); return; }
    var b = ev.target.closest("[data-l]"); if (!b) return;
    var k = b.getAttribute("data-l");
    if (k === "cancel") { closeLink(); var e = RTE(); if (e) { e.focus({ preventScroll: true }); if (lnkCtx && lnkCtx.range) try { setRange(lnkCtx.range); } catch (x) {} } }
    else if (k === "save") applyLink();
    else if (k === "unlink") removeLink();
    else if (k === "open") { var h = safeHref(lnk.querySelector("[data-f=lurl]").value); if (h) window.open(h, "_blank", "noopener,noreferrer"); }
  }
  function applyLink() {
    var ui0 = lnk.querySelector("[data-f=lurl]"), tx = lnk.querySelector("[data-f=ltxt]"), url = safeHref(ui0.value);
    if (!url) { var er = lnk.querySelector(".nt-lerr"); er.hidden = false; ui0.focus(); return; }
    var text = tx ? tx.value.trim() : "", c = lnkCtx || {}, e = RTE(); closeLink(); if (!e) return;
    try { e.focus({ preventScroll: true }); document.execCommand("styleWithCSS", false, false); } catch (x) {}
    var a = c.a && e.contains(c.a) ? c.a : null;
    if (a) {
      a.setAttribute("href", url); a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener noreferrer");
      if (text && text !== a.textContent) a.textContent = text;
      var q = document.createRange(); q.setStartAfter(a); q.collapse(true); setRange(q);
    } else if (c.range && !c.range.collapsed && e.contains(c.range.startContainer) && e.contains(c.range.endContainer)) {
      setRange(c.range); document.execCommand("createLink", false, url); var s = window.getSelection(); if (s.rangeCount) s.collapseToEnd();
    } else {
      setRange(c.range && e.contains(c.range.startContainer) ? c.range : endRange(e));
      document.execCommand("insertHTML", false, '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(text || url.replace(/^mailto:|^tel:/i, "")) + "</a>&nbsp;");
    }
    afterEdit();
  }
  function removeLink() {
    var c = lnkCtx || {}, e = RTE(); closeLink(); if (!e || !c.a || !e.contains(c.a)) return;
    e.focus({ preventScroll: true }); var q = document.createRange(); q.selectNodeContents(c.a); setRange(q); document.execCommand("unlink", false, null);
    var s = window.getSelection(); if (s.rangeCount) s.collapseToEnd(); afterEdit();
  }
  function richClick(ev) {
    var t = ev.target; if (!t || !t.closest) return;
    var b = t.closest("[data-fmt]"); if (b && sheet.contains(b)) { ev.preventDefault(); if (!b.disabled) doFmt(b.getAttribute("data-fmt")); return; }
    var tb = t.closest("[data-tb]"); if (tb && sheet.contains(tb)) { ev.preventDefault(); tbOp(tb.getAttribute("data-tb")); return; }
    var a = t.closest(".nt-rte a"); if (a) { ev.preventDefault(); openLink(a); return; }
    var im = t.closest && t.closest(".nt-rte img"); if (im) { ev.preventDefault(); imgTapped(im); return; }
    if (t.classList && (t.classList.contains("nt-rw") || t.classList.contains("nt-content") || t.classList.contains("nt-ph"))) { var e = RTE(); if (e) { e.focus(); setRange(endRange(e)); } }
  }
  function richKey(ev) {
    var e = ev.target; if (!e.classList || !e.classList.contains("nt-rte")) return;
    var mod = ev.ctrlKey || ev.metaKey, k = (ev.key || "").toLowerCase();
    if (mod && !ev.altKey && k === "k") { ev.preventDefault(); openLink(); return; }
    if (mod && ev.shiftKey && k === "x") { ev.preventDefault(); doFmt("strike"); return; }
    if (ev.key === "Enter" && !ev.shiftKey && !mod && !ev.isComposing) {
      var cd = ancestorIn(["CODE"]);
      if (cd && curBlockTag() !== "pre") { ev.preventDefault(); var zc = document.createTextNode("\u200b"); cd.parentNode.insertBefore(zc, cd.nextSibling); var qc = document.createRange(); qc.setStart(zc, 1); qc.collapse(true); setRange(qc); document.execCommand("insertParagraph", false, null);
        var nc = ancestorIn(["CODE"]);
        if (nc && !nc.textContent.replace(/[\u200b]/g, "")) { var pn = nc.parentNode, z = document.createTextNode(""); pn.insertBefore(z, nc); pn.removeChild(nc); var qz = document.createRange(); qz.setStart(z, 0); qz.collapse(true); setRange(qz); }
        afterEdit(); return; }
      var r = selRange(), b = r && r.collapsed ? topOf(r.startContainer, e) : null;
      if (b && b.nodeType === 1 && b.tagName === "BLOCKQUOTE" && !b.textContent.replace(/[\u200b\s]/g, "")) { ev.preventDefault(); document.execCommand("formatBlock", false, "div"); afterEdit(); }
    } else if (ev.key === "Tab" && !mod && !ev.altKey) {
      var cell = ancestorIn(["TD", "TH"]);
      if (cell) { ev.preventDefault(); caretIn(tabCell(cell, ev.shiftKey)); afterEdit(); }
      else if (curBlockTag() === "pre") { ev.preventDefault(); document.execCommand("insertText", false, "  "); }
    }
  }
  function richPaste(ev) {
    var e = ev.target.closest ? ev.target.closest(".nt-rte") : null; if (!e) return;
    ev.preventDefault();
    var cd = ev.clipboardData || window.clipboardData, h = cd ? cd.getData("text/html") : "", t = cd ? cd.getData("text/plain") : "", code = curBlockTag() === "pre";
    if (h && !code) { var box = cleanEl(h); if (plainOf(box).trim() || box.querySelector("br,img,table,ul,ol,hr")) { document.execCommand("insertHTML", false, box.innerHTML); afterEdit(); return; } }
    t = String(t || "").replace(/\r\n?/g, "\n");
    if (!t) return;
    if (code || t.indexOf("\n") < 0) document.execCommand("insertText", false, t); else document.execCommand("insertHTML", false, plainToHtml(t));
    afterEdit();
  }

  /* ---------- klik ---------- */
  function click(e) {
    var b = e.target.closest("[data-act]"); if (!b) { if (e.target === ov) close(); return; }
    var a = b.getAttribute("data-act"), v = b.getAttribute("data-v"), card = b.closest(".nt-nc"), id = card && card.getAttribute("data-id"), n = cur();
    switch (a) {
      case "close": close(); break;
      case "new": openEditor(null, true); break;
      case "open": if (id) { var x = byId(id); if (x && x.trash) { toast("Pulihkan dulu untuk mengedit"); } else openEditor(id); } break;
      case "pin": case "restore": case "purge": act(a, id); break;
      case "view": S.view = S.view === "grid" ? "list" : "grid"; save(); render(); break;
      case "sort": var ix = 0; SORTS.forEach(function (s, i) { if (s[0] === S.sort) ix = i; }); S.sort = SORTS[(ix + 1) % SORTS.length][0]; save(); render(); break;
      case "f": ui.f = v; ui.cat = ""; ui.shown = PAGE; render(); body.scrollTop = 0; break;
      case "cat": ui.f = "all"; ui.cat = ui.cat === v ? "" : v; ui.shown = PAGE; render(); break;
      case "cats": openDlg(); break;
      case "more": ui.shown += PAGE; renderList(); break;
      case "empty": if (confirm("Hapus permanen semua catatan di sampah?")) { S.notes = S.notes.filter(function (x) { return !x.trash; }); save(); render(); toast("Sampah dikosongkan"); } break;
      case "undo": if (undoFn) { var f = undoFn; undoFn = null; f(); toastEl.classList.remove("on"); } break;
      case "eclose": case "edone": closeEditor(); break;
      case "epin": if (n) { n.pin = !n.pin; dirty = true; flush(n); b.classList.toggle("on", n.pin); b.setAttribute("aria-pressed", !!n.pin); toast(n.pin ? "Disematkan" : "Sematan dilepas"); } break;
      case "type": if (n && v) { if (v === "list" && n.type === "text") { flush(n); if (/<(h[1-3]|blockquote|pre|b|i|u|s|a|ul|ol|table|img|hr|code|span)[ >\/]/i.test(n.html || "") && !confirm("Format teks (judul, tebal, tautan, dll.) akan hilang jika diubah menjadi checklist. Lanjutkan?")) break; } convert(n, v); } break;
      case "color": if (n) { n.color = v; sheet.setAttribute("data-c", v); sheet.querySelectorAll(".nt-dot").forEach(function (d) { d.setAttribute("aria-pressed", d.getAttribute("data-v") === v); }); dirty = true; flush(n); } break;
      case "setcat": if (n) { n.cat = v; sheet.querySelectorAll(".nt-cats [data-act=setcat]").forEach(function (d) { d.setAttribute("aria-pressed", d.getAttribute("data-v") === v); }); dirty = true; flush(n); } break;
      case "tick": if (n) { var li = b.closest(".nt-it"), it = findItem(n, li); if (it) { it.d = !it.d; li.classList.toggle("d", it.d); b.setAttribute("aria-pressed", it.d); dirty = true; flush(n); } } break;
      case "rmit": if (n) { var l2 = b.closest(".nt-it"), i2 = findItem(n, l2); if (i2) { n.items = n.items.filter(function (x) { return x !== i2; }); l2.remove(); if (!n.items.length) addItem(n); else { dirty = true; flush(n); } } } break;
      case "addit": if (n) addItem(n); break;
      case "dup": if (n) { flush(n); var c = JSON.parse(JSON.stringify(n)); c.id = uid(); c.title = (n.title ? n.title + " " : "") + "(salinan)"; c.pin = false; c.cre = c.upd = Date.now(); c.items.forEach(function (i) { i.id = uid(); }); S.notes.unshift(c); save(); closeEditor(); toast("Catatan diduplikat"); } break;
      case "copy": if (n) { var tx = (n.title ? n.title + "\n\n" : "") + plain(n); (navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(tx) : Promise.reject()).then(function () { toast("Tersalin"); }, function () { try { var ta = document.createElement("textarea"); ta.value = tx; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); toast("Tersalin"); } catch (er) {} }); } break;
      case "share": if (n && navigator.share) navigator.share({ title: n.title || "Catatan", text: plain(n) }).catch(function () {}); break;
      case "earch": if (n) { n.arch = !n.arch; if (n.arch) n.pin = false; dirty = true; flush(n); var arch = n.arch; closeEditor(); toast(arch ? "Diarsipkan" : "Dikeluarkan dari arsip", function () { n.arch = !arch; save(); render(); }); } break;
      case "edel": if (n) { flush(n); if (isEmpty(n)) { closeEditor(); } else toTrash(n); } break;
      case "rmcat": var li3 = b.closest("li"), cid = li3.getAttribute("data-id"); if (confirm("Hapus kategori ini? Catatan di dalamnya tidak ikut terhapus.")) { S.cats = S.cats.filter(function (c) { return c.id !== cid; }); S.notes.forEach(function (x) { if (x.cat === cid) x.cat = ""; }); if (ui.cat === cid) ui.cat = ""; save(); drawDlg(); } break;
      case "addcat": addCat(); break;
      case "dclose": closeDlg(); break;
    }
  }

  /* ---------- bangun & buka/tutup ---------- */
  function build() {
    ov = document.createElement("div"); ov.className = "nt-ov"; ov.hidden = true; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-label", "My Note");
    ov.innerHTML = '<div class="nt-win"><header class="nt-top"><button class="nt-ic" data-act="close" aria-label="Tutup">' + I.back + "</button><h2>" + NOTE + '<span>My Note</span></h2><button class="nt-ic" data-act="view" aria-label="Tampilan daftar"></button></header>' +
      '<div class="nt-tools"><label class="nt-search">' + I.search + '<input type="search" data-f="q" dir="auto" placeholder="Cari catatan" aria-label="Cari catatan" autocomplete="off"></label><button type="button" class="nt-sort" data-act="sort" aria-label="Urutkan">' + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4v16M3 16l4 4 4-4M17 20V4M13 8l4-4 4 4"/></svg><span></span></button></div>' +
      '<nav class="nt-chips" aria-label="Kategori"></nav><div class="nt-body"></div>' +
      '<button class="nt-fab" data-act="new" aria-label="Catatan baru">' + I.plus + '</button><div class="nt-sheet" hidden></div></div>';
    document.body.appendChild(ov); body = ov.querySelector(".nt-body"); sheet = ov.querySelector(".nt-sheet");
    imgIn = document.createElement("input"); imgIn.type = "file"; imgIn.accept = "image/*"; imgIn.tabIndex = -1; imgIn.setAttribute("aria-hidden", "true");
    imgIn.style.cssText = "position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;left:-9999px"; ov.appendChild(imgIn); imgIn.addEventListener("change", imgPicked);
    window.addEventListener("resize", function () { if (dr && !dr.hidden) drResize(); });
    ov.addEventListener("click", click); ov.addEventListener("input", onInput); document.addEventListener("keydown", onKey);
    sheet.addEventListener("focusout", function () { var n = cur(); if (n && dirty) flush(n); });
    sheet.addEventListener("click", richClick); sheet.addEventListener("keydown", richKey); sheet.addEventListener("paste", richPaste);
    sheet.addEventListener("focusin", function (e) { if (e.target.classList && e.target.classList.contains("nt-rte")) try { document.execCommand("defaultParagraphSeparator", false, "div"); document.execCommand("styleWithCSS", false, false); } catch (x) {} });
    sheet.addEventListener("mousedown", function (e) { if (e.target.closest && e.target.closest(".nt-fmt,.nt-tbar")) e.preventDefault(); });
    sheet.addEventListener("drop", function (e) { if (e.target.closest && e.target.closest(".nt-rte")) e.preventDefault(); });
    document.addEventListener("selectionchange", function () { if (!ui.edit || !sheet || sheet.hidden || selRaf) return; selRaf = requestAnimationFrame(function () { selRaf = 0; var r = selRange(); if (r) savedRange = r.cloneRange(); updFmt(); }); });
  }
  function open() {
    S = load(); ui.f = "all"; ui.cat = ""; ui.q = ""; ui.shown = PAGE; if (!ov) build();
    var q = ov.querySelector("[data-f=q]"); if (q) q.value = "";
    render(); ov.hidden = false; document.documentElement.classList.add("nt-open"); refreshLang();
  }
  function close() { voiceStop(); var n = cur(); if (n) closeEditor(true); if (dlg) { dlg.hidden = true; } if (lnk) { lnk.hidden = true; lnk.innerHTML = ""; } if (ov) ov.hidden = true; document.documentElement.classList.remove("nt-open"); chip(); }
  function chip() { try { var el = document.getElementById("tNote"); if (el) el.textContent = counts().all; } catch (e) {} }

  window.BeresinNote = { open: open, close: close };
  M.routes = M.routes || {}; M.routes["#note"] = open;
  window.addEventListener("storage", function (e) { if (e.key === KEY && ov && !ov.hidden && !ui.edit) { S = load(); render(); } });
  var rz, lastC = 0;
  window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(function () { if (ov && !ov.hidden && nCols() !== lastC) { lastC = nCols(); renderList(); } }, 150); });
  window.addEventListener("pagehide", function () { var n = cur(); if (n) flush(n); });
  document.addEventListener("visibilitychange", function () { if (document.hidden) { var n = cur(); if (n) flush(n); } });
  function init() { M.routes["#note"] = open; }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
