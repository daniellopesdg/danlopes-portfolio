// Servidor local sem dependências. Não é necessário na hospedagem.
import {createServer} from 'node:http';
import {readFile, stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve, relative, isAbsolute, extname, sep} from 'node:path';
const root = fileURLToPath(new URL('../public/', import.meta.url));
const port = Number(process.env.PORT || 3000);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.mp4':'video/mp4'};
createServer(async (req, res) => {
  try {
    if (!['GET','HEAD'].includes(req.method)) {res.writeHead(405);res.end();return;}
    const url = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    let path = resolve(root, '.' + pathname);
    const rel = relative(root, path);
    if (rel === '..' || rel.startsWith('..' + sep) || isAbsolute(rel)) {res.writeHead(403);res.end();return;}
    if ((await stat(path)).isDirectory()) {
      if (!url.pathname.endsWith('/')) {res.writeHead(308, {Location: url.pathname + '/' + url.search});res.end();return;}
      path = resolve(path, 'index.html');
    }
    const bytes = await readFile(path);
    res.writeHead(200, {'Content-Type':types[extname(path)] || 'application/octet-stream', 'Content-Length':bytes.length});
    res.end(req.method === 'HEAD' ? undefined : bytes);
  } catch {res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'});res.end('Página não encontrada.');}
}).listen(port, '127.0.0.1', () => console.log(`Portfólio: http://localhost:${port}`));
