#!/usr/bin/env bash
# Gluttony Statusline Hook (Novazeb)
# Output: [gluttony] when active in directory with verified Gluttony configuration

candidates=(".clinerules" "AGENTS.md" "CLAUDE.md" "GEMINI.md" ".cursor/rules/gluttony.mdc" ".windsurf/rules/gluttony.md" "skills/gluttony/SKILL.md" "skills/gluttony-ui/SKILL.md")

for file in "${candidates[@]}"; do
  if [ -f "$file" ] && grep -qi "gluttony" "$file" 2>/dev/null; then
    printf "\033[1;36m[gluttony]\033[0m "
    exit 0
  fi
done
