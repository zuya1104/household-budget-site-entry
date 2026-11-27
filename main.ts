// HomeLedger — hand-in program (Node 22, standard library only).
//
// The site lives in app/ beside this file: plain static files (HTML, CSS and
// ES modules, no build step) that a browser opens at app/index.html. This
// program copies app/ and screenshots/ into the grader's output directory
// and writes /output/dossier.json with the vendored make.fun library, which
// is the summary the judge reads (screenshots, first-load files and bytes,
// and the site's source). vendor/makefun-frontend.ts is the kit's copy and
// must stay unchanged: the scorer rebuilds the dossier with its own copy
// and requires the two to be byte for byte identical.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const entryDir = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const appIndex = join(entryDir, 'app', 'index.html');
if (!existsSync(appIndex)) {
  throw new Error(`site is missing its entry page: ${appIndex}`);
}

mkdirSync(outDir, { recursive: true });
cpSync(join(entryDir, 'app'), join(outDir, 'app'), { recursive: true });

const shotsDir = join(entryDir, 'screenshots');
mkdirSync(join(outDir, 'screenshots'), { recursive: true });
if (existsSync(shotsDir)) {
  cpSync(shotsDir, join(outDir, 'screenshots'), { recursive: true });
}

// Caps from the scorer's reference/gate.json: the dossier text is capped,
// at most 4 screenshots of at most 256 KiB each, app/ at most 993 files
// and directories and 16 MiB in all.
const dossier = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outDir, 'dossier.json'), dossier);
console.log(`HomeLedger handed in: app/ + screenshots/ + dossier.json (${dossier.length} bytes) -> ${outDir}`);
