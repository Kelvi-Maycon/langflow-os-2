import { createReadStream, existsSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');
const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 5173);

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

function sendNotFound(res) {
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
}

function sendFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const requestedPath = urlPath === '/' ? '/index.html' : urlPath;
  const filePath = path.normalize(path.join(distDir, requestedPath));

  // Ensure the resolved path is strictly inside the dist directory
  const safeDistDir = distDir.endsWith(path.sep) ? distDir : distDir + path.sep;
  if (!filePath.startsWith(safeDistDir) && filePath !== distDir) {
    sendNotFound(res);
    return;
  }

  try {
    const fileStats = await stat(filePath);
    if (fileStats.isFile()) {
      sendFile(filePath, res);
      return;
    }
  } catch {
    // Fall back to SPA entry below.
  }

  const spaEntry = path.join(distDir, 'index.html');
  if (!existsSync(spaEntry)) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('dist/index.html not found');
    return;
  }

  sendFile(spaEntry, res);
});

server.listen(port, host, () => {
  console.log(`LangFlow available at http://${host}:${port}`);
});
