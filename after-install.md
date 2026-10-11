# Post-Installation Verification

1. Run the verification test suite:
   ```bash
   npm test
   ```
2. Verify all manifests and links:
   ```bash
   npm run verify
   ```
3. Test WCAG AA color contrast utility:
   ```bash
   node script/contrast.js "#FFFFFF" "#111827"
   ```
Gluttony is active and ready for use.
