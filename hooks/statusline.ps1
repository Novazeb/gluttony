# Gluttony Statusline Hook (Novazeb)
# Output: [gluttony] when active in directory

if ((Test-Path ".clinerules") -or (Test-Path "AGENTS.md") -or (Test-Path "CLAUDE.md") -or (Test-Path "GEMINI.md")) {
  Write-Host "[gluttony] " -ForegroundColor Cyan -NoNewline
}
