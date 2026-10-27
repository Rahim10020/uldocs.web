import { copyFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * `react-pdf` dépend de `pdfjs-dist`, mais le worker n'est pas exposé par le
 * paquet. On le copie dans `public/` pour que le navigateur puisse le charger
 * depuis `/pdf.worker.min.mjs`.
 */
const require = createRequire(import.meta.url);
const appRoot = fileURLToPath(new URL("..", import.meta.url));
const reactPdfPackage = require.resolve("react-pdf/package.json", {
	paths: [appRoot],
});
const workerSource = require.resolve("pdfjs-dist/build/pdf.worker.min.mjs", {
	paths: [dirname(reactPdfPackage)],
});
const workerTarget = resolve(appRoot, "public/pdf.worker.min.mjs");

mkdirSync(dirname(workerTarget), { recursive: true });
copyFileSync(workerSource, workerTarget);

console.log(`[web] PDF worker copié vers ${workerTarget}`);
