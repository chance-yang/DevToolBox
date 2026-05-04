export interface Tool {
  name: string;
  description: string;
  path: string;
  category: string;
  keywords: string[];
}

export const categories = [
  "Formatters",
  "Encoders / Decoders",
  "Converters",
  "Generators",
  "Web Reference",
] as const;

export const tools: Tool[] = [
  {
    name: "JSON Formatter",
    description: "Format, minify, and validate JSON with syntax highlighting.",
    path: "/tools/json-formatter",
    category: "Formatters",
    keywords: ["json", "format", "validate", "beautify", "minify", "pretty print"],
  },
  {
    name: "Regex Tester",
    description: "Test regular expressions against text with real-time match highlighting.",
    path: "/tools/regex-tester",
    category: "Formatters",
    keywords: ["regex", "regular expression", "pattern", "match", "test"],
  },
  {
    name: "Base64 Encode / Decode",
    description: "Encode text to Base64 or decode Base64 back to plain text.",
    path: "/tools/base64",
    category: "Encoders / Decoders",
    keywords: ["base64", "encode", "decode", "convert"],
  },
  {
    name: "URL Encoder / Decoder",
    description: "Encode or decode URLs and query string parameters.",
    path: "/tools/url-encoder",
    category: "Encoders / Decoders",
    keywords: ["url", "encode", "decode", "percent encoding", "uri"],
  },
  {
    name: "JWT Decoder",
    description: "Decode JSON Web Tokens — view header, payload, and claims.",
    path: "/tools/jwt-decoder",
    category: "Encoders / Decoders",
    keywords: ["jwt", "json web token", "decode", "auth", "bearer"],
  },
  {
    name: "Timestamp Converter",
    description: "Convert between Unix timestamps and human-readable dates.",
    path: "/tools/timestamp",
    category: "Converters",
    keywords: ["timestamp", "unix", "epoch", "date", "time", "convert"],
  },
  {
    name: "Color Converter",
    description: "Convert between HEX, RGB, and HSL with WCAG contrast check.",
    path: "/tools/color-converter",
    category: "Converters",
    keywords: ["color", "hex", "rgb", "hsl", "wcag", "contrast"],
  },
  {
    name: "Number Base Converter",
    description: "Convert between binary, octal, decimal, and hexadecimal numbers.",
    path: "/tools/number-base",
    category: "Converters",
    keywords: ["binary", "hex", "decimal", "octal", "base", "convert"],
  },
  {
    name: "Case Converter",
    description: "Convert text between camelCase, snake_case, kebab-case, and more.",
    path: "/tools/case-converter",
    category: "Converters",
    keywords: ["case", "camelcase", "snake_case", "kebab-case", "pascal", "convert"],
  },
  {
    name: "JSON ↔ YAML",
    description: "Convert JSON to YAML and YAML to JSON with one click.",
    path: "/tools/json-yaml",
    category: "Converters",
    keywords: ["json", "yaml", "convert", "config"],
  },
  {
    name: "UUID Generator",
    description: "Generate random RFC 4122 v4 UUIDs in bulk.",
    path: "/tools/uuid-generator",
    category: "Generators",
    keywords: ["uuid", "guid", "generator", "random", "v4"],
  },
  {
    name: "Hash Generator",
    description: "Compute MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes.",
    path: "/tools/hash-generator",
    category: "Generators",
    keywords: ["hash", "md5", "sha1", "sha256", "sha512", "checksum"],
  },
  {
    name: "QR Code Generator",
    description: "Create scannable QR codes for URLs, text, or contact info.",
    path: "/tools/qr-code",
    category: "Generators",
    keywords: ["qr code", "qrcode", "generator", "url", "barcode"],
  },
  {
    name: "Cron Expression Parser",
    description: "Explain a cron expression in plain English and preview next runs.",
    path: "/tools/cron-parser",
    category: "Web Reference",
    keywords: ["cron", "crontab", "schedule", "parser", "expression"],
  },
  {
    name: "HTTP Status Codes",
    description: "Searchable reference of every HTTP status code and its meaning.",
    path: "/tools/http-status",
    category: "Web Reference",
    keywords: ["http", "status code", "404", "500", "rest", "reference"],
  },
];

export function getToolsByCategory(): Record<string, Tool[]> {
  const grouped: Record<string, Tool[]> = {};
  for (const tool of tools) {
    if (!grouped[tool.category]) grouped[tool.category] = [];
    grouped[tool.category].push(tool);
  }
  return grouped;
}
