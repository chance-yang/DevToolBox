"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getToolsByCategory } from "@/lib/tools";
import { useDict } from "@/lib/DictContext";

export default function Sidebar({
  locale,
  open,
}: {
  locale: string;
  open: boolean;
}) {
  const pathname = usePathname();
  const dict = useDict();
  const grouped = getToolsByCategory();

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-20 bg-black/30 lg:hidden" />
      )}

      <aside
        className={`fixed top-10 left-0 z-20 h-[calc(100vh-2.5rem)] w-48 shrink-0 overflow-y-auto border-r border-zinc-200 bg-white p-3 transition-transform dark:border-zinc-800 dark:bg-zinc-950 lg:sticky lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="space-y-5">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {(dict.categories as Record<string, string>)[category] ?? category}
              </h3>
              <ul className="space-y-0.5">
                {items.map((tool) => {
                  const localePath = `/${locale}${tool.path}`;
                  const active = pathname === localePath;
                  const toolKey = tool.path.replace("/tools/", "") as keyof typeof dict.tools;
                  const toolDict = dict.tools[toolKey];
                  return (
                    <li key={tool.path}>
                      <Link
                        href={localePath}
                        className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                          active
                            ? "bg-blue-50 font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                            : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                        }`}
                      >
                        {toolDict?.name ?? tool.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
