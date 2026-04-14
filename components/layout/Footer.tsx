"use client";

import Link from "next/link";
import { useDict } from "@/lib/DictContext";

export default function Footer({ locale }: { locale: string }) {
  const dict = useDict();
  return (
    <footer className="border-t border-zinc-200 bg-white px-4 py-4 text-center text-xs text-zinc-400 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <span>
          &copy; {new Date().getFullYear()} {dict.site.footer}
        </span>
        <Link href={`/${locale}/about`} className="hover:text-zinc-700 dark:hover:text-zinc-200">
          {dict.nav.about}
        </Link>
        <Link href={`/${locale}/privacy`} className="hover:text-zinc-700 dark:hover:text-zinc-200">
          {dict.nav.privacy}
        </Link>
        <Link href={`/${locale}/terms`} className="hover:text-zinc-700 dark:hover:text-zinc-200">
          {dict.nav.terms}
        </Link>
      </div>
    </footer>
  );
}
