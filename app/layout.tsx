import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AdSenseScript from "@/components/ads/AdSenseScript";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DevToolBox - Free Online Developer Tools",
    template: "%s | DevToolBox",
  },
  description:
    "Free online developer tools: JSON formatter, Base64 encoder, URL encoder, regex tester, timestamp converter and more. No sign-up required.",
  metadataBase: new URL("https://7kezhongzi.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <AdSenseScript />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
