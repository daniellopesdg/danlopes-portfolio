# Portfólio de Daniel Lopes

Exportação independente da versão 15, publicada em 6 de outubro de 2026. Site estático em HTML, CSS e JavaScript, pronto para um repositório GitHub e hospedagem na Vercel. Não exige conta ChatGPT, APIs da OpenAI, banco de dados, variáveis de ambiente ou pacotes de terceiros.

## Publicar pelo GitHub e Vercel

1. Descompacte o ZIP e abra a pasta `dan-lopes-portfolio`.
2. Crie um repositório no GitHub. Em **Add file → Upload files**, envie o conteúdo dessa pasta, mantendo `public/`, `scripts/`, `package.json` e `vercel.json` na raiz do repositório. Não envie apenas o ZIP.
3. Na Vercel, use **Add New → Project** e importe o repositório.
4. Mantenha **Root Directory** na raiz do repositório e **Framework Preset** como **Other**. O `vercel.json` já define a pasta de publicação como `public`, sem etapa de build. Se houver configurações manuais antigas no painel, remova-as.
5. Clique em **Deploy**. Não há variáveis de ambiente para preencher.
6. Confira a URL gerada e as páginas `/sobre/` e `/contato/`. Depois, se desejar, associe `danlopes.art.br` ao novo projeto e configure os registros DNS indicados pela nova hospedagem. O ZIP não altera o domínio nem o site atual.

Alternativa com Git instalado, dentro da pasta extraída:

```bash
git init
git add .
git commit -m "Adiciona portfolio Daniel Lopes"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

Substitua `SEU-USUARIO` e `SEU-REPOSITORIO`. Não há credenciais incluídas.

## Abrir no computador

Com Node.js instalado, execute na pasta do projeto:

```bash
npm run dev
```

Abra `http://localhost:3000`. Não é necessário executar `npm install`, pois não existem dependências. Para verificar os arquivos: `npm run check`. Para encerrar o servidor: Ctrl+C.

Alternativa com Python: `python -m http.server 3000 --directory public`.

Use um servidor local, em vez de abrir o HTML por duplo clique: o site utiliza caminhos a partir da raiz, como `/style.css` e `/sobre/`.

## Organização

- `public/index.html`: página de projetos, 36 incorporações, categorias recolhíveis e contatos.
- `public/sobre/index.html`: apresentação, retrato e histórico profissional.
- `public/contato/index.html`: contatos e redes profissionais.
- `public/style.css`: estilos comuns, fontes, responsividade e estilos herdados.
- `public/portfolio.css`: apresentação atual dos projetos, cabeçalhos e categorias recolhíveis.
- `public/portfolio.js`: abertura das categorias, navegação por âncoras e pausa de vídeos Vimeo ao recolher.
- `public/motion.js`: interações e animações presentes no código original.
- `public/assets/`: todas as imagens e demais recursos locais, inclusive os que foram preservados de versões anteriores.
- `public/projetos/`: compatibilidade com os antigos links individuais; redirecionam para os projetos na página principal.
- `public/gallery.js`, `public/projects.json` e `public/cases.json`: arquivos legados preservados por completude. **Não geram a página atual**; alguns dados refletem versões antigas. Edite `public/index.html` para mudar a galeria atual.
- `scripts/`: servidor local e verificação, ambos sem dependências.
- `vercel.json`: configuração da hospedagem estática.
- `EXPORTACAO.json`: origem e hashes dos arquivos para conferir a fidelidade da cópia.

## Fidelidade e dependências externas

Todos os arquivos em `public/` foram copiados byte a byte da versão publicada, incluindo imagens, CSS, JavaScript, links e HTML. O visual, os estados iniciais, as animações existentes e as regras de responsividade foram preservados no código. Não houve redesenho.

Os vídeos **não são arquivos MP4 dentro do ZIP**. Os players Vimeo e os projetos Behance continuam incorporados pelos mesmos endereços. Eles dependem de conexão com a internet, da disponibilidade dos serviços e das permissões de incorporação dos projetos. Se algum vídeo tiver restrição por domínio, autorize o novo domínio nas configurações do Vimeo. As fontes DM Sans e Manrope continuam carregando do Google Fonts, como no site original.

Esta exportação remove a dependência de hospedagem do ChatGPT, mas não transforma os conteúdos externos em arquivos offline. Não foram incluídos tokens, configurações privadas do Sites ou histórico Git.

## Outras hospedagens

Qualquer hospedagem estática que sirva diretórios com `index.html` pode receber o conteúdo de `public/`. Use `public` como diretório publicado e não configure fallback de SPA: este é um site de páginas estáticas. O projeto está preparado para domínio raiz (por exemplo, `https://danlopes.art.br/`), não para um subdiretório como `https://usuario.github.io/repositorio/` sem ajustes nos caminhos. GitHub é o repositório; Vercel é a hospedagem sugerida.

## Validação

Foram conferidos: igualdade dos arquivos com a origem, integridade do ZIP, referências locais das páginas, sintaxe JavaScript, 36 incorporações, cinco categorias inicialmente fechadas e redirecionamentos preservados. A reprodução dos serviços externos e o resultado visual em navegador não foram verificados nesta exportação.

Documentação de configuração Vercel: https://vercel.com/docs/project-configuration
