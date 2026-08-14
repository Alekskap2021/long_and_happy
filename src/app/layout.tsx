import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans-text",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const serif = Source_Serif_4({
  variable: "--font-serif-display",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const siteUrl = "https://dolgo-i-schastlivo.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Долго и счастливо — о трудных разговорах в отношениях",
    template: "%s — Долго и счастливо",
  },
  description:
    "Авторский проект двух психологов о трудных разговорах: бесплатная диагностика, библиотека материалов, практикумы и курсы о том, что мы делаем словами.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Долго и счастливо",
    title: "Долго и счастливо — о трудных разговорах в отношениях",
    description:
      "Узнать свою ситуацию, попробовать наш способ смотреть на разговор и выбрать подходящий следующий шаг.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <QueryProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </QueryProvider>
      </body>
    </html>
  );
}
