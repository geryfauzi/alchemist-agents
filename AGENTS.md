<!-- antislop:start -->

## antislop

For UI, copy, people, mobile layout, or code comments work, load the antislop skill for the task:

- Core filter, always on: `antislop`
- UI / visual: `antislop-ui`
- Copy & text: `antislop-copywriting`
- People: `antislop-human`
- Mobile / responsive: `antislop-layoutmobile`
- Code comments: `antislop-code`
Before starting, ask the user when antislop applies: during the work, or after it is done.
<!-- antislop:end -->

<!-- ponytail:start -->

## ponytail

For any coding task, refactoring, code review, or dependency selection:

- Core skill: `ponytail`
- Review over-engineering: `ponytail-review`
- Default level: full (Ladder: YAGNI -> stdlib -> native platform features -> minimum code)
- Deactivate when user says "stop ponytail" or "normal mode".
<!-- ponytail:end -->

<!-- superpowers:start -->

## superpowers

Follow the structured engineering workflows from superpowers:

- Planning: `writing-plans`
- Execution: `executing-plans`
- TDD: `test-driven-development`
- Debugging: `systematic-debugging`
<!-- superpowers:end -->

## Aturan umum

Bagian ini untuk hal yang berlaku di semua project. Tim bebas mengeditnya. Aturan teknis (UI, desain, aksesibilitas, anti-slop) diurus oleh skill `antislop`, jadi tidak perlu diulang di sini.

- Balas dalam bahasa yang dipakai penanya. Kode, perintah, dan nama file tetap dalam bahasa aslinya.
- Sebelum mengklaim pekerjaan selesai, jalankan build, test, typecheck, dan lint yang tersedia di project. Kalau perintahnya tidak diketahui, tanyakan dulu, jangan menebak.
- Jangan commit, push, atau buat PR tanpa instruksi eksplisit.
- Jangan menambahkan komentar ke kode kecuali diminta.
- Cari pola yang sudah ada di codebase sebelum menulis yang baru, lalu ikuti konvensi setempat.
- Sebut lokasi kode dengan format `file:line` supaya mudah dibuka.
- Untuk tugas dengan 3 langkah atau lebih, atau yang menyentuh banyak file, pakai daftar tugas dan perbarui statusnya saat jalan.
- Jangan mengarang URL. Pakai URL yang diberikan pengguna atau yang memang dibutuhkan untuk pemrograman.
