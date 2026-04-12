# DevToolBox

Free, open-source online developer tools. All tools run entirely in your browser — your data never leaves your device.

**English** | [中文](#中文说明)

## Features

- **JSON Formatter & Validator** — Format, minify, validate JSON with interactive tree view, code editor with line numbers, and draggable split panel
- **Base64 Encode / Decode** — Encode text to Base64 or decode Base64 back to plain text, supports full Unicode including CJK characters
- **URL Encoder / Decoder** — Encode or decode URLs and query string parameters, supports both `encodeURIComponent` and `encodeURI`
- **Regex Tester** — Test regular expressions with real-time match highlighting, capture group display, and flag controls
- **Timestamp Converter** — Convert between Unix timestamps and human-readable dates with a live clock

### Why DevToolBox?

- **Privacy first** — Everything runs in the browser. Zero data sent to servers.
- **No sign-up** — Just open and use. No accounts, no tracking.
- **i18n** — Full English and Chinese support with auto language detection.
- **Fast** — Static site generation (SSG) for instant page loads.
- **Open source** — MIT licensed. Contributions welcome.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Deployment | Vercel |
| Package Manager | pnpm |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/chance-yang/DevToolBox.git
cd DevToolBox

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
pnpm build
```

All pages are statically generated for optimal performance.

## Project Structure

```
devtoolbox/
├── app/
│   ├── [locale]/                # i18n route (en, zh)
│   │   ├── page.tsx             # Home page
│   │   └── tools/
│   │       ├── json-formatter/  # JSON Formatter
│   │       ├── base64/          # Base64 Encode/Decode
│   │       ├── url-encoder/     # URL Encoder/Decoder
│   │       ├── regex-tester/    # Regex Tester
│   │       └── timestamp/       # Timestamp Converter
│   ├── sitemap.ts               # Auto-generated sitemap
│   └── robots.ts                # robots.txt
├── components/
│   ├── layout/                  # Header, Sidebar, Footer
│   ├── ads/                     # AdSense components
│   ├── tools/                   # Shared tool components
│   └── ui/                      # UI components
├── lib/
│   ├── dictionaries/            # en.json, zh.json
│   ├── i18n.ts                  # i18n config
│   ├── tools.ts                 # Tool metadata registry
│   └── seo.ts                   # SEO helpers
└── middleware.ts                # Language detection & redirect
```

## Adding a New Tool

1. Add tool metadata to `lib/tools.ts`
2. Add translations to `lib/dictionaries/en.json` and `zh.json`
3. Create `app/[locale]/tools/your-tool/page.tsx` and `layout.tsx`
4. Done — the tool auto-appears in sidebar and home page

## Deploy

The easiest way to deploy is with [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/chance-yang/DevToolBox)

## Contributing

Contributions are welcome! Feel free to:

- Add new developer tools
- Improve existing tools
- Add new language translations
- Fix bugs or improve UI

## License

[MIT](LICENSE)

---

## 中文说明

免费、开源的在线开发者工具集。所有工具完全在浏览器中运行，数据不会离开您的设备。

### 工具列表

- **JSON 格式化 & 校验** — 格式化、压缩、校验 JSON，支持树形视图、带行号编辑器、可拖拽分栏
- **Base64 编解码** — 文本与 Base64 互转，支持中文等 Unicode 字符
- **URL 编解码** — URL 编码和解码，支持 encodeURIComponent 和 encodeURI
- **正则表达式测试** — 实时匹配高亮、捕获组展示、标志位控制
- **时间戳转换** — Unix 时间戳与可读日期互转，实时时钟显示

### 本地运行

```bash
git clone https://github.com/chance-yang/DevToolBox.git
cd DevToolBox
pnpm install
pnpm dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000) 即可使用。
