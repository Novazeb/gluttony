#!/usr/bin/env node
/**
 * WCAG 2.1 Contrast Checker (Zero-Dependency)
 * Supports: HEX (3, 6, 8-digit), rgb(), rgba(), hsl(), hsla()
 * Usage:
 *   node script/contrast.js "#FFFFFF" "#111827" [--target=normal|large|aaa]
 */

function parseColor(input) {
  const str = input.trim().toLowerCase();

  // 1. HEX format (#RGB, #RRGGBB, #RRGGBBAA)
  if (str.startsWith('#')) {
    let hex = str.slice(1);
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('') + 'ff';
    } else if (hex.length === 6) {
      hex += 'ff';
    } else if (hex.length !== 8) {
      throw new Error(`Invalid HEX color: ${input}`);
    }
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const a = parseInt(hex.slice(6, 8), 16) / 255;
    // Composite over white background (255, 255, 255) for alpha
    return [
      Math.round(r * a + 255 * (1 - a)),
      Math.round(g * a + 255 * (1 - a)),
      Math.round(b * a + 255 * (1 - a))
    ];
  }

  // 2. RGB / RGBA format
  const rgbMatch = str.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/);
  if (rgbMatch) {
    const r = parseFloat(rgbMatch[1]);
    const g = parseFloat(rgbMatch[2]);
    const b = parseFloat(rgbMatch[3]);
    const a = rgbMatch[4] !== undefined ? parseFloat(rgbMatch[4]) : 1.0;
    return [
      Math.round(r * a + 255 * (1 - a)),
      Math.round(g * a + 255 * (1 - a)),
      Math.round(b * a + 255 * (1 - a))
    ];
  }

  // 3. HSL / HSLA format
  const hslMatch = str.match(/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%(?:\s*,\s*([\d.]+))?\s*\)$/);
  if (hslMatch) {
    const h = parseFloat(hslMatch[1]) / 360;
    const s = parseFloat(hslMatch[2]) / 100;
    const l = parseFloat(hslMatch[3]) / 100;
    const a = hslMatch[4] !== undefined ? parseFloat(hslMatch[4]) : 1.0;

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const r255 = Math.round(r * 255);
    const g255 = Math.round(g * 255);
    const b255 = Math.round(b * 255);
    return [
      Math.round(r255 * a + 255 * (1 - a)),
      Math.round(g255 * a + 255 * (1 - a)),
      Math.round(b255 * a + 255 * (1 - a))
    ];
  }

  throw new Error(`Unsupported color format: ${input}`);
}

function channelLuminance(val) {
  const c = val / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance([r, g, b]) {
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b);
}

function calculateContrast(fgInput, bgInput) {
  const fg = parseColor(fgInput);
  const bg = parseColor(bgInput);
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

// CLI Execution
const args = process.argv.slice(2);
const positional = args.filter(a => !a.startsWith('--'));
const flags = args.filter(a => a.startsWith('--'));

if (positional.length < 2) {
  console.log('Usage: node script/contrast.js <foreground> <background> [--target=normal|large|aaa]');
  console.log('Supported formats: #RGB, #RRGGBB, #RRGGBBAA, rgb(), rgba(), hsl(), hsla()');
  process.exit(1);
}

let target = 'normal';
for (const flag of flags) {
  if (flag === '--target=large' || flag === '--large') target = 'large';
  if (flag === '--target=aaa' || flag === '--aaa') target = 'aaa';
  if (flag === '--target=normal' || flag === '--normal') target = 'normal';
}

const ratio = calculateContrast(positional[0], positional[1]);
const passNormal = ratio >= 4.5;
const passLarge = ratio >= 3.0;
const passAAA = ratio >= 7.0;

console.log(`Contrast Ratio: ${ratio}:1`);
console.log(`Normal Text (AA >= 4.5:1): ${passNormal ? 'PASS' : 'FAIL'}`);
console.log(`Large Text  (AA >= 3.0:1): ${passLarge ? 'PASS' : 'FAIL'}`);
console.log(`Enhanced    (AAA >= 7.0:1): ${passAAA ? 'PASS' : 'FAIL'}`);

let targetPassed = passNormal;
if (target === 'large') targetPassed = passLarge;
if (target === 'aaa') targetPassed = passAAA;

process.exit(targetPassed ? 0 : 1);
