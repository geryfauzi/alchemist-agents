#!/usr/bin/env node

/**
 * Alchemist Agents CLI (alchemist-agents)
 * The Alchemist Standard: Automatic setup & sync tool for AI coding agents
 * Supports: Antigravity (Google AGY), OpenCode, Claude Code, Cursor, Windsurf, GitHub Copilot, Cline/Roo Code
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

const ROOT_DIR = path.resolve(__dirname, '..');
const SKILLS_DIR = path.join(ROOT_DIR, 'skills');
const AGENTS_MD_PATH = path.join(ROOT_DIR, 'AGENTS.md');
const HOME_DIR = os.homedir();

// Global permanent storage for Alchemist
const ALCHEMIST_GLOBAL_DIR = path.join(HOME_DIR, '.alchemist-agents');
const ALCHEMIST_GLOBAL_SKILLS = path.join(ALCHEMIST_GLOBAL_DIR, 'skills');
const ALCHEMIST_GLOBAL_AGENTS_MD = path.join(ALCHEMIST_GLOBAL_DIR, 'AGENTS.md');

let PKG_VERSION = '2.0.0';
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));
  PKG_VERSION = pkg.version || PKG_VERSION;
} catch (e) {
  // ignore
}

// Helpers
function normalizePath(p) {
  return p.replace(/\\/g, '/');
}

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Recursive directory copy with fallback
function copyDirSync(src, dest) {
  ensureDirSync(dest);
  if (typeof fs.cpSync === 'function') {
    fs.cpSync(src, dest, { recursive: true, force: true });
  } else {
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        copyDirSync(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

// Ensure execution permissions on Unix-like systems
function ensureUnixPermissions(dirPath) {
  if (process.platform === 'win32') return;

  function walk(current) {
    if (!fs.existsSync(current)) return;
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (
        entry.name.endsWith('.sh') ||
        entry.name.endsWith('.bash') ||
        entry.name === 'task-start' ||
        entry.name === 'task-done' ||
        entry.name === 'review-package' ||
        entry.name === 'sdd-workspace' ||
        entry.name === 'task-brief'
      ) {
        try {
          fs.chmodSync(full, 0o755);
        } catch (e) {
          // ignore
        }
      }
    }
  }

  try {
    walk(dirPath);
  } catch (e) {
    // ignore
  }
}

// Sync Alchemist skills & AGENTS.md to permanent location (~/.alchemist-agents)
function syncGlobalAlchemistFiles() {
  ensureDirSync(ALCHEMIST_GLOBAL_DIR);
  copyDirSync(SKILLS_DIR, ALCHEMIST_GLOBAL_SKILLS);
  ensureUnixPermissions(ALCHEMIST_GLOBAL_SKILLS);
  fs.copyFileSync(AGENTS_MD_PATH, ALCHEMIST_GLOBAL_AGENTS_MD);
  console.log(`[✓] Asset Alchemist tersinkronisasi di: ${ALCHEMIST_GLOBAL_DIR}`);
}

// 1. Setup Antigravity (Google AGY)
function setupAntigravity() {
  console.log('\n--- Konfigurasi Antigravity (Google AGY) ---');
  syncGlobalAlchemistFiles();

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

  const targetPath = normalizePath(ALCHEMIST_GLOBAL_SKILLS);

  // Bersihkan path lama alchemist-agents (agar tidak menumpuk/broken dari versi lama)
  config.entries = config.entries.filter((entry) => {
    const rawPath = typeof entry === 'string' ? entry : (entry && entry.path) || '';
    const norm = normalizePath(rawPath);
    return !norm.includes('alchemist-agents/skills');
  });

  // Masukkan path permanen
  config.entries.push({ path: targetPath });
  fs.writeFileSync(skillsJsonPath, JSON.stringify(config, null, 2), 'utf8');
  console.log(`[✓] Berhasil mendaftarkan skills di: ${skillsJsonPath}`);

  // Global AGENTS.md for Antigravity
  const globalAgentsMd = path.join(geminiConfigDir, 'AGENTS.md');
  fs.copyFileSync(AGENTS_MD_PATH, globalAgentsMd);
  console.log(`[✓] Berhasil menyalin aturan global ke: ${globalAgentsMd}`);
}

// 2. Setup OpenCode
function setupOpenCode() {
  console.log('\n--- Konfigurasi OpenCode ---');
  syncGlobalAlchemistFiles();

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

  const targetAgentsMd = normalizePath(ALCHEMIST_GLOBAL_AGENTS_MD);
  const targetSkillsPath = normalizePath(ALCHEMIST_GLOBAL_SKILLS);

  // Bersihkan path lama
  if (!Array.isArray(config.instructions)) config.instructions = [];
  config.instructions = config.instructions.filter((p) => !normalizePath(p).includes('alchemist-agents'));
  config.instructions.push(targetAgentsMd);

  if (!config.skills) config.skills = {};
  if (!Array.isArray(config.skills.paths)) config.skills.paths = [];
  config.skills.paths = config.skills.paths.filter((p) => !normalizePath(p).includes('alchemist-agents/skills'));
  config.skills.paths.push(targetSkillsPath);

  fs.writeFileSync(opencodeJsonPath, JSON.stringify(config, null, 2), 'utf8');
  console.log(`[✓] Berhasil memperbarui konfigurasi OpenCode di: ${opencodeJsonPath}`);
}

// 3. Setup Claude Code
function setupClaudeCode() {
  console.log('\n--- Konfigurasi Claude Code ---');
  syncGlobalAlchemistFiles();

  const claudeDir = path.join(HOME_DIR, '.claude');
  ensureDirSync(claudeDir);

  const claudeMdPath = path.join(claudeDir, 'CLAUDE.md');
  fs.copyFileSync(AGENTS_MD_PATH, claudeMdPath);
  console.log(`[✓] Berhasil menyalin aturan Alchemist ke konfigurasi global Claude Code: ${claudeMdPath}`);
}

// 4. Setup Project Workspace (Multi-Agent Support)
function setupProjectWorkspace() {
  console.log('\n--- Konfigurasi Workspace Project Lokal ---');
  const cwd = process.cwd();
  const agentsContent = fs.readFileSync(AGENTS_MD_PATH, 'utf8');

  // 1. AGENTS.md (Universal standard, Antigravity, OpenCode)
  const targetAgentsMd = path.join(cwd, 'AGENTS.md');
  fs.writeFileSync(targetAgentsMd, agentsContent, 'utf8');
  console.log(`[✓] AGENTS.md dibuat di root project`);

  // 2. CLAUDE.md (Claude Code)
  const targetClaudeMd = path.join(cwd, 'CLAUDE.md');
  fs.writeFileSync(targetClaudeMd, agentsContent, 'utf8');
  console.log(`[✓] CLAUDE.md dibuat untuk Claude Code`);

  // 3. .cursorrules (Cursor IDE)
  const targetCursor = path.join(cwd, '.cursorrules');
  fs.writeFileSync(targetCursor, agentsContent, 'utf8');
  console.log(`[✓] .cursorrules dibuat untuk Cursor IDE`);

  // 4. .windsurfrules (Windsurf IDE)
  const targetWindsurf = path.join(cwd, '.windsurfrules');
  fs.writeFileSync(targetWindsurf, agentsContent, 'utf8');
  console.log(`[✓] .windsurfrules dibuat untuk Windsurf IDE`);

  // 5. GitHub Copilot (.github/copilot-instructions.md)
  const githubDir = path.join(cwd, '.github');
  ensureDirSync(githubDir);
  const targetCopilot = path.join(githubDir, 'copilot-instructions.md');
  fs.writeFileSync(targetCopilot, agentsContent, 'utf8');
  console.log(`[✓] .github/copilot-instructions.md dibuat untuk GitHub Copilot`);

  // 6. .clinerules (Cline / Roo Code)
  const targetCline = path.join(cwd, '.clinerules');
  fs.writeFileSync(targetCline, agentsContent, 'utf8');
  console.log(`[✓] .clinerules dibuat untuk Cline / Roo Code`);
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
Alchemist Agents CLI v${PKG_VERSION}
The Alchemist Standard: Unified AI Coding Agent Setup Tool

Penggunaan:
  npx alchemist-agents [perintah / opsi]

Opsi Global:
  --antigravity   Pasang konfigurasi global untuk Antigravity (Google AGY)
  --opencode      Pasang konfigurasi global untuk OpenCode
  --claude        Pasang konfigurasi global untuk Claude Code
  --all           Pasang untuk semua agent global sekaligus
  --sync          Hanya sinkronkan folder skills ke ~/.alchemist-agents

Opsi Project Lokal:
  --workspace     Pasang aturan ke project saat ini (AGENTS.md, CLAUDE.md, Cursor, Windsurf, Copilot, Cline)
  --gemini        Export instruksi siap pakai untuk Gemini Web Chat (Gems)

Lainnya:
  --version, -v   Tampilkan versi alchemist-agents
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
  console.log(`    Alchemist Agents v${PKG_VERSION}: AI Coding Setup Tool    `);
  console.log('======================================================');
  console.log('Pilih aksi konfigurasi yang ingin Anda jalankan:');
  console.log('  1. Antigravity (Google AGY) - Global');
  console.log('  2. OpenCode - Global');
  console.log('  3. Claude Code - Global');
  console.log('  4. Workspace Project Saat Ini (AGENTS.md, Cursor, Windsurf, Copilot, Cline, Claude)');
  console.log('  5. Export Instruksi untuk Gemini Web Chat (Gems)');
  console.log('  6. Konfigurasi Semua AI Agent Sekaligus (Global)');
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
} else if (args.includes('--version') || args.includes('-v')) {
  console.log(`alchemist-agents v${PKG_VERSION}`);
} else if (args.includes('--sync')) {
  syncGlobalAlchemistFiles();
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
