# Installation Guide for Gluttony

Gluttony works both as an on-demand skill and an always-on instruction set across all major AI coding environments.

---

## Quick Remote Installation (No Clone Required)

### Claude Code
```bash
/plugin marketplace add Novazeb/gluttony
/plugin install gluttony@gluttony
```

### OpenAI Codex
```bash
codex plugin add Novazeb/gluttony
```

### Antigravity & Gemini CLI
```bash
antigravity plugin install https://github.com/Novazeb/gluttony
```

---

## Local Repository / Embedded Usage

### 1. Claude Code
Gluttony is auto-discovered via `.claude-plugin/plugin.json` and `CLAUDE.md`.
Run `claude` in this directory.

### 2. Cursor IDE
Gluttony automatically applies to all files via `.cursor/rules/gluttony.mdc`.
Open this folder in Cursor and start coding.

### 3. Windsurf IDE
Gluttony automatically guides Cascade via `.windsurf/rules/gluttony.md`.

### 4. Cline / Roo-Code
Gluttony rules are automatically active via `.clinerules`.

### 5. Gemini & Antigravity CLI
Install from current directory:
```bash
antigravity plugin install .
```
Or use the slash command `/gluttony`.

### 6. OpenClaw & OpenCode
Gluttony manifests are pre-configured in `.openclaw/` and `.opencode/`.
