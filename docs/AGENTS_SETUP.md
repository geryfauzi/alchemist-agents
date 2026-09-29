# Panduan Setup Lengkap untuk Berbagai AI Coding Agent

Standar ini dirancang agar dapat digunakan di berbagai AI coding agent terpopuler. Anda bisa menggunakan tool CLI otomatis (`npx alchemist-agents`) atau melakukan konfigurasi manual seperti dijelaskan di bawah ini.

---

## 1. Antigravity (Google AGY)

Antigravity memiliki sistem pemuatan skill secara progresif dan hierarkis.

### Cara Otomatis:
```bash
npx alchemist-agents --antigravity
```

### Cara Manual:
1. Buka atau buat file `~/.gemini/config/skills.json` (Windows: `%USERPROFILE%\.gemini\config\skills.json`).
2. Daftarkan path folder `skills` repo ini:
   ```json
   {
     "entries": [
       { "path": "C:/laragon/www/alchemist-agents/skills" }
     ]
   }
   ```
3. Salin [AGENTS.md](file:///c:/laragon/www/agents-standard/AGENTS.md) ke `~/.gemini/config/AGENTS.md` agar berlaku sebagai aturan global di semua project.

---

## 2. OpenCode

OpenCode memuat instruksi dan folder skill melalui file konfigurasi global `opencode.json`.

### Cara Otomatis:
```bash
npx alchemist-agents --opencode
```

### Cara Manual:
1. Buka file konfigurasi global di `~/.config/opencode/opencode.json` (Windows: `%USERPROFILE%\.config\opencode\opencode.json`).
2. Tambahkan baris konfigurasi berikut:
   ```json
   {
     "instructions": ["C:/laragon/www/alchemist-agents/AGENTS.md"],
     "skills": {
       "paths": ["C:/laragon/www/alchemist-agents/skills"]
     }
   }
   ```
3. Restart session OpenCode Anda.

---

## 3. Claude Code (Anthropic)

Claude Code membaca file instruksi markdown bernama `CLAUDE.md`.

### Cara Otomatis:
```bash
npx alchemist-agents --claude
```

### Cara Manual:
- **Global**: Salin file `AGENTS.md` ke folder global Claude Code di `~/.claude/CLAUDE.md`.
- **Per Project**: Salin file `AGENTS.md` ke root project Anda dan ubah namanya menjadi `CLAUDE.md`.

---

## 4. Cursor / Windsurf

Cursor dan Windsurf membaca instruksi dari file `.cursorrules` atau `.windsurfrules` di root repository.

### Cara Manual:
1. Jalankan perintah di root project Anda:
   ```bash
   npx alchemist-agents --workspace
   ```
2. Atau salin isi [AGENTS.md](file:///c:/laragon/www/agents-standard/AGENTS.md) ke dalam file `.cursorrules` (untuk Cursor) atau `.windsurfrules` (untuk Windsurf).

---

## 5. GitHub Copilot & Codex

GitHub Copilot Workspace dan extension Copilot di VS Code membaca file instruksi repositori di `.github/copilot-instructions.md`.

### Cara Manual:
1. Buat folder `.github/` di root project.
2. Salin isi [AGENTS.md](file:///c:/laragon/www/agents-standard/AGENTS.md) ke `.github/copilot-instructions.md`.
3. Commit file tersebut ke repository agar seluruh tim yang menggunakan Copilot otomatis mengikuti standar ini.
