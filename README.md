# agents-standard

Standar agent untuk dipakai di semua project yang dikerjakan dengan OpenCode. Satu repo sebagai sumber kebenaran, didaftarkan sekali di config global, lalu berlaku di semua project tanpa perlu disalin ke masing-masing folder.

## Isi repo

- `AGENTS.md` — instruksi global. Berisi pointer ke tiga keluarga skill (antislop, ponytail, superpowers) dan aturan umum tim. File inilah yang dimuat opencode setiap kali session dimulai.
- `skills/` — 27 skill. Setiap skill di foldernya sendiri dengan file `SKILL.md` di dalamnya.
- `templates/AGENTS.project.md` — template untuk `AGENTS.md` level project. Isinya hal-hal spesifik project, seperti perintah build dan konvensi penamaan.

## Cara pasang

1. Clone repo ini ke mana saja di mesin Anda.
2. Buka config global opencode di `~/.config/opencode/opencode.json`. Di Windows, path-nya `C:/Users/<user>/.config/opencode/opencode.json`. Kalau belum ada, buat filenya.
3. Tambahkan dua kunci ini lalu simpan. Ganti `<path>` dengan lokasi hasil clone Anda.

   ```json
   {
     "instructions": ["<path>/AGENTS.md"],
     "skills": { "paths": ["<path>/skills"] }
   }
   ```

   Kalau di file config Anda sudah ada kunci lain, tambahkan saja dua kunci ini. Jangan hapus yang sudah ada.

4. Keluar dari opencode lalu jalankan lagi. Config opencode hanya dibaca sekali saat aplikasi start, jadi perubahan baru aktif setelah restart.
5. Cek hasilnya. Jalankan opencode di folder mana pun, lalu lihat apakah daftar skill muncul.

## Cara pakai di project baru

Salin `templates/AGENTS.project.md` ke root project sebagai `AGENTS.md`, lalu isi bagian yang masih kosong. Standar global tetap berlaku. Kalau ada aturan yang bentrok, `AGENTS.md` di dalam project yang menang.

## Cara update

1. Ubah file di repo ini, commit, lalu push.
2. Anggota tim lain menjalankan `git pull`.
3. Restart opencode supaya perubahan terbaca.
4. Tidak ada berkas yang perlu disalin ulang ke project lain. Semua project langsung memakai versi terbaru.
