"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

const FULL_SCREEN_TOOLS = ["/tools/json-formatter"];

export default function AppShell({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
  const isFullScreen = FULL_SCREEN_TOOLS.includes(pathWithoutLocale);

  return (
    <>
      <Header
        locale={locale}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar locale={locale} open={sidebarOpen} />
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <main
          className={`flex-1 overflow-hidden ${isFullScreen ? "" : "overflow-y-auto p-3 sm:p-4 lg:p-5"}`}
        >
          {children}
        </main>
      </div>
      {!isFullScreen && <Footer locale={locale} />}
    </>
  );
}
