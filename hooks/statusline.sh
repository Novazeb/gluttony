#!/usr/bin/env bash
# Gluttony Statusline Hook (Novazeb)
# Output: [gluttony] when active in directory

if [ -f ".clinerules" ] || [ -f "AGENTS.md" ] || [ -f "CLAUDE.md" ] || [ -f "GEMINI.md" ]; then
  printf "\033[1;36m[gluttony]\033[0m "
fi
