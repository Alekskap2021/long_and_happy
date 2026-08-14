"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { CardLink, Tag } from "@/components/ui/card";
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
      <div className="space-y-5 rounded-card border border-line bg-paper-card p-6">
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

        {activeCount > 0 && (
          <button
            type="button"
            onClick={() => router.replace("/besplatno", { scroll: false })}
            className="text-sm text-accent underline underline-offset-4"
          >
            Сбросить фильтры
          </button>
        )}
      </div>

      <div className="mt-8">
        {isPending && <p className="text-ink-muted">Загружаем материалы…</p>}

        {isError && (
          <p className="text-accent">
            {error instanceof Error ? error.message : "Не удалось загрузить"}
          </p>
        )}

        {data && (
          <>
            <p className="text-sm text-ink-muted">
              {data.items.length === 0
                ? "По этим фильтрам пока ничего нет — библиотека растёт."
                : `Материалов: ${data.items.length} из ${data.facets.total}`}
            </p>

            <div
              className={`mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${
                isPlaceholderData ? "opacity-60" : ""
              }`}
            >
              {data.items.map((material) => (
                <CardLink
                  key={material.slug}
                  href={`/besplatno/${material.slug}`}
                  className="flex h-full flex-col"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag tone="accent" icon={material.format}>
                      {formatLabels[material.format]}
                    </Tag>
                    <span className="text-xs text-ink-muted">
                      {material.readingMinutes} мин
                    </span>
                  </div>
                  <p className="mt-4 font-display text-lg leading-snug">
                    {material.title}
                  </p>
                  <p className="mt-2.5 flex-1 text-[0.95rem] text-ink-soft">
                    {material.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {material.themes.map((theme) => (
                      <Tag key={theme}>{themeLabels[theme]}</Tag>
                    ))}
                  </div>
                </CardLink>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

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
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
        {label}
      </p>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = active === option.value;
          const empty = option.count === 0;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              aria-pressed={selected}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                selected
                  ? "border-accent bg-accent text-paper"
                  : empty
                    ? "border-line text-ink-muted/60"
                    : "border-line text-ink-soft hover:border-line-strong hover:bg-paper-deep"
              }`}
            >
              {option.label}
              {option.count > 0 && (
                <span className={selected ? "opacity-80" : "text-ink-muted"}>
                  {" "}
                  {option.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
