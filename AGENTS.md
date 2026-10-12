<!-- antislop:start -->

## antislop (Visual & Content Polish Filter)

Core filter yang aktif untuk UI, copy, aksesibilitas, layout mobile, dan kebersihan komentar kode:

- Filter inti (selalu aktif): `antislop`
- UI / visual: `antislop-ui`
- Copywriting & teks pengguna: `antislop-copywriting`
- Aksesibilitas & human-first: `antislop-human`
- Layout mobile & responsif: `antislop-layoutmobile`
- Higienitas komentar kode: `antislop-code`

<!-- antislop:end -->

<!-- ponytail:start -->

## ponytail (Minimalist Engineering & YAGNI)

Berlaku untuk semua penulisan kode, refactoring, code review, dan pemilihan dependensi:

- Core skill: `ponytail`
- Review over-engineering: `ponytail-review`
- Audit kode & bloat: `ponytail-audit`
- Debt tracker: `ponytail-debt`
- Level default: `full` (Ladder: YAGNI -> Standard Library -> Fitur Native Platform/Framework -> Minimum Code)
- Hindari menambah dependensi eksternal jika bahasa/framework bawaan sudah menyediakannya.

<!-- ponytail:end -->

<!-- superpowers:start -->

## superpowers (Engineering Workflow Rigor)

Disiplin alur kerja engineering terstruktur:

- Perencanaan: `writing-plans`, `brainstorming`
- Eksekusi terarah: `executing-plans`, `subagent-driven-development`
- Pengujian: `test-driven-development`
- Investigasi bug: `systematic-debugging`
- Verifikasi akhir: `verification-before-completion`

<!-- superpowers:end -->

---

## The Alchemist Lifecycle (The Unity Standard)

Ketika mengerjakan tugas di project apa pun, jalankan pipeline terintegrasi berikut:

### 1. Skala Usaha Proporsional (Proportional Rigor)
- **Tugas Trivial / Quick Fix** (1–2 file, typo, penyesuaian style kecil, bug sepele):
  Terapkan Ponytail langsung (jalur tercepat, kode paling minimal), perbaiki, dan langsung verifikasi tanpa perlu overhead pembuatan dokumen plan panjang.
- **Tugas Non-Trivial** (fitur baru, refaktor besar, bug kompleks, perombakan arsitektur, >= 3 langkah):
  Wajib jalankan 4 fase Alchemist Lifecycle di bawah secara penuh.

### 2. Fase Siklus Utama
1. **Fase Perencanaan (Superpowers + Ponytail)**:
   - Gunakan `brainstorming` untuk eksplorasi dan `writing-plans` untuk tugas multi-langkah.
   - Filter setiap rencana dengan prinsip Ponytail: terapkan YAGNI, tolak abstraksi prematur, dan jangan rencanakan package baru jika stdlib/native mencukupi.

2. **Fase Implementasi (Superpowers + Ponytail)**:
   - Terapkan `test-driven-development` atau eksekusi langkah per langkah (`executing-plans`).
   - Tulis kode sesedikit mungkin yang memenuhi tes dan kebutuhan saat ini.

3. **Fase Polish & Estetika (Antislop)**:
   - **Frontend / UI**: Pastikan kontras warna, tap target, responsivitas mobile, dan hindari template generik AI (`antislop-ui`, `antislop-human`, `antislop-layoutmobile`).
   - **Copywriting**: Tulis teks tombol, pesan error, dan judul yang natural bagi manusia (`antislop-copywriting`).
   - **Kebersihan Kode**: Hapus komentar basa-basi AI. Pertahankan hanya komentar esensial (alasan bisnis, rumus non-obvious, peringatan edge-case) (`antislop-code`).

4. **Fase Verifikasi & Review (Superpowers + Ponytail)**:
   - Sebelum selesai, jalankan build, test, lint, dan typecheck (`verification-before-completion`).
   - Lakukan self-review terhadap kompleksitas kode yang baru dibuat (`ponytail-review`).

---

## Aturan Umum

- Balas dalam bahasa yang dipakai penanya. Kode, perintah, dan nama file tetap dalam bahasa aslinya.
- Sebelum mengklaim pekerjaan selesai, jalankan build, test, typecheck, dan lint yang tersedia di project. Kalau perintahnya tidak diketahui, tanyakan dulu, jangan menebak.
- Jangan commit, push, atau buat PR tanpa instruksi eksplisit.
- Jangan menambahkan komentar ke kode kecuali diminta (`antislop-code`).
- Cari pola yang sudah ada di codebase sebelum menulis yang baru, lalu ikuti konvensi setempat.
- Kode dan script yang dibuat harus ramah lintas sistem operasi (Windows, Linux, macOS).
- Sebut lokasi kode dengan format `file:line` supaya mudah dibuka.
- Untuk tugas dengan 3 langkah atau lebih, atau yang menyentuh banyak file, pakai daftar tugas dan perbarui statusnya saat jalan.
- Jangan mengarang URL. Pakai URL yang diberikan pengguna atau yang memang dibutuhkan untuk pemrograman.
