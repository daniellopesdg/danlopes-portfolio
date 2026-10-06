// Verifica referências locais e estrutura; não acessa players externos.
import {readFile, readdir, stat} from 'node:fs/promises';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
const root = fileURLToPath(new URL('../public/', import.meta.url));
async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, {withFileTypes:true})) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(path)); else out.push(path);
  }
  return out;
}
const files = await walk(root);
const errors = [];
for (const path of files) {
  if (path.endsWith('.js')) execFileSync(process.execPath, ['--check',path]);
  if (!path.endsWith('.html')) continue;
  const html = await readFile(path,'utf8');
  for (const [,link] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:https?:|mailto:|tel:|data:|#|\/\/)/.test(link)) continue;
    const clean = link.split(/[?#]/)[0];
    const target = link.startsWith('/') ? resolve(root, '.'+clean) : resolve(dirname(path),clean);
    try {
      const info = await stat(target);
      if (info.isDirectory()) await stat(resolve(target,'index.html'));
    } catch {errors.push(`Referência ausente: ${link} em ${path}`);}
  }
}
const home = await readFile(resolve(root,'index.html'),'utf8');
if ([...home.matchAll(/<iframe\b/g)].length !== 36) errors.push('A exportação original deve conter 36 incorporações. Atualize a contagem se adicionar/remover projetos.');
if ([...home.matchAll(/<details\b/g)].length !== 5) errors.push('Esperadas cinco categorias de projetos.');
if (/<details\b[^>]*\sopen(?:\s|>)/.test(home)) errors.push('As categorias devem iniciar fechadas.');
if (errors.length) {console.error(errors.join('\n'));process.exit(1);}
console.log(`OK: ${files.length} arquivos; referências locais e sintaxe JS válidas; 36 incorporações e 5 categorias fechadas.`);
