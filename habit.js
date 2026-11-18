/* habit.js — menu Habit (menggantikan Goal) v7.9: api beranimasi, efek centang/konfeti, ikon menu di judul, ikon kembar digabung, analisis (wawasan, pola hari, peta konsistensi, performa per habit); v7.8: 160 ikon, kontras warna, tanpa bayangan saat buka-tutup; v7.7: ikon sprite, palet datar, form & centang diperbarui di tempat (tanpa efek refresh). Data: localStorage "mo-habit-v1". */
(function () {
  "use strict";
  var KEY = "mo-habit-v1", M = window.MyOffice = window.MyOffice || {};
  var COLORS = [["hijau", "#25c486"], ["biru", "#3b9dff"], ["oranye", "#ff9a3c"], ["pink", "#ff6fa1"], ["kuning", "#ffc83d"], ["tosca", "#14bfc9"], ["merah", "#ff6b5b"], ["lime", "#86d63c"]];
  /* 160 ikon dari hicons.webp (10 kolom x 16 baris; i0-i79 set pertama, i80-i159 set kedua). Kunci ikon = "i" + nomor. */
  /* ikon kembar digabung: kunci lama (kiri) otomatis dipetakan ke satu ikon yang dipertahankan (kanan), jadi habit lama tetap tampil benar */
  var DUP = { 0: 159, 1: 159, 3: 140, 4: 157, 5: 155, 12: 141, 20: 85, 21: 103, 22: 108, 23: 106, 24: 105, 25: 90, 26: 91, 29: 94, 30: 80, 33: 81, 34: 97, 40: 110, 41: 111, 42: 113, 44: 158, 45: 112, 47: 120, 48: 150, 49: 116, 50: 87, 54: 115, 60: 152, 61: 152, 63: 156, 65: 154, 67: 132, 68: 119, 69: 117, 70: 130 };
  var ICONS = []; for (var q = 80; q < 160; q++) if (DUP[q] == null) ICONS.push("i" + q); for (q = 0; q < 80; q++) if (DUP[q] == null) ICONS.push("i" + q); /* set kedua (i80-i159) tampil paling atas */
  var LEGACY = { "💧": 20, "📖": 40, "🏋️": 25, "🛏️": 30, "🧘": 29, "🥗": 23, "🚶": 26, "📝": 43, "🕌": 31, "🪥": 84, "💊": 99, "🎧": 54, "🧹": 121, "💻": 42, "🎨": 56, "🌱": 48 };
  function iconKey(v) { var n = /^i\d{1,3}$/.test(v || "") && +v.slice(1) < 160 ? +v.slice(1) : (LEGACY[v] != null ? LEGACY[v] : 63); if (DUP[n] != null) n = DUP[n]; return "i" + n; }
  function ico(k) { k = iconKey(k); var n = +k.slice(1); return '<span class="hb-ico" style="--x:' + (n % 10) + ';--y:' + Math.floor(n / 10) + '" aria-hidden="true"></span>'; }
  var DOWS = [1, 2, 3, 4, 5, 6, 0];
  var S = load(), ui = { tab: "home", day: today(), stat: "w", all: false, edit: null }, ov, body, sheet;

  function load() {
    var d; try { d = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
    d = d && typeof d === "object" ? d : {};
    d.habits = Array.isArray(d.habits) ? d.habits : []; d.habits.forEach(function (h) { h.icon = iconKey(h.icon); }); d.logs = d.logs && typeof d.logs === "object" ? d.logs : {};
    return d;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} chip(); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function ds(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function today() { return ds(new Date()); }
  function pd(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2], 12); }
  function add(s, n) { var d = pd(s); d.setDate(d.getDate() + n); return ds(d); }
  function mon(s) { var d = pd(s), k = (d.getDay() + 6) % 7; d.setDate(d.getDate() - k); return ds(d); }
  function fmt(s, o) { try { return pd(s).toLocaleDateString("id-ID", o); } catch (e) { return s; } }
  function col(h) { for (var i = 0; i < COLORS.length; i++) if (COLORS[i][0] === h.color) return COLORS[i][1]; return h.color === "ungu" ? COLORS[1][1] : COLORS[0][1]; }
  function uid() { return "h" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function active() { return S.habits.filter(function (h) { return !h.archived; }); }
  function sched(h, d) { var w = pd(d).getDay(); return (h.days || DOWS).indexOf(w) >= 0; }
  function val(h, d) { var l = S.logs[d]; return (l && +l[h.id]) || 0; }
  function tgt(h) { return h.mode === "check" ? 1 : Math.max(1, +h.target || 1); }
  function done(h, d) { return val(h, d) >= tgt(h); }
  function step(h) { var t = tgt(h); return t <= 12 ? 1 : t <= 60 ? 5 : t <= 200 ? 10 : Math.max(5, Math.round(t / 10 / 5) * 5); }
  function list(d) { return active().filter(function (h) { return sched(h, d) && (!h.created || h.created <= d); }); }
  function stat(d) { var l = list(d), n = l.filter(function (h) { return done(h, d); }).length; return { n: n, t: l.length, p: l.length ? n / l.length : 0 }; }
  function hstreak(h) {
    var d = today(), c = 0, g = 0;
    if (sched(h, d) && !done(h, d)) d = add(d, -1);
    while (g++ < 800) { if (sched(h, d)) { if (done(h, d)) c++; else break; } d = add(d, -1); }
    return c;
  }
  function streaks() {
    var d = today(), cur = 0, best = 0, run = 0, i, st, brk = false;
    for (i = 0; i < 730; i++) {
      st = stat(d);
      if (st.t) {
        if (st.n === st.t) { run++; if (run > best) best = run; if (!brk) cur = run; }
        else { run = 0; if (i > 0) brk = true; }
      }
      d = add(d, -1);
    }
    return { cur: cur, best: best };
  }
  function range(a, b) { var o = [], d = a, g = 0; while (d <= b && g++ < 800) { o.push(d); d = add(d, 1); } return o; }
  function agg(days) { var n = 0, t = 0, td = today(); days.forEach(function (d) { if (d > td) return; var s = stat(d); n += s.n; t += s.t; }); return { n: n, t: t, p: t ? n / t : 0 }; }
  function full(days) { var td = today(); return days.filter(function (d) { if (d > td) return false; var s = stat(d); return s.t && s.n === s.t; }).length; }
  function pct(x) { return Math.round(x * 100); }
  function svg(p) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + "</svg>"; }
  var CHECK = svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>'), PLUS = svg('<path d="M12 5v14M5 12h14"/>'), BACK = svg('<path d="M15 5l-7 7 7 7"/>'), NXT = svg('<path d="M9 5l7 7-7 7"/>');

  /* ---------- tampilan ---------- */
  var FLAME = '<svg class="fl" viewBox="0 0 64 64" aria-hidden="true"><path class="fo" fill="#ff8a3d" d="M32 5c2 11 15 17 15 33a15 15 0 0 1-30 0c0-9 4-13 8-17 1 5 3 7 6 8-1-8-1-17 1-24z"/><path class="fi" fill="#ffc83d" d="M32 31c1 5 8 8 8 14a8 8 0 0 1-16 0c0-4 3-7 4-10 1 2 2 3 4 4z"/></svg>';
  function flameBox(n) { var t = n >= 30 ? 3 : n >= 14 ? 2 : n >= 3 ? 1 : 0; return '<span class="hb-flame t' + t + (n ? "" : " off") + '">' + FLAME + '<i class="sp"></i><i class="sp"></i><i class="sp"></i></span>'; }
  function desc(h) { if (h.note) return esc(h.note); return h.mode === "check" ? "Tandai saat selesai" : "Minimal " + tgt(h) + (h.unit ? " " + esc(h.unit) : "") + " sehari"; }
  function chkHtml(h) { return CHECK + (h.mode === "check" ? "" : '<span class="pl">+</span>'); }
  function subHtml(h, d) {
    var v = val(h, d), ok = done(h, d), fire = hstreak(h);
    return (h.mode === "check" ? (ok ? "Tercapai" : "Belum tercapai") : Math.min(v, 99999) + " / " + tgt(h) + (h.unit ? " " + esc(h.unit) : "")) + (fire >= 2 ? ' · <span class="hb-fire">' + FLAME + fire + "</span>" : "");
  }
  function item(h, d, ro, i) {
    var v = val(h, d), t = tgt(h), ok = done(h, d), c = col(h);
    return '<div class="hb-item" data-id="' + h.id + '" style="--c:' + c + ';--i:' + (i || 0) + '"><span class="hb-em" aria-hidden="true">' + ico(h.icon) + '</span><button class="hb-in" data-act="edit" data-id="' + h.id + '"><b>' + esc(h.name) + "</b><small>" + subHtml(h, d) + '</small><div class="hb-bar"><i style="width:' + Math.min(100, v / t * 100) + '%"></i></div></button><div class="hb-act">' +
      (h.mode !== "check" && v > 0 && !ro ? minusHtml(h) : "") +
      '<button class="hb-chk' + (ok ? " on" : "") + '" data-act="tap" data-id="' + h.id + '"' + (ro ? " disabled" : "") + ' aria-label="' + esc(h.name) + '">' + chkHtml(h) + "</button></div></div>";
  }
  function minusHtml(h) { return '<button class="hb-minus" data-act="dec" data-id="' + h.id + '" aria-label="Kurangi">−</button>'; }
  function compact(h, d, i) {
    var ok = done(h, d), c = col(h);
    return '<div class="hb-item" data-id="' + h.id + '" style="--c:' + c + ';--i:' + (i || 0) + '"><span class="hb-em" aria-hidden="true">' + ico(h.icon) + '</span><button class="hb-in" data-act="tab" data-t="day"><b>' + esc(h.name) + "</b><small>" + desc(h) + '</small></button><div class="hb-act"><button class="hb-chk' + (ok ? " on" : "") + '" data-act="tap" data-id="' + h.id + '" aria-label="' + esc(h.name) + '">' + chkHtml(h) + "</button></div></div>";
  }
  var RC = 2 * Math.PI * 40;
  function ring(p) {
    return '<div class="hb-ring"><svg viewBox="0 0 100 100"><circle class="t" cx="50" cy="50" r="40"/><circle class="v" cx="50" cy="50" r="40" stroke-dasharray="' + RC.toFixed(1) + '" stroke-dashoffset="' + (RC * (1 - p)).toFixed(1) + '"/></svg><b data-cu="' + pct(p) + '" data-sfx="%">' + pct(p) + "%</b></div>";
  }
  function empty() {
    return '<div class="hb-card hb-empty"><span class="hb-big">' + ico("i48") + '</span><b>Belum ada habit</b>Mulai dengan satu kebiasaan kecil, lalu centang setiap hari.<button class="hb-cta" data-act="add">' + PLUS + 'Tambah Habit</button><button class="hb-ghost" data-act="sample">Pakai contoh habit</button></div>';
  }
  function banText(s) { return "Kamu sudah menyelesaikan " + s.n + " dari " + s.t + " habit hari ini!"; }
  var DS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"], DN = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  function greet() { var x = new Date().getHours(); return x < 11 ? "Selamat pagi" : x < 15 ? "Selamat siang" : x < 18 ? "Selamat sore" : "Selamat malam"; }
  var MI = '<svg class="hb-mi" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-goal"/></svg>';
  /* ---------- analisis ---------- */
  function habRows(days) { var td = today(); return active().map(function (x) { var n = 0, t = 0; days.forEach(function (d) { if (d > td || !sched(x, d) || (x.created && x.created > d)) return; t++; if (done(x, d)) n++; }); return { h: x, p: t ? n / t : 0, t: t }; }).sort(function (a, b) { return b.p - a.p; }); }
  function bstreak(h) { var d = today(), c = 0, b = 0, g = 0; while (g++ < 400) { if (sched(h, d) && (!h.created || h.created <= d)) { if (done(h, d)) { c++; if (c > b) b = c; } else c = 0; } d = add(d, -1); } return b; }
  function wdStats() { var o = [], i, d = today(), s, w; for (i = 0; i < 7; i++) o.push({ n: 0, t: 0 }); for (i = 1; i <= 56; i++) { d = add(today(), -i); s = stat(d); w = (pd(d).getDay() + 6) % 7; o[w].n += s.n; o[w].t += s.t; } return o; }
  function insights() {
    var td = today(), s = stat(td), st = streaks(), w = wdStats(), o = [], best = -1, worst = -1, bp = -1, wp = 2, left = s.t - s.n;
    w.forEach(function (x, k) { if (x.t < 3) return; var q = x.n / x.t; if (q > bp) { bp = q; best = k; } if (q < wp) { wp = q; worst = k; } });
    if (s.t && left) o.push({ i: st.cur ? "i81" : "i157", t: st.cur ? "Selesaikan <b>" + left + " habit</b> lagi hari ini agar streak <b>" + st.cur + " hari</b> tidak putus." : "Tinggal <b>" + left + " habit</b> lagi untuk hari yang sempurna." });
    else if (s.t) o.push({ i: "i154", t: "Semua habit hari ini selesai. Streak kamu <b>" + st.cur + " hari</b>!" });
    var r30 = habRows(range(add(td, -29), td)).filter(function (x) { return x.t >= 3; });
    if (r30.length > 1) { o.push({ i: "i156", t: "<b>" + esc(r30[0].h.name) + "</b> paling konsisten: " + pct(r30[0].p) + "% dalam 30 hari terakhir." }); var lo = r30[r30.length - 1]; if (lo.p < .7) o.push({ i: "i15", t: "<b>" + esc(lo.h.name) + "</b> perlu perhatian (" + pct(lo.p) + "%). Coba turunkan targetnya dulu." }); }
    if (best >= 0) o.push({ i: "i155", t: "<b>" + DN[best] + "</b> hari terbaikmu, " + pct(bp) + "% habit selesai." });
    if (worst >= 0 && worst !== best && wp < .8) o.push({ i: "i17", t: "<b>" + DN[worst] + "</b> paling sering terlewat (" + pct(wp) + "%). Pasang pengingat di hari itu." });
    var A = agg(range(add(td, -6), td)), B = agg(range(add(td, -13), add(td, -7))), dp = pct(A.p) - pct(B.p);
    if (B.t && Math.abs(dp) >= 5) o.push({ i: "i9", t: dp > 0 ? "Naik <b>" + dp + "%</b> dibanding minggu lalu. Pertahankan!" : "Turun <b>" + (-dp) + "%</b> dibanding minggu lalu. Mulai lagi dari satu habit termudah." });
    return o;
  }
  function vWeek() {
    var w = wdStats(), best = -1, bp = -1;
    w.forEach(function (x, k) { var q = x.t ? x.n / x.t : 0; if (x.t >= 3 && q > bp) { bp = q; best = k; } });
    return '<div class="hb-card"><div class="hb-row"><span>Pola per Hari</span><small class="hb-mut">8 minggu terakhir</small></div><div class="hb-chart">' + w.map(function (x, k) { var q = x.t ? x.n / x.t : 0; return '<div class="hb-col' + (k === best ? " best" : "") + '" style="--c:' + (k === best ? "#25c486" : "#9fd9c3") + ';--i:' + k + '" title="' + pct(q) + '%"><em>' + pct(q) + '</em><i style="height:' + Math.max(5, q * 100) + '%"></i><small>' + DS[k] + "</small></div>"; }).join("") + "</div></div>";
  }
  function vHeat() {
    var td = today(), a = add(mon(td), -77), o = "", c, r, x, q, l;
    for (c = 0; c < 12; c++) for (r = 0; r < 7; r++) { x = add(a, c * 7 + r); q = stat(x); l = x > td ? "fu" : !q.n ? "l0" : q.p < .5 ? "l1" : q.p < .75 ? "l2" : q.p < 1 ? "l3" : "l4"; o += '<i class="' + l + (x === td ? " td" : "") + '" style="--i:' + (c * 7 + r) + '" title="' + x + ": " + q.n + "/" + q.t + '"></i>'; }
    return '<div class="hb-card"><div class="hb-row"><span>Peta Konsistensi</span><small class="hb-mut">12 minggu</small></div><div class="hb-heat">' + o + '</div><div class="hb-leg"><small>Sedikit</small><i class="l0"></i><i class="l1"></i><i class="l2"></i><i class="l3"></i><i class="l4"></i><small>Penuh</small></div></div>';
  }
  function vIns() { var o = insights(); if (!o.length) return ""; return '<div class="hb-sec"><h3>Wawasan</h3></div><div class="hb-ins">' + o.slice(0, 5).map(function (x, i) { return '<div class="hb-tip" style="--i:' + i + '"><span class="hb-bi">' + ico(x.i) + "</span><div>" + x.t + "</div></div>"; }).join("") + "</div>"; }
  /* ---------- efek ---------- */
  var RM = window.matchMedia && matchMedia("(prefers-reduced-motion:reduce)");
  function tween(el, to, ms) { var sfx = el.dataset.sfx || "", from = parseInt(el.textContent, 10) || 0, t0 = performance.now(); if ((RM && RM.matches) || from === to) { el.textContent = to + sfx; return; } (function f(t) { var k = Math.min(1, (t - t0) / (ms || 700)); k = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(from + (to - from) * k) + sfx; if (k < 1 && el.isConnected) requestAnimationFrame(f); })(t0); }
  function fx() {
    body.querySelectorAll("[data-cu]").forEach(function (e) { var to = +e.dataset.cu; e.textContent = "0" + (e.dataset.sfx || ""); tween(e, to, 850); });
    body.querySelectorAll(".hb-ring .v").forEach(function (c) { var f = c.getAttribute("stroke-dashoffset"); c.style.transition = "none"; c.setAttribute("stroke-dashoffset", RC.toFixed(1)); c.getBoundingClientRect(); c.style.transition = ""; c.setAttribute("stroke-dashoffset", f); });
  }
  function pop(el) { if (!el) return; el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); }
  function burst(btn) {
    var c = getComputedStyle(btn.closest(".hb-item")).getPropertyValue("--c") || "#25c486", n = 12, i, q, an, r;
    for (i = 0; i < n; i++) { q = document.createElement("i"); q.className = "hb-bp"; an = i / n * 6.283 + Math.random() * .4; r = 24 + Math.random() * 14; q.style.cssText = "--dx:" + (Math.cos(an) * r).toFixed(0) + "px;--dy:" + (Math.sin(an) * r).toFixed(0) + "px;background:" + (i % 3 ? c : "#ffc83d"); q.addEventListener("animationend", function () { this.remove(); }); btn.appendChild(q); }
  }
  function cheer(btn) {
    var r = document.createElement("i"), i, q, an, d;
    r.className = "hb-rg"; r.addEventListener("animationend", function () { this.remove(); }); btn.appendChild(r);
    for (i = 0; i < 6; i++) { q = document.createElement("i"); q.className = "hb-bp g"; an = i / 6 * 6.283 + .5; d = 34 + (i % 2) * 8; q.style.cssText = "--dx:" + (Math.cos(an) * d).toFixed(0) + "px;--dy:" + (Math.sin(an) * d).toFixed(0) + "px"; q.addEventListener("animationend", function () { this.remove(); }); btn.appendChild(q); }
  }

  function vHome() {
    var d = today(), l = list(d), s = stat(d), st = streaks(), w0 = mon(d), wa = agg(range(w0, add(w0, 6))), tip = insights()[0];
    var h = '<div class="hb-hd">' + MI + '<h1 class="hb-h1">Habit</h1></div><p class="hb-sub">' + greet() + "! Bangun kebiasaan baik,<br>untuk hidup lebih produktif.</p>";
    if (!active().length) return h + empty();
    h += '<button class="hb-card hb-prog' + (s.t && s.n === s.t ? " full" : "") + '" data-act="tab" data-t="day">' + ring(s.p) + '<div class="hb-pt"><small>Progress Hari Ini</small><strong>' + s.n + " dari " + s.t + ' habit</strong><div class="hb-bar rb"><i style="width:' + pct(s.p) + '%"></i></div></div></button>';
    h += '<div class="hb-duo"><button class="hb-card hb-mini" data-act="tab" data-t="stat">' + flameBox(st.cur) + '<small>Streak</small><b><span class="hn" data-cu="' + st.cur + '">' + st.cur + '</span> hari</b></button><button class="hb-card hb-mini" data-act="tab" data-t="stat"><span class="hb-bi">' + ico("i9") + '</span><small>Minggu ini</small><b><span data-cu="' + pct(wa.p) + '" data-sfx="%">' + pct(wa.p) + "%</span></b></button></div>";
    h += '<div class="hb-week">' + range(w0, add(w0, 6)).map(function (x) { return '<button class="hb-wd' + (x === d ? " tdy" : "") + '" data-act="tab" data-t="day"><small>' + esc(fmt(x, { weekday: "short" })) + '</small><b class="hb-dn">' + pd(x).getDate() + '</b><i class="' + wdClass(x) + '"></i></button>'; }).join("") + "</div>";
    if (tip) h += '<div class="hb-ban"><span class="hb-bi">' + ico(tip.i) + "</span><div>" + tip.t + "</div></div>";
    h += '<div class="hb-sec"><h3>Kebiasaan Aktif</h3><button data-act="tab" data-t="day">Lihat Semua</button></div>';
    h += l.length ? '<div class="hb-list">' + l.map(function (x, i) { return compact(x, d, i); }).join("") + "</div>" : '<div class="hb-card hb-empty">Tidak ada habit terjadwal hari ini.</div>';
    return h + '<button class="hb-cta" data-act="add">' + PLUS + "Tambah Habit</button>";
  }
  function wdClass(x) { var td = today(), st = stat(x); return x > td || !st.t ? "" : st.n === st.t ? "f" : st.n > 0 ? "p" : "n"; }
  function vDay() {
    var d = ui.day, td = today(), future = d > td, w0 = mon(d), l = list(d), s = stat(d);
    var h = '<div class="hb-date"><b>' + esc(fmt(d, { weekday: "short", day: "numeric", month: "short", year: "numeric" })) + "</b>" + (d !== td ? '<button class="hb-chip" data-act="today">Hari ini</button>' : "") + '<button class="hb-ic" data-act="wk" data-n="-7" aria-label="Minggu sebelumnya">' + BACK + '</button><button class="hb-ic" data-act="wk" data-n="7" aria-label="Minggu berikutnya">' + NXT + "</button></div>";
    h += '<div class="hb-week">' + range(w0, add(w0, 6)).map(function (x) {
      return '<button class="hb-wd' + (x === td ? " tdy" : "") + '" data-act="pick" data-d="' + x + '" aria-pressed="' + (x === d) + '"><small>' + esc(fmt(x, { weekday: "short" })) + '</small><b class="hb-dn">' + pd(x).getDate() + '</b><i class="' + wdClass(x) + '"></i></button>';
    }).join("") + "</div>";
    if (!active().length) return h + empty();
    h += l.length ? '<div class="hb-list">' + l.map(function (x, i) { return item(x, d, future, i); }).join("") + "</div>" : '<div class="hb-card hb-empty">Tidak ada habit terjadwal hari ini.</div>';
    if (future && l.length) h += '<p class="hb-sub" style="margin-top:12px;text-align:center">Habit hari mendatang belum bisa dicentang.</p>';
    if (l.length) h += '<div class="hb-ban"' + (s.n === s.t ? " hidden" : "") + '><span class="hb-bi">' + ico("i10") + "</span><div>" + banText(s) + "</div></div>";
    return h + '<button class="hb-cta" data-act="add">' + PLUS + "Tambah Habit</button>";
  }
  function buckets() {
    var td = today(), o = [], i, a, b, y, m;
    if (ui.stat === "w") { a = mon(td); range(a, add(a, 6)).forEach(function (x) { o.push({ l: fmt(x, { weekday: "short" }), days: [x], fu: x > td }); }); }
    else if (ui.stat === "m") { y = pd(td).getFullYear(); m = pd(td).getMonth(); var n = new Date(y, m + 1, 0).getDate(); for (i = 0; i < n; i += 7) { var ds2 = []; for (var k = i + 1; k <= Math.min(n, i + 7); k++) ds2.push(y + "-" + pad(m + 1) + "-" + pad(k)); o.push({ l: "M" + (i / 7 + 1), days: ds2, fu: ds2[0] > td }); } }
    else { y = pd(td).getFullYear(); for (m = 0; m < 12; m++) { var dd = []; for (var q = 1; q <= new Date(y, m + 1, 0).getDate(); q++) dd.push(y + "-" + pad(m + 1) + "-" + pad(q)); o.push({ l: fmt(y + "-" + pad(m + 1) + "-01", { month: "short" }), days: dd, fu: dd[0] > td }); } }
    return o;
  }
  function periodDays(prev) {
    var td = today(), y = pd(td).getFullYear(), m = pd(td).getMonth(), a, b;
    if (ui.stat === "w") { a = mon(td); if (prev) a = add(a, -7); return range(a, add(a, 6)); }
    if (ui.stat === "m") { var yy = prev ? (m ? y : y - 1) : y, mm = prev ? (m ? m - 1 : 11) : m; return range(yy + "-" + pad(mm + 1) + "-01", yy + "-" + pad(mm + 1) + "-" + pad(new Date(yy, mm + 1, 0).getDate())); }
    var Y = prev ? y - 1 : y; return range(Y + "-01-01", Y + "-12-31");
  }
  function vStat() {
    var h = '<div class="hb-seg" role="tablist">' + [["w", "Mingguan"], ["m", "Bulanan"], ["y", "Tahunan"]].map(function (x) { return '<button data-act="stat" data-s="' + x[0] + '" aria-selected="' + (ui.stat === x[0]) + '">' + x[1] + "</button>"; }).join("") + "</div>";
    if (!active().length) return h + empty();
    var st = streaks(), cur = periodDays(false), prv = periodDays(true), A = agg(cur), B = agg(prv), fdays = full(cur), fd = fdays - full(prv), dp = pct(A.p) - pct(B.p), td = today();
    var el = cur.filter(function (x) { return x <= td && stat(x).t; }).length, lv = A.p >= .85 ? "Luar biasa" : A.p >= .65 ? "Konsisten" : A.p >= .4 ? "Berkembang" : "Baru mulai";
    h += '<div class="hb-card hb-streak">' + flameBox(st.cur) + '<div><small>Streak Kamu</small><strong><span data-cu="' + st.cur + '">' + st.cur + "</span> Hari</strong><em>" + (st.cur ? "Terus pertahankan!" : "Mulai hari ini!") + " · Terbaik " + st.best + " hari</em></div>" + (fd ? '<span class="hb-dl' + (fd < 0 ? " dn" : "") + '">' + (fd > 0 ? "↑ +" : "↓ ") + fd + "</span>" : "") + "</div>";
    h += '<div class="hb-card hb-rate"><div class="hb-row"><span>Tingkat Penyelesaian</span>' + (dp ? '<span class="hb-dl' + (dp < 0 ? " dn" : "") + '">' + (dp > 0 ? "↑ +" : "↓ ") + dp + "%</span>" : "") + '</div><strong data-cu="' + pct(A.p) + '" data-sfx="%">' + pct(A.p) + '%</strong><div class="hb-bar rb"><i style="width:' + pct(A.p) + '%"></i></div><small>Dari total target habit · <b class="hb-lv">' + lv + "</b></small></div>";
    h += '<div class="hb-tiles">' + [["i155", fdays, "Hari sempurna"], ["i159", A.n, "Total centang"], ["i10", el ? (A.n / el).toFixed(1) : "0", "Rata-rata per hari"], [null, st.best, "Streak terbaik"]].map(function (x, i) { return '<div class="hb-tile" style="--i:' + i + '"><span class="hb-bi">' + (x[0] ? ico(x[0]) : FLAME) + '</span><b' + (/^\d+$/.test(String(x[1])) ? ' data-cu="' + x[1] + '"' : "") + ">" + x[1] + "</b><small>" + x[2] + "</small></div>"; }).join("") + "</div>";
    var bk = buckets();
    h += '<div class="hb-card"><div class="hb-row"><span>' + (ui.stat === "w" ? "Ringkasan Mingguan" : ui.stat === "m" ? "Ringkasan Bulanan" : "Ringkasan Tahunan") + '</span></div><div class="hb-chart">' + bk.map(function (b, i) { var a = agg(b.days); return '<div class="hb-col' + (b.fu ? " fu" : "") + '" style="--c:' + COLORS[i % COLORS.length][1] + ';--i:' + i + '" title="' + pct(a.p) + '%"><i style="height:' + Math.max(5, a.p * 100) + '%"></i><small>' + esc(b.l) + "</small></div>"; }).join("") + "</div></div>";
    h += vWeek() + vHeat() + vIns();
    var rows = habRows(cur);
    h += '<div class="hb-sec"><h3>Performa per Habit</h3>' + (rows.length > 3 ? '<button data-act="all">' + (ui.all ? "Ringkas" : "Lihat Semua") + "</button>" : "") + "</div>";
    h += '<div class="hb-top3">' + rows.slice(0, ui.all ? 99 : 3).map(function (r, i) { return '<div class="hb-pop" style="--c:' + col(r.h) + ';--i:' + i + '"><span class="hb-em">' + ico(r.h.icon) + '</span><div><div class="hb-row"><b>' + esc(r.h.name) + "</b><em>" + pct(r.p) + '%</em></div><div class="hb-bar"><i style="width:' + pct(r.p) + '%"></i></div><small class="hb-meta">Streak ' + hstreak(r.h) + " hari · Terbaik " + bstreak(r.h) + " hari</small></div></div>"; }).join("") + "</div>";
    return h;
  }
  function render(anim) {
    if (!ov) return;
    var tabs = [["home", "Ringkasan"], ["day", "Harian"], ["stat", "Statistik"]];
    ov.querySelector(".hb-tabs").innerHTML = tabs.map(function (t) { return '<button role="tab" data-act="tab" data-t="' + t[0] + '" aria-selected="' + (ui.tab === t[0]) + '">' + t[1] + "</button>"; }).join("");
    ov.querySelector(".hb-top h2 span").textContent = ui.tab === "home" ? "Habit" : ui.tab === "day" ? "Habit Harian" : "Statistik Habit";
    var y = body.scrollTop;
    body.classList.toggle("anim", !!anim);
    body.innerHTML = ui.tab === "home" ? vHome() : ui.tab === "day" ? vDay() : vStat();
    body.scrollTop = anim ? 0 : y;
    if (anim) fx();
  }
  /* centang / tambah / kurang: ubah elemen yang ada (tanpa membangun ulang), jadi tidak berkedip & animasi transisi jalan */
  function patchItem(el, h, d, ro) {
    var v = val(h, d), t = tgt(h), sm = el.querySelector(".hb-in small"), bar = el.querySelector(".hb-in .hb-bar i"), chk = el.querySelector(".hb-chk"), act = el.querySelector(".hb-act");
    if (sm && h.mode !== undefined && !el.dataset.cp) { var sh = subHtml(h, d); if (sm.dataset.k !== sh) { sm.dataset.k = sh; sm.innerHTML = sh; } }
    if (bar) bar.style.width = Math.min(100, v / t * 100) + "%";
    chk.classList.toggle("on", done(h, d));
    var mi = act.querySelector(".hb-minus"), need = h.mode !== "check" && v > 0 && !ro && !el.dataset.cp;
    if (need && !mi) act.insertAdjacentHTML("afterbegin", minusHtml(h)); else if (!need && mi) mi.remove();
  }
  function patchAll() {
    if (!ov || ov.hidden) return;
    if (ui.tab === "home") {
      var d = today(), l = list(d), s = stat(d), els = body.querySelectorAll(".hb-list .hb-item");
      if (els.length !== l.length) return render(false);
      l.forEach(function (h, i) { els[i].dataset.cp = "1"; els[i].querySelector(".hb-chk").classList.toggle("on", done(h, d)); });
      var rv = body.querySelector(".hb-ring .v"), rb = body.querySelector(".hb-ring b"), st = body.querySelector(".hb-pt strong"), pb = body.querySelector(".hb-pt .hb-bar i");
      if (rv) rv.setAttribute("stroke-dashoffset", (RC * (1 - s.p)).toFixed(1));
      if (rb) { rb.dataset.sfx = "%"; rb.dataset.cu = pct(s.p); tween(rb, pct(s.p), 600); }
      var pg = body.querySelector(".hb-prog"); if (pg) pg.classList.toggle("full", s.t > 0 && s.n === s.t);
      var hn = body.querySelector(".hb-mini .hn"); if (hn) { hn.dataset.cu = streaks().cur; tween(hn, streaks().cur, 500); }
      if (st) st.textContent = s.n + " dari " + s.t + " habit";
      if (pb) pb.style.width = pct(s.p) + "%";
    } else if (ui.tab === "day") {
      var dd = ui.day, ro = dd > today(), ll = list(dd), ss = stat(dd), ee = body.querySelectorAll(".hb-list .hb-item");
      if (ee.length !== ll.length) return render(false);
      ll.forEach(function (h, i) { patchItem(ee[i], h, dd, ro); });
      body.querySelectorAll(".hb-wd").forEach(function (b) { var i = b.querySelector("i"), k = wdClass(b.dataset.d); if (i.className !== k) i.className = k; });
      var bn = body.querySelector(".hb-ban");
      if (bn) { bn.hidden = ss.t > 0 && ss.n === ss.t; bn.lastElementChild.textContent = banText(ss); }
    }
  }

  /* ---------- form ---------- */
  function openForm(id) {
    var h = id ? S.habits.filter(function (x) { return x.id === id; })[0] : null;
    ui.edit = h ? JSON.parse(JSON.stringify(h)) : { id: "", name: "", icon: "i20", color: "hijau", mode: "count", target: 8, unit: "", note: "", days: DOWS.slice() };
    ui.edit.icon = iconKey(ui.edit.icon);
    buildForm();
  }
  /* form dibangun SEKALI; setiap pilihan hanya mengubah atribut tombol (tanpa render ulang) */
  function buildForm() {
    var e = ui.edit, dn = DOWS.map(function (w) { var d = new Date(2024, 0, 7 + w); return [w, d.toLocaleDateString("id-ID", { weekday: "short" })]; });
    sheet.innerHTML = '<div class="hb-sc" role="dialog" aria-modal="true"><div class="hb-fh"><span class="hb-pv" id="hbPv" style="--c:' + col(e) + '">' + ico(e.icon) + '</span><h3>' + (e.id ? "Ubah Habit" : "Tambah Habit") + '</h3></div>' +
      '<label class="hb-f"><span>Nama habit</span><input type="text" id="hbN" maxlength="40" value="' + esc(e.name) + '" placeholder="Contoh: Minum air"></label>' +
      '<div class="hb-f"><span>Ikon</span><div class="hb-pick hb-icons">' + ICONS.map(function (i) { return '<button type="button" data-act="ico" data-v="' + i + '" aria-pressed="' + (e.icon === i) + '">' + ico(i) + "</button>"; }).join("") + "</div></div>" +
      '<div class="hb-f"><span>Warna</span><div class="hb-pick cl">' + COLORS.map(function (c) { return '<button type="button" data-act="clr" data-v="' + c[0] + '" style="--c:' + c[1] + '" aria-pressed="' + (e.color === c[0]) + '" aria-label="' + c[0] + '"></button>'; }).join("") + "</div></div>" +
      '<div class="hb-f"><span>Jenis</span><div class="hb-seg" style="margin:0">' + [["count", "Hitungan"], ["check", "Centang"]].map(function (m) { return '<button type="button" data-act="mode" data-v="' + m[0] + '" aria-selected="' + (e.mode === m[0]) + '">' + m[1] + "</button>"; }).join("") + "</div></div>" +
      '<div class="hb-two" id="hbTwo"' + (e.mode === "count" ? "" : " hidden") + '><label class="hb-f"><span>Target per hari</span><input type="number" id="hbT" min="1" max="99999" inputmode="numeric" value="' + esc(e.target) + '"></label><label class="hb-f"><span>Satuan</span><input type="text" id="hbU" maxlength="12" value="' + esc(e.unit) + '" placeholder="gelas, menit, halaman"></label></div>' +
      '<label class="hb-f"><span>Catatan (opsional)</span><input type="text" id="hbNote" maxlength="60" value="' + esc(e.note) + '" placeholder="Contoh: Sebelum jam 23.00"></label>' +
      '<div class="hb-f"><span>Hari aktif</span><div class="hb-days">' + dn.map(function (x) { return '<button type="button" data-act="dow" data-v="' + x[0] + '" aria-pressed="' + (e.days.indexOf(x[0]) >= 0) + '">' + esc(x[1]) + "</button>"; }).join("") + "</div></div>" +
      '<p class="hb-err" id="hbErr" hidden></p>' +
      '<div class="hb-btns">' + (e.id ? '<button type="button" class="hb-dl2" data-act="del">Hapus</button>' : "") + '<button type="button" class="hb-cn" data-act="cancel">Batal</button><button type="button" class="hb-sv" data-act="save">Simpan</button></div></div>';
    sheet.hidden = false;
  }
  function formErr(msg) { var p = sheet.querySelector("#hbErr"); if (!p) return; p.textContent = msg || ""; p.hidden = !msg; if (msg) p.scrollIntoView({ block: "nearest" }); }
  function pressed(sel, attr, test) { sheet.querySelectorAll(sel).forEach(function (b) { var on = test(b); if (b.getAttribute(attr) !== String(on)) b.setAttribute(attr, on); }); }
  function syncForm() {
    var e = ui.edit, n = sheet.querySelector("#hbN"), t = sheet.querySelector("#hbT"), u = sheet.querySelector("#hbU"), o = sheet.querySelector("#hbNote");
    if (n) e.name = n.value; if (t) e.target = t.value; if (u) e.unit = u.value; if (o) e.note = o.value;
  }
  function saveForm() {
    syncForm(); var e = ui.edit, name = String(e.name).trim();
    if (!name) return formErr("Nama habit wajib diisi.");
    if (e.mode === "count" && !(+e.target > 0)) return formErr("Target harus lebih dari 0.");
    if (!e.days.length) return formErr("Pilih minimal satu hari.");
    var h = { id: e.id || uid(), name: name, icon: iconKey(e.icon), color: e.color, mode: e.mode, target: e.mode === "check" ? 1 : Math.round(+e.target), unit: e.mode === "check" ? "" : String(e.unit).trim(), note: String(e.note).trim(), days: e.days.slice().sort(), created: e.created || today() };
    var i = S.habits.map(function (x) { return x.id; }).indexOf(h.id);
    if (i >= 0) { h.created = S.habits[i].created || h.created; S.habits[i] = h; } else S.habits.push(h);
    save(); sheet.hidden = true; sheet.innerHTML = ""; ui.edit = null; render(false);
  }
  function confirmDel() {
    var e = ui.edit, ok = function () { S.habits = S.habits.filter(function (x) { return x.id !== e.id; }); Object.keys(S.logs).forEach(function (d) { delete S.logs[d][e.id]; }); save(); sheet.hidden = true; sheet.innerHTML = ""; ui.edit = null; render(false); };
    if (M.confirm) return M.confirm("Hapus habit?", "Riwayat habit ini ikut terhapus.", "Ya, hapus", ok);
    if (window.confirm("Hapus habit ini beserta riwayatnya?")) ok();
  }
  function sample() {
    var t = today();
    S.habits = S.habits.concat([
      { id: uid(), name: "Minum Air", icon: "i20", color: "biru", mode: "count", target: 8, unit: "gelas", note: "Minimal 8 gelas sehari", days: DOWS.slice(), created: t },
      { id: uid(), name: "Membaca", icon: "i40", color: "tosca", mode: "count", target: 20, unit: "menit", note: "", days: DOWS.slice(), created: t },
      { id: uid(), name: "Olahraga", icon: "i25", color: "hijau", mode: "count", target: 30, unit: "menit", note: "", days: DOWS.slice(), created: t },
      { id: uid(), name: "Tidur Tepat Waktu", icon: "i30", color: "oranye", mode: "check", target: 1, unit: "", note: "Sebelum jam 23.00", days: DOWS.slice(), created: t }]);
    save(); render(false);
  }

  /* ---------- aksi ---------- */
  function setVal(h, d, v) { S.logs[d] = S.logs[d] || {}; v = Math.max(0, Math.min(99999, v)); if (v) S.logs[d][h.id] = v; else delete S.logs[d][h.id]; save(); }
  function click(ev) {
    var b = ev.target.closest("[data-act]"); if (!b || !ov.contains(b)) return;
    var a = b.dataset.act, id = b.dataset.id, h = id && S.habits.filter(function (x) { return x.id === id; })[0], d = ui.tab === "day" ? ui.day : today();
    if (a === "close") return close();
    if (a === "tab") { if (ui.tab === b.dataset.t) return; ui.tab = b.dataset.t; return render(true); }
    if (a === "add") return openForm();
    if (a === "edit") return openForm(id);
    if (a === "sample") return sample();
    if (a === "tap" && h) {
      if (d > today()) return;
      var v = val(h, d), was = done(h, d), q0 = stat(d), all0 = q0.t && q0.n === q0.t;
      if (h.mode === "check") setVal(h, d, v ? 0 : 1); else setVal(h, d, v >= tgt(h) ? v : Math.min(tgt(h), v + step(h)));
      patchAll(); pop(b.closest(".hb-item").querySelector(".hb-em"));
      if (!was && done(h, d)) burst(b);
      var q1 = stat(d); if (!all0 && q1.t && q1.n === q1.t) cheer(b);
      return;
    }
    if (a === "dec" && h) { setVal(h, ui.day, val(h, ui.day) - step(h)); return patchAll(); }
    if (a === "pick") { if (ui.day === b.dataset.d) return; ui.day = b.dataset.d; return render(false); }
    if (a === "wk") { ui.day = add(ui.day, +b.dataset.n); return render(false); }
    if (a === "today") { ui.day = today(); return render(false); }
    if (a === "stat") { if (ui.stat === b.dataset.s) return; ui.stat = b.dataset.s; return render(true); }
    if (a === "all") { ui.all = !ui.all; return render(false); }
    if (!ui.edit) return;
    if (a === "ico") { ui.edit.icon = b.dataset.v; pressed(".hb-icons button", "aria-pressed", function (x) { return x.dataset.v === ui.edit.icon; }); var pv = sheet.querySelector("#hbPv"); if (pv) pv.innerHTML = ico(ui.edit.icon); return; }
    if (a === "clr") { ui.edit.color = b.dataset.v; pressed(".hb-pick.cl button", "aria-pressed", function (x) { return x.dataset.v === ui.edit.color; }); var pc = sheet.querySelector("#hbPv"); if (pc) pc.style.setProperty("--c", col(ui.edit)); return; }
    if (a === "mode") { ui.edit.mode = b.dataset.v; pressed("[data-act=mode]", "aria-selected", function (x) { return x.dataset.v === ui.edit.mode; }); var tw = sheet.querySelector("#hbTwo"); if (tw) tw.hidden = ui.edit.mode !== "count"; return; }
    if (a === "dow") { var w = +b.dataset.v, k = ui.edit.days.indexOf(w); k >= 0 ? ui.edit.days.splice(k, 1) : ui.edit.days.push(w); b.setAttribute("aria-pressed", k < 0); formErr(""); return; }
    if (a === "cancel") { sheet.hidden = true; sheet.innerHTML = ""; ui.edit = null; return; }
    if (a === "save") return saveForm();
    if (a === "del") return confirmDel();
  }
  function key(e) { if (e.key === "Escape" && ov && !ov.hidden) { if (!sheet.hidden) { sheet.hidden = true; sheet.innerHTML = ""; ui.edit = null; ov.setAttribute("data-pg-keep", "1"); setTimeout(function () { ov.removeAttribute("data-pg-keep"); }, 600); } else close(); } }
  function build() {
    ov = document.createElement("div"); ov.className = "hb-ov"; ov.hidden = true; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-label", "Habit");
    ov.innerHTML = '<div class="hb-win"><header class="hb-top"><button class="hb-ic" data-act="close" aria-label="Tutup">' + BACK + "</button><h2>" + MI + "<span>Habit</span></h2>" + '<button class="hb-ic hb-add" data-act="add" aria-label="Tambah habit">' + PLUS + '</button></header><nav class="hb-tabs" role="tablist"></nav><div class="hb-body"></div><div class="hb-sheet" hidden></div></div>';
    document.body.appendChild(ov); body = ov.querySelector(".hb-body"); sheet = ov.querySelector(".hb-sheet");
    ov.addEventListener("click", click); document.addEventListener("keydown", key);
    ov.addEventListener("click", function (e) { if (e.target === ov) close(); });
  }
  function open() {
    S = load(); if (!ov) build(); ui.day = today(); ui.tab = ui.tab || "home"; render(true); ov.hidden = false; document.documentElement.classList.add("hb-open");
    if (window.BeresinI18n && BeresinI18n.refresh) try { BeresinI18n.refresh(); } catch (e) {}
  }
  function close() { if (ov) { ov.hidden = true; sheet.hidden = true; sheet.innerHTML = ""; ui.edit = null; } document.documentElement.classList.remove("hb-open"); chip(); }
  function chipVal() { var l = list(today()), n = l.filter(function (h) { return done(h, today()); }).length; return l.length ? n + "/" + l.length : "0"; }
  function chip() { var el = document.getElementById("tGoal"); if (el) { var v = chipVal(); if (el.textContent !== v) el.textContent = v; } }
  window.BeresinHabit = { open: open, close: close, chip: chipVal };
  M.routes = M.routes || {}; M.routes["#goal"] = open; M.routes["#habit"] = open;
  function init() { M.routes["#goal"] = open; chip(); var el = document.getElementById("tGoal"); if (el) new MutationObserver(chip).observe(el, { childList: true, characterData: true, subtree: true }); setInterval(chip, 4000); window.addEventListener("storage", function (e) { if (e.key === KEY) { S = load(); chip(); if (ov && !ov.hidden) render(false); } }); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
