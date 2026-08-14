"use client";

import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { ListLink } from "@/components/ui/list-link";
import { Panel } from "@/components/ui/panel";
import { Tag } from "@/components/ui/tag";
import {
  formatLabels,
  levelLabels,
  themeLabels,
  type MaterialFormat,
  type MaterialLevel,
  type ThemeSlug,
} from "@/content/taxonomy";
import { fetchMaterials, type MaterialQuery } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

type FilterKey = keyof MaterialQuery;

/**
 * Фильтры живут в URL: ссылку с темой можно дать из статьи,
 * из результата диагностики или из соцсетей.
 */
export function LibraryBrowser() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query: MaterialQuery = {
    theme: searchParams.get("theme") ?? undefined,
    format: searchParams.get("format") ?? undefined,
    level: searchParams.get("level") ?? undefined,
  };

  const { data, isPending, isError, error, isPlaceholderData } = useQuery({
    queryKey: queryKeys.materials(query),
    queryFn: () => fetchMaterials(query),
    placeholderData: (previous) => previous,
  });

  const setFilter = useCallback(
    (key: FilterKey, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value || params.get(key) === value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      const search = params.toString();
      router.replace(search ? `/besplatno?${search}` : "/besplatno", {
        scroll: false,
      });
    },
    [router, searchParams],
  );

  const facets = data?.facets;
  const activeCount = Object.values(query).filter(Boolean).length;

  return (
    <div>
      <Panel padded={false}>
        <div className="divide-y divide-line">
          <FilterRow
            label="Тема"
            options={Object.keys(themeLabels).map((slug) => ({
              value: slug,
              label: themeLabels[slug as ThemeSlug],
              count: facets?.themes[slug] ?? 0,
            }))}
            active={query.theme}
            onSelect={(value) => setFilter("theme", value)}
          />
          <FilterRow
            label="Формат"
            options={Object.keys(formatLabels).map((format) => ({
              value: format,
              label: formatLabels[format as MaterialFormat],
              count: facets?.formats[format] ?? 0,
            }))}
            active={query.format}
            onSelect={(value) => setFilter("format", value)}
          />
          <FilterRow
            label="Уровень"
            options={Object.keys(levelLabels).map((level) => ({
              value: level,
              label: levelLabels[level as MaterialLevel],
              count: facets?.levels[level] ?? 0,
            }))}
            active={query.level}
            onSelect={(value) => setFilter("level", value)}
          />
        </div>
      </Panel>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        {data && (
          <p className="text-sm text-ink-muted">
            {data.items.length === 0
              ? "По этим фильтрам пока ничего нет — библиотека растёт."
              : `Материалов: ${data.items.length} из ${data.facets.total}`}
          </p>
        )}

        {activeCount > 0 && (
          <button
            type="button"
            onClick={() => router.replace("/besplatno", { scroll: false })}
            className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors duration-200 ease-calm hover:text-accent-hover"
          >
            <X aria-hidden className="h-3.5 w-3.5" strokeWidth={1.75} />
            Сбросить фильтры
          </button>
        )}
      </div>

      <div className="mt-4">
        {isPending && <p className="text-ink-muted">Загружаем материалы…</p>}

        {isError && (
          <p className="text-boundary">
            {error instanceof Error ? error.message : "Не удалось загрузить"}
          </p>
        )}

        {data && (
          <ul
            className={`-mx-5 grid transition-opacity duration-200 ease-calm sm:-mx-6 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 ${
              isPlaceholderData ? "opacity-55" : ""
            }`}
          >
            {data.items.map((material) => (
              <li key={material.slug}>
                <ListLink href={`/besplatno/${material.slug}`}>
                  <span className="flex flex-wrap items-center gap-2.5">
                    <Tag tone="accent" icon={material.format}>
                      {formatLabels[material.format]}
                    </Tag>
                    <span className="text-xs text-ink-muted">
                      {material.readingMinutes} мин
                    </span>
                  </span>
                  <p className="mt-4 font-display text-[1.2rem] leading-snug">
                    {material.title}
                  </p>
                  <p className="mt-2.5 text-[0.95rem] text-ink-soft">
                    {material.excerpt}
                  </p>
                  <span className="mt-4 flex flex-wrap gap-1.5">
                    {material.themes.map((theme) => (
                      <Tag key={theme} tone="outline">
                        {themeLabels[theme]}
                      </Tag>
                    ))}
                  </span>
                </ListLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/**
 * Один ряд фильтра — Base UI Toggle Group: клавиатура и состояние data-pressed
 * из коробки. Выбор одиночный, поэтому берём последнее нажатое значение.
 */
function FilterRow({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: { value: string; label: string; count: number }[];
  active?: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:gap-5 sm:px-6">
      <p className="shrink-0 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink-muted sm:w-20">
        {label}
      </p>

      <ToggleGroup
        aria-label={label}
        value={active ? [active] : []}
        onValueChange={(value) => {
          const next = value.at(-1);
          onSelect(next ?? active ?? "");
        }}
        className="-mx-1 flex flex-wrap gap-1.5 px-1"
      >
        {options.map((option) => (
          <Toggle
            key={option.value}
            value={option.value}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-200 ease-calm data-pressed:border-accent data-pressed:bg-accent data-pressed:text-on-accent motion-reduce:transition-none ${
              option.count === 0
                ? "border-line text-ink-muted/60"
                : "border-line text-ink-soft hover:border-line-hover hover:bg-surface-hover"
            }`}
          >
            {option.label}
            {option.count > 0 && (
              <span className="ml-1.5 opacity-70">{option.count}</span>
            )}
          </Toggle>
        ))}
      </ToggleGroup>
    </div>
  );
}
