# Gluttony Statusline Hook (Novazeb)
# Output: [gluttony] when active in directory with verified Gluttony configuration

$candidates = @(".clinerules", "AGENTS.md", "CLAUDE.md", "GEMINI.md", ".cursor/rules/gluttony.mdc", ".windsurf/rules/gluttony.md")
foreach ($file in $candidates) {
  if ((Test-Path $file) -and (Select-String -Path $file -Pattern "gluttony" -Quiet -ErrorAction SilentlyContinue)) {
    Write-Host "[gluttony] " -ForegroundColor Cyan -NoNewline
    break
  }
}
