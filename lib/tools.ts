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
    name: "Regex Tester",
    description: "Test regular expressions against text with real-time match highlighting.",
    path: "/tools/regex-tester",
    category: "Formatters",
    keywords: ["regex", "regular expression", "pattern", "match", "test"],
  },
  {
    name: "Timestamp Converter",
    description: "Convert between Unix timestamps and human-readable dates.",
    path: "/tools/timestamp",
    category: "Converters",
    keywords: ["timestamp", "unix", "epoch", "date", "time", "convert"],
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
