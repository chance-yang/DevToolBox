"use client";

import { useState } from "react";

/* Custom SVG toggle: ⊖ (expand) / ⊕ (collapse) */
function Toggle({
  collapsed,
  onClick,
}: {
  collapsed: boolean;
  onClick: () => void;
}) {
  const color = collapsed ? "text-blue-600 dark:text-blue-400" : "text-red-500 dark:text-red-400";
  return (
    <svg
      onClick={onClick}
      className={`mr-0.5 inline cursor-pointer ${color}`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      style={{ verticalAlign: "middle" }}
      aria-label={collapsed ? "Expand" : "Collapse"}
    >
      <circle cx="8" cy="8" r="6.5" />
      <line x1="4" y1="8" x2="12" y2="8" />
      {collapsed && <line x1="8" y1="4" x2="8" y2="12" />}
    </svg>
  );
}

function JsonValue({
  value,
  depth,
  isLast,
}: {
  value: unknown;
  depth: number;
  isLast: boolean;
}) {
  const comma = isLast ? "" : ",";

  if (value === null)
    return <span className="text-zinc-400">null{comma}</span>;
  if (typeof value === "boolean")
    return (
      <span className="text-purple-600 dark:text-purple-400">
        {String(value)}
        {comma}
      </span>
    );
  if (typeof value === "number")
    return (
      <span className="text-blue-600 dark:text-blue-400">
        {String(value)}
        {comma}
      </span>
    );
  if (typeof value === "string")
    return (
      <span>
        <span className="text-green-700 dark:text-green-400">
          &quot;{value}&quot;
        </span>
        {comma}
      </span>
    );
  if (Array.isArray(value))
    return <JsonArray items={value} depth={depth} isLast={isLast} />;
  if (typeof value === "object")
    return (
      <JsonObject
        data={value as Record<string, unknown>}
        depth={depth}
        isLast={isLast}
      />
    );
  return (
    <span>
      {String(value)}
      {comma}
    </span>
  );
}

function JsonObject({
  data,
  depth,
  isLast,
}: {
  data: Record<string, unknown>;
  depth: number;
  isLast: boolean;
}) {
  const entries = Object.entries(data);
  const [collapsed, setCollapsed] = useState(depth > 3);
  const comma = isLast ? "" : ",";

  if (entries.length === 0)
    return <span className="text-zinc-500">{"{}"}{comma}</span>;

  if (collapsed) {
    return (
      <span>
        <Toggle collapsed onClick={() => setCollapsed(false)} />
        <span className="text-zinc-500">{"{"}</span>
        <span
          className="cursor-pointer text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          onClick={() => setCollapsed(false)}
        >
          ...
        </span>
        <span className="text-zinc-500">{"}"}</span>
        {comma}
      </span>
    );
  }

  return (
    <span>
      <Toggle collapsed={false} onClick={() => setCollapsed(true)} />
      <span className="text-zinc-500">{"{"}</span>
      <div className="ml-6">
        {entries.map(([key, val], i) => (
          <div key={key}>
            <span className="text-red-600 dark:text-red-400">
              &quot;{key}&quot;
            </span>
            <span className="text-zinc-400">{": "}</span>
            <JsonValue
              value={val}
              depth={depth + 1}
              isLast={i === entries.length - 1}
            />
          </div>
        ))}
      </div>
      <span className="text-zinc-500">{"}"}</span>
      {comma}
    </span>
  );
}

function JsonArray({
  items,
  depth,
  isLast,
}: {
  items: unknown[];
  depth: number;
  isLast: boolean;
}) {
  const [collapsed, setCollapsed] = useState(depth > 3);
  const comma = isLast ? "" : ",";

  if (items.length === 0)
    return <span className="text-zinc-500">{"[]"}{comma}</span>;

  if (collapsed) {
    return (
      <span>
        <Toggle collapsed onClick={() => setCollapsed(false)} />
        <span className="text-zinc-500">{"["}</span>
        <span
          className="cursor-pointer text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          onClick={() => setCollapsed(false)}
        >
          ...
        </span>
        <span className="text-zinc-500">{"]"}</span>
        {comma}
      </span>
    );
  }

  return (
    <span>
      <Toggle collapsed={false} onClick={() => setCollapsed(true)} />
      <span className="text-zinc-500">{"["}</span>
      <div className="ml-6">
        {items.map((item, i) => (
          <div key={i}>
            <JsonValue
              value={item}
              depth={depth + 1}
              isLast={i === items.length - 1}
            />
          </div>
        ))}
      </div>
      <span className="text-zinc-500">{"]"}</span>
      {comma}
    </span>
  );
}

export default function JsonTreeView({ data }: { data: unknown }) {
  return (
    <div className="overflow-auto font-mono text-sm leading-relaxed">
      <JsonValue value={data} depth={0} isLast />
    </div>
  );
}
