# Run — Muhammad Jawad Ali Portfolio

Vite + React 19 + TypeScript + React Three Fiber + Framer Motion. No backend, no env files.

## Reproduce artifacts

1. Install dependencies with npm (the project uses `package-lock.json`):
   ```
   npm install
   ```
2. No `.env` / `.env.local` is needed — nothing to copy from the main checkout.
3. Optional production build check: `npm run build` (also runs `tsc -b`).

## Run the dev server

Default Vite port is 5173. This thread already uses **5199** (`--strictPort`) because it was chosen during setup; any free port works:

```
npm run dev -- --port 5199 --strictPort
```

On Windows, start it detached so it outlives the conversation. **Preferred: launch node.exe directly against Vite's entry** — `npm.cmd` wrapper launches died silently twice in a row (pid gone, empty log), while the direct launch is reliable:

```
powershell -NoProfile -Command "(Start-Process -FilePath 'node.exe' -ArgumentList 'node_modules/vite/bin/vite.js','--port','5199','--strictPort' -RedirectStandardOutput '<log>' -RedirectStandardError '<log>.err' -WindowStyle Hidden -PassThru).Id"
```

Fallback (may die silently — always verify the listener afterwards):

```
powershell -NoProfile -Command "(Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','dev','--','--port','5199','--strictPort' -RedirectStandardOutput '<log>' -RedirectStandardError '<log>.err' -WindowStyle Hidden -PassThru).Id"
```

- stdout and stderr must point at DIFFERENT files (PowerShell fails otherwise).
- Known quirk: the launcher command can exceed a 15–30 s tool timeout and get reported as failed EVEN THOUGH the server starts fine. Don't relaunch blindly — check `netstat -ano | grep ":5199" | grep LISTEN` and `curl http://localhost:5199/` first, and take the pid from the LISTEN line.
- Confirm the pid survives: `powershell -NoProfile -Command "Get-Process -Id <pid>"`.
- Wait for `http://localhost:5199/` to answer 200 before registering the preview.

## Notes

- `public/resume.pdf` is now in place (copied from the uploaded `Jawad_CV.pdf`, 7.7 KB) — the hero Download Resume button links to it with a friendly filename.
- Social URLs are configured in `src/data/site.ts` → `site.socials` (`null` renders disabled buttons).
