#!/usr/bin/env node
/**
 * WCAG 2.1 Contrast Checker (Zero-Dependency)
 * Penggunaan:
 *   node script/contrast.js "#FFFFFF" "#111827"
 */

function parseHex(hex) {
  let cleaned = hex.trim().replace(/^#/, '');
  if (cleaned.length === 3) {
    cleaned = cleaned.split('').map(c => c + c).join('');
  }
  if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return [
    parseInt(cleaned.slice(0, 2), 16),
    parseInt(cleaned.slice(2, 4), 16),
    parseInt(cleaned.slice(4, 6), 16)
  ];
}

function channelLuminance(val) {
  const c = val / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance([r, g, b]) {
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b);
}

function calculateContrast(fgHex, bgHex) {
  const fg = parseHex(fgHex);
  const bg = parseHex(bgHex);
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: node script/contrast.js <foreground-hex> <background-hex>');
  process.exit(1);
}

const ratio = calculateContrast(args[0], args[1]);
const passNormal = ratio >= 4.5;
const passLarge = ratio >= 3.0;

console.log(`Contrast Ratio: ${ratio}:1`);
console.log(`Normal Text (WCAG AA >= 4.5): ${passNormal ? 'PASS' : 'FAIL'}`);
console.log(`Large Text (WCAG AA >= 3.0):  ${passLarge ? 'PASS' : 'FAIL'}`);

process.exit(passNormal ? 0 : 1);
