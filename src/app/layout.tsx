import type { Metadata } from "next";
import { Golos_Text, Literata, Onest } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { defaultTheme, themeBootstrapScript } from "@/lib/themes";
import "./globals.css";

/** Заголовки: геометричный гротеск с кириллицей от природы. */
const display = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

/** Основной текст и интерфейс: спроектирован под длинную кириллицу. */
const sans = Golos_Text({
  variable: "--font-golos",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

/** «Голос»: только реплики в разговоре и цитаты. */
const voice = Literata({
  variable: "--font-literata",
  subsets: ["latin", "cyrillic"],
  style: ["italic"],
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
      data-theme={defaultTheme}
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${voice.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <script
          // Ставит выбранную палитру до первой отрисовки, без вспышки.
          dangerouslySetInnerHTML={{ __html: themeBootstrapScript }}
        />
        <ThemeProvider>
          <QueryProvider>
            <div className="app-root flex min-h-dvh flex-col">
              <a
                href="#content"
                className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded-full focus-visible:bg-band focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:text-on-band"
              >
                К основному содержанию
              </a>
              <SiteHeader />
              <main id="content" className="flex-1">
                {children}
              </main>
              <SiteFooter />
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
