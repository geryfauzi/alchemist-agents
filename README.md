# alchemist-agents

Standar scaffolding dan instruksi AI coding agent terpadu (*The Alchemist Standard*) untuk seluruh project di perusahaan. Mengintegrasikan tiga pilar utama:

1. **Superpowers**: Disiplin alur kerja engineering terstruktur (Planning → Execution → TDD → Systematic Debugging → Verification).
2. **Ponytail**: Filosofi kesederhanaan kode & YAGNI (mengutamakan standard library & fitur native, anti over-engineering, minim dependensi).
3. **Antislop**: Filter estetika, UX ramah manusia, responsivitas mobile, dan higienitas komentar kode bebas template generik AI.

Satu repo ini menjadi sumber kebenaran tunggal (*single source of truth*), dapat dipasang via NPM/NPX, dan otomatis berlaku di semua project.

---

## Cara Pasang Cepat (Quickstart via NPX)

Anda dapat langsung mengonfigurasi agent di komputer Anda tanpa perlu mengedit file JSON secara manual:

```bash
npx alchemist-agents
```
*Script interaktif akan menampilkan pilihan AI agent yang ingin dikonfigurasikan.*

Atau gunakan flag langsung:
```bash
npx alchemist-agents --antigravity  # Khusus Google Antigravity
npx alchemist-agents --opencode     # Khusus OpenCode
npx alchemist-agents --claude       # Khusus Claude Code
npx alchemist-agents --all          # Konfigurasi semua agent
npx alchemist-agents --gemini       # Export prompt untuk Gemini Web Chat
```

---

## Panduan Lengkap untuk Setiap AI Agent

Kami menyediakan panduan detail langkah demi langkah untuk setiap platform:

- 📖 **[Panduan Setup Berbagai AI Agent](docs/AGENTS_SETUP.md)**:
  - Antigravity (Google AGY)
  - OpenCode
  - Claude Code
  - Cursor & Windsurf
  - GitHub Copilot
- 🌐 **[Panduan Integrasi Gemini Web Chat](docs/GEMINI_WEB.md)**: Cara memasang standar ini ke fitur **Gemini Gems** di `gemini.google.com`.

---

## Isi Repositori

- **`AGENTS.md`**: Instruksi global terpadu (*The Alchemist Lifecycle*, standar stack React/Next.js, Laravel, Go, dan aturan umum).
- **`skills/`**: 27 skill pendukung dari keluarga superpowers, ponytail, dan antislop.
- **`bin/cli.js`**: Script CLI otomatis berbasis Node.js standard library (zero-dependencies).
- **`docs/`**: Dokumentasi setup untuk berbagai platform AI.

---

## Cara Publish (Untuk Maintainer)

### 1. Push ke GitHub
```bash
git add .
git commit -m "feat: initial release of alchemist-agents"
git remote add origin https://github.com/<username>/alchemist-agents.git
git branch -M main
git push -u origin main
```

### 2. Publish ke NPM Registry
Pastikan Anda sudah login ke akun NPM di terminal:
```bash
npm login
npm publish --access public
```
Setelah dipublish, siapa pun dapat langsung menjalankan `npx alchemist-agents` di terminal mereka.
