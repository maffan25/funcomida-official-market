/* i18n.js — Bahasa Indonesia / English / العربية (v7.5: angka tanggal/jam Arab-Hindi, potongan kalimat di batas simpul teks)
   Pendekatan: teks sumber tetap Indonesia; saat bahasa ≠ id, tiap teks di layar (isi, placeholder, title, aria-label, alt,
   tombol, teks SVG, teks kanvas, notifikasi, confirm/alert/prompt, tanggal) diterjemahkan lewat kamus + templat + aturan.
   Saat bahasa = id tidak ada pengamat yang jalan (tanpa beban).
   KAMUS: baris "id|en|ar" (satu baris satu entri, jangan pakai tanda | di dalam teks).
   TEMPLAT: baris yang memuat {} (atau {1},{2} di sisi terjemahan untuk menukar urutan), mis.
            "Sisa {} belum muat|{} left unscheduled|{} متبقٍ دون جدولة" — {} cocok dengan angka/tanggal/judul pengguna.
   Berkas kamus: i18n-dict.js, i18n-dict2.js, i18n-tpl.js (dimuat sebelum berkas ini), i18n-bank.js (dimuat malas saat bahasa ≠ id).
   Merek "Beresin" tidak pernah diterjemahkan. */
(function () {
  "use strict";
  var KEY = "mo-lang", NAMES = { id: "Bahasa Indonesia", en: "English", ar: "العربية" }, IDX = { en: 1, ar: 2 };
  var RAW = [["Beranda", "Home", "الرئيسية"], ["Pengaturan", "Settings", "الإعدادات"], ["Profil", "Profile", "الملف الشخصي"], ["Mode Tampilan", "Display Mode", "وضع العرض"], ["Status Kegiatan", "Activity Status", "حالة الأنشطة"], ["Tampilan Board", "Board View", "عرض اللوحة"], ["Sambung Perangkat", "Connect Devices", "ربط الأجهزة"], ["Data & Cadangan", "Data & Backup", "البيانات والنسخ الاحتياطي"], ["Bahasa", "Language", "اللغة"], ["Atur profil Anda", "Set up your profile", "أعدّ ملفك الشخصي"], ["Akademik", "Academic", "الأكاديمي"], ["Kerja", "Work", "العمل"], ["Organisasi", "Organization", "المنظمة"], ["Keuangan", "Finance", "المالية"], ["Dokumen", "Documents", "المستندات"], ["Analisis", "Analysis", "التحليل"], ["Analitik", "Analytics", "التحليلات"], ["Ringkasan & Analisis", "Summary & Analysis", "الملخص والتحليل"], ["Kalender", "Calendar", "التقويم"], ["Tugas", "Tasks", "المهام"], ["Inbox", "Inbox", "صندوق الوارد"], ["Akun", "Account", "الحساب"], ["Menu", "Menu", "القائمة"], ["Menu utama", "Main menu", "القائمة الرئيسية"], ["Cari", "Search", "بحث"], ["Simpan", "Save", "حفظ"], ["Batal", "Cancel", "إلغاء"], ["Hapus", "Delete", "حذف"], ["Edit", "Edit", "تعديل"], ["Ubah", "Edit", "تغيير"], ["Tambah", "Add", "إضافة"], ["Tutup", "Close", "إغلاق"], ["Lanjut", "Continue", "متابعة"], ["Lewati", "Skip", "تخطي"], ["Unduh", "Download", "تنزيل"], ["Atur", "Manage", "إدارة"], ["Lihat semua", "View all", "عرض الكل"], ["Ya, hapus", "Yes, delete", "نعم، احذف"], ["Semua", "All", "الكل"], ["Aktif", "Active", "نشط"], ["Tidak aktif", "Inactive", "غير نشط"], ["Selesai", "Done", "مكتمل"], ["Mulai", "Start", "ابدأ"], ["Jeda", "Pause", "إيقاف مؤقت"], ["Status", "Status", "الحالة"], ["Prioritas", "Priority", "الأولوية"], ["Tinggi", "High", "عالية"], ["Sedang", "Medium", "متوسطة"], ["Rendah", "Low", "منخفضة"], ["Urgent", "Urgent", "عاجل"], ["Santai", "Relaxed", "مريح"], ["Penting", "Important", "مهم"], ["Belum dikerjakan", "Not started", "لم يبدأ"], ["Sedang dikerjakan", "In progress", "قيد التنفيذ"], ["Hari ini", "Today", "اليوم"], ["Besok", "Tomorrow", "غداً"], ["Kemarin", "Yesterday", "أمس"], ["Lusa", "Day after tomorrow", "بعد غد"], ["Minggu ini", "This week", "هذا الأسبوع"], ["Minggu depan", "Next week", "الأسبوع القادم"], ["Terlambat", "Overdue", "متأخر"], ["Mendatang", "Upcoming", "القادم"], ["Riwayat", "History", "السجل"], ["Catatan", "Notes", "ملاحظات"], ["Deskripsi", "Description", "الوصف"], ["Judul", "Title", "العنوان"], ["Nama", "Name", "الاسم"], ["Tanggal", "Date", "التاريخ"], ["Lokasi", "Location", "الموقع"], ["Kategori", "Category", "الفئة"], ["Jenis", "Type", "النوع"], ["Label", "Label", "التسمية"], ["Warna", "Color", "اللون"], ["Deadline", "Deadline", "الموعد النهائي"], ["Tenggat", "Due", "الموعد النهائي"], ["Opsional", "Optional", "اختياري"], ["Subtugas", "Subtasks", "المهام الفرعية"], ["Tambah tugas", "Add task", "إضافة مهمة"], ["Tugas baru", "New task", "مهمة جديدة"], ["Judul tugas", "Task title", "عنوان المهمة"], ["Jenis tugas", "Task type", "نوع المهمة"], ["Semua Tugas", "All Tasks", "كل المهام"], ["Tidak ada tugas.", "No tasks.", "لا توجد مهام."], ["Belum ada tugas", "No tasks yet", "لا توجد مهام بعد"], ["Semua tugas selesai", "All tasks done", "اكتملت كل المهام"], ["Proyek", "Project", "المشروع"], ["Acara", "Event", "الحدث"], ["Rapat", "Meeting", "الاجتماع"], ["Ujian", "Exam", "الاختبار"], ["Pekerjaan", "Job", "الوظيفة"], ["Target", "Target", "الهدف"], ["Belum ada proyek", "No projects yet", "لا توجد مشاريع بعد"], ["Belum ada goal", "No goals yet", "لا توجد أهداف بعد"], ["Belum ada riwayat", "No history yet", "لا يوجد سجل بعد"], ["Belum ada agenda", "No agenda yet", "لا يوجد جدول أعمال بعد"], ["Belum ada rapat", "No meetings yet", "لا توجد اجتماعات بعد"], ["Belum ada organisasi", "No organizations yet", "لا توجد منظمات بعد"], ["Belum ada pekerjaan", "No jobs yet", "لا توجد وظائف بعد"], ["Tidak ada hasil", "No results", "لا توجد نتائج"], ["Tidak ada yang cocok.", "No matches.", "لا يوجد ما يطابق."], ["Semua beres!", "All done!", "اكتمل كل شيء!"], ["Selamat pagi", "Good morning", "صباح الخير"], ["Selamat siang", "Good afternoon", "طاب نهارك"], ["Selamat sore", "Good evening", "مساء الخير"], ["Selamat malam", "Good night", "ليلة سعيدة"], ["Selamat dini hari", "Good early morning", "طاب فجرك"], ["Selamat datang di Beresin", "Welcome to Beresin", "مرحباً بك في Beresin"], ["Sekolah/Kampus", "School/College", "المدرسة/الجامعة"], ["Sekolah/Kampus utama", "Main school/college", "المدرسة/الجامعة الرئيسية"], ["Tambah sekolah/kampus", "Add school/college", "إضافة مدرسة/جامعة"], ["Atur sekolah/kampus", "Manage school/college", "إدارة المدرسة/الجامعة"], ["Nama sekolah/kampus *", "School/college name *", "اسم المدرسة/الجامعة *"], ["Sekolah/Kampus ditambahkan", "School/college added", "تمت إضافة المدرسة/الجامعة"], ["Sekolah", "School", "مدرسة"], ["Kampus", "College", "جامعة"], ["Mata Pelajaran/Mata Kuliah", "Subject/Course", "المادة/المقرر"], ["Mata pelajaran/mata kuliah", "Subject/course", "المادة/المقرر"], ["Nama mata pelajaran/mata kuliah", "Subject/course name", "اسم المادة/المقرر"], ["Kode mata pelajaran/mata kuliah", "Subject/course code", "رمز المادة/المقرر"], ["Logo mata pelajaran/mata kuliah", "Subject/course logo", "شعار المادة/المقرر"], ["Nama dosen", "Teacher/lecturer name", "اسم المعلّم/المحاضر"], ["Jadwal", "Schedule", "الجدول"], ["Ruangan / tautan kelas", "Room / class link", "القاعة / رابط الصف"], ["Semester", "Semester", "الفصل الدراسي"], ["Semester (hanya semester aktif)", "Semester (active only)", "الفصل الدراسي (النشط فقط)"], ["Jejak Semester", "Semester Trail", "مسار الفصول"], ["Status semester", "Semester status", "حالة الفصل الدراسي"], ["Catatan semester", "Semester notes", "ملاحظات الفصل"], ["Target IP semester", "Semester GPA target", "هدف المعدل الفصلي"], ["Belum ada semester aktif", "No active semester", "لا يوجد فصل دراسي نشط"], ["Jumlah SKS", "Credit hours (SKS)", "عدد الوحدات (SKS)"], ["Formula Nilai", "Grading Formula", "معادلة الدرجات"], ["Target nilai (huruf)", "Target grade (letter)", "الدرجة المستهدفة (حرف)"], ["Kelas", "Grade", "الصف"], ["Kelas (khusus sekolah)", "Grade", "الصف"], ["mis. X / 10 / VII", "e.g. X / 10 / VII", "مثال: 10 / X / VII"], ["Semester 1 (Ganjil)", "Semester 1 (Odd)", "الفصل 1 (الفردي)"], ["Semester 2 (Genap)", "Semester 2 (Even)", "الفصل 2 (الزوجي)"], ["Kampus (universitas)", "College / university", "جامعة / كلية"], ["Sekolah (SD / SMP / SMA / SMK)", "School (elementary – high school)", "مدرسة (ابتدائي – ثانوي)"], ["Dashboard", "Dashboard", "لوحة المعلومات"], ["Dasar progres", "Progress basis", "أساس التقدم"], ["Anggaran", "Budget", "الميزانية"], ["Pemasukan", "Income", "الدخل"], ["Pengeluaran", "Expenses", "المصروفات"], ["Tabungan", "Savings", "المدخرات"], ["Transaksi", "Transactions", "المعاملات"], ["Dompet", "Wallet", "المحفظة"], ["Total saldo", "Total balance", "إجمالي الرصيد"], ["Perintah cepat", "Quick command", "أمر سريع"], ["Pengingat", "Reminders", "التذكيرات"], ["Notifikasi", "Notifications", "الإشعارات"], ["Dikerjakan", "Worked on", "قيد العمل"], ["Ditunda", "Postponed", "مؤجّل"], ["Dibatalkan", "Cancelled", "ملغى"], ["Harian", "Daily", "يومي"], ["Mingguan", "Weekly", "أسبوعي"], ["Bulanan", "Monthly", "شهري"], ["Tahunan", "Yearly", "سنوي"], ["Januari", "January", "يناير"], ["Februari", "February", "فبراير"], ["Maret", "March", "مارس"], ["April", "April", "أبريل"], ["Mei", "May", "مايو"], ["Juni", "June", "يونيو"], ["Juli", "July", "يوليو"], ["Agustus", "August", "أغسطس"], ["September", "September", "سبتمبر"], ["Oktober", "October", "أكتوبر"], ["November", "November", "نوفمبر"], ["Desember", "December", "ديسمبر"], ["Senin", "Monday", "الإثنين"], ["Selasa", "Tuesday", "الثلاثاء"], ["Rabu", "Wednesday", "الأربعاء"], ["Kamis", "Thursday", "الخميس"], ["Jumat", "Friday", "الجمعة"], ["Sabtu", "Saturday", "السبت"], ["Minggu", "Sunday", "الأحد"], ["Pilih bahasa aplikasi. Perubahan langsung berlaku di seluruh tampilan.", "Choose the app language. Changes apply instantly across the whole interface.", "اختر لغة التطبيق. يسري التغيير فوراً على كامل الواجهة."]];
  var D = {}, T = [], TS = false, MON = [], cur = "id", mo = null, pend = [], raf = 0, ORIG = new WeakMap(), AORIG = new WeakMap(), CACHE = Object.create(null), bankState = 0;
  var SELF = (document.currentScript && document.currentScript.src) || "";
  RAW.forEach(function (r) { D[r[0]] = r; });
  function esc(s) { return s.replace(/[.*+?^${}()|[\]\\\/]/g, "\\$&"); }
  function addLines(txt) {
    String(txt || "").split("\n").forEach(function (ln) {
      var p = ln.split("|"); if (p.length !== 3) return;
      var id = p[0].trim(), en = p[1].trim(), ar = p[2].trim(); if (!id) return;
      if (id.indexOf("{}") > -1) {
        var parts = id.split("{}"), lit = "", w = 0;
        parts.forEach(function (x) { w += x.length; if (x.length > lit.length) lit = x; });
        T.push({ re: new RegExp("^" + parts.map(esc).join("([\\s\\S]*?)") + "$"), lit: lit.length >= 3 ? lit : "", w: w, o: [null, en, ar] }); TS = false;
      } else { D[id] = [id, en, ar]; LONGK = null; }
    });
  }
  (function () { var ks = Object.keys(window); for (var i = 0; i < ks.length; i++) if (/^BeresinI18n(Dict|Tpl)/.test(ks[i]) && typeof window[ks[i]] === "string") addLines(window[ks[i]]); LONGK = null; })();
  var LRI = "\u2066", PDI = "\u2069", BRAND = /Beresin(?: (?:Finance|Office))?/g, MISS = {};
  function guard(t) { return cur === "ar" && t.indexOf("Beresin") > -1 && t.indexOf(LRI) < 0 && t.replace(BRAND, "").trim() !== "" ? t.replace(BRAND, function (b) { return LRI + b + PDI; }) : t; }
  var DEC = /^([^\p{L}\p{N}]*)([\s\S]*?)([^\p{L}\p{N}]*)$/u;
  /* ---- v7.5: angka tanggal & jam → angka Arab-Hindi (٠-٩) saat bahasa Arab ---------------------------------------
     Cakupan: jam (10:32:56, الساعة 17.00), tanggal (16 نوفمبر 2026, 2026-11-16, 6 جمادى الآخرة 1448 هـ), tahun ajaran (2026/2027),
     rentang waktu (7 أيام, 2 س 30 د) dan angka pada kotak tanggal (strip hari beranda, kalender, grid Academic).
     Nominal uang, jumlah, nilai/IP, persentase TIDAK diubah (tetap 0-9) agar mudah dibaca/dibandingkan.
     Ubah DIGITS_ALL ke true bila ingin SEMUA angka tampil Arab-Hindi. */
  var DIGITS_ALL = false, AD = "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669", DTX = null, DSEL = ".sf-day b,.ad-d,.kc-d,.kc-d small,.cd-n,.cal-d,.hb-dn";
  function ard(s) { return s.replace(/\d/g, function (d) { return AD.charAt(+d); }); }
  function dtInit() {
    var names = {}, AB = "\\u0600-\\u06FF";
    ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر", "محرم", "صفر", "ربيع الأول", "ربيع الآخر", "ربيع الثاني", "جمادى الأولى", "جمادى الآخرة", "جمادى الثانية", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"].forEach(function (m) { names[m] = 1; });
    try {
      ["ar-u-nu-latn", "ar-u-ca-islamic-nu-latn", "ar-u-ca-islamic-umalqura-nu-latn", "ar-u-ca-islamic-civil-nu-latn"].forEach(function (l) {
        ["long", "short"].forEach(function (w) {
          var f = new Intl.DateTimeFormat(l, { month: w });
          for (var i = 0; i < 40; i++) f.formatToParts(new Date(2026, 0, 1 + i * 9)).forEach(function (p) { if (p.type === "month" && p.value) names[p.value.replace(/[\d\s]+$/, "")] = 1; });
        });
      });
    } catch (e) {}
    var list = Object.keys(names).filter(function (x) { return x && !/^\d+$/.test(x); }).sort(function (a, b) { return b.length - a.length; }).map(esc).join("|"), M = "(?:" + list + ")", NA = "(?![" + AB + "])", YR = "(?:[\\s\u060C,]+\\d{4}(?:\\s*\u0647\u0640)?)";
    DTX = [
      /\d{4}-\d{1,2}-\d{1,2}|\d{1,2}\/\d{1,2}\/\d{2,4}|\d{4}\/\d{4}/g,
      new RegExp("(?:\\d{1,2}\\s*[-\u2013]\\s*)?\\d{1,2}\\s+" + M + NA + YR + "?", "g"),
      new RegExp("(?<![" + AB + "])" + M + NA + YR, "g"),
      /\d{1,4}\s*\u0647\u0640/g,
      /(^|[^\d.,:\u0660-\u0669])(\d{1,2}(?::\d{2}){1,2})(?!\d)/g,
      /(\u0627\u0644\u0633\u0627\u0639\u0629\s+)(\d{1,2}[.:]\d{2})(?!\d)/g,
      new RegExp("(^|[^\\d.,\u0660-\u0669])(\\d+(?:[.,]\\d+)?)(\\s*)(\u0633\u0627\u0639\u0627\u062A|\u0633\u0627\u0639\u0629|\u062F\u0642\u0627\u0626\u0642|\u062F\u0642\u064A\u0642\u0629|\u062B\u0648\u0627\u0646\u064D|\u062B\u0627\u0646\u064A\u0629|\u0623\u064A\u0627\u0645|\u064A\u0648\u0645\u0627\u064B|\u064A\u0648\u0645|\u0623\u0633\u0627\u0628\u064A\u0639|\u0623\u0633\u0628\u0648\u0639\u0627\u064B|\u0623\u0633\u0628\u0648\u0639|\u0623\u0634\u0647\u0631|\u0634\u0647\u0631\u0627\u064B|\u0634\u0647\u0631|\u0633\u0646\u0648\u0627\u062A|\u0633\u0646\u0629|\u0633|\u062F)(?![" + AB + "])", "g")
    ];
  }
  function dtd(s, el) {
    if (cur !== "ar" || !s) return s;
    if (!/\d/.test(s)) return s;
    if (DIGITS_ALL) return ard(s);
    var c = s.trim();
    if (/^\d{1,4}$/.test(c) && ((+c >= 1900 && +c <= 2100 && c.length === 4) || (el && el.closest && el.closest(DSEL)))) return ard(s);
    if (!DTX) dtInit();
    var o = s.replace(DTX[0], ard).replace(DTX[1], ard).replace(DTX[2], ard).replace(DTX[3], ard)
      .replace(DTX[4], function (m, a, b) { return a + ard(b); }).replace(DTX[5], function (m, a, b) { return a + ard(b); })
      .replace(DTX[6], function (m, a, n, sp, w) { return a + ard(n) + sp + w; });
    return o;
  }
  function trd(s) { var t = tr(s); return cur === "ar" ? dtd(t, null) : t; }
  function look1(core) {
    var r = D[core]; if (r) return r[IDX[cur]];
    var m = /^([\s\S]*?)([.:!?…]+)$/.exec(core);
    if (m && (r = D[m[1]])) return r[IDX[cur]] + m[2];
    var lo = core.charAt(0).toLowerCase() + core.slice(1), up = core.charAt(0).toUpperCase() + core.slice(1);
    if ((r = D[lo] || D[up])) return r[IDX[cur]];
    if (m && (r = D[m[1].charAt(0).toUpperCase() + m[1].slice(1)] || D[m[1].charAt(0).toLowerCase() + m[1].slice(1)])) return r[IDX[cur]] + m[2];
  }
  var LONGK = null;
  function prefix(core) {
    if (core.length < 28 || core.length > 200) return;
    if (!LONGK) LONGK = Object.keys(D).filter(function (k) { return k.length > 40; });
    for (var i = 0; i < LONGK.length; i++) if (LONGK[i].length > core.length && LONGK[i].indexOf(core) === 0) return D[LONGK[i]][IDX[cur]];
  }
  function look(core) {
    var r = look1(core); if (r !== undefined) return r;
    r = prefix(core); if (r !== undefined) return r;
    var d = DEC.exec(core);
    if (d && d[2] && (d[1] || d[3]) && /[\p{L}]/u.test(d[2])) { r = look1(d[2]); if (r !== undefined) return d[1] + r + d[3]; }
  }
  var PH = null;
  function phrases() { PH = Object.keys(D).filter(function (k) { return k.length >= 3 && /[A-Za-z]/.test(k) && k.indexOf("Beresin") < 0; }).sort(function (a, b) { return b.length - a.length; }); }
  function sub(g) { if (!g || !/[A-Za-z\u0600-\u06FF]/.test(g)) return g; var t = trc(g); return t === undefined ? g : t; }
  var SB = /[.!?…]\s+\p{Lu}/u;
  function tmpl(core, nr) {
    if (!T.length) return;
    if (!TS) { T.sort(function (a, b) { return b.w - a.w; }); TS = true; }
    for (var i = 0; i < T.length; i++) {
      var t = T[i]; if (t.lit && core.indexOf(t.lit) < 0) continue;
      var x = t.re.exec(core); if (!x) continue;
      var span = false; for (var gi = 1; gi < x.length; gi++) if (x[gi] && SB.test(x[gi])) { span = true; break; }
      if (span) continue;
      var n = 0;
      return t.o[IDX[cur]].replace(/\{(\d*)\}/g, function (m, k) { var g = x[k ? +k : ++n]; return g === undefined ? "" : sub(g); });
    }
    /* v7.5: potongan kalimat di batas simpul teks (bagian dinamis ada di simpul <b> sebelah): coba lagi dengan spasi di ujung yang hilang saat di-trim */
    if (nr !== 2) {
      var v1 = tmpl(core + " ", 2); if (v1 !== undefined) return v1;
      v1 = tmpl(" " + core, 2); if (v1 !== undefined) return v1;
      v1 = tmpl(" " + core + " ", 2); if (v1 !== undefined) return v1;
    }
    if (!nr) { var pm = /^([\s\S]*?)([.:!?…]+)$/.exec(core); if (pm) { var q = tmpl(pm[1], 1); if (q !== undefined) return q + pm[2]; } }
  }
  function piece(p) {
    var m = /^(\s*)([\s\S]*?)(\s*)$/.exec(p), c = m[2]; if (!c) return p;
    var h = look(c); if (h === undefined) h = tmpl(c);
    return h === undefined ? undefined : m[1] + h + m[3];
  }
  /* tutup seluruh kata dengan frasa kamus terpanjang; bila ada kata yang tak dikenal, JANGAN terjemahkan (hindari campur bahasa) */
  function cover(w) {
    if (!PH) phrases();
    var low = w.toLowerCase(), mask = new Array(w.length), reps = [];
    for (var k = 0; k < PH.length; k++) {
      var key = PH[k], kl = key.toLowerCase(), from = 0, at;
      while ((at = low.indexOf(kl, from)) > -1) {
        from = at + 1;
        if (/[A-Za-z]/.test(w.charAt(at - 1) || " ") || /[A-Za-z]/.test(w.charAt(at + key.length) || " ")) continue;
        var free = true; for (var i = at; i < at + key.length; i++) if (mask[i]) { free = false; break; }
        if (!free) continue;
        var rep = look(key); if (rep === undefined) continue;
        for (i = at; i < at + key.length; i++) mask[i] = 1;
        reps.push([at, key.length, rep]);
      }
    }
    for (var j = 0; j < w.length; j++) if (!mask[j] && /[A-Za-z]/.test(w.charAt(j))) return undefined;
    reps.sort(function (a, b) { return b[0] - a[0]; });
    var out = w; reps.forEach(function (r) { out = out.slice(0, r[0]) + r[2] + out.slice(r[0] + r[1]); });
    return out;
  }
  function seg(core) {
    /* teks gabungan: pecah per pemisah, lalu frasa terpanjang yang dikenal */
    var parts = core.split(/(\s[·•—–|]\s|[:()“”",;]|\s\+\s|\d[\d.,:]*)/), any = false, fail = false;
    var out = parts.map(function (p, n) {
      if (n % 2 || !p.trim()) return p;
      var m = /^(\s*)([\s\S]*?)(\s*)$/.exec(p), h = look(m[2]); if (h === undefined) h = tmpl(m[2]);
      if (h === undefined) {
        var cv = cover(m[2]);
        if (cv !== undefined) { any = true; return m[1] + cv + m[3]; }
        if (/[A-Za-z\u00C0-\u024F]{3}/.test(m[2])) fail = true;
        return p;
      }
      any = true; return m[1] + h + m[3];
    }).join("");
    return any && !fail ? out : undefined;
  }
  function clauses(core) {
    var parts = core.split(/([.!?…]+\s+|:\s+|;\s+|\s[—–]\s)/); if (parts.length < 3) return;
    var any = false, miss = false, out = parts.map(function (p, n) {
      if (n % 2 || !p.trim()) return p;
      var h = piece(p); if (h === undefined) { var s = seg(p.trim()); if (s !== undefined) { h = (/^\s/.test(p) ? " " : "") + s + (/\s$/.test(p) ? " " : ""); } }
      if (h === undefined) { if (!/[A-Za-z\u00C0-\u024F]{3}/.test(p)) return p; miss = true; return p; } any = true; return h;
    }).join("");
    return any && !miss ? out : undefined;
  }
  var TERMS = [["Mata Pelajaran/Mata Kuliah", 0], ["Mata pelajaran/mata kuliah", 0], ["mata pelajaran/mata kuliah", 0], ["Sekolah/Kampus", 0], ["sekolah/kampus", 0]];
  var TERMT = { en: ["Subject/Course", "Subject/course", "subject/course", "School/College", "school/college"], ar: ["المادة/المقرر", "المادة/المقرر", "المادة/المقرر", "المدرسة/الجامعة", "المدرسة/الجامعة"] };
  var R = [
    [/^Kelas (.+?) · Semester (\d+)$/, "Grade $1 · Semester $2", "الصف $1 · الفصل $2"],
    [/^(\d+(?:[.,]\d+)?)\s?j$/, "$1h", "$1 س"],
    [/^(\d+)\s?j\s?(\d+)\s?m$/, "$1h $2m", "$1 س $2 د"],
    [/^(\d+)\s?m$/, "$1m", "$1 د"],
    [/^Halo, (.+)$/, "Hello, $1", "مرحباً، $1"],
    [/^(\d+) aktif$/, "$1 active", "$1 نشط"],
    [/^(\d+) proyek$/, "$1 projects", "$1 مشروع"],
    [/^(\d+) terlambat$/, "$1 overdue", "$1 متأخر"],
    [/^Semester aktif: (.+)$/, "Active semester: $1", "الفصل النشط: $1"],
    [/^Tambah (.+)$/, null, null], [/^Edit (.+)$/, null, null]
  ];
  function rules(core) {
    for (var k = 0; k < R.length; k++) {
      var x = R[k][0].exec(core); if (!x) continue;
      if (R[k][IDX[cur]] === null) { var inner = D[x[1]] || D[x[1].charAt(0).toUpperCase() + x[1].slice(1)]; if (inner) return (/^Tambah/.test(core) ? (cur === "en" ? "Add " : "إضافة ") : (cur === "en" ? "Edit " : "تعديل ")) + inner[IDX[cur]]; }
      else return core.replace(R[k][0], function () { var a = arguments, t = R[k][IDX[cur]]; return t.replace(/\$(\d)/g, function (m, d) { return sub(a[+d]); }); });
    }
  }
  function trc(core) {
    var r = look(core); if (r !== undefined) return r;
    r = rules(core); if (r !== undefined) return r;
    r = tmpl(core); if (r !== undefined) return r;
    r = clauses(core); if (r !== undefined) return r;
    return seg(core);
  }
  /* kesepakatan bilangan: "1 days" → "1 day"; Arab: pasangan/jamak/tamyiz */
  var ENU = { days: "day", hours: "hour", minutes: "minute", seconds: "second", weeks: "week", months: "month", years: "year", tasks: "task", questions: "question", items: "item", jobs: "job", projects: "project", activities: "activity", files: "file", documents: "document", semesters: "semester", goals: "goal", milestones: "milestone", times: "time", receipts: "receipt", accounts: "account", transactions: "transaction", categories: "category", labels: "label", folders: "folder", shelves: "shelf", courses: "course", subjects: "subject", exams: "exam", meetings: "meeting", events: "event", banks: "bank", questionbanks: "question bank" };
  var ENRE = new RegExp("(^|[^\\d.,])1 (" + Object.keys(ENU).join("|") + ")\\b", "g");
  var ARU = { "أيام": ["يوم", "يومان", "يوماً"], "ساعات": ["ساعة", "ساعتان", "ساعة"], "دقائق": ["دقيقة", "دقيقتان", "دقيقة"], "ثوانٍ": ["ثانية", "ثانيتان", "ثانية"], "أسابيع": ["أسبوع", "أسبوعان", "أسبوعاً"], "أشهر": ["شهر", "شهران", "شهراً"], "سنوات": ["سنة", "سنتان", "سنة"], "مهام": ["مهمة", "مهمتان", "مهمة"], "أسئلة": ["سؤال", "سؤالان", "سؤالاً"], "عناصر": ["عنصر", "عنصران", "عنصراً"], "وظائف": ["وظيفة", "وظيفتان", "وظيفة"], "مشاريع": ["مشروع", "مشروعان", "مشروعاً"], "أنشطة": ["نشاط", "نشاطان", "نشاطاً"], "ملفات": ["ملف", "ملفان", "ملفاً"], "مستندات": ["مستند", "مستندان", "مستنداً"], "فصول": ["فصل", "فصلان", "فصلاً"], "أهداف": ["هدف", "هدفان", "هدفاً"], "معالم": ["معلم", "معلمان", "معلماً"], "مرات": ["مرة", "مرتان", "مرة"], "إيصالات": ["إيصال", "إيصالان", "إيصالاً"], "حسابات": ["حساب", "حسابان", "حساباً"], "معاملات": ["معاملة", "معاملتان", "معاملة"], "مجلدات": ["مجلد", "مجلدان", "مجلداً"], "رفوف": ["رف", "رفّان", "رفاً"], "اجتماعات": ["اجتماع", "اجتماعان", "اجتماعاً"], "اختبارات": ["اختبار", "اختباران", "اختباراً"], "بنوك": ["بنك", "بنكان", "بنكاً"] };
  var ARRE = new RegExp("(^|[^\\d.,])(\\d+) (" + Object.keys(ARU).join("|") + ")(?![\\u0600-\\u06FF])", "g");
  function agree(s) {
    if (cur === "en") return s.indexOf("1 ") < 0 ? s : s.replace(ENRE, function (m, a, w) { return a + "1 " + ENU[w]; });
    return s.replace(ARRE, function (m, a, n, w) { n = +n; var f = ARU[w]; return a + (n === 1 ? f[0] : n === 2 ? f[1] : n >= 3 && n <= 10 ? n + " " + w : n + " " + f[2]); }).replace(/(^|[^\d.,])1 (يوم|ساعة|دقيقة|ثانية|أسبوع|شهر|سنة|مهمة|سؤال|عنصر|وظيفة|مشروع|نشاط|ملف|مستند|فصل|هدف|معلم|مرة|إيصال|حساب|معاملة|مجلد|رف|اجتماع|اختبار|بنك)/g, "$1$2");
  }
  function lang() { return cur; }
  function tr(s) {
    if (cur === "id" || !s) return s;
    var m = /^(\s*)([\s\S]*?)(\s*)$/.exec(s), core = m[2];
    if (!core) return s;
    var out = CACHE[core];
    if (out === undefined) { var t = trc(core); out = CACHE[core] = t === undefined ? null : agree(t); }
    if (out === null || out === core) return s;
    return m[1] + guard(out) + m[3];
  }
  function skip(el) {
    for (var n = el; n && n.nodeType === 1; n = n.parentNode) {
      var t = n.tagName; t = t && t.toUpperCase();
      if (t === "SCRIPT" || t === "STYLE" || t === "TEXTAREA" || n.isContentEditable || n.hasAttribute("data-no-i18n")) return true;
    }
    return false;
  }
  function text(n) {
    var v = n.nodeValue, o = ORIG.get(n);
    if (o && o.t === v) return;
    if (!v) return;
    var lat = /[A-Za-z]/.test(v), dig = cur === "ar" && /\d/.test(v);
    if (!lat && !dig) return;
    var t = lat ? tr(v) : v;
    if (dig) t = dtd(t, n.parentNode);
    if (t !== v) { ORIG.set(n, { o: v, t: t }); n.nodeValue = t; }
    else if (lat && v.trim().length > 2 && /[a-z]{3}/.test(v) && v.indexOf("Beresin") < 0) MISS[v.trim()] = 1;
  }
  var ATTR = ["placeholder", "title", "aria-label", "alt"];
  function attrs(el) {
    var rec = AORIG.get(el) || null, list = ATTR;
    if (el.tagName === "INPUT" && /^(button|submit|reset)$/i.test(el.type || "")) list = ATTR.concat("value");
    for (var i = 0; i < list.length; i++) {
      var a = list[i], v = el.getAttribute(a);
      if (!v) continue;
      var o = rec && rec[a];
      if (o && o.t === v) continue;
      var t = tr(v);
      if (cur === "ar" && a !== "value") t = dtd(t, el);
      if (t !== v) { rec = rec || {}; rec[a] = { o: v, t: t }; AORIG.set(el, rec); el.setAttribute(a, t); }
      else if (v.trim().length > 2 && /[a-z]{3}/.test(v) && v.indexOf("Beresin") < 0) MISS[v.trim()] = 1;
    }
  }
  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { if (root.parentNode && !skip(root.parentNode)) text(root); return; }
    if (root.nodeType !== 1) return;
    /* v7.4: <textarea> — isinya (ketikan pengguna) tidak disentuh, tetapi placeholder/title/aria-label tetap diterjemahkan */
    if (skip(root)) { if (root.tagName === "TEXTAREA" && !root.hasAttribute("data-no-i18n")) attrs(root); return; }
    attrs(root);
    var w = document.createTreeWalker(root, 5, { acceptNode: function (n) { return n.nodeType === 1 && skip(n) ? (n.tagName === "TEXTAREA" ? 3 : 2) : 1; } }), n;
    while ((n = w.nextNode())) { if (n.nodeType === 3) text(n); else attrs(n); }
    var ta = root.querySelectorAll ? root.querySelectorAll("textarea:not([data-no-i18n])") : [];
    for (var ti = 0; ti < ta.length; ti++) attrs(ta[ti]);
  }
  function restore(root) {
    var w = document.createTreeWalker(root, 5), n;
    while ((n = w.nextNode())) {
      if (n.nodeType === 3) { var o = ORIG.get(n); if (o && o.t === n.nodeValue) n.nodeValue = o.o; ORIG.delete(n); }
      else { var rec = AORIG.get(n); if (rec) { for (var a in rec) if (n.getAttribute(a) === rec[a].t) n.setAttribute(a, rec[a].o); AORIG.delete(n); } }
    }
  }
  function flush() { raf = 0; var l = pend; pend = []; for (var i = 0; i < l.length; i++) if (l[i].isConnected !== false) walk(l[i]); }
  function queue(n) { pend.push(n); if (!raf) raf = requestAnimationFrame(flush); }
  function observe() {
    if (mo || !window.MutationObserver) return;
    mo = new MutationObserver(function (ms) {
      for (var i = 0; i < ms.length; i++) {
        var m = ms[i];
        if (m.type === "characterData") { var o = ORIG.get(m.target); if (!o || o.t !== m.target.nodeValue) queue(m.target); }
        else if (m.type === "attributes") { var rec = AORIG.get(m.target), a = m.attributeName; if (!rec || !rec[a] || rec[a].t !== m.target.getAttribute(a)) queue(m.target); }
        else for (var j = 0; j < m.addedNodes.length; j++) queue(m.addedNodes[j]);
      }
    });
    mo.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["placeholder", "title", "aria-label", "alt", "value"] });
  }
  /* ---- teks di luar DOM: kanvas, notifikasi, tanggal, judul ---- */
  (function () {
    var P = window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype;
    if (P && !P.__i18n) { ["fillText", "strokeText", "measureText"].forEach(function (k) { var o = P[k]; if (o) P[k] = function (t) { if (cur !== "id" && typeof t === "string") arguments[0] = trd(t); return o.apply(this, arguments); }; }); P.__i18n = 1; }
    var NT = window.Notification;
    if (NT && !NT.__i18n) {
      try { var W = class extends NT { constructor(t, o) { super(cur === "id" ? t : trd(String(t)), o && o.body && cur !== "id" ? Object.assign({}, o, { body: trd(String(o.body)) }) : o); } }; W.__i18n = 1; window.Notification = W; } catch (e) {}
    }
    function loc(a) { return cur !== "id" && typeof a === "string" && /^id(-|$)/i.test(a) ? (cur === "ar" ? "ar-u-nu-latn" : "en-GB") : a; }
    ["toLocaleDateString", "toLocaleString", "toLocaleTimeString"].forEach(function (k) { var o = Date.prototype[k]; if (o && !o.__i18n) { var f = function (a, b) { return o.call(this, loc(a), b); }; f.__i18n = 1; Date.prototype[k] = f; } });
  })();
  var DESC = "Beresin — Semua teratur, hidup lebih mudah.";
  function meta() {
    var m = document.querySelector('meta[name="description"]'); if (!m) return;
    if (!m.__o) m.__o = m.getAttribute("content") || DESC;
    m.setAttribute("content", cur === "id" ? m.__o : (tr(m.__o) || m.__o));
  }
  function loadBank() {
    /* v7.5: bank soal sengaja TIDAK diterjemahkan (isinya unggahan pengguna) */
    if (true) return;
    if (bankState || cur === "id") return; bankState = 1;
    var s = document.createElement("script"); s.async = true;
    s.src = (SELF ? SELF.replace(/i18n\.js/, "i18n-bank.js") : "i18n-bank.js");
    s.onload = function () { if (typeof window.BeresinI18nBank === "string") addLines(window.BeresinI18nBank); bankState = 2; PH = null; CACHE = Object.create(null); if (cur !== "id") walk(document.body); };
    s.onerror = function () { bankState = 0; };
    document.head.appendChild(s);
  }
  function apply(l, silent) {
    cur = NAMES[l] ? l : "id"; CACHE = Object.create(null);
    var h = document.documentElement;
    h.lang = cur; h.dir = cur === "ar" ? "rtl" : "ltr"; h.setAttribute("data-lang", cur);
    if (cur === "id") { if (mo) { mo.disconnect(); mo = null; } pend = []; restore(document.body); }
    else { observe(); walk(document.body); loadBank(); }
    meta();
    if (!silent) document.dispatchEvent(new CustomEvent("beresin:lang", { detail: cur }));
  }
  function set(l) {
    try { localStorage.setItem(KEY, l); } catch (e) {}
    var from = cur; if (from !== "id") { restore(document.body); } apply(l);
    var box = document.querySelectorAll("[data-lang-pick]");
    for (var i = 0; i < box.length; i++) box[i].setAttribute("aria-pressed", String(box[i].getAttribute("data-lang-pick") === cur));
  }
  function html() {
    return '<div class="ac-card lg-card"><b>' + "Bahasa" + '</b><p class="ac-hint" style="margin:4px 0 12px">Pilih bahasa aplikasi. Perubahan langsung berlaku di seluruh tampilan.</p><div class="lg-grid" role="group">' +
      ["id", "en", "ar"].map(function (k) {
        return '<button type="button" class="lg-opt" data-lang-pick="' + k + '" aria-pressed="' + (k === cur) + '" data-no-i18n lang="' + k + '"><i>' + k.toUpperCase() + "</i><span>" + NAMES[k] + "</span></button>";
      }).join("") + "</div></div>";
  }
  function semName(kelas, smt) { return "Kelas " + String(kelas).trim() + " · Semester " + (smt || "1"); }
  function semFields(def, kind) {
    if (kind !== "sekolah") return def;
    var f = def.fields.filter(function (x) { return x.k !== "name"; });
    return { title: def.title, def: def.def, fields: [
      { k: "kelas", l: "Kelas", t: "text", ph: "mis. X / 10 / VII", req: 1 },
      { k: "smt", l: "Semester", t: "select", o: [["1", "Semester 1 (Ganjil)"], ["2", "Semester 2 (Genap)"]], req: 1 }
    ].concat(f) };
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-lang-pick]");
    if (b) { e.preventDefault(); e.stopPropagation(); set(b.getAttribute("data-lang-pick")); }
  }, true);
  ["confirm", "alert", "prompt"].forEach(function (k) { var o = window[k]; if (o) window[k] = function (m, d) { return o.call(window, cur === "id" ? m : trd(String(m)), d); }; });
  window.BeresinI18n = { missing: function () { return Object.keys(MISS); }, html: html, set: set, lang: lang, tr: tr, semName: semName, semFields: semFields, names: NAMES, add: addLines, rescan: function () { CACHE = Object.create(null); if (cur !== "id") walk(document.body); } };
  var saved = null; try { saved = localStorage.getItem(KEY); } catch (e) {}
  var go = function () { if (saved && saved !== "id" && NAMES[saved]) apply(saved, true); };
  if (document.body) go(); else document.addEventListener("DOMContentLoaded", go);
})();
