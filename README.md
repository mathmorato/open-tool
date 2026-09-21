# Open Tool `v.2.4.2`

[![Version](https://img.shields.io/badge/version-v.2.4.2-blue.svg)](package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Architecture: 100% Client--Side](https://img.shields.io/badge/Architecture-100%25%20Client--Side-informational.svg)](#-manifesto-de-segurança-e-privacidade-data-privacy-by-design)
[![Privacy: Zero Server Upload](https://img.shields.io/badge/Privacy-Zero%20Server%20Upload-green.svg)](#-manifesto-de-segurança-e-privacidade-data-privacy-by-design)
[![Deploy: GitHub Pages Ready](https://img.shields.io/badge/Deploy-GitHub%20Pages%20Ready-brightgreen.svg)](#-instruções-de-deploy-no-github-pages)

Uma plataforma web estática moderna, modular e universal de ferramentas **100% client-side**. Desenvolvida em Vanilla JavaScript com arquitetura orientada a componentes plugáveis (ES Modules), o **Open Tool** executa todas as rotinas diretamente no navegador do usuário, eliminando qualquer dependência de servidores de backend, contêineres ou transmissão remota de dados.

### 🌐 Acesso Online Imediato
Além da execução local, você pode utilizar a versão em produção diretamente pelo navegador (100% client-side, sem necessidade de instalar nada):
👉 **[Acessar Open Tool](https://mathmorato.github.io/open-tool/#)**

---

## 🛠️ Catálogo de Ferramentas Disponíveis

O Open Tool adota uma experiência visual unificada inspirada no modelo *PDF24 Tools*, com alternância instantânea entre utilitários e carregamento síncrono no navegador:

### 1. Hub de Ferramentas (`hub`)
* **Interface Geral:** Catálogo visual em grade de cards apresentando todas as ferramentas disponíveis na plataforma.
* **Informações Rápidas:** Badges de categorização, resumo de capacidades técnicas e botão de acesso direto.
* **Extensibilidade Modular:** Ponto central de integração que reflete automaticamente novas ferramentas plugadas ao sistema.

### 2. Doc → MD (`doc2md`)
* **Conversor Universal:** Converte documentos de texto, planilhas matriciais, apresentações, PDFs e código-fonte em Markdown estruturado.
* **Processamento Concorrente:** Fila de lote gerenciada com suporte a pacotes compactados (`.zip`, `.rar`, `.7z`, `.tar`, `.gz`, `.bz2`) e paralelismo via Web Workers.
* **Exportação Flexível:** Download individual, download unificado (mesclado) ou cópia instantânea para a área de transferência.

### 3. Gerador de QR Code (`qrcode`)
* **Geração Local Instantânea:** Codifica links web (URLs) ou texto livre diretamente em canvas e SVG vetorial.
* **Personalização Completa:** Controle de dimensão (128 px a 1024 px), cores personalizadas para módulos e fundo, e 4 níveis de correção de erro (L — 7%, M — 15%, Q — 25%, H — 30%).
* **Colagem Inteligente:** Botão de colagem rápida com integração à Clipboard API e detecção em tempo real de URLs válidas.
* **Exportação Dupla:** Baixe como imagem PNG de alta resolução ou arquivo SVG escalável.

### 4. Image to Vector (`img2vector`)
* **Vetorização Raster para SVG:** Converte imagens rasterizadas (`.png`, `.jpg`, `.jpeg`, `.webp`, `.bmp`, `.gif`) em caminhos vetoriais escaláveis `<path>` com curvas Bézier cúbicas e quadráticas.
* **Remoção Inteligente de Fundo:** Isolamento e recorte do fundo externo via algoritmo de inundação perimétrica (flood-fill BFS com detecção de bordas e tolerância regulável), preservando elementos internos e gerando vetores transparentes.
* **Presets Otimizados:** Perfis pré-definidos para *Logotipo / P&B* (2 cores nítidas), *Equilibrado* (ilustrações), *Alta Fidelidade* (detalhes finos), *Curvas Suaves*, *Posterizado* e *Escala de Cinza*.
* **Ajustes Finos:** Quantização de cores (2 a 64 cores), redução de ruído (filtro de mediana/suavização) e omissão de speckles.
* **Palco Comparativo:** Visualização do vetor SVG, da imagem original ou comparação lado a lado, com controle de zoom (50% a 300%) e métricas de caminhos e bytes.
* **Exportação:** Download do arquivo `.svg` e cópia direta do código-fonte XML para a área de transferência.

### 5. Desbloquear PDF (`pdf-unlock`)
* **Descriptografia Client-Side:** Desbloqueia arquivos PDF criptografados diretamente na memória do navegador utilizando o motor `pdf-lib`.
* **Remoção de Restrições:** Elimina travas de permissão do proprietário (edição, impressão e cópia de texto) e descriptografa PDFs protegidos por senha do usuário com campo de entrada dedicado.
* **Pré-visualização e Métricas:** Renderização imediata da primeira página via canvas (`pdf.js`) e exibição de metadados técnicos (contagem de páginas e status de proteção).
* **Exportação:** Download direto do arquivo PDF totalmente liberado e sem restrições.

### 6. Comprimir PDF (`pdf-compress`)
* **Compressão em 3 Níveis:** Reamostragem raster e otimização por canvas com presets balanceados:
  * *Extrema (72 DPI)*: Máxima redução de tamanho, ideal para anexos de e-mail e formulários com limites estritos.
  * *Balanceada (100 DPI)*: Equilíbrio perfeito entre redução de bytes e legibilidade visual de documentos.
  * *Suave (150 DPI)*: Alta nitidez com compressão moderada de imagens.
* **Telemetria em Tempo Real:** Card com telemetria precisa calculando o tamanho original, tamanho final comprimido e percentual de economia de espaço alcançado.
* **Visualização da Página 1:** Renderização dinâmica comparativa da página inicial no viewport.

### 7. Mesclar PDF (`pdf-merge`)
* **Fusão Sequencial de Múltiplos Arquivos:** Concatena múltiplos arquivos PDF em um único documento padronizado e ordenado via `pdf-lib`.
* **Fila Interativa:** Dropzone para adicionar arquivos em lote ou individualmente, com exibição de páginas por documento e reordenação instantânea (botões Subir, Descer e Remover).
* **Pré-visualização Dinâmica:** Exibição imediata da capa do documento resultante na coluna de pré-visualização.
* **Geração Rápida:** Montagem e download instantâneo do PDF unificado em milissegundos sem qualquer transmissão de dados.

### 8. Dividir PDF (`pdf-split`)
* **Divisão Multimodo Flexível:** Quatro estratégias de particionamento adaptadas a qualquer fluxo de trabalho:
  * *Por Intervalos*: Separação por faixas customizadas (ex: `1-3, 4-6, 7-10` ou `1-2, 3-5`).
  * *Extrair Páginas*: Seleção cirúrgica de páginas (ex: `1, 3, 5`) unificadas em um único PDF novo.
  * *Todas as Páginas*: Desmembramento completo gerando 1 arquivo PDF por página em um pacote `.zip`.
  * *A cada N Páginas*: Divisão em blocos fixos de páginas (ex: a cada 2 páginas).
* **Pacote Compactado Automático (.ZIP):** Quando múltiplos arquivos são produzidos, o sistema empacota tudo em um único `.zip` organizado via `JSZip` client-side.
* **Pré-visualização em Tempo Real:** Renderização imediata da primeira página extraída e cálculo da contagem de arquivos e páginas.

---

## 📊 Matriz Universal de Formatos Suportados (Doc → MD)

O motor documental combina parsers especializados com fallback heurístico para decodificação textual em UTF-8:

| Categoria | Extensões Suportadas | Motor Técnico de Conversão | Estrutura de Saída Markdown |
| :--- | :--- | :--- | :--- |
| **Documentos de Texto** | `.docx`, `.odt`, `.rtf` | Mammoth.js + Turndown Service + DOMParser | Títulos (`#` a `######`), parágrafos, listas ordenadas/não-ordenadas, ênfases (`*itálico*`, `**negrito**`), tabelas e hiperlinks. |
| **Planilhas & Matrizes** | `.xlsx`, `.xls`, `.csv`, `.tsv`, `.ods` | SheetJS (xlsx.full.min.js) | Matrizes tabulares com cabeçalhos estruturados e alinhamento padronizado (`\| coluna \|`). Múltiplas abas convertidas em seções dedicadas. |
| **Apresentações** | `.pptx`, `.odp` | JSZip + DOMParser XML | Extração hierárquica slide a slide (`# Slide N`), tópicos em listas e anotações do apresentador. |
| **Documentos Fechados** | `.pdf`, `.epub` | PDF.js (Mozilla) | Fluxo contínuo de texto, preservação de quebras de parágrafo, paginação semântica e blocos destacados. |
| **Marcação & Dados** | `.html`, `.htm`, `.xml`, `.json`, `.yaml`, `.yml`, `.svg` | Turndown + Prettifier Nativo | Elementos semânticos convertidos para sintaxe Markdown; dados estruturados organizados em blocos de código (`json`, `yaml`). |
| **Código-Fonte & Scripts** | `.js`, `.ts`, `.py`, `.java`, `.c`, `.cpp`, `.cs`, `.go`, `.rs`, `.php`, `.rb`, `.sql`, `.sh`, etc. | TextDecoder UTF-8 | Blocos de código cercados (fenced code blocks) com indicação automática de sintaxe para LLMs e editores. |
| **Texto Puro & Configurações** | `.txt`, `.md`, `.markdown`, `.log`, `.ini`, `.env`, `.toml` | Leitor Nativo UTF-8 | Higienização de quebras de linha (CRLF -> LF) e formatação original preservada. |
| **Fallback Universal** | Qualquer arquivo de texto válido | Heurística de decodificação UTF-8 | Detecção dinâmica e conversão direta para bloco Markdown higienizado. |

---

## 🔒 Manifesto de Segurança e Privacidade (Data Privacy by Design)

O **Open Tool** foi arquitetado sob o princípio rigoroso de soberania e privacidade total dos dados do usuário:

1. **Execução 100% Client-Side:** Toda a lógica de processamento de arquivos, geração de QR codes e vetorização executa no sandbox do motor JavaScript do navegador (`V8`, `SpiderMonkey`, `JavaScriptCore`).
2. **Zero Envio de Dados:** Nenhum documento, texto, URL digitada ou imagem trafega por servidores centrais ou serviços de nuvem. A aplicação opera perfeitamente em redes fechadas (*Air-Gapped*) e em modo offline.
3. **Telemetria Zero:** Sem analytics invasivos, rastreadores de terceiros ou identificadores persistentes. As bibliotecas são mantidas localmente no repositório.
4. **Ciclo de Vida Efêmero em Memória:** Os buffers de imagem e strings processadas residem estritamente na memória volátil da sessão. Ao navegar ou recarregar a aba, os recursos são desalocados pelo *Garbage Collector*.
5. **Conformidade com Privacidade:** Alinhado aos padrões mais rígidos de proteção de dados (LGPD, GDPR e políticas internas de segurança da informação).

---

## 📁 Estrutura do Repositório (Arquitetura Modular)

```
open-tool/
├── index.html                   # Estrutura base da aplicação SPA e Navbar de ferramentas
├── package.json                 # Metadados do projeto e scripts de automação
├── package-lock.json            # Travamento determinístico de dependências
├── LICENSE                      # Termos da licença open-source MIT
├── README.md                    # Documentação técnica integral da plataforma
├── favicon.svg                  # Ícone vetorial da marca
├── css/
│   ├── styles.css               # Design system global, variáveis e temas Claro/Escuro
│   └── tools/                   # Folhas de estilo modulares por ferramenta
│       ├── hub.css              # Estilos do catálogo visual estilo PDF24
│       ├── qrcode.css           # Estilos específicos do gerador de QR Code
│       ├── img2vector.css       # Estilos específicos do vetorizador de imagens
│       ├── pdf-unlock.css       # Estilos específicos do desbloqueador de PDF
│       ├── pdf-compress.css     # Estilos específicos do compressor de PDF
│       ├── pdf-merge.css        # Estilos específicos do mesclador de PDF
│       └── pdf-split.css        # Estilos específicos do divisor de PDF
├── js/
│   ├── config.js                # Configurações globais, mapa de MIME types e SemVer
│   ├── main.js                  # Ponto de entrada (bootstrap) e inicialização de temas
│   ├── tool-registry.js         # Catálogo central de roteamento e ciclo de vida das ferramentas
│   ├── bundle.js                # Bundle compilado de produção para alta performance
│   ├── bundle-entry.js          # Ponto de entrada para empacotamento com esbuild
│   ├── app.js                   # Motor principal do Doc → MD e gerenciador da fila
│   ├── app-doc2md.js            # Bridge de compatibilidade do Doc → MD
│   ├── lib/                     # Bibliotecas locais 100% offline
│   │   ├── qrcodegen.js         # Motor Nayuki QR Code Generator
│   │   ├── imagetracer.js       # Motor ImageTracer para vetorização raster → SVG
│   │   ├── pdf-lib.min.js       # Motor pdf-lib para manipulação/desbloqueio/compressão/fusão PDF
│   │   └── jszip.min.js         # Motor JSZip para empacotamento compactado local
│   ├── tools/                   # Módulos plugáveis de ferramentas
│   │   ├── hub/                 # Ferramenta: Vitrine / Catálogo de ferramentas
│   │   │   ├── tool.js          # Controlador do Hub
│   │   │   └── ui.js            # Template HTML dos cards
│   │   ├── doc2md/              # Ferramenta: Conversor documental para Markdown
│   │   │   ├── tool.js          # Wrapper de ciclo de vida
│   │   │   └── ui.js            # Template HTML da dropzone e fila
│   │   ├── qrcode/              # Ferramenta: Gerador de QR Code
│   │   │   ├── tool.js          # Controlador e renderizador de canvas/SVG
│   │   │   └── ui.js            # Template HTML dos controles
│   │   ├── img2vector/          # Ferramenta: Image to Vector
│   │   │   ├── tool.js          # Controlador de quantização e curvas Bézier
│   │   │   └── ui.js            # Template HTML de upload, presets e palco
│   │   ├── pdf-unlock/          # Ferramenta: Desbloqueador de PDF
│   │   │   ├── tool.js          # Descriptografia e remoção de restrições com pdf-lib
│   │   │   └── ui.js            # Template HTML e métricas
│   │   ├── pdf-compress/        # Ferramenta: Compressor de PDF
│   │   │   ├── tool.js          # Reamostragem raster por DPI e otimização JPEG
│   │   │   └── ui.js            # Template HTML com presets de DPI e telemetria
│   │   ├── pdf-merge/           # Ferramenta: Mesclador de PDF
│   │   │   ├── tool.js          # Fusão sequencial de páginas com pdf-lib
│   │   │   └── ui.js            # Template HTML de ordenação e fila
│   │   └── pdf-split/           # Ferramenta: Divisor de PDF
│   │       ├── tool.js          # Particionamento por intervalos/páginas com pdf-lib e JSZip
│   │       └── ui.js            # Template HTML com modos de divisão e palco
│   ├── parsers/                 # Parsers especializados do Doc → MD
│   │   ├── docx-parser.js       # Mammoth + Turndown para DOCX/ODT
│   │   ├── xlsx-parser.js       # SheetJS para planilhas e tabelas
│   │   ├── pptx-parser.js       # JSZip para apresentações PPTX
│   │   ├── pdf-parser.js        # PDF.js para documentos PDF
│   │   └── text-parser.js       # Decodificador UTF-8 para texto e código
│   └── workers/
│       └── converter-worker.js  # Web Worker para processamento assíncrono em background
└── test/
    └── validate-parsers.js      # Validador de integridade, arquivos e regras SemVer
```

---

## 🛠️ Guia de Instalação e Execução Local

Como se trata de uma Single Page Application com carregamento de módulos e scripts estáticos, recomenda-se servi-la via HTTP local:

### 1. Clonar o repositório
```bash
git clone https://github.com/mathmorato/open-tool.git
cd open-tool
```

### 2. Executar via servidor estático (escolha uma das opções)

**Opção A — Usando Node.js / npx serve:**
```bash
npx serve . -l 3000
```

**Opção B — Usando Python 3:**
```bash
python -m http.server 3000
```

**Opção C — Usando a extensão Live Server (VS Code / Antigravity IDE):**
Clique com o botão direito em `index.html` e selecione **Open with Live Server**.

### 3. Acessar a aplicação
Abra o navegador no endereço `http://localhost:3000` (ou na porta indicada no seu terminal).

---

## 🌐 Instruções de Deploy no GitHub Pages

O projeto está totalmente preparado para publicação contínua e direta via GitHub Pages:

1. Acesse o seu repositório no GitHub e clique na aba **Settings**.
2. No menu lateral esquerdo, selecione **Pages**.
3. Na seção **Build and deployment > Source**, escolha **Deploy from a branch**.
4. Em **Branch**, selecione `main` e a pasta `/ (root)`.
5. Clique em **Save**. Em instantes, sua instância estará ativa e pronta para uso em:
   `https://<seu-usuario>.github.io/open-tool/`

---

## 🏷️ Licença e Versionamento SemVer

* **Controle SemVer:** O projeto segue o padrão [Semantic Versioning 2.0.0](https://semver.org/). A versão atual é **`v.2.4.1`**, sincronizada em todos os pontos de governança:
  1. Interface principal (`index.html`).
  2. Arquivo `package.json` (`"version": "2.4.1"`).
  3. Constante `APP_CONFIG.VERSION` em `js/config.js`.
  4. Badges e cabeçalho deste `README.md`.
* **Licença de Uso:** Distribuído sob os termos da licença **MIT**. Para maiores detalhes, consulte o arquivo [LICENSE](LICENSE).
