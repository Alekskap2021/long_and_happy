/**
 * Реестр палитр. Сами цвета живут в src/app/globals.css как токены
 * под селектором [data-theme="…"], здесь только идентификаторы и подписи.
 * Превью в переключателе тоже рисуется через data-theme, поэтому в UI
 * не появляется ни одного сырого цвета.
 */
export const themes = [
  {
    id: "pause",
    label: "Пауза",
    mood: "Холодная бумага, глубокий петроль",
    scheme: "light",
  },
  {
    id: "paper",
    label: "Бумага",
    mood: "Тёплая бумага, глина, лес",
    scheme: "light",
  },
  {
    id: "conifer",
    label: "Хвоя",
    mood: "Прохладная зелень и охра",
    scheme: "light",
  },
  {
    id: "pastel",
    label: "Пастель",
    mood: "Крем, олива, терракота",
    scheme: "light",
  },
  {
    id: "dried",
    label: "Сухоцвет",
    mood: "Вино, шалфей, сиреневая дымка",
    scheme: "light",
  },
  {
    id: "studio",
    label: "Студия",
    mood: "Белый свет, шалфей, тёмное дерево",
    scheme: "light",
  },
  {
    id: "bordo",
    label: "Бордо",
    mood: "Бумага, чернила, старое золото",
    scheme: "light",
  },
  {
    id: "dusk",
    label: "Сумерки",
    mood: "Тёмная синяя, абрикос",
    scheme: "dark",
  },
  {
    id: "coal",
    label: "Уголь",
    mood: "Тёплая тёмная, приглушённый розовый",
    scheme: "dark",
  },
] as const;

export type Theme = (typeof themes)[number];
export type ThemeId = Theme["id"];

export const themeIds = themes.map((theme) => theme.id) as ThemeId[];

export const defaultTheme: ThemeId = "pause";
export const defaultDarkTheme: ThemeId = "dusk";

export const themeStorageKey = "lah-theme";

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === "string" && themeIds.includes(value as ThemeId);
}

export function getTheme(id: ThemeId): Theme {
  return themes.find((theme) => theme.id === id) ?? themes[0];
}

/**
 * Скрипт выполняется до первой отрисовки: тема ставится на <html> раньше,
 * чем браузер покажет страницу, поэтому нет вспышки чужой палитры.
 * Он же включает motion: без JS и при prefers-reduced-motion блоки
 * не прячутся до появления в кадре, а сразу читаются.
 * Держим его строкой — он должен быть синхронным и без бандла.
 */
export const themeBootstrapScript = `(function(){var e=document.documentElement;try{var k=${JSON.stringify(
  themeStorageKey,
)};var ids=${JSON.stringify(themeIds)};var v=localStorage.getItem(k);if(ids.indexOf(v)<0){v=window.matchMedia("(prefers-color-scheme: dark)").matches?${JSON.stringify(
  defaultDarkTheme,
)}:${JSON.stringify(defaultTheme)};}e.setAttribute("data-theme",v);}catch(t){e.setAttribute("data-theme",${JSON.stringify(
  defaultTheme,
)});}try{if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)e.setAttribute("data-motion","on");}catch(t){}})();`;
