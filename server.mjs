// Local preview server for the static site.
//
// Usage:  node server.mjs        then open http://localhost:3456
//
// This only previews the site locally. It is NOT how the site is deployed --
// Vercel serves these files directly from the repo. See README.md.

import { createServer } from 'http';
import { readFile, stat } from 'fs/promises';
import { join, extname, normalize, dirname } from 'path';
import { fileURLToPath } from 'url';

// Resolve against this file's location, not the shell's working directory,
// so the server works no matter where you launch it from.
const ROOT = dirname(fileURLToPath(import.meta.url));
const PORT = 3456;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff2': 'font/woff2',
};

createServer(async (req, res) => {
  // Strip the query string, then normalize away any ../ before joining, so a
  // crafted URL can't escape the site directory.
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const safePath = normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
  let filePath = join(ROOT, safePath);

  try {
    // A directory request serves its index.html, matching how Vercel
    // resolves /services/ and /blog/.
    if ((await stat(filePath)).isDirectory()) {
      filePath = join(filePath, 'index.html');
    }

    // Read per request rather than once at startup, so edits show up on
    // refresh without restarting the server.
    const body = await readFile(filePath);
    res.setHeader('Content-Type', MIME[extname(filePath).toLowerCase()] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'no-store');
    res.end(body);
  } catch {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(`<h1>404</h1><p>Not found: ${safePath}</p>`);
  }
}).listen(PORT, () => console.log(`Serving ${ROOT}\nhttp://localhost:${PORT}`));
