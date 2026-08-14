"use client";

import { Select } from "@base-ui/react/select";
import { Check, ChevronDown, SwatchBook } from "lucide-react";

import { useTheme } from "@/components/providers/theme-provider";
import { themes, type ThemeId } from "@/lib/themes";

const items = themes.map((theme) => ({ value: theme.id, label: theme.label }));

/** Три точки палитры: цвета берутся из токенов темы, а не из пропсов. */
function Swatch({ theme }: { theme: ThemeId }) {
  return (
    <span
      data-theme={theme}
      aria-hidden
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line bg-paper"
    >
      <span className="flex gap-[2px]">
        <span className="h-2 w-2 rounded-full bg-accent" />
        <span className="h-2 w-2 rounded-full bg-second" />
      </span>
    </span>
  );
}

export function ThemeSwitcher({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <Select.Root
      items={items}
      value={theme}
      onValueChange={(value) => setTheme(value as ThemeId)}
    >
      <Select.Trigger
        aria-label="Палитра сайта"
        className={`inline-flex items-center gap-2 rounded-full border border-line px-3 py-2 text-sm text-ink-soft transition-colors duration-200 ease-calm hover:border-line-hover hover:text-ink data-[popup-open]:border-line-hover ${className}`}
      >
        <SwatchBook className="h-4 w-4" strokeWidth={1.75} />
        <Select.Value className="hidden sm:inline" />
        <Select.Icon className="hidden sm:inline">
          <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.75} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner
          className="z-50 outline-none"
          sideOffset={8}
          align="end"
          alignItemWithTrigger={false}
        >
          {/* Палитр восемь: список ограничен свободным местом до края экрана
              (--available-height от позиционера) и скроллится внутри. */}
          <Select.Popup className="flex max-h-[var(--available-height)] min-w-64 origin-[var(--transform-origin)] flex-col overflow-hidden rounded-card border border-line bg-elevated p-1.5 shadow-[0_18px_50px_-24px_color-mix(in_oklab,var(--ink)_45%,transparent)] transition-[opacity,transform] duration-200 ease-calm data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0 motion-reduce:transition-none">
            <p className="shrink-0 px-2.5 pb-1.5 pt-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Палитра
            </p>
            <Select.List className="min-h-0 overflow-y-auto overscroll-contain">
              {themes.map((item) => (
                <Select.Item
                  key={item.id}
                  value={item.id}
                  className="flex cursor-default items-center gap-3 rounded-[0.7rem] px-2.5 py-2 outline-none transition-colors duration-150 data-highlighted:bg-surface-hover"
                >
                  <Swatch theme={item.id} />
                  <span className="min-w-0 flex-1">
                    <Select.ItemText className="block text-[0.95rem] text-ink">
                      {item.label}
                    </Select.ItemText>
                    <span className="block truncate text-xs text-ink-muted">
                      {item.mood}
                    </span>
                  </span>
                  <Select.ItemIndicator className="shrink-0 text-accent">
                    <Check className="h-4 w-4" strokeWidth={2} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
