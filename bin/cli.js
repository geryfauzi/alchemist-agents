#!/usr/bin/env node

/**
 * Alchemist Agents CLI (alchemist-agents)
 * The Alchemist Standard: Automatic setup tool for AI coding agents
 * (Antigravity, OpenCode, Claude Code, Cursor, Windsurf, etc.)
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

const ROOT_DIR = path.resolve(__dirname, '..');
const SKILLS_DIR = path.join(ROOT_DIR, 'skills');
const AGENTS_MD_PATH = path.join(ROOT_DIR, 'AGENTS.md');
const HOME_DIR = os.homedir();

// Helpers
function normalizePath(p) {
  return p.replace(/\\/g, '/');
}

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 1. Setup Antigravity
function setupAntigravity() {
  console.log('\n--- Konfigurasi Antigravity (Google AGY) ---');
  const geminiConfigDir = path.join(HOME_DIR, '.gemini', 'config');
  ensureDirSync(geminiConfigDir);

  const skillsJsonPath = path.join(geminiConfigDir, 'skills.json');
  let config = { entries: [] };

  if (fs.existsSync(skillsJsonPath)) {
    try {
      config = JSON.parse(fs.readFileSync(skillsJsonPath, 'utf8'));
      if (!Array.isArray(config.entries)) config.entries = [];
    } catch (e) {
      config = { entries: [] };
    }
  }

  const normalizedSkillsPath = normalizePath(SKILLS_DIR);
  const alreadyExists = config.entries.some(
    (entry) => typeof entry === 'object' && normalizePath(entry.path || '') === normalizedSkillsPath
  );

  if (!alreadyExists) {
    config.entries.push({ path: normalizedSkillsPath });
    fs.writeFileSync(skillsJsonPath, JSON.stringify(config, null, 2), 'utf8');
    console.log(`[✓] Berhasil mendaftarkan folder skills di: ${skillsJsonPath}`);
  } else {
    console.log(`[i] Path skills sudah terdaftar sebelumnya di: ${skillsJsonPath}`);
  }

  // Global AGENTS.md for Antigravity
  const globalAgentsMd = path.join(geminiConfigDir, 'AGENTS.md');
  fs.copyFileSync(AGENTS_MD_PATH, globalAgentsMd);
  console.log(`[✓] Berhasil menyalin aturan global ke: ${globalAgentsMd}`);
}

// 2. Setup OpenCode
function setupOpenCode() {
  console.log('\n--- Konfigurasi OpenCode ---');
  const opencodeConfigDir = path.join(HOME_DIR, '.config', 'opencode');
  ensureDirSync(opencodeConfigDir);

  const opencodeJsonPath = path.join(opencodeConfigDir, 'opencode.json');
  let config = {};

  if (fs.existsSync(opencodeJsonPath)) {
    try {
      config = JSON.parse(fs.readFileSync(opencodeJsonPath, 'utf8'));
    } catch (e) {
      config = {};
    }
  }

  const normalizedAgentsMd = normalizePath(AGENTS_MD_PATH);
  const normalizedSkillsPath = normalizePath(SKILLS_DIR);

  if (!Array.isArray(config.instructions)) config.instructions = [];
  if (!config.instructions.includes(normalizedAgentsMd)) {
    config.instructions.push(normalizedAgentsMd);
  }

  if (!config.skills) config.skills = {};
  if (!Array.isArray(config.skills.paths)) config.skills.paths = [];
  if (!config.skills.paths.includes(normalizedSkillsPath)) {
    config.skills.paths.push(normalizedSkillsPath);
  }

  fs.writeFileSync(opencodeJsonPath, JSON.stringify(config, null, 2), 'utf8');
  console.log(`[✓] Berhasil memperbarui konfigurasi OpenCode di: ${opencodeJsonPath}`);
}

// 3. Setup Claude Code
function setupClaudeCode() {
  console.log('\n--- Konfigurasi Claude Code ---');
  const claudeDir = path.join(HOME_DIR, '.claude');
  ensureDirSync(claudeDir);

  const claudeMdPath = path.join(claudeDir, 'CLAUDE.md');
  fs.copyFileSync(AGENTS_MD_PATH, claudeMdPath);
  console.log(`[✓] Berhasil menyalin aturan Alchemist ke konfigurasi global Claude Code: ${claudeMdPath}`);
}

// 4. Setup Project Workspace (Current Working Directory)
function setupProjectWorkspace() {
  console.log('\n--- Konfigurasi Project Workspace Lokal ---');
  const cwd = process.cwd();
  const targetAgentsMd = path.join(cwd, 'AGENTS.md');
  const targetClaudeMd = path.join(cwd, 'CLAUDE.md');

  fs.copyFileSync(AGENTS_MD_PATH, targetAgentsMd);
  console.log(`[✓] Berhasil membuat AGENTS.md di root project: ${targetAgentsMd}`);

  fs.copyFileSync(AGENTS_MD_PATH, targetClaudeMd);
  console.log(`[✓] Berhasil membuat CLAUDE.md di root project: ${targetClaudeMd}`);
}

// 5. Export Gemini Web Chat Instructions
function exportGeminiWebInstructions() {
  console.log('\n--- Export Instruksi untuk Gemini Web Chat (Gems) ---');
  const content = fs.readFileSync(AGENTS_MD_PATH, 'utf8');
  const outputPath = path.join(process.cwd(), 'gemini-gem-instructions.txt');

  const geminiPrompt = `=== PANDUAN PENGGUNAAN DI GEMINI WEB CHAT (gemini.google.com) ===
1. Buka gemini.google.com
2. Klik menu 'Gems Manager' atau 'Create Gem'
3. Beri nama: 'Alchemist Senior Engineer'
4. Salin seluruh teks di bawah ini ke kolom 'Instructions':

------------------- POTONG DI BAWAH INI -------------------
${content}
------------------- POTONG DI ATAS INI -------------------
`;

  fs.writeFileSync(outputPath, geminiPrompt, 'utf8');
  console.log(`[✓] File instruksi Gemini Web Chat berhasil diexport ke: ${outputPath}`);
  console.log(`    Buka file tersebut, salin teks instruksinya, lalu paste ke kolom Instructions di Gemini Gem Anda.`);
}

// Show Help
function showHelp() {
  console.log(`
Alchemist Agents CLI (alchemist-agents)

Penggunaan:
  npx alchemist-agents [perintah / opsi]

Opsi:
  --antigravity   Pasang konfigurasi global untuk Antigravity (Google AGY)
  --opencode      Pasang konfigurasi global untuk OpenCode
  --claude        Pasang konfigurasi global untuk Claude Code
  --workspace     Salin file instruksi (AGENTS.md & CLAUDE.md) ke direktori saat ini
  --gemini        Export instruksi siap pakai untuk Gemini Web Chat (Gems)
  --all           Pasang untuk semua agent yang didukung
  --help, -h      Tampilkan panduan ini

Jika dijalankan tanpa opsi, menu interaktif akan ditampilkan.
`);
}

// Interactive Menu
function runInteractive() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('\n======================================================');
  console.log('       Alchemist Agents: AI Coding Setup Tool         ');
  console.log('======================================================');
  console.log('Pilih AI Agent yang ingin Anda konfigurasikan:');
  console.log('  1. Antigravity (Google AGY)');
  console.log('  2. OpenCode');
  console.log('  3. Claude Code');
  console.log('  4. Workspace Project Saat Ini (AGENTS.md & CLAUDE.md)');
  console.log('  5. Export Instruksi untuk Gemini Web Chat (Gems)');
  console.log('  6. Konfigurasi Semua AI Agent Sekaligus');
  console.log('  0. Keluar');

  rl.question('\nMasukkan pilihan [1-6, 0]: ', (answer) => {
    rl.close();
    switch (answer.trim()) {
      case '1':
        setupAntigravity();
        break;
      case '2':
        setupOpenCode();
        break;
      case '3':
        setupClaudeCode();
        break;
      case '4':
        setupProjectWorkspace();
        break;
      case '5':
        exportGeminiWebInstructions();
        break;
      case '6':
        setupAntigravity();
        setupOpenCode();
        setupClaudeCode();
        break;
      case '0':
        console.log('Selesai.');
        break;
      default:
        console.log('Pilihan tidak valid.');
        break;
    }
  });
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  runInteractive();
} else if (args.includes('--help') || args.includes('-h')) {
  showHelp();
} else if (args.includes('--antigravity')) {
  setupAntigravity();
} else if (args.includes('--opencode')) {
  setupOpenCode();
} else if (args.includes('--claude')) {
  setupClaudeCode();
} else if (args.includes('--workspace')) {
  setupProjectWorkspace();
} else if (args.includes('--gemini')) {
  exportGeminiWebInstructions();
} else if (args.includes('--all')) {
  setupAntigravity();
  setupOpenCode();
  setupClaudeCode();
} else {
  console.log(`Opsi tidak dikenal: ${args.join(' ')}`);
  showHelp();
}
