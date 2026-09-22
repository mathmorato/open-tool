# Diretrizes e Regras do Agente - Plataforma Open Tool (Multi-Ferramenta)

Estas diretrizes constituem autorização prévia para realizar todas as modificações necessárias no projeto, desde que estejam alinhadas ao contexto de uma **plataforma modular de ferramentas client-side** (100% local, compatível com GitHub Pages) e respeitem integralmente este documento.

---

## 1. Regra geral de execução

### 1.1 Execução autônoma
- Executar diretamente as alterações necessárias sem solicitar autorização prévia.
- Não interromper o fluxo para confirmar criação, edição ou deleção de arquivos tecnicamente necessários.
- Escolher a solução mais performática e estável com base na arquitetura web moderna (priorizando execução no navegador via WebAssembly/Web Workers).
- Corrigir automaticamente erros de tipagem, bugs de renderização ou falhas de conversão encontrados durante testes.
- A tarefa só é considerada concluída após validação funcional completa (upload, parsing, conversão, pré-visualização e exportação/cópia) **e** após verificar que a navegação entre ferramentas funciona sem erros.

### 1.2 Limite da autonomia
- **Privacidade absoluta:** É estritamente proibido adicionar chamadas a APIs externas ou servidores de backend que recebam dados do usuário. O processamento deve permanecer 100% local (Client-Side). Isso se aplica a **todas as ferramentas** da plataforma.
- Não descaracterizar a identidade visual técnica e limpa (paleta Branco, Azul Tech e suporte nativo a Dark Mode).
- Não inflar desnecessariamente o bundle final; preferir scripts assíncronos/dinâmicos para bibliotecas pesadas de parsing (ex: PDF.js, SheetJS, Mammoth, QRCode.js).
- Priorizar a preservação estrutural do Markdown de saída (tabelas legíveis, cabeçalhos hierárquicos, links preservados) nas ferramentas de conversão.

---

## 2. Identidade visual e design system

### 2.1 Paleta de cores e estética
A interface deve transmitir clareza técnica, precisão, agilidade e confiabilidade de software moderno para desenvolvedores e produtores de conteúdo.

#### Modo Claro (Light Mode)
- **Base e Superfícies:**
  - Fundo principal: Branco puro (`#FFFFFF`) e Slate Ultra-Claro (`#F8FAFC`).
  - Cards e áreas de soltura (Dropzones): Branco com bordas sutis em Slate suave (`#E2E8F0`).
- **Azul Corporativo/Tech (Ações, Destaques e Links):**
  - Azul Primário: Tom moderno e focado (`#2563EB` ou `#1D4ED8`).
  - Azul Interativo (Hover/Focus): `#1E40AF`.
  - Azul Suave (Fundos de destaque, badges, hover de lista): `#EFF6FF` ou `#DBEAFE`.
- **Textos e Contraste:**
  - Títulos e texto principal: Azul Petróleo Ultra-Escuro / Slate Profundo (`#0F172A`).
  - Textos de apoio e metadados: Slate Neutro (`#64748B`).

#### Modo Escuro (Dark Mode - Deep Navy / Slate)
- **Base e Superfícies (Proibido preto puro chapado #000000):**
  - Fundo principal: Deep Navy / Slate Noturno (`#0B0F19` ou `#0F172A`).
  - Cards, Dropzones e painel de preview: Slate Escuro Acetinado (`#1E293B`).
  - Bordas e divisores: Slate Noturno suave (`#334155`).
- **Azul Noturno (Ações e Destaques):**
  - Azul Primário Neon/Vibrante: Tom luminoso de alto contraste (`#3B82F6` ou `#60A5FA`).
  - Azul Interativo (Hover): `#93C5FD`.
  - Azul Fundo Sutil (Badges/Tags): `#172554` com opacidade.
- **Textos e Contraste:**
  - Títulos e texto principal: Branco Gelo (`#F8FAFC`).
  - Textos secundários: Cinza Claro Neutro (`#94A3B8`).

#### Cores de Estado e Feedback (Acessíveis em ambos os modos)
- **Sucesso (Arquivo convertido/Copiado):** Esmeralda (`#10B981` claro / `#34D399` escuro).
- **Processando / Atenção:** Âmbar suave (`#F59E0B`).
- **Erro (Falha de parsing ou formato inválido):** Coral avermelhado / Carmim (`#EF4444` / `#F87171`).

### 2.2 Suporte a temas (Dark/Light Mode)
- **Detecção automática:** Respeitar por padrão a preferência do sistema via `prefers-color-scheme`.
- **Alternância manual:** Botão de alternância (Toggle) persistente no cabeçalho com persistência em `localStorage`.
- **Acessibilidade:** Cumprir rigorosamente os parâmetros de contraste mínimo WCAG AA em ambos os modos.

### 2.3 Tipografia, componentes e layout
- **Tipografia:**
  - Interface geral: Sans-serif moderna e geométrica otimizada para telas (`Inter`, `Plus Jakarta Sans` ou `system-ui`).
  - Pré-visualização de Markdown e Blocos de Código: Monospaçada técnica de alta legibilidade (`JetBrains Mono`, `Fira Code` ou `ui-monospace`).
- **Componentes Centrais:**
  - **Tool Navbar:** Barra de navegação horizontal (tabs) sticky abaixo do topbar. Cada ferramenta tem um botão com ícone SVG linear e label.
  - **Tool Viewport:** Container onde o HTML de cada ferramenta é injetado dinamicamente com transição de fade.
  - **Padrão de Ícones:** Estritamente ícones de traço linear (`stroke-width="1.75"` ou `"2"`), `fill="none"` e terminações arredondadas (`stroke-linecap="round"`), como Lucide Icons ou Feather Icons. Proibido ícones chapados e pesados.

### 2.4 Diretriz mandatória de ergonomia: Layout Single-Viewport e Alinhamento Perfeito (Zero Scroll Desnecessário)
- **Princípio da Visão Única (Single-Viewport / Above the Fold):**
  - Todas as ferramentas da plataforma DEVEM ser projetadas para caber integralmente em uma única visualização de tela em desktops e notebooks comuns (resolução padrão de 1366x768 a 1920x1080), SEM exigir que o usuário role a página verticalmente para operar a ferramenta.
  - A altura total do container da ferramenta deve respeitar o espaço vertical disponível, eliminando barras de rolagem globais indesejadas na janela principal.
- **Alinhamento Simétrico e Casado entre Painéis (Topos e Bases Nivelados):**
  - O workspace de duas colunas (painel de controles/entrada à esquerda e painel de pré-visualização/saída à direita) deve adotar `align-items: stretch` ou alturas perfeitamente pareadas.
  - As linhas de topo e as linhas de base dos dois cards devem coincidir milimetricamente, criando um bloco visual harmônico e coeso (conforme padrão do Gerador de QR Code).
- **Densidade de Informação Inteligente e Controles Enxutos:**
  - Proibido empilhar controles verticais extensos com parágrafos descritivos prolixos que inflem a coluna.
  - Utilizar componentes compactos e modernos:
    - **Dropzones:** altura enxuta com ícone moderado (22–24px) e layout horizontal, recolhendo-se suavemente ao carregar o arquivo.
    - **Cards de Ajuste/Toggles:** linhas únicas e condensadas (ícone + título + status + botão de alternância/switch).
    - **Grids de Opções/Presets:** distribuição em múltiplas colunas (ex: grid 3x2) com rótulos concisos e microcópia, em vez de botões verticais altos em coluna única ou dupla.
    - **Configurações Avançadas:** agrupadas em acordeões colapsáveis (`<details>`) com campos dispostos em grid bidimensional quando expandidos.
- **Botão de Ação Primária (CTA) Permanentemente Visível:**
  - O botão de ação primária da ferramenta (ex: *Gerar QR Code*, *Vetorizar Imagem para SVG*, *Converter Documentos*) deve estar sempre visível imediatamente acima da dobra, sem requerer qualquer rolagem.
- **Painel de Visualização Auto-Ajustável:**
  - O palco de pré-visualização (`.stage`, `.canvas-wrap`, `.preview-panel`) deve empregar `flex: 1` e limites elásticos (`min-height`/`max-height`), permitindo que a imagem, vetor ou documento se auto-ajuste de forma responsiva ao espaço livre sem estourar o viewport.

---

## 3. Arquitetura técnica e processamento

### 3.1 Plataforma multi-ferramenta modular
- A plataforma deve rodar inteiramente no navegador via assets estáticos (HTML/CSS/JS), viabilizando deploy direto em **GitHub Pages** sem dependência de containers ou servidores intermediários.
- **Ponto de entrada:** `js/main.js` — bootstrap que inicializa o tema, a tool-navbar e o registry.
- **Registry:** `js/tool-registry.js` — catálogo central de ferramentas com carregamento lazy (`import()`).
- **Contrato de ferramenta:** Cada ferramenta em `js/tools/<id>/tool.js` deve exportar um objeto `default` com:
  - `id` (string): identificador único da ferramenta.
  - `label` (string): nome exibido na navbar.
  - `render(container)`: injeta o HTML da ferramenta no viewport.
  - `mount(container)`: inicializa lógica e event listeners.
  - `unmount()`: remove event listeners (cleanup).
- **Template HTML:** Cada ferramenta tem seu template em `js/tools/<id>/ui.js`.
- **CSS por ferramenta:** Estilos específicos em `css/tools/<id>.css`, carregados no `<head>` do `index.html`.

### 3.2 Ferramenta: Doc → MD (doc2md)
- Motor de conversão existente permanece em `js/app.js` e `js/parsers/`.
- O wrapper `js/tools/doc2md/tool.js` encapsula o `app.js` via `js/app-doc2md.js`.
- **Estratégia de módulos:** Word (`.docx`), Planilhas (`.xlsx`, `.csv`, `.ods`), Apresentações (`.pptx`), Documentos (`.pdf`).
- **Performance:** Arquivos pesados processados sem travar a thread principal (Web Workers).

### 3.3 Ferramenta: QR Code (qrcode)
- Geração 100% client-side via QRCode.js (CDN lazy).
- Entrada: URL ou texto livre.
- Opções: tamanho (128–1024px), cor do QR, cor do fundo, nível de correção de erro (L/M/Q/H).
- Saída: download PNG, download SVG, cópia para área de transferência.

### 3.4 Persistência e privacidade
- Nenhuma informação do usuário é enviada remotamente (documentos, URLs, textos).
- Configurações do usuário (tema, ferramenta ativa) são mantidas exclusivamente no `localStorage`.

---

## 4. Sistema de versionamento

- **Formato estrito SemVer:** `v.X.Y.Z` (onde `X` = Major, `Y` = Minor, `Z` = Patch).
- Versão atual da plataforma: `v.2.4.6`.
- **Locais obrigatórios de atualização a cada release:**
  1. Rodapé visível da interface principal (`index.html`).
  2. `js/config.js` — constante `APP_CONFIG.VERSION`.
  3. `package.json`.
  4. Cabeçalho de metadados do `README.md`.
- **Proibição expressa de destaques de versões no README:** O `README.md` deve permanecer limpo, atemporal e focado exclusivamente na documentação técnica. No `README.md`, apenas o badge e o cabeçalho de versão são atualizados.

---

## 5. Fluxo de execução e Git

- **Formato padrão de commit:** `v.X.Y.Z: descrição objetiva da alteração`
  - *Exemplo:* `v.2.0.0: remodelacao modular multi-ferramenta com qr code generator`
- **Sincronização:** Push automático para a branch de publicação (`main` / `gh-pages`).

---

## 6. Adição de novas ferramentas

Para adicionar uma nova ferramenta à plataforma:

1. **Criar a pasta:** `js/tools/<tool-id>/`
2. **Criar `tool.js`** implementando o contrato:
   ```js
   export default {
     id: 'nome-da-ferramenta',
     label: 'Nome Exibido',
     render(container) { /* injeta HTML */ },
     async mount(container) { /* inicializa lógica */ },
     unmount() { /* limpa listeners */ }
   }
   ```
3. **Criar `ui.js`** com a função `getXxxHTML()` retornando o template HTML.
4. **Criar `css/tools/<id>.css`** com estilos específicos e adicioná-lo ao `<head>` do `index.html`.
5. **Registrar no catálogo:** Adicionar entrada em `TOOL_CATALOG` no `js/tool-registry.js`.
6. **Respeitar as regras de privacidade:** Nenhuma ferramenta pode enviar dados do usuário para servidores externos.
7. **Bumpar a versão:** Mínimo `Minor` (`Y`) para nova ferramenta.

---

## 7. Comunicação ao final da execução

Ao término de qualquer intervenção no código, o agente deve responder estritamente no seguinte padrão estruturado:

1. **Versão:** `v.X.Y.Z`
2. **Alterações realizadas:** Tópicos sucintos destacando o que foi implementado, otimizado ou corrigido.
3. **Arquivos principais alterados:** Lista de caminhos relativos dos arquivos tocados.
4. **Validação funcional:** Relatório objetivo dos testes efetuados.
5. **Status do Git:** Mensagem do commit e confirmação do push.
