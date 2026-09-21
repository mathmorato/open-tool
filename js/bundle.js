(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // js/config.js
  function loadScript(src) {
    if (typeof document === "undefined") {
      return Promise.resolve();
    }
    if (loadedScripts.has(src)) {
      return loadedScripts.get(src);
    }
    const promise = new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        if (existing.dataset.loaded === "true") return resolve();
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", (err) => reject(err));
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = () => {
        script.dataset.loaded = "true";
        resolve();
      };
      script.onerror = (e) => reject(new Error(`Falha ao carregar biblioteca: ${src}`));
      document.head.appendChild(script);
    });
    loadedScripts.set(src, promise);
    return promise;
  }
  function getDynamicConcurrency(queueOrLength) {
    const count = typeof queueOrLength === "number" ? queueOrLength : Array.isArray(queueOrLength) ? queueOrLength.length : 0;
    if (count > (APP_CONFIG.CONCURRENCY?.HIGH_VOLUME_THRESHOLD || 20)) {
      return APP_CONFIG.CONCURRENCY?.HIGH_VOLUME || 1e3;
    }
    return APP_CONFIG.CONCURRENCY?.DEFAULT || 4;
  }
  var CODE_EXTENSIONS_MAP, SUPPORTED_EXTENSIONS, MIME_TYPE_MAP, APP_CONFIG, loadedScripts, ERROR_CATALOG;
  var init_config = __esm({
    "js/config.js"() {
      CODE_EXTENSIONS_MAP = {
        // Web & Frontend
        "js": "javascript",
        "mjs": "javascript",
        "cjs": "javascript",
        "ts": "typescript",
        "tsx": "tsx",
        "jsx": "jsx",
        "html": "html",
        "htm": "html",
        "xhtml": "html",
        "css": "css",
        "scss": "scss",
        "sass": "sass",
        "less": "less",
        "styl": "stylus",
        "vue": "vue",
        "svelte": "svelte",
        "astro": "astro",
        // Computação Científica, Numérica & Estatística
        "m": "matlab",
        "matlab": "matlab",
        "octave": "matlab",
        "r": "r",
        "rmd": "r",
        "jl": "julia",
        "f": "fortran",
        "for": "fortran",
        "f90": "fortran",
        "f95": "fortran",
        "nb": "mathematica",
        "wl": "wolfram",
        // Scripts, Embeds, Jogos & Automação
        "lua": "lua",
        "py": "python",
        "pyw": "python",
        "ipynb": "json",
        "rb": "ruby",
        "rake": "ruby",
        "gemspec": "ruby",
        "php": "php",
        "phtml": "php",
        "pl": "perl",
        "pm": "perl",
        "t": "perl",
        "tcl": "tcl",
        "awk": "awk",
        "sed": "sed",
        // Sistemas, Baixo Nível & Alta Performance
        "c": "c",
        "h": "c",
        "cpp": "cpp",
        "hpp": "cpp",
        "cc": "cpp",
        "cxx": "cpp",
        "hxx": "cpp",
        "rs": "rust",
        "go": "go",
        "zig": "zig",
        "nim": "nim",
        "d": "d",
        "pas": "pascal",
        "pp": "pascal",
        "inc": "pascal",
        "ada": "ada",
        "adb": "ada",
        "ads": "ada",
        "asm": "assembly",
        "s": "assembly",
        "nasm": "assembly",
        // JVM & .NET
        "java": "java",
        "class": "text",
        "kt": "kotlin",
        "kts": "kotlin",
        "scala": "scala",
        "sc": "scala",
        "groovy": "groovy",
        "gvy": "groovy",
        "cs": "csharp",
        "csx": "csharp",
        "fs": "fsharp",
        "fsi": "fsharp",
        "fsx": "fsharp",
        "vb": "vbnet",
        "vbs": "vbscript",
        // Funcionais, Lisp & Concorrência
        "hs": "haskell",
        "lhs": "haskell",
        "ex": "elixir",
        "exs": "elixir",
        "erl": "erlang",
        "hrl": "erlang",
        "clj": "clojure",
        "cljs": "clojure",
        "edn": "clojure",
        "ml": "ocaml",
        "mli": "ocaml",
        "lisp": "lisp",
        "lsp": "lisp",
        "cl": "lisp",
        "scm": "scheme",
        "ss": "scheme",
        "rkt": "racket",
        "elm": "elm",
        "purs": "purescript",
        "gleam": "gleam",
        // Mobile & Multiplataforma
        "swift": "swift",
        "dart": "dart",
        // Shell, DevOps, Infra & Contêineres
        "sh": "bash",
        "bash": "bash",
        "zsh": "bash",
        "fish": "fish",
        "ps1": "powershell",
        "psm1": "powershell",
        "bat": "bat",
        "cmd": "bat",
        "dockerfile": "dockerfile",
        "containerfile": "dockerfile",
        "makefile": "makefile",
        "mk": "makefile",
        "cmake": "cmake",
        "tf": "terraform",
        "hcl": "hcl",
        "nix": "nix",
        // Bancos de Dados & Consultas
        "sql": "sql",
        "psql": "sql",
        "plsql": "sql",
        "tsql": "sql",
        "cql": "cql",
        "prisma": "prisma",
        "graphql": "graphql",
        "gql": "graphql",
        // Hardware, Shaders & Web3
        "v": "verilog",
        "sv": "systemverilog",
        "vhd": "vhdl",
        "vhdl": "vhdl",
        "glsl": "glsl",
        "vert": "glsl",
        "frag": "glsl",
        "hlsl": "hlsl",
        "wgsl": "wgsl",
        "sol": "solidity",
        // Linguagens Históricas
        "cob": "cobol",
        "cbl": "cobol",
        "fth": "forth",
        "forth": "forth",
        "bas": "basic",
        // Serialização, Configuração & Metadados
        "json": "json",
        "json5": "json5",
        "jsonc": "jsonc",
        "yaml": "yaml",
        "yml": "yaml",
        "toml": "toml",
        "ini": "ini",
        "cfg": "ini",
        "conf": "ini",
        "xml": "xml",
        "xsd": "xml",
        "xsl": "xml",
        "svg": "xml",
        "proto": "protobuf",
        "env": "bash"
      };
      SUPPORTED_EXTENSIONS = {
        // Documentos
        "docx": { category: "document", label: "Word (.docx)", parser: "docx" },
        "odt": { category: "document", label: "OpenDocument (.odt)", parser: "docx" },
        "rtf": { category: "text", label: "Rich Text (.rtf)", parser: "text", lang: "plaintext" },
        // Planilhas & Matrizes
        "xlsx": { category: "spreadsheet", label: "Excel (.xlsx)", parser: "xlsx" },
        "xls": { category: "spreadsheet", label: "Excel 97-2004 (.xls)", parser: "xlsx" },
        "csv": { category: "spreadsheet", label: "CSV (.csv)", parser: "xlsx" },
        "tsv": { category: "spreadsheet", label: "TSV (.tsv)", parser: "xlsx" },
        "ods": { category: "spreadsheet", label: "OpenDocument (.ods)", parser: "xlsx" },
        // Apresentações
        "pptx": { category: "presentation", label: "PowerPoint (.pptx)", parser: "pptx" },
        "odp": { category: "presentation", label: "OpenDocument (.odp)", parser: "pptx" },
        // Documentos Fechados
        "pdf": { category: "pdf", label: "PDF (.pdf)", parser: "pdf" },
        // Serialização, Configuração & Dados
        "yaml": { category: "code", label: "YAML", parser: "text", lang: "yaml" },
        "yml": { category: "code", label: "YAML", parser: "text", lang: "yaml" },
        "json": { category: "text", label: "JSON", parser: "text", lang: "json" },
        "json5": { category: "text", label: "JSON5", parser: "text", lang: "json" },
        "jsonc": { category: "text", label: "JSON with Comments", parser: "text", lang: "json" },
        "xml": { category: "text", label: "XML", parser: "text", lang: "xml" },
        "toml": { category: "code", label: "TOML", parser: "code", lang: "toml" },
        "ini": { category: "code", label: "INI", parser: "code", lang: "ini" },
        "cfg": { category: "code", label: "Config", parser: "code", lang: "ini" },
        "conf": { category: "code", label: "Config", parser: "code", lang: "ini" },
        // Texto & Marcação
        "html": { category: "text", label: "HTML", parser: "text", lang: "html" },
        "htm": { category: "text", label: "HTML", parser: "text", lang: "html" },
        "xhtml": { category: "text", label: "XHTML", parser: "text", lang: "html" },
        "md": { category: "text", label: "Markdown", parser: "text", lang: "markdown" },
        "markdown": { category: "text", label: "Markdown", parser: "text", lang: "markdown" },
        "txt": { category: "text", label: "Texto Puro", parser: "text", lang: "plaintext" },
        "log": { category: "text", label: "Log", parser: "text", lang: "plaintext" }
      };
      MIME_TYPE_MAP = {
        "application/x-yaml": "yaml",
        "text/yaml": "yaml",
        "text/x-yaml": "yaml",
        "application/yaml": "yaml",
        "application/json": "json",
        "text/html": "html",
        "text/plain": "txt",
        "text/markdown": "md",
        "text/x-markdown": "md",
        "text/xml": "xml",
        "application/xml": "xml",
        "application/rtf": "rtf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
        "application/vnd.ms-excel": "xls",
        "text/csv": "csv",
        "text/tab-separated-values": "tsv",
        "application/vnd.oasis.opendocument.spreadsheet": "ods",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
        "application/pdf": "pdf",
        "application/javascript": "js",
        "text/javascript": "js",
        "application/typescript": "ts",
        "text/x-python": "py",
        "text/x-c": "c",
        "text/x-c++": "cpp",
        "text/x-shellscript": "sh",
        "application/zip": "zip",
        "application/x-zip-compressed": "zip",
        "application/x-rar-compressed": "rar"
      };
      APP_CONFIG = {
        VERSION: "v.2.0.1",
        APP_NAME: "Open Tool",
        TAGLINE: "Open Tool \u2022 Ferramentas Universais 100% Client-Side",
        REPO_URL: "https://github.com/mathmorato/open-tool",
        // Limite máximo rígido de tamanho por arquivo (1,5 GB = 1.610.612.736 bytes)
        MAX_FILE_SIZE_BYTES: 1.5 * 1024 * 1024 * 1024,
        // 1.5 GB = 1.610.612.736 bytes
        // Configurações de Concorrência do Pipeline de Lote
        CONCURRENCY: {
          DEFAULT: 4,
          // Pool moderado para poucos arquivos (<= 20)
          HIGH_VOLUME_THRESHOLD: 20,
          // Ponto de corte para escalonamento automático
          HIGH_VOLUME: 1e3
          // Pool agressivo para alto volume e descompactação (até 1000 simultâneos)
        },
        // Chaves de persistência no LocalStorage
        STORAGE_KEYS: {
          THEME: "doc2md_theme",
          // 'dark' | 'light' | 'system'
          VIEW_MODE: "doc2md_view_mode",
          // 'split' | 'raw' | 'preview'
          LINE_WRAPPING: "doc2md_line_wrapping",
          // true | false
          PRESERVE_HEADING_IDS: "doc2md_preserve_headings",
          MERGE_MARKDOWN: "doc2md_merge_markdown"
        },
        // CDN URLs para carregamento assíncrono sob demanda (Zero overhead inicial)
        CDN: {
          MAMMOTH: "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.8.0/mammoth.browser.min.js",
          TURNDOWN: "https://cdnjs.cloudflare.com/ajax/libs/turndown/7.2.0/turndown.min.js",
          TURNDOWN_GFM: "https://cdn.jsdelivr.net/npm/turndown-plugin-gfm@1.0.2/dist/turndown-plugin-gfm.min.js",
          SHEETJS: "https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js",
          JSZIP: "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",
          PDFJS: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
          PDFJS_WORKER: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js",
          MARKED: "https://cdn.jsdelivr.net/npm/marked@12.0.2/marked.min.js",
          DOMPURIFY: "https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.1.5/purify.min.js"
        },
        // Pacotes compactados suportados para extração automática client-side em memória
        ARCHIVE_EXTENSIONS: [".zip", ".rar", ".7z", ".tar", ".gz", ".bz2"],
        // Formatos binários conhecidamente não suportados (rejeição rápida com orientação clara)
        UNSUPPORTED_BINARY_EXTENSIONS: [
          ".exe",
          ".bin",
          ".dll",
          ".iso",
          ".dmg",
          ".apk",
          ".app",
          ".msi",
          ".mp3",
          ".wav",
          ".ogg",
          ".flac",
          ".mp4",
          ".avi",
          ".mov",
          ".mkv",
          ".png",
          ".jpg",
          ".jpeg",
          ".gif",
          ".webp",
          ".svg",
          ".ico",
          ".psd"
        ],
        // Formatos suportados e metadados
        SUPPORTED_FORMATS: {
          docx: {
            ext: [".docx"],
            mime: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
            name: "Word (.docx)",
            category: "document",
            parser: "docx"
          },
          sheet: {
            ext: [".xlsx", ".xls", ".csv", ".tsv", ".ods"],
            mime: [
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              "application/vnd.ms-excel",
              "text/csv",
              "text/tab-separated-values",
              "application/vnd.oasis.opendocument.spreadsheet"
            ],
            name: "Planilhas (.xlsx, .csv, .tsv, .ods)",
            category: "spreadsheet",
            parser: "xlsx"
          },
          presentation: {
            ext: [".pptx"],
            mime: ["application/vnd.openxmlformats-officedocument.presentationml.presentation"],
            name: "Apresenta\xE7\xE3o (.pptx)",
            category: "presentation",
            parser: "pptx"
          },
          pdf: {
            ext: [".pdf"],
            mime: ["application/pdf"],
            name: "PDF (.pdf)",
            category: "pdf",
            parser: "pdf"
          },
          text: {
            ext: [".txt", ".json", ".html", ".htm", ".rtf", ".xml", ".md", ".markdown", ".log", ".yaml", ".yml"],
            mime: [
              "text/plain",
              "application/json",
              "text/html",
              "application/rtf",
              "text/xml",
              "text/markdown",
              "application/x-yaml",
              "text/yaml",
              "text/x-yaml",
              "application/yaml"
            ],
            name: "Texto / YAML / Dados (.txt, .json, .html, .rtf, .md, .yaml, .yml)",
            category: "text",
            parser: "text"
          },
          code: {
            ext: Object.keys(CODE_EXTENSIONS_MAP).map((ext) => "." + ext),
            name: "C\xF3digo-Fonte / Scripts",
            category: "code",
            parser: "code"
          }
        }
      };
      loadedScripts = /* @__PURE__ */ new Map();
      ERROR_CATALOG = {
        FILE_TOO_LARGE: "Arquivo excede o limite m\xE1ximo permitido de 1,5 GB.",
        EMPTY_FILE: "Arquivo vazio (0 bytes).",
        PARSER_NOT_FOUND: "Formato n\xE3o suportado ou parser indispon\xEDvel.",
        PARSING_FAILED: "Erro de convers\xE3o: falha na extra\xE7\xE3o de dados do documento.",
        CORRUPTED_ARCHIVE: "Pacote compactado corrompido ou protegido por senha.",
        TIMEOUT: "Tempo de processamento excedido.",
        UNKNOWN: "Erro de convers\xE3o inesperado."
      };
    }
  });

  // js/parsers/docx-parser.js
  function getTurndownService() {
    if (turndownServiceInstance) return turndownServiceInstance;
    const TurndownClass = typeof window !== "undefined" && window.TurndownService || globalThis.TurndownService;
    if (!TurndownClass) {
      throw new Error("TurndownService n\xE3o carregado.");
    }
    const service = new TurndownClass({
      headingStyle: "atx",
      hr: "---",
      bulletListMarker: "-",
      codeBlockStyle: "fenced",
      emDelimiter: "*"
    });
    const gfmPlugin = typeof window !== "undefined" && window.turndownPluginGfm || globalThis.turndownPluginGfm;
    if (gfmPlugin) {
      service.use(gfmPlugin.gfm);
      service.use(gfmPlugin.tables);
    }
    turndownServiceInstance = service;
    return service;
  }
  async function parseDocx(file, onProgress = null) {
    if (typeof onProgress === "function") {
      onProgress(20, "Carregando Mammoth.js & Turndown...");
    }
    await Promise.all([
      loadScript(APP_CONFIG.CDN.MAMMOTH),
      loadScript(APP_CONFIG.CDN.TURNDOWN),
      loadScript(APP_CONFIG.CDN.TURNDOWN_GFM).catch(() => console.warn("GFM plugin fallback"))
    ]);
    if (typeof onProgress === "function") {
      onProgress(50, "Extraindo XML estruturado...");
    }
    const Mammoth = typeof window !== "undefined" && window.mammoth || globalThis.mammoth;
    if (!Mammoth) {
      throw new Error("N\xE3o foi poss\xEDvel inicializar Mammoth.js para documentos Word.");
    }
    const arrayBuffer = await file.arrayBuffer();
    const options = {
      styleMap: [
        "p[style-name='Heading 1'] => h1:fresh",
        "p[style-name='Heading 2'] => h2:fresh",
        "p[style-name='Heading 3'] => h3:fresh",
        "p[style-name='Heading 4'] => h4:fresh",
        "p[style-name='Title'] => h1:fresh",
        "p[style-name='Subtitle'] => p > em:fresh"
      ]
    };
    const input = {
      arrayBuffer,
      buffer: typeof Buffer !== "undefined" ? Buffer.from(arrayBuffer) : typeof Uint8Array !== "undefined" ? new Uint8Array(arrayBuffer) : arrayBuffer
    };
    const result = await Mammoth.convertToHtml(input, options);
    const rawHtml = result.value;
    if (typeof onProgress === "function") {
      onProgress(85, "Compilando Markdown sem\xE2ntico...");
    }
    if (!rawHtml || !rawHtml.trim()) {
      return `# ${file.name.replace(/\.docx$/i, "")}

*(Documento vazio ou sem conte\xFAdo textual detect\xE1vel)*
`;
    }
    const turndown = getTurndownService();
    let markdown = turndown.turndown(rawHtml);
    markdown = markdown.replace(/\n{3,}/g, "\n\n").trim();
    if (!markdown.startsWith("#")) {
      const docTitle = file.name.replace(/\.docx$/i, "");
      markdown = `# ${docTitle}

${markdown}`;
    }
    return markdown;
  }
  var turndownServiceInstance;
  var init_docx_parser = __esm({
    "js/parsers/docx-parser.js"() {
      init_config();
      turndownServiceInstance = null;
    }
  });

  // js/parsers/xlsx-parser.js
  function matrixToMarkdownTable(matrix) {
    if (!matrix || matrix.length === 0) return "*(Sem dados tabularizados)*\n";
    const cleanedRows = matrix.filter((row) => Array.isArray(row) && row.some((cell) => cell !== "" && cell !== null && cell !== void 0));
    if (cleanedRows.length === 0) return "*(Planilha vazia)*\n";
    let maxCols = 0;
    cleanedRows.forEach((row) => {
      if (row.length > maxCols) maxCols = row.length;
    });
    if (maxCols === 0) return "*(Planilha vazia)*\n";
    const normalizedRows = cleanedRows.map((row) => {
      const fullRow = [];
      for (let c = 0; c < maxCols; c++) {
        let val = c < row.length && row[c] !== null && row[c] !== void 0 ? String(row[c]) : "";
        val = val.replace(/\|/g, "\\|").replace(/\r?\n/g, "<br>").trim();
        fullRow.push(val);
      }
      return fullRow;
    });
    const headerRow = normalizedRows[0];
    const headerMd = "| " + headerRow.map((cell, idx) => cell || `Coluna ${idx + 1}`).join(" | ") + " |";
    const separatorMd = "| " + new Array(maxCols).fill("---").join(" | ") + " |";
    const bodyRows = normalizedRows.slice(1).map((row) => {
      return "| " + row.join(" | ") + " |";
    });
    return [headerMd, separatorMd, ...bodyRows].join("\n") + "\n";
  }
  async function parseSpreadsheet(file, onProgress = null) {
    await loadScript(APP_CONFIG.CDN.SHEETJS);
    const XLSX = typeof window !== "undefined" && window.XLSX || globalThis.XLSX;
    if (!XLSX) {
      throw new Error("N\xE3o foi poss\xEDvel carregar o motor SheetJS.");
    }
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array", cellDates: true });
    const docTitle = file.name.replace(/\.[^/.]+$/, "");
    const markdownSections = [`# ${docTitle}
`];
    const sheetCount = workbook.SheetNames.length;
    for (let i = 0; i < sheetCount; i++) {
      if (typeof onProgress === "function") {
        const pct = Math.round((i + 1) / sheetCount * 100);
        onProgress(pct, `Aba ${i + 1}/${sheetCount}`);
      }
      const sheetName = workbook.SheetNames[i];
      const sheet = workbook.Sheets[sheetName];
      if (sheetCount > 1) {
        markdownSections.push(`## ${sheetName}
`);
      }
      const data = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: "",
        blankrows: false
      });
      const tableMd = matrixToMarkdownTable(data);
      markdownSections.push(tableMd);
    }
    return markdownSections.join("\n\n").trim();
  }
  var init_xlsx_parser = __esm({
    "js/parsers/xlsx-parser.js"() {
      init_config();
    }
  });

  // js/parsers/pptx-parser.js
  async function parsePptx(file, onProgress = null) {
    await loadScript(APP_CONFIG.CDN.JSZIP);
    const JSZip = typeof window !== "undefined" && window.JSZip || globalThis.JSZip;
    if (!JSZip) {
      throw new Error("N\xE3o foi poss\xEDvel carregar a biblioteca JSZip.");
    }
    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);
    const docTitle = file.name.replace(/\.pptx$/i, "");
    const markdownSlides = [`# ${docTitle}
`];
    const slideEntries = [];
    zip.forEach((relativePath, zipEntry) => {
      const match = relativePath.match(/^ppt\/slides\/slide(\d+)\.xml$/i);
      if (match) {
        slideEntries.push({
          num: parseInt(match[1], 10),
          path: relativePath,
          entry: zipEntry
        });
      }
    });
    slideEntries.sort((a, b) => a.num - b.num);
    if (slideEntries.length === 0) {
      return `# ${docTitle}

*(Nenhum slide com conte\xFAdo detectado na apresenta\xE7\xE3o)*
`;
    }
    const DOMParserClass = typeof DOMParser !== "undefined" ? DOMParser : globalThis.DOMParser;
    if (!DOMParserClass) {
      throw new Error("DOMParser n\xE3o dispon\xEDvel no ambiente.");
    }
    const domParser = new DOMParserClass();
    const getTags = (parent, tagName) => {
      const prefixed = parent.getElementsByTagName("p:" + tagName);
      if (prefixed && prefixed.length > 0) return Array.from(prefixed);
      const alphaPrefixed = parent.getElementsByTagName("a:" + tagName);
      if (alphaPrefixed && alphaPrefixed.length > 0) return Array.from(alphaPrefixed);
      return Array.from(parent.getElementsByTagName(tagName));
    };
    for (let i = 0; i < slideEntries.length; i++) {
      if (typeof onProgress === "function") {
        const pct = Math.round((i + 1) / slideEntries.length * 100);
        onProgress(pct, `Processando slide ${i + 1}/${slideEntries.length}`);
      }
      const slideInfo = slideEntries[i];
      const slideXmlText = await slideInfo.entry.async("text");
      const xmlDoc = domParser.parseFromString(slideXmlText, "application/xml");
      let slideTitle = "";
      const paragraphs = [];
      const shapeElements = getTags(xmlDoc, "sp");
      shapeElements.forEach((shape) => {
        const phs = getTags(shape, "ph");
        const isTitleShape = phs.some((ph) => {
          const type = ph.getAttribute("type");
          return type === "title" || type === "ctrTitle";
        });
        const pNodes = getTags(shape, "p");
        pNodes.forEach((p) => {
          const pPrs = getTags(p, "pPr");
          const level = pPrs.length > 0 ? parseInt(pPrs[0].getAttribute("lvl") || "0", 10) : 0;
          const tNodes = getTags(p, "t");
          let text = "";
          tNodes.forEach((t) => {
            text += t.textContent || "";
          });
          text = text.trim();
          if (text) {
            if (isTitleShape && !slideTitle) {
              slideTitle = text;
            } else {
              paragraphs.push({ text, level });
            }
          }
        });
      });
      const slideHeader = slideTitle ? `## Slide ${slideInfo.num}: ${slideTitle}` : `## Slide ${slideInfo.num}`;
      let slideContent = `${slideHeader}

`;
      if (paragraphs.length > 0) {
        paragraphs.forEach((p) => {
          const indent = "  ".repeat(p.level);
          slideContent += `${indent}- ${p.text}
`;
        });
      } else if (!slideTitle) {
        slideContent += `*(Slide sem texto visual)*
`;
      }
      const notesPath = `ppt/notesSlides/notesSlide${slideInfo.num}.xml`;
      const notesFile = zip.file(notesPath);
      if (notesFile) {
        try {
          const notesXmlText = await notesFile.async("text");
          const notesDoc = domParser.parseFromString(notesXmlText, "application/xml");
          const noteTexts = [];
          notesDoc.querySelectorAll("t, a\\:t").forEach((t) => {
            const txt = t.textContent.trim();
            if (txt && !txt.includes("Slide ") && !/^\d+$/.test(txt)) {
              noteTexts.push(txt);
            }
          });
          if (noteTexts.length > 0) {
            slideContent += `
> **Notas do Apresentador:** ${noteTexts.join(" ")}
`;
          }
        } catch (err) {
        }
      }
      markdownSlides.push(slideContent.trim());
    }
    return markdownSlides.join("\n\n---\n\n").trim();
  }
  var init_pptx_parser = __esm({
    "js/parsers/pptx-parser.js"() {
      init_config();
    }
  });

  // js/parsers/pdf-parser.js
  async function parsePdf(file, onProgress = null) {
    await loadScript(APP_CONFIG.CDN.PDFJS);
    const pdfjsLib = typeof window !== "undefined" && window.pdfjsLib || globalThis.pdfjsLib;
    if (!pdfjsLib) {
      throw new Error("N\xE3o foi poss\xEDvel carregar a biblioteca PDF.js.");
    }
    if (pdfjsLib.GlobalWorkerOptions && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = APP_CONFIG.CDN.PDFJS_WORKER;
    }
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;
    const docTitle = file.name.replace(/\.pdf$/i, "");
    const pagesMarkdown = [`# ${docTitle}
`];
    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      if (typeof onProgress === "function") {
        const pct = Math.round(pageNum / pdfDoc.numPages * 100);
        onProgress(pct, `pg. ${pageNum}/${pdfDoc.numPages}`);
      }
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      if (!textContent || textContent.items.length === 0) {
        if (pdfDoc.numPages > 1) {
          pagesMarkdown.push(`### P\xE1gina ${pageNum}

*(P\xE1gina sem texto selecion\xE1vel ou imagem escaneada)*
`);
        }
        continue;
      }
      let totalHeight = 0;
      let validItems = 0;
      textContent.items.forEach((item) => {
        const height = Math.abs(item.transform[0]) || item.height || 0;
        if (height > 0) {
          totalHeight += height;
          validItems++;
        }
      });
      const avgHeight = validItems > 0 ? totalHeight / validItems : 12;
      const lines = [];
      let currentLine = [];
      let lastY = null;
      let lastHeight = avgHeight;
      textContent.items.forEach((item) => {
        const text = item.str;
        if (!text && !item.hasEOL) return;
        const y = Math.round(item.transform[5]);
        const height = Math.abs(item.transform[0]) || item.height || avgHeight;
        if (lastY !== null && Math.abs(y - lastY) > 4) {
          if (currentLine.length > 0) {
            lines.push({
              text: currentLine.join(" ").replace(/\s{2,}/g, " ").trim(),
              height: lastHeight,
              y: lastY
            });
            currentLine = [];
          }
        }
        if (text.trim()) {
          currentLine.push(text);
        }
        lastY = y;
        lastHeight = height;
      });
      if (currentLine.length > 0) {
        lines.push({
          text: currentLine.join(" ").replace(/\s{2,}/g, " ").trim(),
          height: lastHeight,
          y: lastY
        });
      }
      const pageParagraphs = [];
      if (pdfDoc.numPages > 1) {
        pageParagraphs.push(`---

*P\xE1gina ${pageNum} de ${pdfDoc.numPages}*
`);
      }
      let bufferParagraph = "";
      for (let j = 0; j < lines.length; j++) {
        const line = lines[j];
        const isHeader = line.height > avgHeight * 1.35;
        if (isHeader) {
          if (bufferParagraph) {
            pageParagraphs.push(bufferParagraph.trim());
            bufferParagraph = "";
          }
          pageParagraphs.push(`### ${line.text}
`);
        } else if (line.text.startsWith("\u2022") || line.text.startsWith("- ") || line.text.startsWith("* ")) {
          if (bufferParagraph) {
            pageParagraphs.push(bufferParagraph.trim());
            bufferParagraph = "";
          }
          pageParagraphs.push(`- ${line.text.replace(/^[•\-\*]\s*/, "")}`);
        } else {
          const endsWithPunct = /[.:;?!]$/.test(line.text);
          if (bufferParagraph) {
            bufferParagraph += " " + line.text;
          } else {
            bufferParagraph = line.text;
          }
          if (endsWithPunct) {
            pageParagraphs.push(bufferParagraph.trim());
            bufferParagraph = "";
          }
        }
      }
      if (bufferParagraph) {
        pageParagraphs.push(bufferParagraph.trim());
      }
      pagesMarkdown.push(pageParagraphs.join("\n\n"));
    }
    return pagesMarkdown.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
  }
  var init_pdf_parser = __esm({
    "js/parsers/pdf-parser.js"() {
      init_config();
    }
  });

  // js/parsers/text-parser.js
  function convertHtmlToMarkdown(htmlContent, docTitle = "Documento") {
    if (typeof DOMParser !== "undefined") {
      try {
        let walk = function(node) {
          if (!node) return "";
          if (node.nodeType === 3) {
            return node.nodeValue;
          }
          if (node.nodeType !== 1) {
            return "";
          }
          const tag = node.tagName.toLowerCase();
          let inner = Array.from(node.childNodes).map(walk).join("");
          switch (tag) {
            case "h1":
              return `

# ${inner.trim()}

`;
            case "h2":
              return `

## ${inner.trim()}

`;
            case "h3":
              return `

### ${inner.trim()}

`;
            case "h4":
              return `

#### ${inner.trim()}

`;
            case "h5":
              return `

##### ${inner.trim()}

`;
            case "h6":
              return `

###### ${inner.trim()}

`;
            case "p":
              return `

${inner.trim()}

`;
            case "br":
              return "\n";
            case "hr":
              return "\n\n---\n\n";
            case "strong":
            case "b":
              return `**${inner.trim()}**`;
            case "em":
            case "i":
              return `*${inner.trim()}*`;
            case "code": {
              if (node.parentElement && node.parentElement.tagName.toLowerCase() === "pre") {
                return inner;
              }
              return `\`${inner}\``;
            }
            case "pre": {
              const codeEl = node.querySelector("code");
              const codeText = codeEl ? codeEl.textContent : inner;
              return `

\`\`\`
${codeText.trim()}
\`\`\`

`;
            }
            case "blockquote":
              return `

> ${inner.trim().replace(/\n/g, "\n> ")}

`;
            case "a": {
              const href = node.getAttribute("href") || "";
              const text = inner.trim() || href;
              return href ? `[${text}](${href})` : text;
            }
            case "img": {
              const src = node.getAttribute("src") || "";
              const alt = node.getAttribute("alt") || "imagem";
              return src ? `![${alt}](${src})` : "";
            }
            case "ul": {
              const items = Array.from(node.children).filter((child) => child.tagName.toLowerCase() === "li").map((li) => `- ${Array.from(li.childNodes).map(walk).join("").trim()}`).join("\n");
              return `

${items}

`;
            }
            case "ol": {
              let count = 1;
              const items = Array.from(node.children).filter((child) => child.tagName.toLowerCase() === "li").map((li) => `${count++}. ${Array.from(li.childNodes).map(walk).join("").trim()}`).join("\n");
              return `

${items}

`;
            }
            case "li": {
              return `- ${inner.trim()}`;
            }
            case "table": {
              const rows = Array.from(node.querySelectorAll("tr"));
              if (rows.length === 0) return "";
              let tableMd = "\n\n";
              rows.forEach((row, rIndex) => {
                const cells = Array.from(row.querySelectorAll("th, td"));
                const rowText = "| " + cells.map((c) => Array.from(c.childNodes).map(walk).join("").trim().replace(/\|/g, "\\|")).join(" | ") + " |";
                tableMd += rowText + "\n";
                if (rIndex === 0) {
                  const sep = "| " + cells.map(() => "---").join(" | ") + " |";
                  tableMd += sep + "\n";
                }
              });
              return tableMd + "\n\n";
            }
            default:
              return inner;
          }
        };
        const doc = new DOMParser().parseFromString(htmlContent, "text/html");
        doc.querySelectorAll("script, style, noscript, svg, iframe").forEach((el) => el.remove());
        const body = doc.body || doc;
        let md = walk(body);
        md = md.replace(/\n{3,}/g, "\n\n").trim();
        if (!md) {
          md = body.textContent ? body.textContent.trim() : "";
        }
        return md ? `# ${docTitle}

${md}` : `# ${docTitle}

*Documento HTML sem conte\xFAdo leg\xEDvel.*`;
      } catch (domErr) {
        console.warn("[doc2md] Fallback DOMParser falhou, aplicando extra\xE7\xE3o de texto:", domErr);
      }
    }
    const stripped = htmlContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "").replace(/<h1[^>]*>(.*?)<\/h1>/gi, "\n\n# $1\n\n").replace(/<h2[^>]*>(.*?)<\/h2>/gi, "\n\n## $1\n\n").replace(/<h3[^>]*>(.*?)<\/h3>/gi, "\n\n### $1\n\n").replace(/<h[4-6][^>]*>(.*?)<\/h[4-6]>/gi, "\n\n#### $1\n\n").replace(/<p[^>]*>(.*?)<\/p>/gi, "\n\n$1\n\n").replace(/<br\s*[\/]?>/gi, "\n").replace(/<hr\s*[\/]?>/gi, "\n\n---\n\n").replace(/<strong>(.*?)<\/strong>|<b>(.*?)<\/b>/gi, "**$1$2**").replace(/<em>(.*?)<\/em>|<i>(.*?)<\/i>/gi, "*$1$2*").replace(/<a\b[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)").replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/\s{2,}/g, " ").replace(/\n{3,}/g, "\n\n").trim();
    return `# ${docTitle}

${stripped || "*Documento HTML sem conte\xFAdo*"}`;
  }
  function parseSourceCode(input, extension, fileName = "codigo") {
    let textContent = "";
    if (typeof input === "string") {
      textContent = input;
    } else if (input instanceof ArrayBuffer) {
      textContent = new TextDecoder("utf-8").decode(input);
    } else if (input && input.buffer instanceof ArrayBuffer) {
      textContent = new TextDecoder("utf-8").decode(input);
    } else {
      textContent = String(input || "");
    }
    const cleanExt = (extension || "").toLowerCase().replace(/^\./, "");
    const language = CODE_EXTENSIONS_MAP[cleanExt] || cleanExt || "text";
    const lines = textContent.split(/\r\n|\r|\n/).length;
    const sizeInBytes = typeof Blob !== "undefined" ? new Blob([textContent]).size : Buffer.byteLength(textContent, "utf8");
    const formattedSize = (sizeInBytes / 1024).toFixed(1) + " KB";
    return `# ${fileName}

> **Linguagem:** \`${language}\` | **Linhas:** ${lines} | **Tamanho:** ${formattedSize}

\`\`\`${language}
${textContent}
\`\`\`
`;
  }
  function parseYaml(input, fileName = "documento.yaml") {
    let textContent = "";
    if (typeof input === "string") {
      textContent = input;
    } else if (input instanceof ArrayBuffer) {
      textContent = new TextDecoder("utf-8").decode(input);
    } else if (input && input.buffer instanceof ArrayBuffer) {
      textContent = new TextDecoder("utf-8").decode(input);
    } else {
      textContent = String(input || "");
    }
    const lines = textContent.split(/\r\n|\r|\n/).length;
    const sizeInBytes = typeof Blob !== "undefined" ? new Blob([textContent]).size : typeof Buffer !== "undefined" ? Buffer.byteLength(textContent, "utf8") : textContent.length;
    const formatSize = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    };
    const formattedSize = formatSize(sizeInBytes);
    return `# ${fileName}

> **Formato:** YAML | **Linhas:** ${lines} | **Tamanho:** ${formattedSize}

\`\`\`yaml
${textContent}
\`\`\`
`;
  }
  async function parseText(file, onProgress = null) {
    if (typeof onProgress === "function") {
      onProgress(50, "Lendo conte\xFAdo textual...");
    }
    const fileName = file && file.name ? file.name : "documento.txt";
    const ext = fileName.split(".").pop().toLowerCase();
    const docTitle = fileName.replace(/\.[^/.]+$/, "");
    let textContent = "";
    if (typeof file === "string") {
      textContent = file;
    } else if (file instanceof ArrayBuffer) {
      textContent = new TextDecoder("utf-8").decode(file);
    } else if (file && typeof file.text === "function") {
      try {
        textContent = await file.text();
      } catch (e) {
        if (typeof file.arrayBuffer === "function") {
          const ab = await file.arrayBuffer();
          textContent = new TextDecoder("utf-8").decode(ab);
        } else {
          throw e;
        }
      }
    } else if (file && typeof file.arrayBuffer === "function") {
      const ab = await file.arrayBuffer();
      textContent = new TextDecoder("utf-8").decode(ab);
    } else {
      textContent = String(file || "");
    }
    const cleanExt = (ext || "").replace(/^\./, "");
    if (CODE_EXTENSIONS_MAP[cleanExt] && !["json", "html", "htm", "rtf", "md", "markdown", "txt", "log", "yaml", "yml"].includes(cleanExt)) {
      return parseSourceCode(textContent, cleanExt, fileName);
    }
    switch (ext) {
      case "json": {
        try {
          const parsed = JSON.parse(textContent);
          const formatted = JSON.stringify(parsed, null, 2);
          return `# ${docTitle}

\`\`\`json
${formatted}
\`\`\`
`;
        } catch (err) {
          return `# ${docTitle}

\`\`\`json
${textContent}
\`\`\`
`;
        }
      }
      case "html":
      case "htm": {
        try {
          if (typeof window !== "undefined") {
            if (typeof window.TurndownService === "undefined" && APP_CONFIG?.CDN?.TURNDOWN) {
              await loadScript(APP_CONFIG.CDN.TURNDOWN).catch(() => {
              });
              if (APP_CONFIG?.CDN?.TURNDOWN_GFM) {
                await loadScript(APP_CONFIG.CDN.TURNDOWN_GFM).catch(() => {
                });
              }
            }
            if (typeof window.TurndownService !== "undefined") {
              const turndown = new window.TurndownService({
                headingStyle: "atx",
                hr: "---",
                bulletListMarker: "-",
                codeBlockStyle: "fenced"
              });
              if (typeof window.turndownPluginGfm !== "undefined") {
                turndown.use(window.turndownPluginGfm.gfm);
              }
              const res = turndown.turndown(textContent);
              if (res && res.trim()) {
                return `# ${docTitle}

${res.trim()}`;
              }
            }
          }
        } catch (err) {
          console.warn("[doc2md] Falha no TurndownService, executando fallback nativo:", err);
        }
        return convertHtmlToMarkdown(textContent, docTitle);
      }
      case "rtf": {
        const plain = textContent.replace(/\\par[d]?/g, "\n").replace(/\\b(?:\s+([^\\]+?)\s*\\b0|(\s+[^\\]+))/g, "**$1$2**").replace(/\\i(?:\s+([^\\]+?)\s*\\i0|(\s+[^\\]+))/g, "*$1$2*").replace(/\{\\\*?\\[^{}]+?\}|\\(?:[a-z]{1,32}(-?\d+)? ?|[\r\n\t])/gi, "").replace(/[{}]/g, "").trim();
        return `# ${docTitle}

${plain}
`;
      }
      case "md": {
        return textContent;
      }
      case "xml": {
        return `# ${docTitle}

\`\`\`xml
${textContent}
\`\`\`
`;
      }
      case "yaml":
      case "yml": {
        return parseYaml(textContent, fileName);
      }
      case "txt":
      case "log":
      default: {
        return `# ${docTitle}

${textContent}
`;
      }
    }
  }
  var init_text_parser = __esm({
    "js/parsers/text-parser.js"() {
      init_config();
    }
  });

  // js/app.js
  function updateDynamicConcurrency(forceHighConcurrency = false) {
    if (forceHighConcurrency) {
      state.maxConcurrency = APP_CONFIG.CONCURRENCY && APP_CONFIG.CONCURRENCY.HIGH_VOLUME || 1e3;
      return state.maxConcurrency;
    }
    const hasExtractedOrigin = state.queue && state.queue.some((it) => it.archiveOrigin && it.archiveOrigin !== "(Upload Direto)");
    if (hasExtractedOrigin) {
      state.maxConcurrency = APP_CONFIG.CONCURRENCY && APP_CONFIG.CONCURRENCY.HIGH_VOLUME || 1e3;
      return state.maxConcurrency;
    }
    const totalItems = state.queue ? state.queue.length : 0;
    const pendingItems = state.queue ? state.queue.filter((it) => it.status === "queued" || it.status === "processing").length : 0;
    const count = Math.max(totalItems, pendingItems);
    state.maxConcurrency = getDynamicConcurrency(count);
    return state.maxConcurrency;
  }
  function reinitElements() {
    const el = (id) => typeof document !== "undefined" ? document.getElementById(id) : null;
    Object.assign(elements, {
      themeToggle: el("theme-toggle"),
      themeIconSun: el("theme-icon-sun"),
      themeIconMoon: el("theme-icon-moon"),
      headerVersion: el("header-version"),
      footerVersion: el("footer-version") || document.querySelector(".footer-version"),
      dropzone: el("dropzone"),
      fileInput: el("file-input"),
      btnBrowse: el("btn-browse"),
      debugStatus: el("debug-status"),
      fileQueueSection: el("file-queue-section"),
      fileQueueList: el("file-queue-list"),
      queueCounter: el("queue-counter"),
      btnQueueClear: el("btn-queue-clear"),
      btnQueueDownloadAll: el("btn-queue-download-all"),
      toggleMergeMarkdown: el("toggle-merge-markdown"),
      btnSortFiles: el("btn-sort-files"),
      sortFilesLabel: el("sort-files-label"),
      btnQueueDownloadMerged: el("btn-download-unified") || el("btn-queue-download-merged"),
      btnDownloadUnified: el("btn-download-unified") || el("btn-queue-download-merged"),
      unifiedActionRow: el("unified-action-row") || el("unified-download-container"),
      unifiedDownloadContainer: el("unified-action-row") || el("unified-download-container"),
      batchGlobalProgress: el("batch-global-progress"),
      globalProgressCounter: el("global-progress-counter"),
      globalProgressFill: el("global-progress-fill"),
      queueTotalBytesCard: el("queue-total-bytes-card"),
      liveTotalBytesCounter: el("live-total-bytes-counter"),
      liveTotalFormattedUnit: el("live-total-formatted-unit"),
      consolidationProgress: el("consolidation-progress"),
      consolidationCounter: el("consolidation-counter"),
      consolidationFill: el("consolidation-fill"),
      consolidationStatusText: el("consolidation-status-text")
    });
  }
  function initVersion() {
    if (elements.headerVersion) elements.headerVersion.textContent = APP_CONFIG.VERSION;
    if (elements.footerVersion) elements.footerVersion.textContent = APP_CONFIG.VERSION;
    if (typeof document !== "undefined" && document.querySelectorAll) {
      const versionElements = document.querySelectorAll(".footer-version, #footer-version, #app-version, .header-version, #header-version");
      versionElements.forEach((el) => {
        el.textContent = APP_CONFIG.VERSION;
      });
    }
  }
  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function applyTheme(theme) {
    state.theme = theme;
    const effectiveTheme = theme === "system" ? getSystemTheme() : theme;
    document.documentElement.setAttribute("data-theme", effectiveTheme);
    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.THEME, theme);
    if (effectiveTheme === "dark") {
      elements.themeIconSun.style.display = "none";
      elements.themeIconMoon.style.display = "block";
    } else {
      elements.themeIconSun.style.display = "block";
      elements.themeIconMoon.style.display = "none";
    }
  }
  function initTheme() {
    const savedTheme = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.THEME) || "system";
    applyTheme(savedTheme);
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (state.theme === "system") {
        applyTheme("system");
      }
    });
    elements.themeToggle.addEventListener("click", () => {
      const currentEffective = document.documentElement.getAttribute("data-theme") || "light";
      const nextTheme = currentEffective === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  }
  function formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  }
  function formatElapsedTime(ms) {
    if (ms == null || isNaN(ms) || ms < 0) return "0ms";
    if (ms < 1e3) {
      return `${Math.round(ms)}ms`;
    }
    if (ms < 6e4) {
      const sec = (ms / 1e3).toFixed(1);
      return sec.endsWith(".0") ? `${Math.floor(ms / 1e3)}s` : `${sec}s`;
    }
    const hours = Math.floor(ms / 36e5);
    const remMinutes = ms % 36e5;
    const minutes = Math.floor(remMinutes / 6e4);
    const seconds = Math.floor(remMinutes % 6e4 / 1e3);
    if (hours > 0) {
      const parts2 = [`${hours}h`];
      if (minutes > 0) parts2.push(`${minutes}min`);
      if (seconds > 0) parts2.push(`${seconds}s`);
      return parts2.join(" ");
    }
    const parts = [`${minutes}min`];
    if (seconds > 0) parts.push(`${seconds}s`);
    return parts.join(" ");
  }
  function getFileExtension(filename) {
    if (!filename || !filename.includes(".")) return "";
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase().trim();
  }
  function getFormatCategory(fileName) {
    const cleanExt = getFileExtension(fileName);
    const ext = cleanExt ? `.${cleanExt}` : "";
    if (cleanExt && SUPPORTED_EXTENSIONS && SUPPORTED_EXTENSIONS[cleanExt]) {
      const item = SUPPORTED_EXTENSIONS[cleanExt];
      return {
        key: item.category,
        ext,
        name: item.label || `Arquivo (${ext})`,
        category: item.category,
        parser: item.parser,
        lang: item.lang
      };
    }
    for (const [key, format] of Object.entries(APP_CONFIG.SUPPORTED_FORMATS)) {
      if (format.ext.includes(ext)) {
        return { key, ...format, ext };
      }
    }
    if (cleanExt && CODE_EXTENSIONS_MAP[cleanExt]) {
      return {
        key: "code",
        ext,
        name: `C\xF3digo (${CODE_EXTENSIONS_MAP[cleanExt]})`,
        category: "code",
        parser: "code"
      };
    }
    return {
      key: "text",
      ext,
      name: `Arquivo (${ext || "texto"})`,
      category: "text",
      parser: "text"
    };
  }
  function updateDebugStatus(message, isError = false) {
    if (!elements.debugStatus) return;
    if (isError) {
      elements.debugStatus.style.display = "block";
      elements.debugStatus.textContent = message;
      elements.debugStatus.className = "debug-status error";
    } else {
      elements.debugStatus.style.display = "none";
      elements.debugStatus.textContent = "";
      elements.debugStatus.className = "debug-status";
    }
  }
  function renderFileBadgeIcon(extension) {
    const cleanExt = (extension || "").replace(/^\./, "").toUpperCase() || "DOC";
    return `
    <div class="file-badge-icon file-icon queue-item-icon" aria-hidden="true" title=".${cleanExt}">
      <svg viewBox="-2 -2 44 52" class="file-sheet-svg" fill="none" stroke="currentColor">
        <!-- Contorno da folha com dobra superior -->
        <path d="M6 4a2 2 0 0 1 2-2h18l10 10v32a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4z" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M26 2v10h10" stroke-width="2.5" stroke-linejoin="round"/>
      </svg>
      <!-- Etiqueta sobreposta com a extens\xE3o -->
      <span class="file-extension-tag">${cleanExt}</span>
    </div>
  `;
  }
  function renderUploadStepIcon() {
    return `
    <span class="step-icon step-icon-upload" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Bandeja / Base de apoio -->
        <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        <!-- Seta com haste m\xF3vel -->
        <g class="arrow-up-group">
          <polyline points="16 8 12 4 8 8" />
          <line x1="12" y1="4" x2="12" y2="16" />
        </g>
      </svg>
    </span>
  `.trim();
  }
  function renderConvertStepIcon() {
    return `
    <span class="step-icon step-icon-convert" aria-hidden="true">
      <svg viewBox="0 0 32 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Folha de origem (esquerda) -->
        <path d="M4 3h7l4 4v14H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
        <!-- Folha de destino (direita) -->
        <path d="M17 3h7l4 4v14h-11" />
        <!-- Seta de transi\xE7\xE3o central -->
        <g class="arrow-convert-group">
          <line x1="10" y1="12" x2="20" y2="12" />
          <polyline points="17 9 20 12 17 15" />
        </g>
      </svg>
    </span>
  `.trim();
  }
  function getOutputFileName(fileName) {
    if (!fileName) return "documento.md";
    const base = fileName.replace(/\.[^/.]+$/, "");
    return `${base}.md`;
  }
  function downloadMarkdownFile(baseName, content) {
    const fileName = baseName.endsWith(".md") ? baseName : `${baseName}.md`;
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    if (typeof URL !== "undefined" && typeof URL.createObjectURL === "function" && typeof document !== "undefined" && document.createElement) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      if (document.body && document.body.appendChild) {
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        a.click();
      }
      if (typeof URL.revokeObjectURL === "function") {
        setTimeout(() => {
          try {
            URL.revokeObjectURL(url);
          } catch (_) {
          }
        }, 5e3);
      }
    }
    return { fileName, blob, content };
  }
  function getFormattedTimestamp(date = /* @__PURE__ */ new Date()) {
    const now = date instanceof Date && !isNaN(date) ? date : /* @__PURE__ */ new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}_${hours}h${minutes}min`;
  }
  function readFileWithProgress(file, onProgress) {
    return new Promise((resolve, reject) => {
      if (typeof window === "undefined" || typeof FileReader === "undefined" && typeof file.arrayBuffer === "function") {
        if (typeof file.arrayBuffer === "function") {
          file.arrayBuffer().then((buf) => {
            onProgress(100);
            resolve(buf);
          }).catch(reject);
          return;
        }
      }
      const reader = new FileReader();
      let currentPercent = 0;
      let targetPercent = 0;
      let isComplete = false;
      let bufferResult = null;
      let animId = null;
      const tickUI = () => {
        if (currentPercent < targetPercent) {
          const delta = targetPercent - currentPercent;
          const inc = Math.max(1, Math.ceil(delta * 0.22));
          currentPercent = Math.min(targetPercent, currentPercent + inc);
          onProgress(currentPercent);
        }
        if (isComplete && currentPercent >= 100) {
          onProgress(100);
          resolve(bufferResult);
          return;
        }
        if (typeof requestAnimationFrame !== "undefined") {
          animId = requestAnimationFrame(tickUI);
        } else {
          animId = setTimeout(tickUI, 16);
        }
      };
      if (typeof requestAnimationFrame !== "undefined") {
        animId = requestAnimationFrame(tickUI);
      } else {
        animId = setTimeout(tickUI, 16);
      }
      reader.onprogress = (event) => {
        if (event.lengthComputable && event.total > 0) {
          const raw = Math.min(99, Math.round(event.loaded / event.total * 100));
          targetPercent = Math.max(targetPercent, raw);
        } else {
          targetPercent = Math.min(90, targetPercent + 10);
        }
      };
      reader.onload = () => {
        bufferResult = reader.result;
        targetPercent = 100;
        isComplete = true;
      };
      reader.onerror = () => {
        if (animId) {
          if (typeof cancelAnimationFrame !== "undefined") cancelAnimationFrame(animId);
          else clearTimeout(animId);
        }
        reject(new Error(`Falha ao ler o arquivo "${file.name}"`));
      };
      reader.readAsArrayBuffer(file);
    });
  }
  function isArchiveExtension(ext) {
    if (!ext) return false;
    const clean = ext.toLowerCase().startsWith(".") ? ext.toLowerCase() : `.${ext.toLowerCase()}`;
    return APP_CONFIG.ARCHIVE_EXTENSIONS && APP_CONFIG.ARCHIVE_EXTENSIONS.includes(clean);
  }
  function isSupportedDocumentExtension(ext) {
    if (!ext) return false;
    const raw = ext.toLowerCase().replace(/^\./, "");
    const dotted = `.${raw}`;
    if (SUPPORTED_EXTENSIONS && SUPPORTED_EXTENSIONS[raw]) return true;
    for (const format of Object.values(APP_CONFIG.SUPPORTED_FORMATS)) {
      if (format.ext.includes(dotted)) return true;
    }
    if (CODE_EXTENSIONS_MAP && CODE_EXTENSIONS_MAP[raw]) return true;
    return false;
  }
  function getMimeTypeForExt(ext) {
    const raw = (ext || "").toLowerCase().replace(/^\./, "");
    const dotted = `.${raw}`;
    if (MIME_TYPE_MAP) {
      for (const [mime, targetExt] of Object.entries(MIME_TYPE_MAP)) {
        if (targetExt === raw) return mime;
      }
    }
    for (const format of Object.values(APP_CONFIG.SUPPORTED_FORMATS)) {
      if (format.ext.includes(dotted) && format.mime && format.mime[0]) {
        return format.mime[0];
      }
    }
    return "text/plain";
  }
  async function extractArchiveFiles(file) {
    const ext = "." + file.name.split(".").pop().toLowerCase();
    if (file.size > APP_CONFIG.MAX_FILE_SIZE_BYTES) {
      throw new Error("Arquivo compactado excede o limite m\xE1ximo permitido de 1,5 GB.");
    }
    if (ext === ".zip") {
      return await extractZipArchive(file);
    } else {
      return await extractRarOrOtherArchive(file, ext);
    }
  }
  async function extractZipArchive(file) {
    state.isExtracting = true;
    try {
      let JSZipClass = typeof window !== "undefined" && window.JSZip || globalThis.JSZip;
      if (!JSZipClass && typeof window !== "undefined") {
        await loadScript(APP_CONFIG.CDN.JSZIP);
        JSZipClass = window.JSZip || globalThis.JSZip;
      }
      if (!JSZipClass && typeof process !== "undefined") {
        try {
          const jszipMod = await import("jszip");
          JSZipClass = jszipMod.default || jszipMod;
        } catch (_) {
        }
      }
      if (!JSZipClass) {
        throw new Error("Biblioteca JSZip indispon\xEDvel para descompacta\xE7\xE3o.");
      }
      let buffer;
      if (typeof file.arrayBuffer === "function") {
        buffer = await file.arrayBuffer();
      } else if (file instanceof ArrayBuffer) {
        buffer = file;
      } else if (typeof Buffer !== "undefined" && Buffer.isBuffer(file)) {
        buffer = file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength);
      } else {
        buffer = await new Promise((resolve, reject) => {
          if (typeof FileReader === "undefined") {
            return reject(new Error("FileReader indispon\xEDvel e file.arrayBuffer ausente."));
          }
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error("Falha ao ler dados bin\xE1rios do pacote ZIP"));
          reader.readAsArrayBuffer(file);
        });
      }
      const zip = await JSZipClass.loadAsync(buffer);
      const entriesToExtract = [];
      zip.forEach((relativePath, entry) => {
        if (entry.dir) return;
        if (relativePath.includes("__MACOSX") || relativePath.includes(".DS_Store") || relativePath.includes("Thumbs.db") || relativePath.startsWith(".") || relativePath.includes("/.")) {
          return;
        }
        const fileName = relativePath.split("/").pop();
        if (!fileName || fileName.startsWith(".")) return;
        const entryExt = "." + fileName.split(".").pop().toLowerCase();
        if (!isSupportedDocumentExtension(entryExt)) {
          return;
        }
        entriesToExtract.push({ fileName, relativePath, entry, entryExt });
      });
      if (entriesToExtract.length === 0) {
        throw new Error("Nenhum documento compat\xEDvel encontrado dentro do pacote ZIP.");
      }
      const extractedFiles = [];
      for (const item of entriesToExtract) {
        const fileBuffer = await item.entry.async("arraybuffer");
        const mimeType = getMimeTypeForExt(item.entryExt);
        const folderPath = item.relativePath.includes("/") ? item.relativePath.substring(0, item.relativePath.lastIndexOf("/")) : "Raiz do Pacote";
        const nativeFile = typeof File !== "undefined" ? new File([fileBuffer], item.fileName, {
          type: mimeType,
          lastModified: item.entry.date ? item.entry.date.getTime() : Date.now()
        }) : {
          name: item.fileName,
          size: fileBuffer.byteLength,
          type: mimeType,
          lastModified: item.entry.date ? item.entry.date.getTime() : Date.now(),
          arrayBuffer: async () => fileBuffer
        };
        nativeFile.archiveOrigin = file.name;
        nativeFile.relativePath = item.relativePath;
        nativeFile.folderPath = folderPath;
        extractedFiles.push(nativeFile);
      }
      return extractedFiles;
    } finally {
      state.isExtracting = false;
      state.isProcessing = false;
      updateGlobalActionButtonsState();
    }
  }
  async function extractRarOrOtherArchive(file, ext) {
    throw new Error(`Pacote ${ext.toUpperCase()} com senha ou formato n\xE3o descompact\xE1vel em mem\xF3ria.`);
  }
  async function addFilesToQueue(files) {
    if (!files || files.length === 0) return;
    state.isProcessing = true;
    const fileList = Array.from(files);
    const queueCandidates = [];
    let isArchiveExtraction = false;
    try {
      for (const file of fileList) {
        const cleanExt = getFileExtension(file.name);
        const ext = cleanExt ? `.${cleanExt}` : "";
        if (isArchiveExtension(ext)) {
          if (file.size > APP_CONFIG.MAX_FILE_SIZE_BYTES) {
            queueCandidates.push({
              file,
              isArchiveError: true,
              errorMessage: "Arquivo compactado excede o limite m\xE1ximo permitido de 1,5 GB."
            });
            continue;
          }
          updateDebugStatus(`[Descompactando]: ${file.name}...`);
          state.isExtracting = true;
          try {
            const extracted = await extractArchiveFiles(file);
            if (extracted && extracted.length > 0) {
              isArchiveExtraction = true;
              extracted.forEach((f) => queueCandidates.push({
                file: f,
                archiveOrigin: f.archiveOrigin || file.name,
                relativePath: f.relativePath || f.name,
                folderPath: f.folderPath || (f.relativePath && f.relativePath.includes("/") ? f.relativePath.substring(0, f.relativePath.lastIndexOf("/")) : "Raiz do Pacote")
              }));
            } else {
              throw new Error("Nenhum documento compat\xEDvel encontrado no pacote compactado.");
            }
          } catch (err) {
            console.error(`[doc2md] Falha na extra\xE7\xE3o de ${file.name}:`, err);
            queueCandidates.push({
              file,
              isArchiveError: true,
              errorMessage: err.message || "Falha ao descompactar pacote (arquivo corrompido ou com senha)",
              archiveOrigin: file.name,
              relativePath: file.name,
              folderPath: "Raiz do Pacote"
            });
          } finally {
            state.isExtracting = false;
            state.isProcessing = false;
            updateGlobalActionButtonsState();
          }
        } else {
          queueCandidates.push({
            file,
            archiveOrigin: file.archiveOrigin || "(Upload Direto)",
            relativePath: file.relativePath || file.name,
            folderPath: file.folderPath || "Raiz"
          });
        }
      }
    } finally {
      state.isExtracting = false;
      state.isProcessing = false;
      updateGlobalActionButtonsState();
    }
    const newItems = [];
    queueCandidates.forEach(({ file, isArchiveError, errorMessage: archiveErrMsg, archiveOrigin, relativePath, folderPath }) => {
      const cleanExt = getFileExtension(file.name);
      const ext = cleanExt ? `.${cleanExt}` : "";
      const formatInfo = getFormatCategory(file.name);
      const id = `item_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      let status = "queued";
      let statusText = "Na fila";
      let uploadProgress = 0;
      let uploadText = "0%";
      let convertProgress = 0;
      let convertText = "Aguardando...";
      let progress = 0;
      let errorMessage = "";
      if (isArchiveError) {
        status = "error";
        statusText = "Erro de convers\xE3o";
        uploadProgress = 0;
        uploadText = "0%";
        convertProgress = 0;
        convertText = "Erro";
        progress = 0;
        errorMessage = archiveErrMsg || ERROR_CATALOG.CORRUPTED_ARCHIVE;
      } else if (file.size === 0) {
        status = "error";
        statusText = "Erro de convers\xE3o";
        uploadProgress = 0;
        uploadText = "0%";
        convertProgress = 0;
        convertText = "Erro";
        progress = 0;
        errorMessage = ERROR_CATALOG.EMPTY_FILE;
      } else if (file.size > APP_CONFIG.MAX_FILE_SIZE_BYTES) {
        status = "error";
        statusText = "Erro de convers\xE3o";
        uploadProgress = 0;
        uploadText = "0%";
        convertProgress = 0;
        convertText = "Erro";
        progress = 0;
        errorMessage = ERROR_CATALOG.FILE_TOO_LARGE;
      } else if (APP_CONFIG.UNSUPPORTED_BINARY_EXTENSIONS && APP_CONFIG.UNSUPPORTED_BINARY_EXTENSIONS.includes(ext)) {
        status = "error";
        statusText = "Erro de convers\xE3o";
        uploadProgress = 0;
        uploadText = "0%";
        convertProgress = 0;
        convertText = "Erro";
        progress = 0;
        errorMessage = `${ERROR_CATALOG.PARSER_NOT_FOUND} (Extens\xE3o "${ext}")`;
      }
      const queueItem = {
        id,
        file,
        formatInfo,
        status,
        statusText,
        uploadProgress,
        uploadText,
        convertProgress,
        convertText,
        progress,
        markdown: "",
        markdownOutput: "",
        durationMs: 0,
        mdSize: 0,
        formattedMdSize: "",
        errorMessage,
        cancelled: false,
        archiveOrigin: archiveOrigin || file.archiveOrigin || "(Upload Direto)",
        relativePath: relativePath || file.relativePath || file.name,
        folderPath: folderPath || file.folderPath || (file.relativePath && file.relativePath.includes("/") ? file.relativePath.substring(0, file.relativePath.lastIndexOf("/")) : "Raiz")
      };
      newItems.push(queueItem);
    });
    const isHighVolume = queueCandidates.length > 20 || state.queue.length + newItems.length > 20;
    if (isHighVolume) {
      newItems.sort((a, b) => {
        const sizeA = a.file ? a.file.size : a.size || 0;
        const sizeB = b.file ? b.file.size : b.size || 0;
        if (sizeA !== sizeB) return sizeB - sizeA;
        const nameA = a.file ? a.file.name : a.name || "";
        const nameB = b.file ? b.file.name : b.name || "";
        return nameA.localeCompare(nameB, void 0, { numeric: true, sensitivity: "base" });
      });
    }
    state.queue.push(...newItems);
    if (state.queue.length > 20) {
      const queuedIndices = [];
      const queuedList = [];
      state.queue.forEach((item, idx) => {
        if (item.status === "queued" && !item.cancelled) {
          queuedIndices.push(idx);
          queuedList.push(item);
        }
      });
      if (queuedList.length > 0) {
        queuedList.sort((a, b) => {
          const sizeA = a.file ? a.file.size : a.size || 0;
          const sizeB = b.file ? b.file.size : b.size || 0;
          if (sizeA !== sizeB) return sizeB - sizeA;
          const nameA = a.file ? a.file.name : a.name || "";
          const nameB = b.file ? b.file.name : b.name || "";
          return nameA.localeCompare(nameB, void 0, { numeric: true, sensitivity: "base" });
        });
        queuedIndices.forEach((pos, i) => {
          state.queue[pos] = queuedList[i];
        });
      }
    }
    state.userIsScrolling = false;
    const hasExtractedOrigin = fileList.some((f) => f.archiveOrigin && f.archiveOrigin !== "(Upload Direto)") || isArchiveExtraction;
    if (hasExtractedOrigin || queueCandidates.length > 20 || state.queue.length > 20) {
      state.maxConcurrency = APP_CONFIG.CONCURRENCY && APP_CONFIG.CONCURRENCY.HIGH_VOLUME || 1e3;
    } else {
      updateDynamicConcurrency();
    }
    renderQueue();
    updateGlobalBatchProgress();
    updateGlobalBatchButtonsState();
    dispatchNext();
  }
  function shouldEnableHeadlessMode(queueLength) {
    return queueLength >= BATCH_HEADLESS_THRESHOLD;
  }
  function formatMdTelemetrySize(bytes) {
    const num = Number(bytes) || 0;
    if (num <= 0) {
      return { value: "0", unit: "kB", formatted: "0 kB" };
    }
    const k = 1024;
    const m = k * k;
    const g = m * k;
    if (num < m) {
      const kb = num / k;
      const val2 = kb < 0.05 ? "< 0,1" : kb >= 100 ? Math.round(kb).toLocaleString("pt-BR") : parseFloat(kb.toFixed(1)).toLocaleString("pt-BR");
      return { value: String(val2), unit: "kB", formatted: `${val2} kB` };
    }
    if (num < g) {
      const mb = num / m;
      const val2 = mb >= 100 ? Math.round(mb).toLocaleString("pt-BR") : parseFloat(mb.toFixed(1)).toLocaleString("pt-BR");
      return { value: String(val2), unit: "MB", formatted: `${val2} MB` };
    }
    const gb = num / g;
    const val = parseFloat(gb.toFixed(1)).toLocaleString("pt-BR");
    return { value: String(val), unit: "GB", formatted: `${val} GB` };
  }
  function computeAndAnimateTotalMdBytes() {
    if (!state || !state.queue) {
      totalBytesAnimController.setTarget(0);
      return 0;
    }
    const totalBytes = state.queue.reduce((accum, item) => {
      let itemBytes = 0;
      if (item.markdownOutput) {
        itemBytes = typeof Blob !== "undefined" ? new Blob([item.markdownOutput], { type: "text/markdown;charset=utf-8" }).size : Buffer.byteLength(item.markdownOutput, "utf8");
      } else if (item.currentMdBytes) {
        itemBytes = item.currentMdBytes;
      } else if (item.mdSize) {
        itemBytes = item.mdSize;
      } else if (item.markdown) {
        itemBytes = typeof Blob !== "undefined" ? new Blob([item.markdown], { type: "text/markdown;charset=utf-8" }).size : Buffer.byteLength(item.markdown, "utf8");
      }
      return accum + (Number(itemBytes) || 0);
    }, 0);
    totalBytesAnimController.setTarget(totalBytes);
    return totalBytes;
  }
  function updateGlobalActionButtonsState() {
    const completedItems = state && state.queue ? state.queue.filter((i) => i.status === "completed" || Boolean(i.markdownOutput)) : [];
    const completedCount = completedItems.length;
    const isAllResolved = state && state.queue && state.queue.length > 0 && !state.queue.some((it) => (it.status === "queued" || it.status === "processing") && !it.cancelled);
    if (isAllResolved) {
      state.isProcessing = false;
      state.isExtracting = false;
    }
    const btnDownloadAll = elements && elements.btnQueueDownloadAll || (typeof document !== "undefined" ? document.getElementById("btn-queue-download-all") : null);
    const btnDownloadUnified = elements && elements.btnDownloadUnified || elements && elements.btnQueueDownloadMerged || (typeof document !== "undefined" ? document.getElementById("btn-download-unified") || document.getElementById("btn-queue-download-merged") : null);
    if (btnDownloadAll && !state.isExportingZip && !btnDownloadAll.__isShowingSuccess) {
      if (completedCount > 0) {
        if (typeof btnDownloadAll.removeAttribute === "function") btnDownloadAll.removeAttribute("disabled");
        btnDownloadAll.disabled = false;
        if (btnDownloadAll.style) btnDownloadAll.style.pointerEvents = "auto";
        if (btnDownloadAll.classList && btnDownloadAll.classList.remove) btnDownloadAll.classList.remove("is-consolidating");
        if (btnDownloadAll.innerHTML && (btnDownloadAll.innerHTML.includes("Preparando") || btnDownloadAll.innerHTML.includes("Compactando") || btnDownloadAll.innerHTML.includes("radial-spinner-svg"))) {
          btnDownloadAll.innerHTML = DEFAULT_ZIP_BUTTON_HTML;
        }
      } else {
        if (typeof btnDownloadAll.setAttribute === "function") btnDownloadAll.setAttribute("disabled", "");
        btnDownloadAll.disabled = true;
      }
    }
    if (btnDownloadUnified && !state.isExportingUnified && !btnDownloadUnified.__isShowingSuccess) {
      if (completedCount > 0) {
        if (typeof btnDownloadUnified.removeAttribute === "function") btnDownloadUnified.removeAttribute("disabled");
        btnDownloadUnified.disabled = false;
        if (btnDownloadUnified.style) btnDownloadUnified.style.pointerEvents = "auto";
        if (btnDownloadUnified.classList && btnDownloadUnified.classList.remove) btnDownloadUnified.classList.remove("is-consolidating");
        if (btnDownloadUnified.innerHTML && (btnDownloadUnified.innerHTML.includes("Consolidando") || btnDownloadUnified.innerHTML.includes("radial-spinner-svg"))) {
          btnDownloadUnified.innerHTML = DEFAULT_UNIFIED_BUTTON_HTML;
        }
      } else {
        if (typeof btnDownloadUnified.setAttribute === "function") btnDownloadUnified.setAttribute("disabled", "");
        btnDownloadUnified.disabled = true;
      }
    }
  }
  function setupQueueListDelegation(queueListElement) {
    const queueList = queueListElement || elements && elements.fileQueueList || (typeof document !== "undefined" ? document.querySelector(".file-queue-list") || document.getElementById("file-queue-list") : null);
    if (!queueList) return;
    const isAttached = queueList.dataset ? queueList.dataset.listenerAttached === "true" : Boolean(queueList.__hasDelegatedQueueEvents);
    if (isAttached) return;
    if (queueList.dataset) {
      queueList.dataset.listenerAttached = "true";
    }
    queueList.__hasDelegatedQueueEvents = true;
    if (typeof queueList.addEventListener === "function") {
      queueList.addEventListener("click", (e) => {
        const btn = e.target && typeof e.target.closest === "function" ? e.target.closest(".btn-download-item, .btn-queue-item-download, .btn-download") : null;
        if (btn) {
          if (typeof e.preventDefault === "function") e.preventDefault();
          if (typeof e.stopPropagation === "function") e.stopPropagation();
          const itemId = btn.dataset ? btn.dataset.id : btn.getAttribute ? btn.getAttribute("data-id") : null;
          const item = state && state.queue ? state.queue.find((q) => q.id === itemId) : null;
          if (item && (item.markdownOutput || item.markdown)) {
            const fileName = item.file && item.file.name || item.name || "documento.md";
            triggerDownload(getOutputFileName(fileName), item.markdownOutput || item.markdown);
          } else if (itemId) {
            downloadQueueItem(itemId);
          }
          return;
        }
        const removeBtn = e.target && typeof e.target.closest === "function" ? e.target.closest(".btn-remove-item, .btn-queue-item-remove, .btn-remove") : null;
        if (removeBtn) {
          if (typeof e.preventDefault === "function") e.preventDefault();
          if (typeof e.stopPropagation === "function") e.stopPropagation();
          const itemId = removeBtn.dataset ? removeBtn.dataset.id : removeBtn.getAttribute ? removeBtn.getAttribute("data-id") : null;
          removeQueueItem(itemId);
          return;
        }
      });
    }
  }
  function renderQueue() {
    const queueSection = elements && elements.fileQueueSection || (typeof document !== "undefined" ? document.getElementById("file-queue-section") : null);
    const queueList = elements && elements.fileQueueList || (typeof document !== "undefined" ? document.getElementById("file-queue-list") || document.querySelector(".file-queue-list") : null);
    const queueCounter = elements && elements.queueCounter || (typeof document !== "undefined" ? document.getElementById("queue-counter") : null);
    if (!queueSection || !queueList) return;
    const total = state.queue.length;
    if (total === 0) {
      queueSection.style.display = "none";
      if (queueCounter) queueCounter.textContent = "0 arquivos";
      computeAndAnimateTotalMdBytes();
      updateGlobalBatchProgress();
      updateGlobalBatchButtonsState();
      return;
    }
    queueSection.style.display = "block";
    if (queueCounter) {
      queueCounter.textContent = `${total} ${total === 1 ? "arquivo" : "arquivos"}`;
    }
    updateGlobalBatchButtonsState();
    const isHeadless = shouldEnableHeadlessMode(total);
    computeAndAnimateTotalMdBytes();
    if (isHeadless) {
      queueList.style.display = "none";
      queueList.innerHTML = "";
      updateGlobalBatchProgress();
      return;
    }
    queueList.style.display = "flex";
    queueList.innerHTML = state.queue.map((item) => {
      const fileName = item.file && item.file.name || item.name || "documento.txt";
      const ext = fileName.includes(".") ? fileName.split(".").pop() : item.formatInfo && item.formatInfo.parser || "txt";
      const formatIcon = renderFileBadgeIcon(ext);
      const statusClass = item.status;
      const badgeErrorClass = item.status === "error" ? "badge-error" : "";
      const timeText = item.durationMs ? formatElapsedTime(item.durationMs) : "";
      const isProcessing = item.status === "processing";
      const isCompleted = item.status === "completed";
      const isError = item.status === "error";
      const baseName = fileName.replace(/\.[^/.]+$/, "");
      const mdSizeInBytes = item.mdSize || (item.markdownOutput ? new Blob([item.markdownOutput], { type: "text/markdown;charset=utf-8" }).size : 0) || (item.markdown ? new Blob([item.markdown], { type: "text/markdown;charset=utf-8" }).size : 0);
      const mdSizeText = isCompleted && (item.formattedMdSize || mdSizeInBytes > 0) ? `(MD: ${item.formattedMdSize || formatBytes(mdSizeInBytes)})` : "";
      const isReading = !!item.isReading;
      const readingClass = isReading ? "is-reading" : "";
      const isUploadDone = item.uploadProgress >= 100 || isCompleted;
      const isConvertDone = item.convertProgress >= 100 || isCompleted;
      const uploadDoneClass = isUploadDone ? "upload-done" : "";
      const convertDoneClass = isConvertDone ? "convert-done" : "";
      const completedClass = isCompleted ? "completed is-completed" : "";
      const hasErrorClass = isError ? "has-error" : "";
      return `
      <div class="file-queue-item queue-item ${statusClass} ${hasErrorClass} ${completedClass} ${readingClass} ${uploadDoneClass} ${convertDoneClass}" data-id="${item.id}" role="listitem" aria-label="${item.file.name}">
        <!-- BLOCO 1: IDENTIFICA\xC7\xC3O DO ARQUIVO (\xCDcone + Nome + Peso Original) -->
        <div class="item-block item-info queue-item-info">
          ${formatIcon}
          <span class="file-name queue-item-name" title="${item.file.name}">${item.file.name}</span>
          <span class="badge-file-size queue-item-size file-meta queue-item-meta">${formatBytes(item.file.size)}</span>
        </div>

        <!-- BLOCO 2: BARRAS DE CARREGAMENTO / PROGRESSO (Ocultas se .has-error ou conclu\xEDdo) -->
        <div class="item-block item-progress queue-item-progress file-progress-group">
          <div class="mini-progress-wrapper progress-sub-step step-upload">
            <div class="mini-progress-label progress-label">
              <span class="label-with-icon">
                ${renderUploadStepIcon()}
                Upload
              </span>
              <span class="read-percent upload-percent upload-status-text">${item.uploadText || `${item.uploadProgress}%`}</span>
            </div>
            <div class="mini-progress-track progress-bar-container">
              <div class="mini-progress-fill progress-bar-fill bar-read bar-upload" style="width: ${item.uploadProgress}%;"></div>
            </div>
          </div>
          <div class="mini-progress-wrapper progress-sub-step step-conversion">
            <div class="mini-progress-label progress-label">
              <span class="label-with-icon">
                ${renderConvertStepIcon()}
                Convers\xE3o <strong class="md-output-size">${mdSizeText}</strong>
              </span>
              <span class="convert-percent convert-status-text">${item.convertText || `${item.convertProgress}%`}</span>
            </div>
            <div class="mini-progress-track progress-bar-container">
              <div class="mini-progress-fill progress-bar-fill bar-convert ${isCompleted ? "completed" : isError ? "error" : ""}" style="width: ${item.convertProgress}%;"></div>
            </div>
          </div>
        </div>

        <!-- BLOCO DE ERRO: Substitui as barras em caso de falha -->
        <div class="item-block item-error-container" style="${isError ? "display: flex;" : "display: none;"}">
          <div class="item-error-badge" title="${item.errorMessage || "Erro de convers\xE3o"}">
            <span class="icon-error-circle" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </span>
            <span class="error-text">Erro de convers\xE3o</span>
          </div>
        </div>

        <!-- BLOCO 3: STATUS ANIMADO & BOT\xD5ES (Tempo + Peso MD + Check + A\xE7\xF5es) -->
        <div class="item-block item-actions queue-item-actions queue-item-right">
          <!-- Tempo de convers\xE3o formatado (h min s) -->
          <span class="badge-elapsed-time queue-item-time" style="${isCompleted && timeText ? "display: inline-flex;" : "display: none;"}">${timeText}</span>
          <!-- Tamanho do Markdown \xE0 esquerda do certinho -->
          <span class="badge-md-size queue-item-md-size md-output-size" style="${isCompleted && item.formattedMdSize ? "display: inline-flex;" : "display: none;"}">${mdSizeText}</span>

          <div class="status-indicator">
            <!-- Estado Convertendo: Ampulheta girando -->
            <span class="status-icon icon-hourglass ${isProcessing ? "spinning" : ""}" title="Convertendo Markdown..." style="${isProcessing ? "display: inline-flex;" : "display: none;"}">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 22h14"/>
                <path d="M5 2h14"/>
                <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/>
                <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>
              </svg>
            </span>
            <!-- Estado Conclu\xEDdo: Certinho verde -->
            <span class="status-icon icon-check ${isCompleted ? "success" : ""}" title="Conclu\xEDdo" style="${isCompleted ? "display: inline-flex;" : "display: none;"}">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </span>
            <!-- Estado Erro -->
            <span class="status-icon icon-error" title="${item.errorMessage || item.statusText || "Erro"}" style="${isError ? "display: inline-flex;" : "display: none;"}">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            </span>
            <!-- Estado Na Fila -->
            <span class="status-icon icon-queued" title="Na fila" style="${!isProcessing && !isCompleted && !isError ? "display: inline-flex;" : "display: none;"}">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </span>
          </div>

          <span class="queue-item-status ${statusClass} ${badgeErrorClass}" id="status-badge-${item.id}" style="display: none;">${item.statusText}</span>

          <button type="button" class="btn-item-action btn-download btn-queue-item-download btn-download-item" data-id="${item.id}" ${isCompleted ? "" : "disabled"} title="Baixar ${baseName}.md" aria-label="Baixar ${baseName}.md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </button>
          <button type="button" class="btn-item-action btn-remove btn-queue-item-remove btn-remove-item" data-id="${item.id}" title="Remover ${item.file.name}" aria-label="Remover item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 6h18"/>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              <line x1="10" y1="11" x2="10" y2="17"/>
              <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
          </button>
        </div>
      </div>
    `;
    }).join("");
    setupQueueListDelegation(queueList);
    updateGlobalBatchProgress();
  }
  function flushQueueDOMUpdates() {
    queueRafId = null;
    const items = Array.from(pendingQueueDOMUpdates.values());
    pendingQueueDOMUpdates.clear();
    for (const item of items) {
      applyQueueItemDOMUpdate(item);
    }
  }
  function updateQueueItemDOM(item, immediate = false) {
    if (shouldEnableHeadlessMode(state && state.queue ? state.queue.length : 0)) {
      return;
    }
    if (typeof window === "undefined" || typeof requestAnimationFrame === "undefined" || immediate) {
      applyQueueItemDOMUpdate(item);
      return;
    }
    if (item.status === "completed" || item.status === "error") {
      pendingQueueDOMUpdates.delete(item.id);
      applyQueueItemDOMUpdate(item);
      return;
    }
    pendingQueueDOMUpdates.set(item.id, item);
    if (!queueRafId) {
      queueRafId = requestAnimationFrame(flushQueueDOMUpdates);
    }
  }
  function applyQueueItemDOMUpdate(item) {
    if (shouldEnableHeadlessMode(state && state.queue ? state.queue.length : 0)) {
      return;
    }
    const itemEl = elements.fileQueueList ? elements.fileQueueList.querySelector(`.queue-item[data-id="${item.id}"]`) : null;
    if (!itemEl) return;
    const isReading = !!item.isReading;
    const readingClass = isReading ? "is-reading" : "";
    const isUploadDone = item.uploadProgress >= 100 || item.status === "completed";
    const isConvertDone = item.convertProgress >= 100 || item.status === "completed";
    const uploadDoneClass = isUploadDone ? "upload-done" : "";
    const convertDoneClass = isConvertDone ? "convert-done" : "";
    const isError = item.status === "error";
    const hasErrorClass = isError ? "has-error" : "";
    itemEl.className = `file-queue-item queue-item ${item.status} ${hasErrorClass} ${item.status === "completed" ? "is-completed" : ""} ${readingClass} ${uploadDoneClass} ${convertDoneClass}`.trim();
    const errorContainer = itemEl.querySelector(".item-error-container");
    if (errorContainer) {
      errorContainer.style.display = isError ? "flex" : "none";
      const badge = errorContainer.querySelector(".item-error-badge");
      if (badge) {
        badge.setAttribute("title", item.errorMessage || "Erro de convers\xE3o");
      }
    }
    const statusBadge = itemEl.querySelector(`#status-badge-${item.id}`);
    if (statusBadge) {
      const badgeErrorClass = isError ? "badge-error" : "";
      statusBadge.className = `queue-item-status ${item.status} ${badgeErrorClass}`.trim();
      statusBadge.textContent = item.statusText;
    }
    const isProcessing = item.status === "processing";
    const isCompleted = item.status === "completed";
    const isQueued = !isProcessing && !isCompleted && !isError;
    const hourglassIcon = itemEl.querySelector(".icon-hourglass");
    const checkIcon = itemEl.querySelector(".icon-check");
    const errorIcon = itemEl.querySelector(".icon-error");
    const queuedIcon = itemEl.querySelector(".icon-queued");
    if (hourglassIcon) {
      if (isProcessing) {
        hourglassIcon.style.display = "inline-flex";
        hourglassIcon.classList.add("spinning");
      } else {
        hourglassIcon.style.display = "none";
        hourglassIcon.classList.remove("spinning");
      }
    }
    if (checkIcon) {
      if (isCompleted) {
        checkIcon.style.display = "inline-flex";
        checkIcon.classList.add("success");
      } else {
        checkIcon.style.display = "none";
        checkIcon.classList.remove("success");
      }
    }
    if (errorIcon) {
      errorIcon.style.display = isError ? "inline-flex" : "none";
      if (item.errorMessage || item.statusText) {
        errorIcon.setAttribute("title", item.errorMessage || item.statusText);
      }
    }
    if (queuedIcon) {
      queuedIcon.style.display = isQueued ? "inline-flex" : "none";
    }
    const uploadBar = itemEl.querySelector(`.bar-read, .bar-upload`);
    const uploadPercent = itemEl.querySelector(`.upload-status-text, .read-percent, .upload-percent`);
    if (uploadBar) {
      uploadBar.style.width = `${item.uploadProgress}%`;
    }
    if (uploadPercent) {
      uploadPercent.textContent = item.uploadText || `${item.uploadProgress}%`;
    }
    const convertBar = itemEl.querySelector(`.bar-convert`);
    const convertPercent = itemEl.querySelector(`.convert-status-text, .convert-percent`);
    const integerConvertProgress = Math.round(Number(item.convertProgress) || 0);
    if (convertBar) {
      convertBar.style.width = `${integerConvertProgress}%`;
      if (item.status === "completed") {
        convertBar.classList.add("completed");
        convertBar.classList.remove("error");
      } else if (item.status === "error") {
        convertBar.classList.add("error");
        convertBar.classList.remove("completed");
      } else {
        convertBar.classList.remove("completed", "error");
      }
    }
    if (convertPercent) {
      let formattedText = item.convertText || `${integerConvertProgress}%`;
      formattedText = formattedText.replace(/(\d+)\.\d+%/g, "$1%").replace(/Página\s+(\d+)\s*\/\s*(\d+)/gi, "pg. $1/$2").replace(/Página\s+(\d+)\s+de\s+(\d+)/gi, "pg. $1/$2");
      convertPercent.textContent = formattedText;
    }
    const mdSizeInBytes = item.mdSize || (item.markdownOutput ? new Blob([item.markdownOutput], { type: "text/markdown;charset=utf-8" }).size : 0) || (item.markdown ? new Blob([item.markdown], { type: "text/markdown;charset=utf-8" }).size : 0);
    const mdSizeText = item.status === "completed" && (item.formattedMdSize || mdSizeInBytes > 0) ? `(MD: ${item.formattedMdSize || formatBytes(mdSizeInBytes)})` : "";
    const mdSizeEl = itemEl.querySelector(".mini-progress-label .md-output-size");
    if (mdSizeEl) {
      mdSizeEl.textContent = mdSizeText;
    }
    const actionsMdSizeEl = itemEl.querySelector(".badge-md-size, .queue-item-md-size");
    if (actionsMdSizeEl) {
      actionsMdSizeEl.textContent = mdSizeText;
      actionsMdSizeEl.style.display = mdSizeText ? "inline-flex" : "none";
    }
    const elapsedTimeEl = itemEl.querySelector(".badge-elapsed-time, .queue-item-time");
    if (elapsedTimeEl) {
      if (item.status === "completed" && item.durationMs) {
        elapsedTimeEl.textContent = formatElapsedTime(item.durationMs);
        elapsedTimeEl.style.display = "inline-flex";
      } else {
        elapsedTimeEl.textContent = "";
        elapsedTimeEl.style.display = "none";
      }
    }
    const downloadBtn = itemEl.querySelector(`.btn-download, .btn-queue-item-download, .btn-download-item`);
    if (downloadBtn) {
      if (item.status === "completed") {
        if (typeof downloadBtn.removeAttribute === "function") downloadBtn.removeAttribute("disabled");
        downloadBtn.disabled = false;
        if (downloadBtn.style) downloadBtn.style.pointerEvents = "auto";
      } else {
        if (typeof downloadBtn.setAttribute === "function") downloadBtn.setAttribute("disabled", "");
        downloadBtn.disabled = true;
      }
    }
    updateGlobalBatchButtonsState();
  }
  function downloadQueueItem(itemId) {
    const item = state && state.queue ? state.queue.find((it) => it.id === itemId) : null;
    if (!item || !item.markdown && !item.markdownOutput) {
      return null;
    }
    const fileName = getOutputFileName(item.file ? item.file.name : item.name);
    const content = item.markdownOutput || item.markdown || "";
    const result = triggerDownload(fileName, content);
    if (typeof document !== "undefined" && typeof document.querySelector === "function") {
      const cardBtn = document.querySelector(`.btn-download-item[data-id="${itemId}"], .btn-queue-item-download[data-id="${itemId}"]`);
      if (cardBtn && !cardBtn.__isShowingSuccess) {
        cardBtn.__isShowingSuccess = true;
        if (cardBtn.classList && cardBtn.classList.add) cardBtn.classList.add("is-completed-success");
        const originalHtml = cardBtn.innerHTML;
        cardBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
        setTimeout(() => {
          if (cardBtn.classList && cardBtn.classList.remove) cardBtn.classList.remove("is-completed-success");
          cardBtn.innerHTML = originalHtml;
          cardBtn.__isShowingSuccess = false;
        }, 2e3);
      }
    }
    return result;
  }
  function removeQueueItem(itemId) {
    const itemIndex = state.queue.findIndex((it) => it.id === itemId);
    if (itemIndex === -1) return;
    const item = state.queue[itemIndex];
    item.cancelled = true;
    state.queue.splice(itemIndex, 1);
    computeAndAnimateTotalMdBytes();
    renderQueue();
    processQueue();
  }
  function handleBatchChunkAutoScroll(itemIndex, totalQueueItems) {
    if (totalQueueItems >= 50 || state && state.userIsScrolling) return;
    completedCountSinceLastScroll++;
    const isFiveChunk = completedCountSinceLastScroll >= 5;
    const isLastItem = itemIndex === totalQueueItems - 1;
    if (isFiveChunk || isLastItem) {
      completedCountSinceLastScroll = 0;
      const queueList = elements && elements.fileQueueList || (typeof document !== "undefined" ? document.querySelector(".file-queue-list") || document.getElementById("file-queue-list") : null);
      if (!queueList || !queueList.children) return;
      const currentItemCard = queueList.children[itemIndex];
      if (!currentItemCard) return;
      const itemOffset = currentItemCard.offsetTop - queueList.offsetTop;
      if (typeof queueList.scrollTo === "function") {
        queueList.scrollTo({
          top: itemOffset - queueList.clientHeight / 2 + currentItemCard.offsetHeight / 2,
          behavior: "smooth"
        });
      }
    }
  }
  function updateGlobalBatchProgress() {
    const total = state && state.queue ? state.queue.length : 0;
    const globalProgressEl = elements && elements.batchGlobalProgress || (typeof document !== "undefined" ? document.getElementById("batch-global-progress") : null);
    if (!globalProgressEl) return;
    if (total > 10) {
      globalProgressEl.style.display = "block";
    } else {
      globalProgressEl.style.display = "none";
      batchAnimationController.reset();
      updateGlobalBatchButtonsState();
      return;
    }
    const completed = state.queue.filter((item) => item.status === "completed" || item.status === "error").length;
    batchAnimationController.updateTargets(completed, total);
    if (total > 0 && completed >= total) {
      updateGlobalBatchButtonsState();
    }
  }
  function dispatchNext() {
    updateDynamicConcurrency();
    let processingCount = state.queue.filter((it) => it.status === "processing" && !it.cancelled).length;
    while (processingCount < state.maxConcurrency) {
      const queuedItems = state.queue.filter((it) => it.status === "queued" && !it.cancelled);
      if (queuedItems.length === 0) {
        break;
      }
      let nextItem;
      if (state.queue.length > 20 || queuedItems.length > 20) {
        nextItem = queuedItems.reduce((max, it) => {
          const itSize = it.file ? it.file.size : it.size || 0;
          const maxSize = max.file ? max.file.size : max.size || 0;
          return itSize > maxSize ? it : max;
        }, queuedItems[0]);
      } else {
        nextItem = queuedItems[0];
      }
      nextItem.status = "processing";
      processingCount++;
      processQueueItem(nextItem);
    }
    const hasActiveItems = state.queue.some((it) => (it.status === "queued" || it.status === "processing") && !it.cancelled);
    state.isProcessing = hasActiveItems;
    if (!hasActiveItems) {
      state.isExtracting = false;
      updateGlobalBatchButtonsState();
    }
  }
  async function processQueue() {
    dispatchNext();
  }
  async function processQueueItem(item) {
    if (item.cancelled) return;
    if (item.file.size > APP_CONFIG.MAX_FILE_SIZE_BYTES) {
      item.status = "error";
      item.statusText = "Erro de convers\xE3o";
      item.uploadProgress = 0;
      item.uploadText = "0%";
      item.convertProgress = 0;
      item.convertText = "Erro";
      item.progress = 0;
      item.errorMessage = ERROR_CATALOG.FILE_TOO_LARGE;
      updateQueueItemDOM(item, true);
      dispatchNext();
      return;
    }
    item.status = "processing";
    item.isReading = true;
    item.statusText = "Lendo arquivo... (0%)";
    item.uploadProgress = 0;
    item.uploadText = "0%";
    item.convertProgress = 0;
    item.convertText = "Aguardando...";
    item.progress = 0;
    updateQueueItemDOM(item);
    const startTime = performance.now();
    updateDebugStatus(`[Processando]: ${item.file.name} (${formatBytes(item.file.size)})`);
    try {
      const arrayBuffer = await readFileWithProgress(item.file, (readPercent) => {
        if (item.cancelled) return;
        item.isReading = readPercent < 100;
        item.uploadProgress = readPercent;
        item.uploadText = `${readPercent}%`;
        item.convertProgress = 0;
        item.convertText = "Aguardando...";
        item.statusText = `Upload... (${readPercent}%)`;
        updateQueueItemDOM(item);
      });
      if (item.cancelled) {
        item.isReading = false;
        return;
      }
      item.isReading = false;
      item.uploadProgress = 100;
      item.uploadText = "100%";
      item.convertProgress = 20;
      item.convertText = "20% (Iniciando parser...)";
      item.statusText = "Iniciando convers\xE3o... (20%)";
      updateQueueItemDOM(item);
      item.file.arrayBuffer = () => Promise.resolve(arrayBuffer);
      let currentConvert = 20;
      let targetConvert = 20;
      let currentDetail = "Carregando parser...";
      const onParserSubProgress = (subPercent, subDetail) => {
        if (item.cancelled || item.status === "completed" || item.status === "error") return;
        const mapped = Math.round(25 + subPercent * 0.7);
        targetConvert = Math.max(targetConvert, Math.min(95, mapped));
        if (subDetail) currentDetail = subDetail;
        currentConvert = Math.max(currentConvert, targetConvert);
        const integerPercent = Math.round(currentConvert);
        item.convertProgress = integerPercent;
        let detailClean = currentDetail || "";
        detailClean = detailClean.replace(/Página\s+(\d+)\s*\/\s*(\d+)/gi, "pg. $1/$2").replace(/Página\s+(\d+)\s+de\s+(\d+)/gi, "pg. $1/$2").replace(/pg\.\s*(\d+)\s*\/\s*(\d+)/gi, "pg. $1/$2");
        const pageCounterText = detailClean ? ` (${detailClean})` : "";
        item.convertText = `${integerPercent}%${pageCounterText}`.trim();
        item.statusText = `Convertendo... (${integerPercent}%)`;
        updateQueueItemDOM(item);
      };
      const tickerInterval = setInterval(() => {
        if (item.cancelled || item.status === "completed" || item.status === "error") {
          clearInterval(tickerInterval);
          return;
        }
        if (targetConvert <= currentConvert && currentConvert < 90) {
          const remaining = 90 - currentConvert;
          const inc = Math.max(0.25, remaining * 0.04);
          targetConvert = Math.min(90, currentConvert + inc);
        }
        if (currentConvert < targetConvert) {
          const step = (targetConvert - currentConvert) * 0.28;
          currentConvert = Math.min(targetConvert, currentConvert + Math.max(0.4, step));
          const integerPercent = Math.round(currentConvert);
          item.convertProgress = integerPercent;
          let detailClean = currentDetail || "";
          detailClean = detailClean.replace(/Página\s+(\d+)\s*\/\s*(\d+)/gi, "pg. $1/$2").replace(/Página\s+(\d+)\s+de\s+(\d+)/gi, "pg. $1/$2").replace(/pg\.\s*(\d+)\s*\/\s*(\d+)/gi, "pg. $1/$2");
          const pageCounterText = detailClean ? ` (${detailClean})` : "";
          item.convertText = `${integerPercent}%${pageCounterText}`.trim();
          item.statusText = `Convertendo... (${integerPercent}%)`;
          updateQueueItemDOM(item);
        }
      }, 120);
      let markdown = "";
      try {
        const cleanExt = getFileExtension(item.file.name) || (item.file.name.includes(".") ? item.file.name.split(".").pop().toLowerCase() : "");
        switch (item.formatInfo.parser) {
          case "docx":
            markdown = await parseDocx(item.file, onParserSubProgress);
            break;
          case "xlsx":
            markdown = await parseSpreadsheet(item.file, onParserSubProgress);
            break;
          case "pptx":
            markdown = await parsePptx(item.file, onParserSubProgress);
            break;
          case "pdf":
            markdown = await parsePdf(item.file, onParserSubProgress);
            break;
          case "code":
            if (cleanExt === "yaml" || cleanExt === "yml") {
              markdown = parseYaml(arrayBuffer, item.file.name);
            } else {
              markdown = parseSourceCode(arrayBuffer, cleanExt, item.file.name);
            }
            break;
          case "text":
          default: {
            if (cleanExt === "yaml" || cleanExt === "yml") {
              markdown = parseYaml(arrayBuffer, item.file.name);
              break;
            }
            if (CODE_EXTENSIONS_MAP[cleanExt] && !["txt", "html", "htm", "rtf", "md", "markdown", "log", "yaml", "yml"].includes(cleanExt)) {
              markdown = parseSourceCode(arrayBuffer, cleanExt, item.file.name);
              break;
            }
            if (["txt", "json", "html", "htm", "rtf", "md", "markdown", "log", "yaml", "yml"].includes(cleanExt)) {
              markdown = await parseText(item.file, onParserSubProgress);
              break;
            }
            const sample = new Uint8Array(arrayBuffer.slice(0, 8192));
            const hasNullByte = sample.includes(0);
            if (!hasNullByte) {
              markdown = parseSourceCode(arrayBuffer, cleanExt || "text", item.file.name);
            } else {
              throw new Error(`${ERROR_CATALOG.PARSER_NOT_FOUND} (Extens\xE3o "${cleanExt ? "." + cleanExt : "bin\xE1ria"}")`);
            }
            break;
          }
        }
      } finally {
        clearInterval(tickerInterval);
      }
      if (item.cancelled) return;
      const mdSizeInBytes = new Blob([markdown], { type: "text/markdown;charset=utf-8" }).size;
      const formattedMdSize = formatBytes(mdSizeInBytes);
      const duration = Math.round(performance.now() - startTime);
      item.status = "completed";
      item.uploadProgress = 100;
      item.uploadText = "100%";
      item.convertProgress = 100;
      item.convertText = "100%";
      item.progress = 100;
      item.statusText = "Conclu\xEDdo";
      item.markdown = markdown;
      item.markdownOutput = markdown;
      item.durationMs = duration;
      item.mdSize = mdSizeInBytes;
      item.formattedMdSize = formattedMdSize;
      updateQueueItemDOM(item);
      computeAndAnimateTotalMdBytes();
      updateGlobalBatchProgress();
      const formattedDuration = formatElapsedTime(duration);
      updateDebugStatus(`[Conclu\xEDdo]: ${item.file.name} em ${formattedDuration} (MD: ${formattedMdSize})`);
    } catch (error) {
      if (item.cancelled) return;
      item.isReading = false;
      const duration = Math.round(performance.now() - startTime);
      item.status = "error";
      item.convertProgress = 0;
      item.convertText = "Erro";
      item.progress = 0;
      item.statusText = "Erro de convers\xE3o";
      const errMsg = error ? error.message || "" : "";
      if (errMsg.includes("1,5 GB") || errMsg.includes("tamanho") || errMsg.includes("size")) {
        item.errorMessage = ERROR_CATALOG.FILE_TOO_LARGE;
      } else if (errMsg.includes("vazio") || errMsg.includes("0 bytes")) {
        item.errorMessage = ERROR_CATALOG.EMPTY_FILE;
      } else if (errMsg.includes("n\xE3o suportad") || errMsg.includes("parser") || errMsg.includes("desconhecido")) {
        item.errorMessage = ERROR_CATALOG.PARSER_NOT_FOUND;
      } else if (errMsg.includes("senha") || errMsg.includes("corrompid") || errMsg.includes("compactad")) {
        item.errorMessage = ERROR_CATALOG.CORRUPTED_ARCHIVE;
      } else if (errMsg.includes("timeout") || errMsg.includes("tempo")) {
        item.errorMessage = ERROR_CATALOG.TIMEOUT;
      } else {
        item.errorMessage = errMsg ? `${ERROR_CATALOG.PARSING_FAILED} (${errMsg})` : ERROR_CATALOG.PARSING_FAILED;
      }
      item.durationMs = duration;
      updateQueueItemDOM(item);
      updateGlobalBatchProgress();
      const formattedDuration = formatElapsedTime(duration);
      updateDebugStatus(`[Falha]: ${item.file.name} - ${item.errorMessage} (${formattedDuration})`, true);
    } finally {
      if (state && state.queue) {
        const itemIndex = state.queue.findIndex((it) => it.id === item.id);
        if (itemIndex !== -1) {
          handleBatchChunkAutoScroll(itemIndex, state.queue.length);
        }
      }
      computeAndAnimateTotalMdBytes();
      updateGlobalBatchProgress();
      updateGlobalBatchButtonsState();
      dispatchNext();
    }
  }
  function showConsolidationProgress(labelText = "Consolidando:", initialCounter = "0 / 0 (0%)") {
    const bar = elements && elements.consolidationProgress || (typeof document !== "undefined" ? document.getElementById("consolidation-progress") : null);
    const fill = elements && elements.consolidationFill || (typeof document !== "undefined" ? document.getElementById("consolidation-fill") : null);
    const counter = elements && elements.consolidationCounter || (typeof document !== "undefined" ? document.getElementById("consolidation-counter") : null);
    const statusText = elements && elements.consolidationStatusText || (typeof document !== "undefined" ? document.getElementById("consolidation-status-text") : null);
    if (bar) {
      bar.style.display = "block";
    }
    if (fill) {
      fill.style.width = "0%";
      fill.classList.remove("finished");
    }
    if (statusText) {
      statusText.textContent = labelText;
    }
    if (counter) {
      counter.textContent = initialCounter;
    }
  }
  function updateConsolidationProgress(current, total, percent, customText = null) {
    const fill = elements && elements.consolidationFill || (typeof document !== "undefined" ? document.getElementById("consolidation-fill") : null);
    const counter = elements && elements.consolidationCounter || (typeof document !== "undefined" ? document.getElementById("consolidation-counter") : null);
    const statusText = elements && elements.consolidationStatusText || (typeof document !== "undefined" ? document.getElementById("consolidation-status-text") : null);
    const clampedPercent = Math.min(100, Math.max(0, Math.round(percent)));
    if (fill) {
      fill.style.width = `${clampedPercent}%`;
      if (clampedPercent >= 100) {
        fill.classList.add("finished");
      }
    }
    if (customText && statusText) {
      statusText.textContent = customText;
    }
    if (counter) {
      if (total > 0) {
        counter.textContent = `${current} / ${total} arquivos (${clampedPercent}%)`;
      } else {
        counter.textContent = `${clampedPercent}%`;
      }
    }
  }
  function hideConsolidationProgress() {
    const bar = elements && elements.consolidationProgress || (typeof document !== "undefined" ? document.getElementById("consolidation-progress") : null);
    const fill = elements && elements.consolidationFill || (typeof document !== "undefined" ? document.getElementById("consolidation-fill") : null);
    if (fill) {
      fill.style.width = "0%";
      fill.classList.remove("finished");
    }
    if (bar) {
      bar.style.display = "none";
    }
  }
  async function downloadAllZip() {
    const completed = state && state.queue ? state.queue.filter((i) => i.status === "completed" || Boolean(i.markdownOutput)) : [];
    const total = completed.length;
    if (total === 0) {
      return null;
    }
    if (state.isExportingZip) {
      return null;
    }
    state.isExportingZip = true;
    state.isExporting = true;
    if (total === 1) {
      try {
        const item = completed[0];
        const baseName = (item.file ? item.file.name : item.name || "documento").replace(/\.[^/.]+$/, "");
        return triggerDownload(getOutputFileName(baseName), item.markdownOutput || item.markdown);
      } finally {
        state.isExportingZip = false;
        state.isExporting = false;
      }
    }
    const btn = elements && elements.btnQueueDownloadAll || (typeof document !== "undefined" ? document.getElementById("btn-queue-download-all") : null);
    const originalTitle = btn ? btn.getAttribute("title") : "";
    let zipBlob = null;
    try {
      if (btn) {
        btn.setAttribute("disabled", "true");
        btn.classList.add("is-consolidating");
        btn.innerHTML = `
        <svg class="radial-spinner-svg inline-btn-spinner" viewBox="0 0 100 100" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;">
          <line x1="50" y1="14" x2="50" y2="28" stroke-width="8" stroke-linecap="round" class="ray ray-1" />
          <line x1="68" y1="18.8" x2="61" y2="30.9" stroke-width="8" stroke-linecap="round" class="ray ray-2" />
          <line x1="81.2" y1="32" x2="69.1" y2="39" stroke-width="8" stroke-linecap="round" class="ray ray-3" />
          <line x1="86" y1="50" x2="72" y2="50" stroke-width="8" stroke-linecap="round" class="ray ray-4" />
          <line x1="81.2" y1="68" x2="69.1" y2="61" stroke-width="8" stroke-linecap="round" class="ray ray-5" />
          <line x1="68" y1="81.2" x2="61" y2="69.1" stroke-width="8" stroke-linecap="round" class="ray ray-6" />
          <line x1="50" y1="86" x2="50" y2="72" stroke-width="8" stroke-linecap="round" class="ray ray-7" />
          <line x1="32" y1="81.2" x2="39" y2="69.1" stroke-width="8" stroke-linecap="round" class="ray ray-8" />
          <line x1="18.8" y1="68" x2="30.9" y2="61" stroke-width="8" stroke-linecap="round" class="ray ray-9" />
          <line x1="14" y1="50" x2="28" y2="50" stroke-width="8" stroke-linecap="round" class="ray ray-10" />
          <line x1="18.8" y1="32" x2="30.9" y2="39" stroke-width="8" stroke-linecap="round" class="ray ray-11" />
          <line x1="32" y1="18.8" x2="39" y2="30.9" stroke-width="8" stroke-linecap="round" class="ray ray-12" />
        </svg>
        <span class="btn-text-label">Compactando...</span>
      `;
      }
      showConsolidationProgress("Compactando .ZIP:", `0 / ${total} arquivos (0%)`);
      let JSZipClass = typeof window !== "undefined" && window.JSZip || globalThis.JSZip;
      if (!JSZipClass && typeof window !== "undefined") {
        await loadScript(APP_CONFIG.CDN.JSZIP);
        JSZipClass = window.JSZip || globalThis.JSZip;
      }
      if (!JSZipClass && typeof process !== "undefined") {
        try {
          const jszipMod = await import("jszip");
          JSZipClass = jszipMod.default || jszipMod;
        } catch (_) {
        }
      }
      if (!JSZipClass) {
        throw new Error("Biblioteca JSZip indispon\xEDvel.");
      }
      const zip = new JSZipClass();
      const usedNames = /* @__PURE__ */ new Set();
      const CHUNK_SIZE = 10;
      for (let i = 0; i < total; i += CHUNK_SIZE) {
        const slice = completed.slice(i, i + CHUNK_SIZE);
        for (const item of slice) {
          const itemFileName = item.file ? item.file.name : item.name || "documento.md";
          let baseName = itemFileName.replace(/\.[^/.]+$/, "");
          let fileName = `${baseName}.md`;
          let counter = 1;
          while (usedNames.has(fileName)) {
            fileName = `${baseName}_${counter}.md`;
            counter++;
          }
          usedNames.add(fileName);
          zip.file(fileName, item.markdownOutput || item.markdown || "");
        }
        const processed = Math.min(i + CHUNK_SIZE, total);
        const prepPercent = Math.round(processed / total * 30);
        updateConsolidationProgress(processed, total, prepPercent, "Preparando .ZIP:");
        if (btn) {
          const textLabel = btn.querySelector(".btn-text-label");
          if (textLabel) {
            textLabel.textContent = `Preparando ${processed}/${total}...`;
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
      zipBlob = await zip.generateAsync(
        { type: "blob", compression: "DEFLATE" },
        function updateCallback(metadata) {
          const compressionPercent = Math.round(metadata.percent || 0);
          const totalProgress = Math.min(100, Math.round(30 + compressionPercent * 0.7));
          const currentEstimated = Math.round(totalProgress / 100 * total);
          updateConsolidationProgress(currentEstimated, total, totalProgress, "Compactando .ZIP:");
          if (btn) {
            const textLabel = btn.querySelector(".btn-text-label");
            if (textLabel) {
              textLabel.textContent = `Compactando (${totalProgress}%)...`;
            }
          }
        }
      );
      updateConsolidationProgress(total, total, 100, "Conclu\xEDdo:");
      if (typeof URL !== "undefined" && typeof URL.createObjectURL === "function" && typeof document !== "undefined" && document.createElement) {
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `documentos_markdown_${getFormattedTimestamp()}.zip`;
        if (document.body && document.body.appendChild) {
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else {
          a.click();
        }
        if (typeof URL.revokeObjectURL === "function") {
          setTimeout(() => {
            try {
              URL.revokeObjectURL(url);
            } catch (_) {
            }
          }, 5e3);
        }
      }
      await new Promise((r) => setTimeout(r, 200));
    } catch (err) {
      console.error("[doc2md] Erro ao gerar pacote ZIP:", err);
    } finally {
      state.isExporting = false;
      state.isExportingZip = false;
      hideConsolidationProgress();
      if (btn) {
        if (typeof btn.removeAttribute === "function") btn.removeAttribute("disabled");
        btn.disabled = false;
        if (btn.classList && btn.classList.remove) btn.classList.remove("is-consolidating");
        if (btn.style) btn.style.pointerEvents = "auto";
        if (zipBlob) {
          btn.classList.add("is-completed-success");
          btn.__isShowingSuccess = true;
          btn.innerHTML = COMPLETED_ZIP_BUTTON_HTML;
          setTimeout(() => {
            if (btn.classList && btn.classList.remove) btn.classList.remove("is-completed-success");
            btn.innerHTML = DEFAULT_ZIP_BUTTON_HTML;
            btn.__isShowingSuccess = false;
            updateGlobalActionButtonsState();
          }, 2500);
        } else {
          btn.innerHTML = DEFAULT_ZIP_BUTTON_HTML;
        }
        if (originalTitle && typeof btn.setAttribute === "function") btn.setAttribute("title", originalTitle);
      }
      updateGlobalActionButtonsState();
    }
    return { zipBlob, total, blob: zipBlob };
  }
  function buildDirectoryTreeAscii(items) {
    if (!items || items.length === 0) return "";
    const archives = /* @__PURE__ */ new Map();
    for (const item of items) {
      const fileName = item.file ? item.file.name : item.name || "documento.md";
      const archive = item.archiveOrigin || item.file && item.file.archiveOrigin || "(Upload Direto)";
      let folder = item.folderPath || item.file && item.file.folderPath;
      if (!folder) {
        if (item.relativePath && item.relativePath.includes("/")) {
          folder = item.relativePath.substring(0, item.relativePath.lastIndexOf("/"));
        } else {
          folder = archive === "(Upload Direto)" ? "Raiz" : "Raiz do Pacote";
        }
      }
      if (!archives.has(archive)) {
        archives.set(archive, /* @__PURE__ */ new Map());
      }
      const folderMap = archives.get(archive);
      if (!folderMap.has(folder)) {
        folderMap.set(folder, []);
      }
      folderMap.get(folder).push(fileName);
    }
    const lines = [];
    const archiveKeys = Array.from(archives.keys());
    archiveKeys.forEach((archiveName, aIdx) => {
      lines.push(`\u{1F4E6} ${archiveName}`);
      const folderMap = archives.get(archiveName);
      const folderKeys = Array.from(folderMap.keys());
      folderKeys.forEach((folderName, fIdx) => {
        const isLastFolder = fIdx === folderKeys.length - 1;
        const folderBranch = isLastFolder ? "\u2514\u2500\u2500" : "\u251C\u2500\u2500";
        const fileIndent = isLastFolder ? "    " : "\u2502   ";
        const files = folderMap.get(folderName);
        if (folderName === "Raiz" || folderName === "Raiz do Pacote") {
          files.forEach((fName, fileIdx) => {
            const isLastFile = fileIdx === files.length - 1 && isLastFolder;
            const fileBranch = isLastFile ? "\u2514\u2500\u2500" : "\u251C\u2500\u2500";
            lines.push(` ${fileBranch} \u{1F4C4} ${fName}`);
          });
        } else {
          const displayFolder = folderName.endsWith("/") ? folderName : folderName + "/";
          lines.push(` ${folderBranch} \u{1F4C1} ${displayFolder}`);
          files.forEach((fName, fileIdx) => {
            const isLastFile = fileIdx === files.length - 1;
            const fileBranch = isLastFile ? "\u2514\u2500\u2500" : "\u251C\u2500\u2500";
            lines.push(` ${fileIndent} ${fileBranch} \u{1F4C4} ${fName}`);
          });
        }
      });
      if (aIdx < archiveKeys.length - 1) {
        lines.push("");
      }
    });
    return lines.join("\n");
  }
  function buildBacklogSection(items) {
    if (!items || items.length === 0) return "";
    const tableHeader = [
      "# RASTREABILIDADE DE ARQUIVOS E ESTRUTURA DE PASTAS (BACKLOG)",
      "",
      "> Este documento consolidado foi gerado a partir da extra\xE7\xE3o e mesclagem de arquivos.",
      "> A tabela abaixo apresenta o mapeamento de origem das pastas e arquivos processados:",
      "",
      "| Pacote de Origem | Diret\xF3rio / Pasta | Nome do Arquivo | Extens\xE3o | Tamanho Original |",
      "| :--- | :--- | :--- | :--- | :--- |"
    ];
    const tableRows = items.map((item) => {
      const fileName = item.file ? item.file.name : item.name || "documento.md";
      const fileSize = item.file ? item.file.size : item.size || 0;
      const sizeFormatted = formatBytes(fileSize);
      const ext = "." + (fileName.split(".").pop() || "TXT").toUpperCase();
      const archiveOrigin = item.archiveOrigin || item.file && item.file.archiveOrigin || "(Upload Direto)";
      let folderPath = item.folderPath || item.file && item.file.folderPath;
      if (!folderPath) {
        if (item.relativePath && item.relativePath.includes("/")) {
          folderPath = item.relativePath.substring(0, item.relativePath.lastIndexOf("/"));
        } else {
          folderPath = archiveOrigin === "(Upload Direto)" ? "Raiz" : "Raiz do Pacote";
        }
      }
      const cleanFolder = folderPath === "Raiz" || folderPath === "Raiz do Pacote" ? folderPath : folderPath.endsWith("/") ? folderPath : folderPath + "/";
      return `| ${archiveOrigin} | ${cleanFolder} | ${fileName} | ${ext} | ${sizeFormatted} |`;
    });
    const treeAscii = buildDirectoryTreeAscii(items);
    const treeBlock = treeAscii ? [
      "",
      "```plaintext",
      treeAscii,
      "```"
    ] : [];
    return [
      ...tableHeader,
      ...tableRows,
      ...treeBlock,
      "",
      "---",
      "",
      ""
    ].join("\n");
  }
  function formatItemForUnifiedMarkdown(item) {
    const fileName = item.file ? item.file.name : item.name || "documento.md";
    const fileSize = item.file ? item.file.size : item.size || 0;
    const sizeFormatted = formatBytes(fileSize);
    const ext = (fileName.split(".").pop() || "TXT").toUpperCase();
    const archiveOrigin = item.archiveOrigin || item.file && item.file.archiveOrigin || "(Upload Direto)";
    const relativePath = item.relativePath || item.file && item.file.relativePath || fileName;
    let folderPath = item.folderPath || item.file && item.file.folderPath;
    if (!folderPath) {
      if (relativePath.includes("/")) {
        folderPath = relativePath.substring(0, relativePath.lastIndexOf("/"));
      } else {
        folderPath = archiveOrigin === "(Upload Direto)" ? "Raiz" : "Raiz do Pacote";
      }
    }
    const cleanFolder = folderPath === "Raiz" || folderPath === "Raiz do Pacote" ? folderPath : folderPath.endsWith("/") ? folderPath : folderPath + "/";
    let md = (item.markdown || item.markdownOutput || "").trim();
    const codeFenceCount = (md.match(/^```/gm) || []).length;
    if (codeFenceCount % 2 !== 0) {
      md += "\n```";
    }
    const headerDelimiter = [
      "<!-- ================================================================= -->",
      `<!-- IN\xCDCIO DO ARQUIVO: ${relativePath} -->`,
      `<!-- PACOTE DE ORIGEM: ${archiveOrigin} | DIRET\xD3RIO: ${cleanFolder} -->`,
      `<!-- FORMATO: .${ext} | FORMATO ORIGINAL: ${ext} | TAMANHO: ${sizeFormatted} -->`,
      "<!-- ================================================================= -->"
    ].join("\n");
    const footerDelimiter = [
      "<!-- ================================================================= -->",
      `<!-- FIM DO ARQUIVO: ${relativePath} -->`,
      "<!-- ================================================================= -->"
    ].join("\n");
    return `${headerDelimiter}

# ${fileName}
*Origem: \`${archiveOrigin} > ${relativePath}\`*

${md}

${footerDelimiter}

---`;
  }
  async function generateUnifiedMarkdownWithProgress(items, onProgress) {
    const completedItems = (items || state.queue).filter((i) => i.status === "completed" || Boolean(i.markdownOutput));
    const total = completedItems.length;
    if (total === 0) return "";
    const backlog = buildBacklogSection(completedItems);
    const parts = [];
    const CHUNK_SIZE = 10;
    for (let i = 0; i < total; i += CHUNK_SIZE) {
      const slice = completedItems.slice(i, i + CHUNK_SIZE);
      for (const item of slice) {
        parts.push(formatItemForUnifiedMarkdown(item));
      }
      if (typeof onProgress === "function") {
        const currentProcessed = Math.min(i + CHUNK_SIZE, total);
        const percent = Math.round(currentProcessed / total * 100);
        onProgress(currentProcessed, total, percent);
      }
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
    return (backlog || "") + parts.join("\n\n") + "\n";
  }
  async function downloadUnifiedMarkdown() {
    const completed = state && state.queue ? state.queue.filter((i) => i.status === "completed" || Boolean(i.markdownOutput)) : [];
    const total = completed.length;
    if (total === 0) {
      return null;
    }
    if (state.isExportingUnified) {
      return null;
    }
    state.isExportingUnified = true;
    state.isExporting = true;
    const btn = elements && elements.btnDownloadUnified || (typeof document !== "undefined" ? document.getElementById("btn-download-unified") || document.getElementById("btn-queue-download-merged") : null);
    const originalTitle = btn ? btn.getAttribute("title") : "";
    let downloadResult = null;
    try {
      if (btn) {
        btn.setAttribute("disabled", "true");
        btn.classList.add("is-consolidating");
        btn.innerHTML = `
        <span class="icon-merge">
          <svg class="radial-spinner-svg inline-btn-spinner" viewBox="0 0 100 100" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px;">
            <line x1="50" y1="14" x2="50" y2="28" stroke-width="8" stroke-linecap="round" class="ray ray-1" />
            <line x1="68" y1="18.8" x2="61" y2="30.9" stroke-width="8" stroke-linecap="round" class="ray ray-2" />
            <line x1="81.2" y1="32" x2="69.1" y2="39" stroke-width="8" stroke-linecap="round" class="ray ray-3" />
            <line x1="86" y1="50" x2="72" y2="50" stroke-width="8" stroke-linecap="round" class="ray ray-4" />
            <line x1="81.2" y1="68" x2="69.1" y2="61" stroke-width="8" stroke-linecap="round" class="ray ray-5" />
            <line x1="68" y1="81.2" x2="61" y2="69.1" stroke-width="8" stroke-linecap="round" class="ray ray-6" />
            <line x1="50" y1="86" x2="50" y2="72" stroke-width="8" stroke-linecap="round" class="ray ray-7" />
            <line x1="32" y1="81.2" x2="39" y2="69.1" stroke-width="8" stroke-linecap="round" class="ray ray-8" />
            <line x1="18.8" y1="68" x2="30.9" y2="61" stroke-width="8" stroke-linecap="round" class="ray ray-9" />
            <line x1="14" y1="50" x2="28" y2="50" stroke-width="8" stroke-linecap="round" class="ray ray-10" />
            <line x1="18.8" y1="32" x2="30.9" y2="39" stroke-width="8" stroke-linecap="round" class="ray ray-11" />
            <line x1="32" y1="18.8" x2="39" y2="30.9" stroke-width="8" stroke-linecap="round" class="ray ray-12" />
          </svg>
        </span>
        <span class="btn-text-label">Consolidando 0 / ${total} (0%)...</span>
      `;
      }
      showConsolidationProgress("Consolidando:", `0 / ${total} arquivos (0%)`);
      const orderedItems = [...completed];
      const mergedContent = await generateUnifiedMarkdownWithProgress(orderedItems, (current, totalFiles, percent) => {
        updateConsolidationProgress(current, totalFiles, percent, "Consolidando:");
        if (btn) {
          const textLabel = btn.querySelector(".btn-text-label");
          if (textLabel) {
            textLabel.textContent = `Consolidando ${current} / ${totalFiles} (${percent}%)...`;
          }
        }
      });
      const fileName = `documento_unificado_${getFormattedTimestamp()}.md`;
      downloadResult = triggerDownload(fileName, mergedContent);
      updateConsolidationProgress(total, total, 100, "Conclu\xEDdo:");
      await new Promise((r) => setTimeout(r, 200));
    } catch (err) {
      console.error("[doc2md] Erro ao consolidar Markdown unificado:", err);
    } finally {
      state.isExporting = false;
      state.isExportingUnified = false;
      hideConsolidationProgress();
      if (btn) {
        if (typeof btn.removeAttribute === "function") btn.removeAttribute("disabled");
        btn.disabled = false;
        if (btn.classList && btn.classList.remove) btn.classList.remove("is-consolidating");
        if (btn.style) btn.style.pointerEvents = "auto";
        if (downloadResult) {
          btn.classList.add("is-completed-success");
          btn.__isShowingSuccess = true;
          btn.innerHTML = COMPLETED_UNIFIED_BUTTON_HTML;
          setTimeout(() => {
            if (btn.classList && btn.classList.remove) btn.classList.remove("is-completed-success");
            btn.innerHTML = DEFAULT_UNIFIED_BUTTON_HTML;
            btn.__isShowingSuccess = false;
            updateGlobalActionButtonsState();
          }, 2500);
        } else {
          btn.innerHTML = DEFAULT_UNIFIED_BUTTON_HTML;
        }
        if (originalTitle && typeof btn.setAttribute === "function") btn.setAttribute("title", originalTitle);
      }
      updateGlobalActionButtonsState();
    }
    return downloadResult;
  }
  function sortQueueByName(ascending = true) {
    if (!state || !state.queue) return;
    state.sortAscending = ascending;
    state.queue.sort((a, b) => {
      const nameA = a.file ? a.file.name : a.name || "";
      const nameB = b.file ? b.file.name : b.name || "";
      const comp = nameA.localeCompare(nameB, void 0, {
        numeric: true,
        sensitivity: "base"
      });
      return ascending ? comp : -comp;
    });
    renderQueueUI();
    updateSortButtonUI();
  }
  function renderQueueUI() {
    renderQueue();
  }
  function updateSortButtonUI() {
    const btn = elements && elements.btnSortFiles || (typeof document !== "undefined" ? document.getElementById("btn-sort-files") : null);
    const label = elements && elements.sortFilesLabel || (typeof document !== "undefined" ? document.getElementById("sort-files-label") : null);
    if (!btn) return;
    const isAsc = state.sortAscending !== false;
    btn.title = isAsc ? "Classificar arquivos em ordem decrescente (Z-A)" : "Classificar arquivos em ordem crescente (A-Z)";
    if (label) {
      label.textContent = isAsc ? "Classificar A-Z" : "Classificar Z-A";
    }
    const iconAsc = btn.querySelector(".icon-asc");
    const iconDesc = btn.querySelector(".icon-desc");
    if (iconAsc && iconDesc) {
      iconAsc.style.display = isAsc ? "inline-block" : "none";
      iconDesc.style.display = isAsc ? "none" : "inline-block";
    }
  }
  function updateMergeButtonVisibility() {
    const isEnabled = elements.toggleMergeMarkdown ? elements.toggleMergeMarkdown.checked : false;
    state.isMergeEnabled = isEnabled;
    const row = elements.unifiedActionRow || elements.unifiedDownloadContainer || (typeof document !== "undefined" ? document.getElementById("unified-action-row") || document.getElementById("unified-download-container") : null);
    if (row) {
      row.style.display = isEnabled ? "flex" : "none";
    }
    if (elements.btnDownloadUnified) {
      elements.btnDownloadUnified.style.display = isEnabled ? "inline-flex" : "none";
    }
    if (elements.btnQueueDownloadMerged && elements.btnQueueDownloadMerged !== elements.btnDownloadUnified) {
      elements.btnQueueDownloadMerged.style.display = isEnabled ? "inline-flex" : "none";
    }
  }
  function clearQueue() {
    if (!state || !state.queue) return;
    state.queue.forEach((it) => {
      it.cancelled = true;
    });
    state.queue = [];
    state.isExtracting = false;
    state.isProcessing = false;
    state.isExporting = false;
    state.isExportingZip = false;
    state.isExportingUnified = false;
    state.userIsScrolling = false;
    completedCountSinceLastScroll = 0;
    totalBytesAnimController.reset();
    batchAnimationController.reset();
    computeAndAnimateTotalMdBytes();
    renderQueue();
    updateGlobalBatchButtonsState();
  }
  function initQueueEvents() {
    const queueContainer = elements && elements.fileQueueList || (typeof document !== "undefined" ? document.querySelector(".file-queue-list") || document.getElementById("file-queue-list") : null);
    if (queueContainer) {
      setupQueueListDelegation(queueContainer);
    }
    if (elements.btnQueueClear) {
      elements.btnQueueClear.addEventListener("click", () => {
        if (state.queue.length === 0) return;
        clearQueue();
      });
    }
    const btnQueueDownloadAll = elements && elements.btnQueueDownloadAll || (typeof document !== "undefined" ? document.getElementById("btn-queue-download-all") : null);
    if (btnQueueDownloadAll && !btnQueueDownloadAll.__hasDownloadListener) {
      btnQueueDownloadAll.__hasDownloadListener = true;
      btnQueueDownloadAll.addEventListener("click", (e) => {
        e.preventDefault();
        downloadAllZip();
      });
    }
    if (elements.btnSortFiles) {
      elements.btnSortFiles.addEventListener("click", () => {
        state.sortAscending = !(state.sortAscending !== false);
        sortQueueByName(state.sortAscending);
      });
    }
    if (elements.toggleMergeMarkdown) {
      const saved = typeof localStorage !== "undefined" ? localStorage.getItem(APP_CONFIG.STORAGE_KEYS.MERGE_MARKDOWN) : null;
      if (saved !== null) {
        elements.toggleMergeMarkdown.checked = saved === "true";
      }
      updateMergeButtonVisibility();
      updateSortButtonUI();
      elements.toggleMergeMarkdown.addEventListener("change", (e) => {
        state.isMergeEnabled = e.target.checked;
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(APP_CONFIG.STORAGE_KEYS.MERGE_MARKDOWN, String(state.isMergeEnabled));
        }
        if (state.isMergeEnabled) {
          sortQueueByName(state.sortAscending ?? true);
        }
        const unifiedRow = elements.unifiedActionRow || elements.unifiedDownloadContainer || (typeof document !== "undefined" ? document.getElementById("unified-action-row") : null);
        if (unifiedRow) {
          unifiedRow.style.display = state.isMergeEnabled ? "flex" : "none";
        }
        updateMergeButtonVisibility();
      });
    }
    const btnUnified = elements && elements.btnDownloadUnified || elements && elements.btnQueueDownloadMerged || (typeof document !== "undefined" ? document.getElementById("btn-download-unified") || document.getElementById("btn-queue-download-merged") : null);
    if (btnUnified && !btnUnified.__hasUnifiedListener) {
      btnUnified.__hasUnifiedListener = true;
      btnUnified.addEventListener("click", (e) => {
        e.preventDefault();
        downloadUnifiedMarkdown();
      });
    }
    if (elements.fileQueueList) {
      let scrollUserTimer = null;
      const handleUserManualScroll = () => {
        state.userIsScrolling = true;
        if (scrollUserTimer) clearTimeout(scrollUserTimer);
        scrollUserTimer = setTimeout(() => {
          state.userIsScrolling = false;
        }, 2e3);
      };
      elements.fileQueueList.addEventListener("wheel", handleUserManualScroll, { passive: true });
      elements.fileQueueList.addEventListener("touchmove", handleUserManualScroll, { passive: true });
    }
  }
  function initDropzone() {
    const { dropzone, fileInput, btnBrowse } = elements;
    if (btnBrowse && fileInput) {
      btnBrowse.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileInput.value = "";
        fileInput.click();
      });
    }
    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
          console.log(`[doc2md] ${files.length} arquivo(s) capturado(s) via seletor nativo`);
          addFilesToQueue(files);
        }
        fileInput.value = "";
      });
    }
    window.addEventListener("dragover", (e) => {
      e.preventDefault();
    }, false);
    window.addEventListener("drop", (e) => {
      e.preventDefault();
    }, false);
    if (dropzone) {
      dropzone.addEventListener("dragenter", (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add("drag-over");
      });
      dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = "copy";
        }
        dropzone.classList.add("drag-over");
      });
      dropzone.addEventListener("dragleave", (e) => {
        e.preventDefault();
        dropzone.classList.remove("drag-over");
      });
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove("drag-over");
        const files = e.dataTransfer ? e.dataTransfer.files : null;
        if (files && files.length > 0) {
          console.log(`[doc2md] ${files.length} arquivo(s) recebido(s) via Drop`);
          addFilesToQueue(files);
        }
      });
    }
    window.addEventListener("paste", async (e) => {
      if (e.clipboardData && e.clipboardData.files && e.clipboardData.files.length > 0) {
        e.preventDefault();
        console.log(`[doc2md] ${e.clipboardData.files.length} arquivo(s) recebido(s) via Paste (Clipboard)`);
        addFilesToQueue(e.clipboardData.files);
        return;
      }
      const pastedText = e.clipboardData ? e.clipboardData.getData("text") : "";
      if (pastedText && pastedText.trim()) {
        e.preventDefault();
        console.log("[doc2md] Texto puro recebido via Paste (Clipboard)");
        updateDebugStatus(`[Clipboard]: Texto recebido (${pastedText.length} caracteres)`);
        const mockFile = new File([pastedText], "texto_colado.txt", { type: "text/plain" });
        addFilesToQueue([mockFile]);
      }
    });
  }
  function boot() {
    reinitElements();
    initVersion();
    initTheme();
    initDropzone();
    initQueueEvents();
  }
  var state, DEFAULT_ZIP_BUTTON_HTML, DEFAULT_UNIFIED_BUTTON_HTML, COMPLETED_ZIP_BUTTON_HTML, COMPLETED_UNIFIED_BUTTON_HTML, elements, triggerDownload, BATCH_HEADLESS_THRESHOLD, totalBytesAnimController, updateGlobalBatchButtonsState, pendingQueueDOMUpdates, queueRafId, batchAnimationController, completedCountSinceLastScroll;
  var init_app = __esm({
    "js/app.js"() {
      init_config();
      init_docx_parser();
      init_xlsx_parser();
      init_pptx_parser();
      init_pdf_parser();
      init_text_parser();
      if (typeof window !== "undefined") {
        window.onerror = function(message, source, lineno, colno, error) {
          const debugEl = typeof document !== "undefined" ? document.getElementById("debug-status") : null;
          const sourceFile = source ? source.split("/").pop() : "script";
          const errText = `[Erro Fatal/Script]: ${message} (${sourceFile}:${lineno})`;
          if (debugEl) {
            debugEl.style.display = "block";
            debugEl.textContent = errText;
            debugEl.className = "debug-status error";
          }
          console.error("[doc2md Runtime Error]", { message, source, lineno, colno, error });
          return false;
        };
        window.onunhandledrejection = function(event) {
          const debugEl = typeof document !== "undefined" ? document.getElementById("debug-status") : null;
          const reason = event.reason ? event.reason.message || String(event.reason) : "Falha ass\xEDncrona";
          const errText = `[Erro Ass\xEDncrono/CDN]: ${reason}`;
          if (debugEl) {
            debugEl.style.display = "block";
            debugEl.textContent = errText;
            debugEl.className = "debug-status error";
          }
          console.error("[doc2md Unhandled Rejection]", event.reason);
        };
      }
      state = {
        theme: "system",
        queue: [],
        maxConcurrency: 4,
        userIsScrolling: false,
        isMergeEnabled: false,
        sortAscending: true,
        isExtracting: false,
        isProcessing: false,
        isExporting: false,
        isExportingZip: false,
        isExportingUnified: false
      };
      DEFAULT_ZIP_BUTTON_HTML = `
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
  Baixar Todos (.zip)
`.trim();
      DEFAULT_UNIFIED_BUTTON_HTML = `
  <span class="icon-merge">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="12" y1="18" x2="12" y2="12"/>
      <polyline points="9 15 12 18 15 15"/>
    </svg>
  </span>
  Baixar Markdown Unificado (.md)
`.trim();
      COMPLETED_ZIP_BUTTON_HTML = `
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="inline-check-icon">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
  <span class="btn-text-label">Conclu\xEDdo!</span>
`.trim();
      COMPLETED_UNIFIED_BUTTON_HTML = `
  <span class="icon-merge">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="inline-check-icon">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  </span>
  <span class="btn-text-label">Conclu\xEDdo!</span>
`.trim();
      elements = typeof document !== "undefined" ? {
        themeToggle: document.getElementById("theme-toggle"),
        themeIconSun: document.getElementById("theme-icon-sun"),
        themeIconMoon: document.getElementById("theme-icon-moon"),
        headerVersion: document.getElementById("header-version"),
        footerVersion: typeof document !== "undefined" ? document.getElementById("footer-version") || document.querySelector(".footer-version") || document.getElementById("app-version") : null,
        dropzone: document.getElementById("dropzone"),
        fileInput: document.getElementById("file-input"),
        btnBrowse: document.getElementById("btn-browse"),
        debugStatus: document.getElementById("debug-status"),
        // Elementos da Fila de Arquivos em Lote
        fileQueueSection: document.getElementById("file-queue-section"),
        fileQueueList: document.getElementById("file-queue-list"),
        queueCounter: document.getElementById("queue-counter"),
        btnQueueClear: document.getElementById("btn-queue-clear"),
        btnQueueDownloadAll: document.getElementById("btn-queue-download-all"),
        toggleMergeMarkdown: document.getElementById("toggle-merge-markdown"),
        btnSortFiles: document.getElementById("btn-sort-files"),
        sortFilesLabel: document.getElementById("sort-files-label"),
        btnQueueDownloadMerged: document.getElementById("btn-download-unified") || document.getElementById("btn-queue-download-merged"),
        btnDownloadUnified: document.getElementById("btn-download-unified") || document.getElementById("btn-queue-download-merged"),
        unifiedActionRow: document.getElementById("unified-action-row") || document.getElementById("unified-download-container"),
        unifiedDownloadContainer: document.getElementById("unified-action-row") || document.getElementById("unified-download-container"),
        batchGlobalProgress: document.getElementById("batch-global-progress"),
        globalProgressCounter: document.getElementById("global-progress-counter"),
        globalProgressFill: document.getElementById("global-progress-fill"),
        queueTotalBytesCard: document.getElementById("queue-total-bytes-card"),
        liveTotalBytesCounter: document.getElementById("live-total-bytes-counter"),
        liveTotalFormattedUnit: document.getElementById("live-total-formatted-unit"),
        consolidationProgress: document.getElementById("consolidation-progress"),
        consolidationCounter: document.getElementById("consolidation-counter"),
        consolidationFill: document.getElementById("consolidation-fill"),
        consolidationStatusText: document.getElementById("consolidation-status-text")
      } : {};
      triggerDownload = downloadMarkdownFile;
      BATCH_HEADLESS_THRESHOLD = 50;
      totalBytesAnimController = {
        currentBytes: 0,
        targetBytes: 0,
        rafId: null,
        setTarget(newTarget) {
          this.targetBytes = Math.max(0, newTarget);
          if (typeof requestAnimationFrame === "function") {
            if (!this.rafId) {
              this.rafId = requestAnimationFrame(() => this.loop());
            }
          } else {
            this.currentBytes = this.targetBytes;
            this.render(this.targetBytes);
            this.rafId = null;
          }
        },
        loop() {
          const diff = this.targetBytes - this.currentBytes;
          if (Math.abs(diff) > 1) {
            const step = diff * 0.12;
            this.currentBytes += Math.abs(step) < 1 ? Math.sign(diff) : step;
            this.render(Math.round(this.currentBytes));
            if (typeof requestAnimationFrame === "function") {
              this.rafId = requestAnimationFrame(() => this.loop());
            } else {
              this.rafId = null;
            }
          } else {
            this.currentBytes = this.targetBytes;
            this.render(this.targetBytes);
            this.rafId = null;
          }
        },
        render(bytes) {
          const counterEl = elements && elements.liveTotalBytesCounter || (typeof document !== "undefined" ? document.getElementById("live-total-bytes-counter") : null);
          const formattedEl = elements && elements.liveTotalFormattedUnit || (typeof document !== "undefined" ? document.getElementById("live-total-formatted-unit") : null);
          if (!counterEl) return;
          const { value, unit } = formatMdTelemetrySize(bytes);
          counterEl.textContent = value;
          if (formattedEl) {
            formattedEl.textContent = unit;
          }
        },
        reset() {
          if (this.rafId) {
            if (typeof cancelAnimationFrame === "function") {
              cancelAnimationFrame(this.rafId);
            }
            this.rafId = null;
          }
          this.currentBytes = 0;
          this.targetBytes = 0;
          this.render(0);
        }
      };
      updateGlobalBatchButtonsState = updateGlobalActionButtonsState;
      pendingQueueDOMUpdates = /* @__PURE__ */ new Map();
      queueRafId = null;
      batchAnimationController = {
        currentCount: 0,
        targetCount: 0,
        currentPercent: 0,
        targetPercent: 0,
        total: 0,
        lastFrameTime: null,
        rafId: null,
        updateTargets(completed, total) {
          this.targetCount = completed;
          this.total = total;
          this.targetPercent = total > 0 ? completed / total * 100 : 0;
          if (typeof requestAnimationFrame === "function") {
            if (!this.rafId) {
              this.lastFrameTime = typeof performance !== "undefined" && performance.now ? performance.now() : Date.now();
              this.rafId = requestAnimationFrame((now) => this.tick(now));
            }
          } else {
            this.currentCount = this.targetCount;
            this.currentPercent = this.targetPercent;
            this.render(this.targetCount, this.targetPercent);
          }
        },
        tick(now) {
          const perfNow = typeof now === "number" ? now : typeof performance !== "undefined" && performance.now ? performance.now() : Date.now();
          const dt = Math.min((perfNow - (this.lastFrameTime || perfNow)) / 1e3, 0.1);
          this.lastFrameTime = perfNow;
          const smoothing = 1 - Math.exp(-12 * dt);
          const diffCount = this.targetCount - this.currentCount;
          const diffPercent = this.targetPercent - this.currentPercent;
          if (Math.abs(diffCount) > 0.08 || Math.abs(diffPercent) > 0.08) {
            this.currentCount += diffCount * smoothing;
            this.currentPercent += diffPercent * smoothing;
            this.render(Math.round(this.currentCount), this.currentPercent);
            if (typeof requestAnimationFrame === "function") {
              this.rafId = requestAnimationFrame((n) => this.tick(n));
            } else {
              this.rafId = null;
            }
          } else {
            this.currentCount = this.targetCount;
            this.currentPercent = this.targetPercent;
            this.render(this.targetCount, this.targetPercent);
            this.rafId = null;
          }
        },
        render(displayCount, displayPercent) {
          const counterEl = elements && elements.globalProgressCounter || (typeof document !== "undefined" ? document.getElementById("global-progress-counter") : null);
          const fillEl = elements && elements.globalProgressFill || (typeof document !== "undefined" ? document.getElementById("global-progress-fill") : null);
          const globalProgressEl = elements && elements.batchGlobalProgress || (typeof document !== "undefined" ? document.getElementById("batch-global-progress") : null);
          if (counterEl) {
            const roundedPct = Math.min(100, Math.round(displayPercent));
            counterEl.textContent = `${displayCount.toLocaleString("pt-BR")} / ${this.total.toLocaleString("pt-BR")} arquivos processados (${roundedPct}%)`;
          }
          if (fillEl) {
            fillEl.style.width = `${displayPercent.toFixed(2)}%`;
            if (displayPercent >= 99.99) {
              fillEl.classList.add("finished");
            } else {
              fillEl.classList.remove("finished");
            }
          }
          if (globalProgressEl) {
            if (displayPercent >= 99.99) {
              globalProgressEl.classList.add("is-completed");
            } else {
              globalProgressEl.classList.remove("is-completed");
            }
          }
          if (displayPercent >= 99.99 || this.total > 0 && displayCount >= this.total) {
            updateGlobalBatchButtonsState();
          }
        },
        reset() {
          if (this.rafId) {
            if (typeof cancelAnimationFrame === "function") {
              cancelAnimationFrame(this.rafId);
            }
            this.rafId = null;
          }
          this.currentCount = 0;
          this.targetCount = 0;
          this.currentPercent = 0;
          this.targetPercent = 0;
          this.total = 0;
          this.lastFrameTime = null;
          const globalProgressEl = elements && elements.batchGlobalProgress || (typeof document !== "undefined" ? document.getElementById("batch-global-progress") : null);
          if (globalProgressEl) {
            globalProgressEl.classList.remove("is-completed");
          }
          this.render(0, 0);
        }
      };
      completedCountSinceLastScroll = 0;
      if (typeof document !== "undefined") {
        const isSubModule = typeof window.__openToolRegistryActive !== "undefined";
        if (!isSubModule) {
          if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", boot);
          } else {
            boot();
          }
        }
        if (!document.__openMarkGlobalClickAttached) {
          document.__openMarkGlobalClickAttached = true;
          document.addEventListener("click", (e) => {
            const btnUnified = e.target && typeof e.target.closest === "function" ? e.target.closest("#btn-download-unified, .btn-download-unified, .btn-queue-download-merged") : null;
            if (btnUnified) {
              if (typeof e.preventDefault === "function") e.preventDefault();
              if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
              else if (typeof e.stopPropagation === "function") e.stopPropagation();
              downloadUnifiedMarkdown();
              return;
            }
            const btnZip = e.target && typeof e.target.closest === "function" ? e.target.closest("#btn-queue-download-all, .btn-queue-download-all") : null;
            if (btnZip) {
              if (typeof e.preventDefault === "function") e.preventDefault();
              if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
              else if (typeof e.stopPropagation === "function") e.stopPropagation();
              downloadAllZip();
              return;
            }
            const btnItem = e.target && typeof e.target.closest === "function" ? e.target.closest(".btn-download-item, .btn-queue-item-download, .btn-download") : null;
            if (btnItem) {
              if (typeof e.preventDefault === "function") e.preventDefault();
              if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
              else if (typeof e.stopPropagation === "function") e.stopPropagation();
              const itemId = btnItem.dataset ? btnItem.dataset.id : btnItem.getAttribute ? btnItem.getAttribute("data-id") : null;
              if (itemId) {
                downloadQueueItem(itemId);
              }
              return;
            }
          }, true);
        }
      }
    }
  });

  // js/app-doc2md.js
  var app_doc2md_exports = {};
  __export(app_doc2md_exports, {
    initDoc2md: () => initDoc2md
  });
  async function initDoc2md(container) {
    await new Promise((r) => typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame(r) : setTimeout(r, 16));
    try {
      boot();
    } catch (e) {
      console.warn("[app-doc2md] Falha parcial na inicializa\xE7\xE3o:", e.message);
    }
    return function cleanup() {
    };
  }
  var init_app_doc2md = __esm({
    "js/app-doc2md.js"() {
      init_app();
    }
  });

  // js/tool-registry.js
  init_config();
  var import_meta = {};
  var STORAGE_KEY_ACTIVE_TOOL = "opentool_active_tool";
  var _registryBase = typeof import_meta !== "undefined" && import_meta?.url ? new URL(".", import_meta.url).href : "./js/";
  var _preloadedModules = /* @__PURE__ */ new Map();
  function registerToolModule(id, toolModule) {
    _preloadedModules.set(id, toolModule);
  }
  var TOOL_CATALOG = [
    {
      id: "doc2md",
      label: "Doc \u2192 MD",
      description: "Converta documentos, planilhas, PDFs e c\xF3digo para Markdown estruturado",
      modulePath: _registryBase + "tools/doc2md/tool.js",
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>`
    },
    {
      id: "qrcode",
      label: "QR Code",
      description: "Gere QR Codes a partir de links e texto \u2014 100% local, sem servidores",
      modulePath: _registryBase + "tools/qrcode/tool.js",
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="5" y="5" width="3" height="3" fill="currentColor" stroke="none"/>
      <rect x="16" y="5" width="3" height="3" fill="currentColor" stroke="none"/>
      <rect x="5" y="16" width="3" height="3" fill="currentColor" stroke="none"/>
      <path d="M14 14h3v3h-3z" fill="currentColor" stroke="none"/>
      <path d="M17 17h4"/>
      <path d="M17 21v-4"/>
      <path d="M21 17v4"/>
    </svg>`
    }
  ];
  var _activeModule = null;
  var _activeToolId = null;
  var _viewport = null;
  async function initRegistry(viewport) {
    _viewport = viewport;
    const savedTool = localStorage.getItem(STORAGE_KEY_ACTIVE_TOOL);
    const initialTool = TOOL_CATALOG.find((t) => t.id === savedTool) || TOOL_CATALOG[0];
    await activateTool(initialTool.id);
  }
  async function activateTool(toolId) {
    if (toolId === _activeToolId) return;
    const toolMeta = TOOL_CATALOG.find((t) => t.id === toolId);
    if (!toolMeta) {
      console.error(`[ToolRegistry] Ferramenta desconhecida: ${toolId}`);
      return;
    }
    if (_activeModule && typeof _activeModule.unmount === "function") {
      try {
        _activeModule.unmount();
      } catch (e) {
      }
    }
    _viewport.classList.add("tool-viewport--transitioning");
    _viewport.style.minHeight = _viewport.offsetHeight + "px";
    try {
      let mod = null;
      if (_preloadedModules.has(toolId)) {
        mod = { default: _preloadedModules.get(toolId) };
      } else if (typeof window !== "undefined" && window.__OPEN_TOOL_MODULES__ && window.__OPEN_TOOL_MODULES__[toolId]) {
        mod = { default: window.__OPEN_TOOL_MODULES__[toolId] };
      } else {
        mod = await import(toolMeta.modulePath);
      }
      _activeModule = mod.default;
      _activeToolId = toolId;
      if (typeof _activeModule.render === "function") {
        _activeModule.render(_viewport);
      }
      _viewport.style.minHeight = "";
      await new Promise((r) => setTimeout(r, 20));
      if (typeof _activeModule.mount === "function") {
        await _activeModule.mount(_viewport);
      }
      localStorage.setItem(STORAGE_KEY_ACTIVE_TOOL, toolId);
      _updateNavbar(toolId);
      const raf = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : (cb) => setTimeout(cb, 16);
      raf(() => {
        _viewport.classList.remove("tool-viewport--transitioning");
      });
    } catch (err) {
      console.error(`[ToolRegistry] Falha ao carregar ferramenta "${toolId}":`, err);
      _viewport.classList.remove("tool-viewport--transitioning");
      _viewport.style.minHeight = "";
      _viewport.innerHTML = `<div class="tool-error-state">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--error-color);opacity:.6">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <p>Falha ao carregar <strong>${toolMeta.label}</strong></p>
      <p class="tool-error-detail">${err.message}</p>
    </div>`;
    }
  }
  function renderToolbar(container) {
    container.innerHTML = `
    <nav class="tool-navbar" role="tablist" aria-label="Ferramentas dispon\xEDveis">
      <div class="tool-navbar-inner">
        ${TOOL_CATALOG.map((tool3) => `
          <button
            class="tool-nav-btn"
            data-tool-id="${tool3.id}"
            role="tab"
            aria-selected="false"
            title="${tool3.description}"
            id="tool-tab-${tool3.id}"
          >
            <span class="tool-nav-icon" aria-hidden="true">${tool3.icon}</span>
            <span class="tool-nav-label">${tool3.label}</span>
          </button>
        `).join("")}
      </div>
    </nav>
  `;
    container.querySelectorAll(".tool-nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => activateTool(btn.dataset.toolId));
    });
  }
  function _updateNavbar(activeToolId) {
    document.querySelectorAll(".tool-nav-btn").forEach((btn) => {
      const isActive = btn.dataset.toolId === activeToolId;
      btn.classList.toggle("tool-nav-btn--active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });
  }

  // js/tools/doc2md/ui.js
  function getDoc2mdHTML() {
    return `
    <div class="doc2md-tool-root">

      <!-- Se\xE7\xE3o de Apresenta\xE7\xE3o & Dropzone -->
      <section class="hero-section">
        <!-- Cabe\xE7alho Principal -->
        <header class="hero-header">
          <h2 class="hero-title">Conversor Universal &amp; Mesclador de Documentos para Markdown</h2>
          <p class="hero-subtitle">
            Converta, descompacte e unifique documentos, planilhas, apresenta\xE7\xF5es, PDFs e pacotes (.zip/.rar) diretamente no navegador. 100% privado, local e sem depend\xEAncia de servidores.
          </p>
        </header>

        <!-- \xC1rea da Dropzone -->
        <div class="dropzone-container">
          <label for="file-input" class="dropzone" id="dropzone" tabindex="0">
            <div class="dropzone-icon dropzone-icon-wrap" aria-hidden="true">
              <svg class="upload-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>

            <p class="dropzone-main-text dropzone-prompt">
              Arraste e solte seus arquivos ou pacotes (.zip, .rar) aqui, ou clique no bot\xE3o abaixo
            </p>

            <button type="button" id="btn-browse" class="btn btn-primary btn-browse">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Selecionar Arquivo do Computador
            </button>

            <p class="dropzone-subtext dropzone-subprompt">
              Suporta upload em lote, descompacta\xE7\xE3o autom\xE1tica e colagem de arquivos/texto (Ctrl+V)
            </p>

            <div class="format-badges-list format-tags">
              <span class="format-badge format-tag">.docx</span>
              <span class="format-badge format-tag">.xlsx</span>
              <span class="format-badge format-tag">.csv</span>
              <span class="format-badge format-tag">.ods</span>
              <span class="format-badge format-tag">.pptx</span>
              <span class="format-badge format-tag">.pdf</span>
              <span class="format-badge format-tag">.txt</span>
              <span class="format-badge format-tag">.json</span>
              <span class="format-badge format-tag">.yml</span>
              <span class="format-badge format-tag">.yaml</span>
              <span class="format-badge format-tag">.html</span>
              <span class="format-badge format-tag">.rtf</span>
              <span class="format-badge format-tag">.js</span>
              <span class="format-badge format-tag">.py</span>
              <span class="format-badge format-tag">.m</span>
              <span class="format-badge format-tag">.lua</span>
              <span class="format-badge format-tag">.cpp</span>
              <span class="format-badge format-tag">.rs</span>
              <span class="format-badge format-tag">.sh</span>
              <span class="format-badge format-tag">.zip</span>
              <span class="format-badge format-tag">.rar</span>
              <span class="format-badge format-tag highlight">+algumas linguagens de c\xF3digo</span>
            </div>

            <div class="limit-indicator limit-badge" title="Tamanho m\xE1ximo suportado por documento">
              <span class="icon-info">\u24D8</span>
              <span>Limite m\xE1ximo: <strong>1,5 GB</strong> por arquivo ou pacote compactado</span>
            </div>

            <input type="file" id="file-input" class="visually-hidden" multiple style="position: absolute; left: -9999px; opacity: 0;" aria-label="Selecionar arquivos" />
          </label>
        </div>

        <!-- Telemetria e Diagn\xF3stico Visual T\xE9cnico (oculto por padr\xE3o) -->
        <div id="debug-status" class="debug-status" aria-live="polite" style="display: none;"></div>
      </section>

      <!-- Fila de Documentos & Progresso em Lote (File Queue Section) -->
      <section id="file-queue-section" class="file-queue-section" style="display: none;" aria-label="Fila de arquivos para convers\xE3o">
        <div class="file-queue-card">
          <div class="file-queue-header queue-header">
            <!-- LINHA 1: BARRA SUPERIOR FIXA E IMUT\xC1VEL -->
            <div class="queue-header-main">
              <div class="file-queue-title-wrap queue-header-title">
                <div class="file-queue-icon icon-queue" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <h3 class="file-queue-title">
                  Fila de Documentos
                  <span class="file-queue-counter badge-count" id="queue-counter">0 arquivos</span>
                </h3>
              </div>

              <div class="queue-header-actions queue-header-controls">
                <label class="toggle-switch" for="toggle-merge-markdown" title="Compilar todos os arquivos convertidos em um \xFAnico documento Markdown consolidado">
                  <input type="checkbox" id="toggle-merge-markdown">
                  <span class="toggle-slider"></span>
                  <span class="toggle-label">Mesclar arquivos em um \xFAnico .md</span>
                </label>

                <div class="queue-buttons-group queue-static-buttons">
                  <button type="button" id="btn-queue-download-all" class="btn btn-secondary btn-sm" title="Baixar todos os documentos convertidos em arquivo .zip">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Baixar Todos (.zip)
                  </button>
                  <button type="button" id="btn-queue-clear" class="btn btn-ghost btn-sm" title="Limpar todos os arquivos da fila">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M3 6h18"/>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    </svg>
                    Limpar Todos
                  </button>
                </div>
              </div>
            </div>

            <!-- LINHA 2: \xC1REA EXCLUSIVA PARA DOWNLOAD UNIFICADO & ORDENA\xC7\xC3O (SURGE ABAIXO) -->
            <div id="unified-action-row" class="unified-action-row unified-download-container" style="display: none;">
              <div class="merge-sort-container">
                <button type="button" id="btn-sort-files" class="btn-sort" title="Classificar arquivos por ordem alfab\xE9tica">
                  <svg class="sort-icon icon-desc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;">
                    <line x1="5" y1="4" x2="5" y2="20" />
                    <polyline points="2 17 5 20 8 17" />
                    <line x1="11" y1="5" x2="21" y2="5" />
                    <line x1="11" y1="10" x2="18" y2="10" />
                    <line x1="11" y1="15" x2="15" y2="15" />
                    <line x1="11" y1="20" x2="13" y2="20" />
                  </svg>
                  <svg class="sort-icon icon-asc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="20" x2="5" y2="4" />
                    <polyline points="2 7 5 4 8 7" />
                    <line x1="11" y1="5" x2="13" y2="5" />
                    <line x1="11" y1="10" x2="15" y2="10" />
                    <line x1="11" y1="15" x2="18" y2="15" />
                    <line x1="11" y1="20" x2="21" y2="20" />
                  </svg>
                  <span id="sort-files-label">Classificar A-Z</span>
                </button>
              </div>
              <button type="button" id="btn-download-unified" class="btn btn-primary btn-sm btn-unified btn-unified-pulse btn-queue-download-merged" title="Baixar todos os documentos mesclados em um \xFAnico arquivo .md">
                <span class="icon-merge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="12" y1="18" x2="12" y2="12"/>
                    <polyline points="9 15 12 18 15 15"/>
                  </svg>
                </span>
                Baixar Markdown Unificado (.md)
              </button>

              <!-- CARD DE TELEMETRIA DE TOTAL DE BYTES DO MD -->
              <div id="queue-total-bytes-card" class="queue-total-bytes-card">
                <span class="total-bytes-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                  </svg>
                </span>
                <span class="total-bytes-label">Tamanho do MD:</span>
                <span class="total-bytes-values">
                  <strong id="live-total-bytes-counter" class="live-total-bytes-counter">0</strong>
                  <span id="live-total-formatted-unit" class="live-total-formatted-unit">kB</span>
                </span>
              </div>
            </div>

            <!-- BARRA DE PROGRESSO DE CONSOLIDA\xC7\xC3O & EXPORTA\xC7\xC3O ASS\xCDNCRONA -->
            <div id="consolidation-progress" class="consolidation-progress-bar" style="display: none;">
              <div class="consolidation-header">
                <span class="consolidation-label">
                  <span class="consolidation-spinner-icon" id="consolidation-spinner-icon" aria-hidden="true">
                    <svg viewBox="0 0 100 100" class="radial-spinner-svg">
                      <line x1="50" y1="14" x2="50" y2="28" stroke-width="8" stroke-linecap="round" class="ray ray-1" />
                      <line x1="68" y1="18.8" x2="61" y2="30.9" stroke-width="8" stroke-linecap="round" class="ray ray-2" />
                      <line x1="81.2" y1="32" x2="69.1" y2="39" stroke-width="8" stroke-linecap="round" class="ray ray-3" />
                      <line x1="86" y1="50" x2="72" y2="50" stroke-width="8" stroke-linecap="round" class="ray ray-4" />
                      <line x1="81.2" y1="68" x2="69.1" y2="61" stroke-width="8" stroke-linecap="round" class="ray ray-5" />
                      <line x1="68" y1="81.2" x2="61" y2="69.1" stroke-width="8" stroke-linecap="round" class="ray ray-6" />
                      <line x1="50" y1="86" x2="50" y2="72" stroke-width="8" stroke-linecap="round" class="ray ray-7" />
                      <line x1="32" y1="81.2" x2="39" y2="69.1" stroke-width="8" stroke-linecap="round" class="ray ray-8" />
                      <line x1="18.8" y1="68" x2="30.9" y2="61" stroke-width="8" stroke-linecap="round" class="ray ray-9" />
                      <line x1="14" y1="50" x2="28" y2="50" stroke-width="8" stroke-linecap="round" class="ray ray-10" />
                      <line x1="18.8" y1="32" x2="30.9" y2="39" stroke-width="8" stroke-linecap="round" class="ray ray-11" />
                      <line x1="32" y1="18.8" x2="39" y2="30.9" stroke-width="8" stroke-linecap="round" class="ray ray-12" />
                    </svg>
                  </span>
                  <span id="consolidation-status-text">Consolidando:</span>
                </span>
                <strong id="consolidation-counter" class="consolidation-counter">0 / 0 (0%)</strong>
              </div>
              <div class="consolidation-track">
                <div id="consolidation-fill" class="consolidation-fill" style="width: 0%;"></div>
              </div>
            </div>
          </div>

          <!-- BARRA DE CARREGAMENTO / PROGRESSO GLOBAL PARA LOTES (> 10 ARQUIVOS) -->
          <div id="batch-global-progress" class="batch-global-progress" style="display: none;">
            <div class="global-progress-header">
              <span class="global-progress-label">
                <span class="batch-spinner-icon" id="batch-spinner-icon" aria-hidden="true">
                  <svg viewBox="0 0 100 100" class="radial-spinner-svg">
                    <line x1="50" y1="14" x2="50" y2="28" stroke-width="8" stroke-linecap="round" class="ray ray-1" />
                    <line x1="68" y1="18.8" x2="61" y2="30.9" stroke-width="8" stroke-linecap="round" class="ray ray-2" />
                    <line x1="81.2" y1="32" x2="69.1" y2="39" stroke-width="8" stroke-linecap="round" class="ray ray-3" />
                    <line x1="86" y1="50" x2="72" y2="50" stroke-width="8" stroke-linecap="round" class="ray ray-4" />
                    <line x1="81.2" y1="68" x2="69.1" y2="61" stroke-width="8" stroke-linecap="round" class="ray ray-5" />
                    <line x1="68" y1="81.2" x2="61" y2="69.1" stroke-width="8" stroke-linecap="round" class="ray ray-6" />
                    <line x1="50" y1="86" x2="50" y2="72" stroke-width="8" stroke-linecap="round" class="ray ray-7" />
                    <line x1="32" y1="81.2" x2="39" y2="69.1" stroke-width="8" stroke-linecap="round" class="ray ray-8" />
                    <line x1="18.8" y1="68" x2="30.9" y2="61" stroke-width="8" stroke-linecap="round" class="ray ray-9" />
                    <line x1="14" y1="50" x2="28" y2="50" stroke-width="8" stroke-linecap="round" class="ray ray-10" />
                    <line x1="18.8" y1="32" x2="30.9" y2="39" stroke-width="8" stroke-linecap="round" class="ray ray-11" />
                    <line x1="32" y1="18.8" x2="39" y2="30.9" stroke-width="8" stroke-linecap="round" class="ray ray-12" />
                  </svg>
                  <svg viewBox="0 0 24 24" class="batch-success-check-svg" style="display: none;" width="18" height="18" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                Progresso do Lote
              </span>
              <span id="global-progress-counter" class="global-progress-counter">0 / 0 conclu\xEDdos (0%)</span>
            </div>
            <div class="global-progress-track">
              <div id="global-progress-fill" class="global-progress-fill" style="width: 0%;"></div>
            </div>
          </div>

          <div id="file-queue-list" class="file-queue-list" role="list">
            <!-- Itens da fila renderizados dinamicamente -->
          </div>
        </div>
      </section>

    </div>
  `;
  }

  // js/tools/doc2md/tool.js
  var _appModule = null;
  var _cleanupFns = [];
  var tool = {
    id: "doc2md",
    label: "Doc \u2192 MD",
    /**
     * Injeta o HTML da ferramenta no viewport.
     * @param {HTMLElement} container
     */
    render(container) {
      container.innerHTML = getDoc2mdHTML();
    },
    /**
     * Inicializa toda a lógica do conversor.
     * A lógica vive no app.js original — este método garante que ela seja inicializada
     * após o HTML estar no DOM.
     * @param {HTMLElement} container
     */
    async mount(container) {
      _cleanupFns = [];
      if (!_appModule) {
        _appModule = await Promise.resolve().then(() => (init_app_doc2md(), app_doc2md_exports));
      }
      if (typeof _appModule.initDoc2md === "function") {
        const cleanup = await _appModule.initDoc2md(container);
        if (typeof cleanup === "function") {
          _cleanupFns.push(cleanup);
        }
      }
    },
    /**
     * Limpa event listeners e estado quando a ferramenta é desativada.
     */
    unmount() {
      _cleanupFns.forEach((fn) => {
        try {
          fn();
        } catch (e) {
        }
      });
      _cleanupFns = [];
    }
  };
  var tool_default = tool;

  // js/tools/qrcode/ui.js
  function getQRCodeHTML() {
    return `
    <div class="qrcode-tool-root">

      <section class="qrcode-hero">
        <header class="hero-header">
          <h2 class="hero-title">Gerador de QR Code</h2>
          <p class="hero-subtitle">
            Gere QR Codes a partir de links, textos ou qualquer dado. 100% local \u2014 nenhuma informa\xE7\xE3o \xE9 enviada para servidores.
          </p>
        </header>
      </section>

      <div class="qrcode-workspace">

        <!-- Coluna Esquerda: Controles -->
        <div class="qrcode-controls-panel">

          <!-- Input de conte\xFAdo -->
          <div class="qrcode-field-group">
            <label class="qrcode-label" for="qr-input">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
              URL ou texto
            </label>
            <div class="qrcode-input-wrap">
              <textarea
                id="qr-input"
                class="qrcode-textarea"
                placeholder="https://exemplo.com.br ou qualquer texto\u2026"
                rows="4"
                maxlength="2000"
                autocomplete="off"
                spellcheck="false"
              ></textarea>
              <div class="qrcode-char-count">
                <span id="qr-char-count">0</span> / 2000
              </div>
            </div>
            <div id="qr-url-feedback" class="qrcode-url-feedback" aria-live="polite"></div>
          </div>

          <!-- Divisor -->
          <div class="qrcode-divider">
            <span>Personaliza\xE7\xE3o</span>
          </div>

          <!-- Op\xE7\xF5es de personaliza\xE7\xE3o -->
          <div class="qrcode-options-grid">

            <!-- Tamanho -->
            <div class="qrcode-field-group">
              <label class="qrcode-label" for="qr-size">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 21H3V3"/>
                  <path d="m7 17 10-10"/>
                </svg>
                Tamanho
              </label>
              <div class="qrcode-size-control">
                <input type="range" id="qr-size" class="qrcode-range" min="128" max="1024" step="64" value="256">
                <span class="qrcode-size-value"><span id="qr-size-display">256</span> px</span>
              </div>
            </div>

            <!-- N\xEDvel de corre\xE7\xE3o de erro -->
            <div class="qrcode-field-group">
              <label class="qrcode-label" for="qr-ecl">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="m12 14 4-4"/>
                  <path d="M3.34 19a10 10 0 1 1 17.32 0"/>
                </svg>
                Corre\xE7\xE3o de Erro
              </label>
              <div class="qrcode-ecl-group" id="qr-ecl">
                <button class="qrcode-ecl-btn" data-ecl="L" title="7% de recupera\xE7\xE3o">L</button>
                <button class="qrcode-ecl-btn qrcode-ecl-btn--active" data-ecl="M" title="15% de recupera\xE7\xE3o (padr\xE3o)">M</button>
                <button class="qrcode-ecl-btn" data-ecl="Q" title="25% de recupera\xE7\xE3o">Q</button>
                <button class="qrcode-ecl-btn" data-ecl="H" title="30% de recupera\xE7\xE3o (m\xE1ximo)">H</button>
              </div>
              <p class="qrcode-hint" id="qr-ecl-hint">M \u2014 15% de recupera\xE7\xE3o (padr\xE3o)</p>
            </div>

            <!-- Cor do QR (foreground) -->
            <div class="qrcode-field-group">
              <label class="qrcode-label" for="qr-color-fg">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
                  <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
                  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
                  <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
                </svg>
                Cor dos m\xF3dulos
              </label>
              <div class="qrcode-color-row">
                <input type="color" id="qr-color-fg" class="qrcode-color-input" value="#0F172A" title="Cor dos m\xF3dulos">
                <span class="qrcode-color-preview" id="qr-color-fg-preview" style="background:#0F172A;"></span>
                <input type="text" id="qr-color-fg-hex" class="qrcode-hex-input" value="#0F172A" maxlength="7" spellcheck="false">
              </div>
            </div>

            <!-- Cor do fundo (background) -->
            <div class="qrcode-field-group">
              <label class="qrcode-label" for="qr-color-bg">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                </svg>
                Cor do fundo
              </label>
              <div class="qrcode-color-row">
                <input type="color" id="qr-color-bg" class="qrcode-color-input" value="#FFFFFF" title="Cor do fundo">
                <span class="qrcode-color-preview" id="qr-color-bg-preview" style="background:#FFFFFF; border-color: var(--border-subtle);"></span>
                <input type="text" id="qr-color-bg-hex" class="qrcode-hex-input" value="#FFFFFF" maxlength="7" spellcheck="false">
              </div>
            </div>

          </div>

          <!-- Bot\xE3o gerar -->
          <button id="qr-generate-btn" class="btn btn-primary qrcode-generate-btn" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="5" y="5" width="3" height="3" fill="currentColor" stroke="none"/>
              <rect x="16" y="5" width="3" height="3" fill="currentColor" stroke="none"/>
              <rect x="5" y="16" width="3" height="3" fill="currentColor" stroke="none"/>
            </svg>
            Gerar QR Code
          </button>

        </div>

        <!-- Coluna Direita: Preview -->
        <div class="qrcode-preview-panel">

          <!-- Estado vazio -->
          <div id="qr-empty-state" class="qrcode-empty-state">
            <div class="qrcode-empty-icon" aria-hidden="true">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="0.3">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="5" y="5" width="3" height="3" fill="currentColor" stroke="none"/>
                <rect x="16" y="5" width="3" height="3" fill="currentColor" stroke="none"/>
                <rect x="5" y="16" width="3" height="3" fill="currentColor" stroke="none"/>
                <path d="M14 14h3v3h-3z" fill="currentColor" stroke="none"/>
                <path d="M17 17h4"/>
                <path d="M17 21v-4"/>
                <path d="M21 17v4"/>
              </svg>
            </div>
            <p class="qrcode-empty-text">Digite uma URL ou texto e clique em <strong>Gerar QR Code</strong></p>
          </div>

          <!-- Estado de loading -->
          <div id="qr-loading-state" class="qrcode-loading-state" style="display:none;" aria-live="polite">
            <svg viewBox="0 0 100 100" class="radial-spinner-svg qrcode-spinner" width="40" height="40">
              <line x1="50" y1="14" x2="50" y2="28" stroke-width="8" stroke-linecap="round" class="ray ray-1" />
              <line x1="68" y1="18.8" x2="61" y2="30.9" stroke-width="8" stroke-linecap="round" class="ray ray-2" />
              <line x1="81.2" y1="32" x2="69.1" y2="39" stroke-width="8" stroke-linecap="round" class="ray ray-3" />
              <line x1="86" y1="50" x2="72" y2="50" stroke-width="8" stroke-linecap="round" class="ray ray-4" />
              <line x1="81.2" y1="68" x2="69.1" y2="61" stroke-width="8" stroke-linecap="round" class="ray ray-5" />
              <line x1="68" y1="81.2" x2="61" y2="69.1" stroke-width="8" stroke-linecap="round" class="ray ray-6" />
              <line x1="50" y1="86" x2="50" y2="72" stroke-width="8" stroke-linecap="round" class="ray ray-7" />
              <line x1="32" y1="81.2" x2="39" y2="69.1" stroke-width="8" stroke-linecap="round" class="ray ray-8" />
              <line x1="18.8" y1="68" x2="30.9" y2="61" stroke-width="8" stroke-linecap="round" class="ray ray-9" />
              <line x1="14" y1="50" x2="28" y2="50" stroke-width="8" stroke-linecap="round" class="ray ray-10" />
              <line x1="18.8" y1="32" x2="30.9" y2="39" stroke-width="8" stroke-linecap="round" class="ray ray-11" />
              <line x1="32" y1="18.8" x2="39" y2="30.9" stroke-width="8" stroke-linecap="round" class="ray ray-12" />
            </svg>
            <span>Gerando QR Code\u2026</span>
          </div>

          <!-- QR Code gerado -->
          <div id="qr-result" class="qrcode-result" style="display:none;">
            <div class="qrcode-canvas-wrap">
              <div id="qr-canvas-container" class="qrcode-canvas-container"></div>
            </div>

            <!-- Metadados -->
            <div class="qrcode-meta-row">
              <span class="qrcode-meta-badge" id="qr-meta-size">256 \xD7 256 px</span>
              <span class="qrcode-meta-badge" id="qr-meta-ecl">ECL: M</span>
              <span class="qrcode-meta-badge" id="qr-meta-chars">0 caracteres</span>
            </div>

            <!-- A\xE7\xF5es de exporta\xE7\xE3o -->
            <div class="qrcode-actions-row">
              <button id="qr-download-png" class="btn btn-primary qrcode-action-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Baixar PNG
              </button>

              <button id="qr-download-svg" class="btn btn-secondary qrcode-action-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Baixar SVG
              </button>

              <button id="qr-copy-clipboard" class="btn btn-ghost qrcode-action-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                Copiar Imagem
              </button>
            </div>

            <!-- Feedback de c\xF3pia -->
            <div id="qr-copy-feedback" class="qrcode-copy-feedback" aria-live="polite" style="display:none;"></div>
          </div>

        </div>
      </div>
    </div>
  `;
  }

  // js/tools/qrcode/tool.js
  init_config();
  var import_meta2 = {};
  var QRCODE_LIB_URL = typeof import_meta2 !== "undefined" && import_meta2?.url ? new URL("../../lib/qrcodegen.js", import_meta2.url).href : "js/lib/qrcodegen.js";
  var ECL_DESCRIPTIONS = {
    L: "L \u2014 7% de recupera\xE7\xE3o (menor densidade)",
    M: "M \u2014 15% de recupera\xE7\xE3o (padr\xE3o)",
    Q: "Q \u2014 25% de recupera\xE7\xE3o (alta)",
    H: "H \u2014 30% de recupera\xE7\xE3o (m\xE1ximo)"
  };
  var _activeEcl = "M";
  var _listeners = [];
  var _lastQr = null;
  var _lastFg = "#000000";
  var _lastBg = "#ffffff";
  function _on(el, type, fn) {
    if (!el) return;
    el.addEventListener(type, fn);
    _listeners.push({ el, type, fn });
  }
  function _getEcc(key) {
    const { QrCode } = window.qrcodegen;
    return {
      L: QrCode.Ecc.LOW,
      M: QrCode.Ecc.MEDIUM,
      Q: QrCode.Ecc.QUARTILE,
      H: QrCode.Ecc.HIGH
    }[key] || QrCode.Ecc.MEDIUM;
  }
  function _drawQrOnCanvas(qr, canvas, canvasSize, fgColor, bgColor, border = 4) {
    const n = qr.size;
    const scale = Math.floor(canvasSize / (n + border * 2));
    const off = Math.floor((canvasSize - scale * n) / 2);
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    ctx.fillStyle = fgColor;
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (qr.getModule(x, y)) {
          ctx.fillRect(off + x * scale, off + y * scale, scale, scale);
        }
      }
    }
  }
  function _qrToSvgString(qr, fgColor, bgColor, border = 4) {
    const n = qr.size;
    const dim = n + border * 2;
    const parts = [];
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (qr.getModule(x, y)) {
          parts.push(`M${x + border},${y + border}h1v1h-1z`);
        }
      }
    }
    return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ${dim} ${dim}" stroke="none">
  <rect width="${dim}" height="${dim}" fill="${bgColor}"/>
  <path d="${parts.join(" ")}" fill="${fgColor}"/>
</svg>`;
  }
  var tool2 = {
    id: "qrcode",
    label: "QR Code",
    render(container) {
      container.innerHTML = getQRCodeHTML();
    },
    async mount(container) {
      _listeners = [];
      _activeEcl = "M";
      _lastQr = null;
      await loadScript(QRCODE_LIB_URL);
      await new Promise((resolve) => {
        const check = () => typeof window.qrcodegen !== "undefined" ? resolve() : setTimeout(check, 50);
        check();
      });
      const inputEl = container.querySelector("#qr-input");
      const charCountEl = container.querySelector("#qr-char-count");
      const urlFeedback = container.querySelector("#qr-url-feedback");
      const sizeRangeEl = container.querySelector("#qr-size");
      const sizeDisplayEl = container.querySelector("#qr-size-display");
      const eclGroup = container.querySelector("#qr-ecl");
      const eclHint = container.querySelector("#qr-ecl-hint");
      const colorFgEl = container.querySelector("#qr-color-fg");
      const colorFgHexEl = container.querySelector("#qr-color-fg-hex");
      const colorFgPrev = container.querySelector("#qr-color-fg-preview");
      const colorBgEl = container.querySelector("#qr-color-bg");
      const colorBgHexEl = container.querySelector("#qr-color-bg-hex");
      const colorBgPrev = container.querySelector("#qr-color-bg-preview");
      const generateBtn = container.querySelector("#qr-generate-btn");
      const emptyState = container.querySelector("#qr-empty-state");
      const loadingState = container.querySelector("#qr-loading-state");
      const resultEl = container.querySelector("#qr-result");
      const canvasWrap = container.querySelector("#qr-canvas-container");
      const metaSizeEl = container.querySelector("#qr-meta-size");
      const metaEclEl = container.querySelector("#qr-meta-ecl");
      const metaCharsEl = container.querySelector("#qr-meta-chars");
      const downloadPng = container.querySelector("#qr-download-png");
      const downloadSvg = container.querySelector("#qr-download-svg");
      const copyClipboard = container.querySelector("#qr-copy-clipboard");
      const copyFeedback = container.querySelector("#qr-copy-feedback");
      function _isUrl(str) {
        try {
          return Boolean(new URL(str));
        } catch {
          return false;
        }
      }
      function _updateUrlFeedback(val) {
        if (!val.trim()) {
          urlFeedback.textContent = "";
          urlFeedback.className = "qrcode-url-feedback";
          return;
        }
        if (_isUrl(val.trim())) {
          urlFeedback.textContent = "\u2713 URL v\xE1lida detectada";
          urlFeedback.className = "qrcode-url-feedback qrcode-url-feedback--valid";
        } else {
          urlFeedback.textContent = "Texto livre (n\xE3o \xE9 uma URL)";
          urlFeedback.className = "qrcode-url-feedback qrcode-url-feedback--text";
        }
      }
      function _syncColorFromPicker(pickerEl, hexEl, prevEl) {
        const val = pickerEl.value;
        hexEl.value = val.toUpperCase();
        prevEl.style.background = val;
      }
      function _syncColorFromHex(hexEl, pickerEl, prevEl) {
        const val = hexEl.value.trim();
        if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
          pickerEl.value = val;
          prevEl.style.background = val;
        }
      }
      function _setState(state2) {
        emptyState.style.display = state2 === "empty" ? "" : "none";
        loadingState.style.display = state2 === "loading" ? "" : "none";
        resultEl.style.display = state2 === "result" ? "" : "none";
      }
      async function _generate() {
        const text = inputEl.value.trim();
        if (!text) return;
        const size = parseInt(sizeRangeEl.value, 10);
        const fgColor = colorFgEl.value;
        const bgColor = colorBgEl.value;
        const ecl = _getEcc(_activeEcl);
        _setState("loading");
        await new Promise((r) => setTimeout(r, 10));
        try {
          const qr = qrcodegen.QrCode.encodeText(text, ecl);
          _lastQr = qr;
          _lastFg = fgColor;
          _lastBg = bgColor;
          const canvas = document.createElement("canvas");
          _drawQrOnCanvas(qr, canvas, size, fgColor, bgColor);
          canvasWrap.innerHTML = "";
          canvasWrap.appendChild(canvas);
          metaSizeEl.textContent = `${size} \xD7 ${size} px`;
          metaEclEl.textContent = `ECL: ${_activeEcl}`;
          metaCharsEl.textContent = `${text.length} caractere${text.length !== 1 ? "s" : ""}`;
          _setState("result");
          resultEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
        } catch (err) {
          console.error("[QR Code] Falha na gera\xE7\xE3o:", err);
          _setState("empty");
          urlFeedback.textContent = `\u26A0 Erro: ${err.message || "Falha ao gerar QR Code"}`;
          urlFeedback.className = "qrcode-url-feedback qrcode-url-feedback--error";
        }
      }
      function _downloadPng() {
        if (!_lastQr) return;
        const canvas = canvasWrap.querySelector("canvas");
        if (!canvas) return;
        const link = document.createElement("a");
        link.download = `qrcode-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
      function _downloadSvg() {
        if (!_lastQr) return;
        try {
          const svgString = _qrToSvgString(_lastQr, _lastFg, _lastBg);
          const blob = new Blob([svgString], { type: "image/svg+xml" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = `qrcode-${Date.now()}.svg`;
          link.href = url;
          link.click();
          setTimeout(() => URL.revokeObjectURL(url), 1e4);
        } catch (err) {
          console.error("[QR Code] Falha ao exportar SVG:", err);
        }
      }
      async function _copyToClipboard() {
        const canvas = canvasWrap.querySelector("canvas");
        if (!canvas) return;
        try {
          const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
          await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          _showCopyFeedback("\u2713 Imagem copiada para a \xE1rea de transfer\xEAncia!", "success");
        } catch {
          try {
            await navigator.clipboard.writeText(canvas.toDataURL("image/png"));
            _showCopyFeedback("\u2713 Data URL copiado.", "success");
          } catch {
            _showCopyFeedback('\u26A0 N\xE3o foi poss\xEDvel copiar. Use "Baixar PNG".', "error");
          }
        }
      }
      function _showCopyFeedback(msg, type) {
        copyFeedback.textContent = msg;
        copyFeedback.className = `qrcode-copy-feedback qrcode-copy-feedback--${type}`;
        copyFeedback.style.display = "";
        setTimeout(() => {
          copyFeedback.style.display = "none";
        }, 3e3);
      }
      _on(inputEl, "input", () => {
        const val = inputEl.value;
        charCountEl.textContent = val.length;
        generateBtn.disabled = !val.trim();
        _updateUrlFeedback(val);
      });
      _on(inputEl, "keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          if (!generateBtn.disabled) _generate();
        }
      });
      _on(sizeRangeEl, "input", () => {
        sizeDisplayEl.textContent = sizeRangeEl.value;
      });
      eclGroup.querySelectorAll(".qrcode-ecl-btn").forEach((btn) => {
        _on(btn, "click", () => {
          _activeEcl = btn.dataset.ecl;
          eclGroup.querySelectorAll(".qrcode-ecl-btn").forEach(
            (b) => b.classList.toggle("qrcode-ecl-btn--active", b === btn)
          );
          eclHint.textContent = ECL_DESCRIPTIONS[_activeEcl];
        });
      });
      _on(colorFgEl, "input", () => _syncColorFromPicker(colorFgEl, colorFgHexEl, colorFgPrev));
      _on(colorFgHexEl, "input", () => _syncColorFromHex(colorFgHexEl, colorFgEl, colorFgPrev));
      _on(colorBgEl, "input", () => _syncColorFromPicker(colorBgEl, colorBgHexEl, colorBgPrev));
      _on(colorBgHexEl, "input", () => _syncColorFromHex(colorBgHexEl, colorBgEl, colorBgPrev));
      _on(generateBtn, "click", _generate);
      _on(downloadPng, "click", _downloadPng);
      _on(downloadSvg, "click", _downloadSvg);
      _on(copyClipboard, "click", _copyToClipboard);
      const _regenerateIfActive = () => {
        if (_lastQr) _generate();
      };
      _on(sizeRangeEl, "change", _regenerateIfActive);
      _on(colorFgEl, "change", _regenerateIfActive);
      _on(colorBgEl, "change", _regenerateIfActive);
    },
    unmount() {
      _listeners.forEach(({ el, type, fn }) => {
        try {
          el.removeEventListener(type, fn);
        } catch {
        }
      });
      _listeners = [];
      _lastQr = null;
    }
  };
  var tool_default2 = tool2;

  // js/main.js
  init_config();
  window.__openToolRegistryActive = true;
  function initTheme2() {
    const toggleBtn = document.getElementById("theme-toggle");
    const iconSun = document.getElementById("theme-icon-sun");
    const iconMoon = document.getElementById("theme-icon-moon");
    function applyTheme2(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      const isDark = theme === "dark" || theme === "system" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (iconSun) iconSun.style.display = isDark ? "none" : "";
      if (iconMoon) iconMoon.style.display = isDark ? "" : "none";
    }
    const stored = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.THEME) || "system";
    applyTheme2(stored);
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "system";
        const next = current === "dark" ? "light" : "dark";
        applyTheme2(next);
        localStorage.setItem(APP_CONFIG.STORAGE_KEYS.THEME, next);
      });
    }
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        const stored2 = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.THEME) || "system";
        if (stored2 === "system") applyTheme2("system");
      });
    }
  }
  function initVersion2() {
    const headerVersion = document.getElementById("header-version");
    const footerVersion = document.getElementById("footer-version");
    if (headerVersion) headerVersion.textContent = APP_CONFIG.VERSION;
    if (footerVersion) footerVersion.textContent = APP_CONFIG.VERSION;
  }
  async function boot2() {
    initVersion2();
    initTheme2();
    const navbarContainer = document.getElementById("tool-navbar-container");
    if (navbarContainer) {
      renderToolbar(navbarContainer);
    }
    const viewport = document.getElementById("tool-viewport");
    if (viewport) {
      await initRegistry(viewport);
    }
  }
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", boot2);
    } else {
      boot2();
    }
  }

  // js/bundle-entry.js
  if (typeof window !== "undefined") {
    window.__openToolRegistryActive = true;
  }
  registerToolModule("doc2md", tool_default);
  registerToolModule("qrcode", tool_default2);
})();
