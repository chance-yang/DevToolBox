"use client";

import { useDict } from "@/lib/DictContext";

export default function Footer({ locale }: { locale: string }) {
  const dict = useDict();
  return (
    <footer className="border-t border-zinc-200 bg-white px-4 py-4 text-center text-xs text-zinc-400 dark:border-zinc-800 dark:bg-zinc-950">
      &copy; {new Date().getFullYear()} {dict.site.footer}
    </footer>
  );
}
