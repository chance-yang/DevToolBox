import Link from "next/link";
import type { Tool } from "@/lib/tools";

export default function ToolCard({
  tool,
  locale,
  name,
  description,
}: {
  tool: Tool;
  locale: string;
  name?: string;
  description?: string;
}) {
  return (
    <Link
      href={`/${locale}${tool.path}`}
      className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-700"
    >
      <h3 className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
        {name ?? tool.name}
      </h3>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        {description ?? tool.description}
      </p>
    </Link>
  );
}
