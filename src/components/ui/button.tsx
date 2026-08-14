import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "on-band" | "on-band-quiet";
type Size = "lg" | "md" | "sm";

/** Приём motion №3: отклик интерактива — только цвет и граница, 200ms. */
const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,border-color,color] duration-200 ease-calm disabled:cursor-not-allowed disabled:opacity-55 motion-reduce:transition-none";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-hover",
  secondary:
    "border border-line-strong text-ink hover:border-line-hover hover:bg-surface-hover",
  ghost:
    "text-accent underline decoration-accent-edge decoration-1 underline-offset-[5px] hover:decoration-accent",
  "on-band": "bg-on-band text-band hover:bg-band-accent",
  "on-band-quiet":
    "border border-band-line text-on-band hover:border-on-band hover:bg-band-quiet",
};

const sizes: Record<Size, string> = {
  lg: "px-7 py-3.5 text-[1.03rem]",
  md: "px-6 py-3 text-[0.975rem]",
  sm: "px-4 py-2 text-sm",
};

function classes(variant: Variant, size: Size, className?: string) {
  const layout = variant === "ghost" ? "" : sizes[size];
  return [base, variants[variant], layout, className].filter(Boolean).join(" ");
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">) {
  return (
    <Link href={href} className={classes(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
