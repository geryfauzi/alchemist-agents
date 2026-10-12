# Panduan Setup Lengkap untuk Berbagai AI Coding Agent

Standar ini dirancang agar dapat digunakan di berbagai AI coding agent terpopuler. Anda bisa menggunakan tool CLI otomatis (`npx alchemist-agents@latest`) atau melakukan konfigurasi manual seperti dijelaskan di bawah ini.

---

## 1. Antigravity (Google AGY)

Antigravity memiliki sistem pemuatan skill secara progresif dan hierarkis.

### Cara Otomatis:
```bash
npx alchemist-agents@latest --antigravity
```

### Cara Manual:
1. Buka atau buat file `~/.gemini/config/skills.json` (Windows: `%USERPROFILE%\.gemini\config\skills.json`).
2. Daftarkan path folder `skills` Alchemist yang ada di komputer Anda:
   ```json
   {
     "entries": [
       { "path": "~/.alchemist-agents/skills" }
     ]
   }
   ```
3. Salin file `AGENTS.md` ke `~/.gemini/config/AGENTS.md` agar berlaku sebagai aturan global di semua project.

---

## 2. OpenCode

OpenCode memuat instruksi dan folder skill melalui file konfigurasi global `opencode.json`.

### Cara Otomatis:
```bash
npx alchemist-agents@latest --opencode
```

### Cara Manual:
1. Buka file konfigurasi global di `~/.config/opencode/opencode.json` (Windows: `%USERPROFILE%\.config\opencode\opencode.json`).
2. Tambahkan baris konfigurasi berikut:
   ```json
   {
     "instructions": ["~/.alchemist-agents/AGENTS.md"],
     "skills": {
       "paths": ["~/.alchemist-agents/skills"]
     }
   }
   ```
3. Restart session OpenCode Anda.

---

## 3. Claude Code (Anthropic)

Claude Code membaca file instruksi markdown bernama `CLAUDE.md`.

### Cara Otomatis:
```bash
npx alchemist-agents@latest --claude
```

### Cara Manual:
- **Global**: Salin file `AGENTS.md` ke folder global Claude Code di `~/.claude/CLAUDE.md`.
- **Per Project**: Salin file `AGENTS.md` ke root project Anda dan beri nama `CLAUDE.md`.

---

## 4. Cursor / Windsurf / Copilot / Cline (Per Project)

### Cara Otomatis:
Di root direktori project Anda, cukup jalankan:
```bash
npx alchemist-agents@latest --workspace
```
Perintah ini akan secara otomatis membuat seluruh file konfigurasi berikut:
- `AGENTS.md` (Antigravity & OpenCode)
- `CLAUDE.md` (Claude Code)
- `.cursorrules` (Cursor IDE)
- `.windsurfrules` (Windsurf IDE)
- `.github/copilot-instructions.md` (GitHub Copilot)
- `.clinerules` (Cline & Roo Code)

### Cara Manual:
Salin isi `AGENTS.md` ke dalam masing-masing file konfigurasi editor yang Anda gunakan di root project.
