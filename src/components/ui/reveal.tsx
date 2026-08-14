"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Приём motion №1: спокойное появление крупного блока при первом попадании
 * в кадр. Один раз, без повторов при скролле назад; при prefers-reduced-motion
 * сдвиг выключается в CSS (см. утилиту reveal в globals.css).
 *
 * Видимость переключается атрибутом на узле, а не состоянием React: анимация
 * живёт в CSS, поэтому лишний рендер дерева ничего не даёт.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => node.setAttribute("data-visible", "true");

    if (!("IntersectionObserver" in window)) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-visible="false"
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  );
}
