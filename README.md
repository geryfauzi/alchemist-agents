# alchemist-agents

Standar scaffolding dan instruksi AI coding agent terpadu (_The Alchemist Standard_) untuk seluruh project di perusahaan. Mengintegrasikan tiga pilar utama:

1. **Superpowers**: Disiplin alur kerja engineering terstruktur (Planning → Execution → TDD → Systematic Debugging → Verification).
2. **Ponytail**: Filosofi kesederhanaan kode & YAGNI (mengutamakan standard library & fitur native, anti over-engineering, minim dependensi).
3. **Antislop**: Filter estetika, UX ramah manusia, responsivitas mobile, dan higienitas komentar kode bebas template generik AI.

Satu repo ini menjadi sumber kebenaran tunggal (_single source of truth_), dapat dipasang via NPM/NPX, dan otomatis berlaku di semua AI agent.

---

## Cara Pasang & Upgrade (Quickstart via NPX)

Anda dapat langsung mengonfigurasi agent di komputer Anda tanpa perlu mengedit file JSON secara manual:

```bash
npx alchemist-agents@latest
```

_Script interaktif akan menampilkan pilihan AI agent yang ingin dikonfigurasikan._

Atau gunakan flag langsung:

```bash
npx alchemist-agents@latest --workspace   # Pasang aturan ke project saat ini (Cursor, Windsurf, Copilot, Cline, Claude, Antigravity)
npx alchemist-agents@latest --antigravity # Khusus Google Antigravity (Global)
npx alchemist-agents@latest --opencode    # Khusus OpenCode (Global)
npx alchemist-agents@latest --claude      # Khusus Claude Code (Global)
npx alchemist-agents@latest --all         # Konfigurasi semua agent global sekaligus
npx alchemist-agents@latest --gemini      # Export prompt untuk Gemini Web Chat (Gems)
```

> **Catatan Upgrade:**  
> Selalu gunakan `@latest` (`npx alchemist-agents@latest`) agar npx langsung mengunduh versi terbaru dan memperbarui asset di komputer Anda.

---

## Panduan Lengkap untuk Setiap AI Agent

Kami menyediakan panduan detail langkah demi langkah untuk setiap platform:

- 📖 **[Panduan Setup Berbagai AI Agent](docs/AGENTS_SETUP.md)**:
  - Antigravity (Google AGY)
  - OpenCode
  - Claude Code
  - Cursor & Windsurf
  - GitHub Copilot
  - Cline & Roo Code
- 🌐 **[Panduan Integrasi Gemini Web Chat](docs/GEMINI_WEB.md)**: Cara memasang standar ini ke fitur **Gemini Gems** di `gemini.google.com`.

---

## Isi Repositori

- **`AGENTS.md`**: Instruksi global terpadu (_The Alchemist Lifecycle_, Proportional Rigor, standar estetika, dan aturan umum).
- **`skills/`**: 27 skill pendukung dari keluarga superpowers, ponytail, dan antislop.
- **`bin/cli.js`**: Script CLI otomatis berbasis Node.js standard library (zero-dependencies, cross-platform Windows/Linux/macOS).
- **`docs/`**: Dokumentasi setup untuk berbagai platform AI.
