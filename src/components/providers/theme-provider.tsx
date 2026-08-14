"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import {
  defaultTheme,
  isThemeId,
  themeStorageKey,
  type ThemeId,
} from "@/lib/themes";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const themeChangeEvent = "lah:themechange";

/**
 * Источник правды — атрибут data-theme на <html>: его ставит инлайн-скрипт
 * до первой отрисовки, поэтому нет мигания. React не владеет темой, а читает
 * её из DOM как из внешнего хранилища.
 */
function subscribe(onChange: () => void) {
  window.addEventListener(themeChangeEvent, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(themeChangeEvent, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readTheme(): ThemeId {
  const applied = document.documentElement.getAttribute("data-theme");
  return isThemeId(applied) ? applied : defaultTheme;
}

/**
 * theme-color принимает не любой синтаксис цвета: вычисленный фон браузер
 * отдаёт как lab()/oklch(), поэтому переводим его в sRGB через канвас —
 * один пиксель заливки и есть надёжная конвертация.
 */
function toHex(color: string): string | null {
  if (!color) return null;

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext("2d");
  if (!context) return null;

  context.fillStyle = color;
  context.fillRect(0, 0, 1, 1);
  const [r, g, b] = context.getImageData(0, 0, 1, 1).data;

  return `#${[r, g, b]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => defaultTheme);

  const setTheme = useCallback((next: ThemeId) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(themeStorageKey, next);
    } catch {
      // приватный режим — тема просто не переживёт перезагрузку
    }
    window.dispatchEvent(new Event(themeChangeEvent));
  }, []);

  // Цвет системной панели браузера идёт за палитрой.
  useEffect(() => {
    const paper = toHex(getComputedStyle(document.body).backgroundColor);
    if (!paper) return;

    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.content = paper;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme нужно вызывать внутри ThemeProvider");
  }
  return context;
}
