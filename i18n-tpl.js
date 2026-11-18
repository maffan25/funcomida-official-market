/* i18n-tpl.js — templat kalimat dinamis; {} = bagian yang berubah (angka, tanggal, judul) (format "id|en|ar"; jangan pakai tanda | di dalam teks). Merek "Beresin" tidak diterjemahkan. */
window.BeresinI18nTpl = `
Semester: {}|Semester: {}|الفصل: {}
Target: {}|Target: {}|الهدف: {}
Milestone "{}" {}|Milestone "{}" {}|المعلم "{}" {}
rata-rata {}/hari|average {}/day|المتوسط {}/يوم
{}/hari|{}/day|{}/يوم
pada {}. Uang keluar lebih besar dari yang masuk.|in {}. Money going out is greater than money coming in.|في {}. المبلغ الخارج أكبر من الداخل.
dibanding bulan lalu ({} → {}).|compared with last month ({} → {}).|مقارنةً بالشهر الماضي ({} ← {}).
{} / 100 XP menuju level berikutnya|{} / 100 XP to the next level|{} / 100 نقطة خبرة للمستوى التالي
{} — setiap langkah kecilmu sudah sampai.|{} — every small step of yours got you here.|{} — كل خطوة صغيرة منك أوصلتك إلى هنا.
Level {} · {}|Level {} · {}|المستوى {} · {}
· {} sub-rak|· {} sub-shelves|· {} رفوف فرعية
Masih dalam batas {}. Tinjau di Task → Overdue.|Still within the limit of {}. Review it in Task → Overdue.|ضمن الحد {}. راجعها في المهام ← المتأخرة.
Pengeluaran naik {}%|Spending rose {}%|ارتفع الإنفاق {}%
{} → {} dibanding bulan lalu (ambang {}%). Periksa kategori terbesar di Financial.|{} → {} compared with last month (threshold {}%). Check the largest category in Financial.|{} ← {} مقارنةً بالشهر الماضي (الحد {}%). راجع أكبر فئة في المالية.
Mendekati batas (ambang {}%).|Approaching the limit (threshold {}%).|يقترب من الحد (الحد {}%).
Goal belum dipecah: {}|Goal not broken down: {}|هدف لم يُقسَّم: {}
Assalamu’alaikum,{}|Assalamu’alaikum,{}|السلام عليكم،{}
Sapaan di beranda: Assalamu’alaikum, {},|Home greeting: Assalamu’alaikum, {},|تحية الصفحة الرئيسية: السلام عليكم، {}،
Tampilkan lebih banyak ({})|Show more ({})|عرض المزيد ({})
Semua data tersimpan hanya di browser ini ({} kelompok data). Buat cadangan agar tidak hilang jika data browser dibersihkan. File di Document Center tidak ikut dicadangkan.|All data is stored only in this browser ({} data groups). Make a backup so nothing is lost if browser data is cleared. Files in the Document Center are not included in the backup.|تُحفظ جميع البيانات في هذا المتصفح فقط ({} مجموعة بيانات). أنشئ نسخة احتياطية حتى لا تضيع إذا مُسحت بيانات المتصفح. لا تُضمَّن ملفات مركز المستندات في النسخة الاحتياطية.
Pulihkan {} kelompok data? Data saat ini akan ditimpa.|Restore {} data groups? Current data will be overwritten.|هل تريد استعادة {} مجموعة بيانات؟ ستُستبدل البيانات الحالية.
TIMPA semua data di perangkat ini dengan {} kelompok data dari perangkat asal?|OVERWRITE all data on this device with {} data groups from the source device?|هل تريد استبدال جميع البيانات على هذا الجهاز بـ {} مجموعة بيانات من الجهاز المصدر؟
Gabungkan {} kelompok data dari perangkat asal?|Merge {} data groups from the source device?|هل تريد دمج {} مجموعة بيانات من الجهاز المصدر؟
{} hari lalu|{} days ago|منذ {} أيام
jam fokus {}|focus hours {}|ساعات التركيز {}
Anggap {}|Assume {}|افترض {}
, dan tunda dulu {}|, and postpone {} for now|، وأجّل {} الآن
, sudah dikurangi {} jam belajar tercatat|, already reduced by {} of logged study time|، بعد خصم {} من وقت الدراسة المسجّل
, ditutup review {} sebelum berangkat|, finished with a review {} before leaving|، وتُختم بمراجعة {} قبل المغادرة
Planner mulai menjadwalkan belajar {} (tingkat {}). Isi jam ujian bila belum ada agar jadwalnya tepat.|The planner starts scheduling study {} (level {}). Enter the exam time if it isn't set so the schedule is accurate.|يبدأ المخطط بجدولة الدراسة {} (المستوى {}). أدخل وقت الاختبار إن لم يكن محدداً ليكون الجدول دقيقاً.
Alternatif: pindah ke {} 19:30 (hari itu longgar).|Alternative: move to {} 19:30 (that day is free).|بديل: النقل إلى {} 19:30 (ذلك اليوم متاح).
Pertimbangkan tunda atau izin rapat “{}”|Consider postponing or being excused from the meeting “{}”|فكّر في تأجيل الاجتماع “{}” أو الاعتذار عنه
Tanpa rapat ini, {} pekerjaan prioritas yang kini tidak muat bisa dijadwalkan.|Without this meeting, {} priority jobs that don't fit now could be scheduled.|بدون هذا الاجتماع يمكن جدولة {} من الأعمال ذات الأولوية التي لا تتسع الآن.
{} butuh waktu yang bertabrakan dengan rapat {}.|{} needs time that clashes with the meeting {}.|{} يحتاج إلى وقت يتعارض مع الاجتماع {}.
Beban melebihi kapasitas: {} belum muat|Workload exceeds capacity: {} not yet scheduled|العبء يتجاوز الطاقة: {} لم يُجدوَل بعد
{} pekerjaan belum muat sebelum tenggatnya, antara lain {}|{} jobs do not fit before their deadlines, including {}|{} من الأعمال لا تتسع قبل مواعيدها النهائية، ومنها {}
“{}” belum muat dijadwalkan|“{}” could not be scheduled yet|لم يُجدوَل “{}” بعد
Tunda dulu {}.|Postpone {} for now.|أجّل {} الآن.
“{}” berupa rapat, paling mudah digeser atau diizinkan.|“{}” is a meeting, the easiest to move or be excused from.|“{}” اجتماع، وهو الأسهل في النقل أو الاعتذار عنه.
{} sangat padat|{} is very packed|{} مزدحم جداً
Jendela luang terbaik {}|Best free window {}|أفضل فترة فراغ {}
{}–{} ({}), cocok untuk tugas baru, istirahat, atau menyicil pekerjaan yang tenggatnya jauh.|{}–{} ({}), good for new tasks, rest, or chipping away at jobs with distant deadlines.|{}–{} ({})، مناسبة لمهام جديدة أو للراحة أو لإنجاز أعمال مواعيدها بعيدة تدريجياً.
{} to-do belum punya tanggal|{} to-dos have no date yet|{} من المهام بلا تاريخ بعد
{} pekerjaan kecil bisa dibatch|{} small jobs can be batched|يمكن تجميع {} من الأعمال الصغيرة
Kerjakan sekaligus dalam satu sesi 30–45 mnt tanpa berpindah konteks: {}.|Do them together in one 30–45 min session without switching context: {}.|أنجزها دفعة واحدة في جلسة 30–45 د دون تبديل السياق: {}.
{} tagihan menunggu pembayaran|{} invoices awaiting payment|{} فواتير بانتظار الدفع
Total {}. Tandai “Sudah dibayar” saat diterima dan ingatkan klien bila lewat jatuh tempo.|Total {}. Mark “Paid” when received and remind the client if it is past due.|الإجمالي {}. ضع علامة “مدفوع” عند الاستلام وذكّر العميل إن تجاوز الاستحقاق.
{} rapat dalam {} hari|{} meetings within {} days|{} اجتماعات خلال {} أيام
{} goal jatuh tempo ≤ 14 hari|{} goals due within 14 days|{} أهداف يحل موعدها خلال 14 يوماً
Penyimpanan aplikasi {} (±{}% kuota browser)|App storage {} (±{}% of the browser quota)|تخزين التطبيق {} (±{}% من حصة المتصفح)
{} gambar besar di {} ({})|{} large images in {} ({})|{} صور كبيرة في {} ({})
{} tugas selesai menumpuk di Task|{} completed tasks piling up in Task|{} مهام مكتملة متراكمة في المهام
Belum ada pekerjaan bertenggat dalam {} hari. Manfaatkan untuk menyicil tugas yang tenggatnya lebih jauh.|No jobs due within {} days. Use the time to chip away at tasks with later deadlines.|لا توجد أعمال مستحقة خلال {} أيام. استغلّ ذلك لإنجاز مهام مواعيدها أبعد تدريجياً.
Luang {} · {}–{}|Free {} · {}–{}|فراغ {} · {}–{}
💥 Bentrok {}–{}: {} × {}|💥 Conflict {}–{}: {} × {}|💥 تعارض {}–{}: {} × {}
Blok fokus · {} · {}|Focus block · {} · {}|فترة تركيز · {} · {}
+ {} lainnya di tab Insight.|+ {} more in the Insights tab.|+ {} أخرى في تبويب الرؤى.
{} · butuh {} kumulatif, luang {}|{} · needs {} cumulative, {} free|{} · يحتاج {} تراكمياً، والفراغ {}
Beban hari ini melebihi waktu luang sebesar {}. Jadwalkan ulang tugas berprioritas rendah ke besok.|Today's load exceeds your free time by {}. Reschedule low-priority tasks to tomorrow.|يتجاوز عبء اليوم وقت الفراغ بمقدار {}. أعد جدولة المهام منخفضة الأولوية إلى الغد.
{} item sudah terlambat. Selesaikan atau jadwalkan ulang di tab Inbox agar tidak menumpuk.|{} items are already overdue. Finish them or reschedule in the Inbox tab so they don't pile up.|{} عناصر متأخرة بالفعل. أنجزها أو أعد جدولتها في تبويب صندوق الوارد كي لا تتراكم.
Jadwal tetap — planner tidak memindahkannya dan menjaga jeda {} menit di sekitarnya.|Fixed schedule — the planner will not move it and keeps a {}-minute buffer around it.|جدول ثابت — لا ينقله المخطط ويحافظ على فاصل {} دقيقة حوله.
Dilewati ({})|Skipped ({})|تم التخطي ({})
· {} sesi tersisa ·|· {} sessions left ·|· {} جلسات متبقية ·
{} tercatat untuk {}.|{} logged for {}.|تم تسجيل {} لـ {}.
{} tercatat. Saatnya {}.|{} logged. Time for {}.|تم تسجيل {}. حان وقت {}.
{} tercatat di riwayat belajar.|{} logged in the study history.|تم تسجيل {} في سجل الدراسة.
{} ({}% waktu belajar yang tercatat jamnya). Taruh materi tersulit di rentang ini.|{} ({}% of study time with recorded hours). Put the hardest material in this range.|{} ({}% من وقت الدراسة المسجّل بساعاته). ضع أصعب المواد في هذا النطاق.
Saya anggap jam {}–{} (sore) — ubah bila salah.|I assumed {}–{} (PM) — change it if that's wrong.|افترضتُ الساعة {}–{} (مساءً) — عدّلها إن كانت خاطئة.
Saya anggap jam {} (sore) — ubah bila salah.|I assumed {} (PM) — change it if that's wrong.|افترضتُ الساعة {} (مساءً) — عدّلها إن كانت خاطئة.
Jam diperkirakan dari kata "{}" — sesuaikan bila perlu.|Time estimated from the word "{}" — adjust if needed.|الوقت مقدَّر من كلمة "{}" — عدّله عند الحاجة.
bersama {}|with {}|مع {}
Bertemu {}|Meet {}|لقاء {}
Bersama: {}|With: {}|مع: {}
{} tugas dicentang|{} tasks ticked|تم تأشير {} مهام
Tidak ketemu: {}|Not found: {}|لم يُعثر على: {}
dengan “{}”.|with “{}”.|بـ “{}”.
Ada beberapa yang mirip dengan “{}”.|There are several similar to “{}”.|توجد عدة عناصر مشابهة لـ “{}”.
Bentrok: {}|Conflict: {}|تعارض: {}
Mepet dengan {} (jeda < 15 menit).|Tight with {} (gap < 15 min).|قريب جداً من {} (الفاصل < 15 دقيقة).
{} di hari itu belum punya jam.|{} on that day has no time yet.|{} في ذلك اليوم بلا وقت بعد.
Dari struk: {}|From receipt: {}|من الإيصال: {}
Nominal: Rp {}|Amount: Rp {}|المبلغ: Rp {}
{} item dikenali — periksa lalu tambahkan|{} items recognized — check then add|تم التعرّف على {} عناصر — راجع ثم أضف
Baris lain ({}) — ketuk untuk menjadikannya item|Other lines ({}) — tap to turn one into an item|أسطر أخرى ({}) — انقر لتحويل سطر إلى عنصر
{} item ditambahkan|{} items added|تمت إضافة {} عناصر
{} · menyiapkan foto|{} · preparing photo|{} · تجهيز الصورة
{} · membaca teks|{} · reading text|{} · قراءة النص
{} · membuka PDF|{} · opening PDF|{} · فتح PDF
{} · hal. {} (pindai) membaca teks|{} · p. {} (scan) reading text|{} · ص. {} (مسح) قراءة النص
Menunggu pembayaran · {}|Awaiting payment · {}|بانتظار الدفع · {}
Perlu ditagih · {}|Needs invoicing · {}|يحتاج إلى مطالبة · {}
Ditunda sampai {}|Postponed until {}|مؤجّل حتى {}
{} perlu tindakan|{} need action|{} تحتاج إلى إجراء
{} dipilih|{} selected|تم تحديد {}
{} belum dibaca|{} unread|{} غير مقروءة
Inbox · {} belum dibaca|Inbox · {} unread|صندوق الوارد · {} غير مقروءة
Inbox, {} belum dibaca|Inbox, {} unread|صندوق الوارد، {} غير مقروءة
· {} tidak ditemukan|· {} not found|· {} غير موجود
{} item dipilih|{} items selected|تم تحديد {} عناصر
Kunci ini sudah dipakai di {} perangkat. Hubungi developer untuk mereset.|This key is already used on {} devices. Contact the developer to reset it.|هذا المفتاح مستخدم بالفعل على {} أجهزة. تواصل مع المطوّر لإعادة ضبطه.
{} menit lalu|{} minutes ago|منذ {} دقائق
{} jam lalu|{} hours ago|منذ {} ساعات
· {} mnt|· {} min|· {} د
{} mnt|{} min|{} د
membuat {}|created {}|تم إنشاء {}
menghapus {}|deleted {}|تم حذف {}
{} dijadwalkan ulang|{} rescheduled|أُعيدت جدولة {}
diganti nama menjadi {}|renamed to {}|أُعيدت تسميته إلى {}
{} status diubah|{} status changed|تغيّرت حالة {}
{} terdekat|Nearest {}|أقرب {}
Agenda 30 hari dari {}|30-day agenda from {}|جدول أعمال 30 يوماً من {}
{} pertemuan, satu layar|{} meetings, one screen|{} لقاءات في شاشة واحدة
Sesi fokus ke-{} dari {}|Focus session {} of {}|جلسة التركيز {} من {}
Selesaikan {} tugas atau milestone|Complete {} task or milestone|أنجز {} من المهام أو المعالم
{} / {} XP hari ini|{} / {} XP today|{} / {} نقطة خبرة اليوم
Raih {} XP hari ini|Earn {} XP today|اكسب {} نقطة خبرة اليوم
Tidak ada hasil untuk “{}”.|No results for “{}”.|لا توجد نتائج لـ “{}”.
{} semester, {} mata pelajaran/mata kuliah beserta tugas, ujian, catatan belajar, dan rumus nilainya ikut terhapus. Sekolah/Kampus lain tidak terpengaruh.|{} semesters and {} subjects/courses along with their tasks, exams, study notes, and grading formulas will also be deleted. Other schools/colleges are not affected.|سيُحذف أيضاً {} فصل دراسي و{} مادة/مقرر مع مهامها واختباراتها وملاحظات دراستها ومعادلات درجاتها. لا تتأثر المدارس/الجامعات الأخرى.
Total bobot {}%, bukan 100%. Nilai akhir akan dihitung dibagi {}. Lanjutkan?|The total weight is {}%, not 100%. The final grade will be calculated by dividing by {}. Continue?|إجمالي الأوزان {}% وليس 100%. ستُحسب الدرجة النهائية بالقسمة على {}. هل تريد المتابعة؟
masih berjalan, {} dari {} soal terjawab.|still in progress, {} of {} questions answered.|لا تزال جارية، تمت الإجابة عن {} من {} سؤالاً.
Mode {}, {} dari {} terjawab|Mode {}, {} of {} answered|الوضع {}، تمت الإجابة عن {} من {}
Ulangi {} soal yang belum benar|Retry {} questions answered incorrectly|إعادة {} أسئلة لم تُجَب إجابة صحيحة
Progres resmi = {} selesai ÷ total {}. Dasar perhitungan bisa diubah di Edit proyek.|Official progress = {} done ÷ total {}. The calculation basis can be changed in Edit project.|التقدم الرسمي = {} مكتمل ÷ إجمالي {}. يمكن تغيير أساس الحساب من تعديل المشروع.
{} kegiatan menyala dalam 3 hari ke depan|{} activities flaming within the next 3 days|{} أنشطة مشتعلة خلال الأيام الثلاثة القادمة
Belum ada anggaran untuk {}.|No budget for {} yet.|لا توجد ميزانية لـ {} بعد.
{} bulan pengeluaran (ideal ≥ 6)|{} months of expenses (ideal ≥ 6)|{} أشهر من المصروفات (المثالي ≥ 6)
sudah terlampaui (total lebih {}).|already exceeded (total over by {}).|تم تجاوزه بالفعل (الزيادة الإجمالية {}).
kamu beli {}× bulan ini, total {} ({}% pengeluaran). Pengeluaran kecil yang berulang paling mudah dihemat.|you bought {}× this month, totaling {} ({}% of spending). Small repeated expenses are the easiest to save on.|اشتريتَ {}× هذا الشهر بإجمالي {} ({}% من الإنفاق). المصروفات الصغيرة المتكررة هي الأسهل توفيراً.
{}% vs bulan lalu|{}% vs last month|{}% مقابل الشهر الماضي
{} dokumen · {} folder · {} di browser ini|{} documents · {} folders · {} in this browser|{} مستند · {} مجلد · {} في هذا المتصفح
7 hari terakhir tercatat {} jam (kerja {} + belajar {}), di atas ambang {} jam. Sisihkan waktu istirahat dan tunda hal yang tidak mendesak.|In the last 7 days {} hours were logged (work {} + study {}), above the {}-hour threshold. Set aside time to rest and postpone what isn't urgent.|خلال آخر 7 أيام سُجّلت {} ساعة (عمل {} + دراسة {})، فوق حد {} ساعة. خصّص وقتاً للراحة وأجّل ما ليس عاجلاً.
{} jam tercatat dalam 7 hari terakhir (ambang {} jam).|{} hours logged in the last 7 days (threshold {} hours).|{} ساعة مسجّلة خلال آخر 7 أيام (الحد {} ساعة).
IPK {} ≥ target {}. Pertahankan ritme belajar.|Cumulative GPA {} ≥ target {}. Keep up your study rhythm.|المعدل التراكمي {} ≥ الهدف {}. حافظ على وتيرة دراستك.
Mata pelajaran/mata kuliah yang perlu dipelajari lagi: {}.|Subjects/courses that need more study: {}.|المواد/المقررات التي تحتاج إلى مزيد من الدراسة: {}.
Aktifkan formula di Academic Management → Formula Nilai{} agar IP/IPK dan analisis akademik bisa dihitung.|Activate the formula in Academic Management → Grading Formula{} so GPA/cumulative GPA and academic analysis can be calculated.|فعّل المعادلة في الإدارة الأكاديمية ← معادلة الدرجات{} ليمكن حساب المعدل الفصلي والتراكمي والتحليل الأكاديمي.
(pilih sekolah/kampus {} dulu)|(select the school/college {} first)|(اختر المدرسة/الجامعة {} أولاً)
Jumlahnya melebihi ambang {}. Pilih 1–3 yang paling penting, selesaikan, lalu jadwalkan ulang sisanya.|The amount exceeds the threshold of {}. Pick the 1–3 most important, finish them, then reschedule the rest.|العدد يتجاوز الحد {}. اختر 1–3 من الأهم وأنجزها ثم أعد جدولة الباقي.
{} ujian dalam 7 hari|{} exams within 7 days|{} اختبارات خلال 7 أيام
Bulan ini {} vs bulan lalu {}.|This month {} vs last month {}.|هذا الشهر {} مقابل الشهر الماضي {}.
Saldo "{}" minus|Balance of "{}" is negative|رصيد "{}" سالب
Saldo akun {} minus|The balance of account {} is negative|رصيد الحساب {} سالب
Saldo saat ini {}. Periksa transaksi atau lakukan transfer.|Current balance {}. Check your transactions or make a transfer.|الرصيد الحالي {}. راجع المعاملات أو أجرِ تحويلاً.
Saldo {}. Periksa transaksi yang salah akun atau pindahkan dana dari akun lain.|Balance {}. Check transactions on the wrong account or move funds from another account.|الرصيد {}. راجع المعاملات المسجّلة على حساب خاطئ أو انقل أموالاً من حساب آخر.
{} berstatus "Sudah ditagih". Pantau pembayarannya.|{} have the status "Invoiced". Keep track of the payment.|{} بحالة "تمت المطالبة". تابع الدفع.
Belum ada data untuk {}.|No data for {} yet.|لا توجد بيانات لـ {} بعد.
Tampilkan {} analisis yang disembunyikan|Show {} hidden analyses|عرض {} تحليلات مخفية
Waktu belajar {} kurang {}|Study time {} short by {}|وقت الدراسة {} ينقص {}
Idealnya ±{} ({}), tetapi baru muat {} sebelum ujian {}. Mulai belajar sekarang dengan materi inti{}.|Ideally ±{} ({}), but only {} fits before the exam {}. Start studying now with the core material{}.|المثالي ±{} ({})، لكن لا يتّسع قبل الاختبار {} سوى {}. ابدأ الدراسة الآن بالمادة الأساسية{}.
Ujian {}. Total {} (tingkat {}). Mulai {}. Ubah tingkat kesulitan bila materinya lebih berat/ringan.|Exam {}. Total {} (level {}). Start {}. Change the difficulty level if the material is heavier/lighter.|الاختبار {}. الإجمالي {} (المستوى {}). البدء {}. غيّر مستوى الصعوبة إن كانت المادة أثقل/أخف.
Rapat {} memakan jam kerja penting.|The meeting {} takes up important working hours.|الاجتماع {} يستهلك ساعات عمل مهمة.
Rapat {} dan membuat sesi belajar terdorong ke jam kurang ideal atau mepet waktu tidur. Bila rapat tidak mendesak, minta tunda atau izin; kalau harus hadir, usahakan singkat.|The meeting {} and pushes study sessions to less ideal hours or close to bedtime. If the meeting is not urgent, ask to postpone or be excused; if you must attend, keep it short.|الاجتماع {} ويدفع جلسات الدراسة إلى ساعات أقل ملاءمة أو قرب وقت النوم. إن لم يكن الاجتماع عاجلاً فاطلب تأجيله أو الاعتذار عنه؛ وإن وجب الحضور فاجعله قصيراً.
berakhir ±{} jam sebelum {} ({})|ends ±{} hours before {} ({})|ينتهي قبل {} بنحو ±{} ساعة ({})
Rapat “{}” dekat dengan ujian|The meeting “{}” is close to an exam|الاجتماع “{}” قريب من اختبار
Jarak rapat ({}) ke {} hanya ±{} jam. Rencana belajar masih muat, tetapi batasi durasi rapat atau hadir singkat supaya tidur tidak terpotong.|The gap from the meeting ({}) to {} is only ±{} hours. The study plan still fits, but limit the meeting length or attend briefly so your sleep isn't cut short.|الفاصل بين الاجتماع ({}) و{} نحو ±{} ساعة فقط. لا تزال خطة الدراسة تتسع، لكن قلّص مدة الاجتماع أو احضر باختصار حتى لا يتقطع نومك.
{} pekerjaan belum muat sebelum tenggatnya, antara lain {}. Urutkan prioritas: selesaikan yang berbobot nilai/uang lebih dulu, minta perpanjangan untuk yang bisa, dan batalkan/delegasikan yang paling ringan dampaknya.|{} jobs do not fit before their deadlines, including {}. Set priorities: finish those worth the most grade/money first, ask for extensions where possible, and cancel/delegate those with the least impact.|{} من الأعمال لا تتسع قبل مواعيدها النهائية، ومنها {}. رتّب الأولويات: أنجز أولاً ما له أكبر وزن في الدرجات/المال، واطلب تمديداً حيثما أمكن، وألغِ/فوّض ما أقلّ أثراً.
Tenggat {}, kurang {} dari kebutuhan {}.|Deadline {}, short by {} of the required {}.|الموعد النهائي {}، ينقص {} من المطلوب {}.
{} item sudah lewat tenggat|{} items are past their deadline|{} عناصر تجاوزت موعدها النهائي
Paling penting: {}. Planner menaruhnya di sesi paling awal yang tersedia; selesaikan 1–3 teratas, sisanya jadwalkan ulang.|Most important: {}. The planner places it in the earliest available session; finish the top 1–3 and reschedule the rest.|الأهم: {}. يضعه المخطط في أبكر جلسة متاحة؛ أنجز الأعلى 1–3 وأعد جدولة الباقي.
Jadwal tetap {} + rencana {} dari ±{} waktu aktif. Jangan tambah komitmen baru dan jaga {} luang untuk istirahat.|Fixed schedule {} + plan {} out of ±{} active time. Don't add new commitments and keep {} free for rest.|الجدول الثابت {} + الخطة {} من نحو ±{} من الوقت النشط. لا تضف التزامات جديدة واحتفظ بـ {} فراغاً للراحة.
Jam rapat “{}” belum diisi|The time of the meeting “{}” is not set|لم يُحدَّد وقت الاجتماع “{}”
Rapat {} hanya bertanggal, jadi planner mengasumsikan {}–{}. Atur jam sebenarnya agar jadwal belajar/tugas akurat.|The meeting {} only has a date, so the planner assumes {}–{}. Set the actual time so the study/task schedule is accurate.|الاجتماع {} له تاريخ فقط، لذا يفترض المخطط {}–{}. حدّد الوقت الفعلي ليكون جدول الدراسة/المهام دقيقاً.
{} mata pelajaran/mata kuliah belum punya jadwal terbaca|{} subjects/courses have no readable schedule yet|{} مواد/مقررات ليس لها جدول مقروء بعد
{}. Isi kolom Jadwal (mis. “Senin 09:00–12:00”) agar planner tidak menaruh tugas di jam kuliah.|{}. Fill in the Schedule field (e.g. “Monday 09:00–12:00”) so the planner doesn't place tasks during class hours.|{}. املأ حقل الجدول (مثال: “الإثنين 09:00–12:00”) حتى لا يضع المخطط مهاماً في أوقات الدراسة.
{} tugas berstatus “Sedang”|{} tasks have the status “In progress”|{} مهام بحالة “قيد التنفيذ”
Nilai {}. Kirim invoice sekarang agar arus kas tidak tertahan.|Value {}. Send the invoice now so cash flow isn't held up.|القيمة {}. أرسل الفاتورة الآن حتى لا يتعطل التدفق النقدي.
Proyek “{}” berisiko terlambat|The project “{}” is at risk of being late|المشروع “{}” معرّض للتأخر
Target {}, baru {}% tugas selesai ({}/{}). Fokuskan ke tugas kritis atau kurangi cakupan.|Target {}, only {}% of tasks done ({}/{}). Focus on critical tasks or reduce the scope.|الهدف {}، لم يكتمل سوى {}% من المهام ({}/{}). ركّز على المهام الحرجة أو قلّص النطاق.
Dengan laju sekarang, total ±{} vs pemasukan {}. Tahan pengeluaran kategori terbesar sampai akhir bulan.|At the current pace, total ±{} vs income {}. Hold back spending in the largest category until the end of the month.|بالوتيرة الحالية، الإجمالي ±{} مقابل الدخل {}. أوقف الإنفاق في أكبر فئة حتى نهاية الشهر.
Terpakai {} dari {} ({}%). Hentikan pengeluaran kategori ini atau geser anggaran dari yang longgar.|Used {} of {} ({}%). Stop spending in this category or shift budget from a looser one.|المستخدم {} من {} ({}%). أوقف الإنفاق في هذه الفئة أو انقل ميزانية من فئة أوسع.
{}% terpakai; sisa {} untuk {} hari lagi.|{}% used; {} left for {} more days.|تم استخدام {}%؛ المتبقي {} لمدة {} أيام أخرى.
{} sesi terjadwal tanpa bentrok, semua tenggat muat, dan tetap ada waktu istirahat. Pertahankan ritmenya.|{} sessions scheduled without conflicts, all deadlines fit, and there is still rest time. Keep up the rhythm.|{} جلسات مجدولة دون تعارض، وتتسع جميع المواعيد النهائية، ويبقى وقت للراحة. حافظ على هذه الوتيرة.
Tidak ada hal mendesak di {}|Nothing urgent in {}|لا شيء عاجل في {}
Sudah di Kalender · {} sesi. Perbarui jika jadwal berubah.|Already in the Calendar · {} sessions. Update if the schedule changes.|موجود في التقويم بالفعل · {} جلسات. حدّثه إذا تغيّر الجدول.
Sisa {} belum muat. Saran: sisihkan {} di hari lain.|{} remaining does not fit yet. Suggestion: set aside {} on another day.|المتبقي {} لم يتّسع بعد. اقتراح: خصّص {} في يوم آخر.
🗓️ Belajar {} dimulai {}.|🗓️ Study {} starts {}.|🗓️ تبدأ دراسة {} في {}.
· beban {} dari {} waktu luang|· load {} of {} free time|· العبء {} من {} من وقت الفراغ
Dasar: tugas jatuh tempo/terlambat (estimasi), jadwal tetap {}, jendela {}–{}, jeda {} mnt, kapasitas fokus {}.|Basis: due/overdue tasks (estimates), fixed schedule {}, window {}–{}, buffer {} min, focus capacity {}.|الأساس: المهام المستحقة/المتأخرة (تقديرات)، الجدول الثابت {}، النافذة {}–{}، الفاصل {} د، سعة التركيز {}.
Mulai “{}” hari ini: butuh {} sedangkan luang sampai tenggat {}.|Start “{}” today: it needs {} while only {} is free until the deadline.|ابدأ “{}” اليوم: يحتاج {} بينما الفراغ حتى الموعد النهائي {}.
Lihat {} insight lain di Inbox|See {} more insights in Inbox|عرض {} رؤى أخرى في صندوق الوارد
({} pada periode ini).|({} in this period).|({} في هذه الفترة).
Jam kosong (1 jam): {}|Free hours (1 hour): {}|الساعات الفارغة (ساعة): {}
Hari itu ada {} tenggat tugas.|That day has {} task deadlines.|في ذلك اليوم {} مواعيد نهائية للمهام.
Mepet dengan {} (jeda < 15 menit).|Tight with {} (gap < 15 min).|قريب جداً من {} (الفاصل < 15 دقيقة).
Hari itu ada {} tenggat tugas|That day has {} task deadlines|في ذلك اليوم {} مواعيد نهائية للمهام
+{} item lagi|+{} more items|+{} عناصر أخرى
{} dari {} selesai|{} of {} done|{} من {} منجزة
{} kata|{} words|{} كلمات
Diubah {} · {} kata|Edited {} · {} words|عُدّلت {} · {} كلمات
`;
