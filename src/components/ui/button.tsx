import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "inverse" | "ghost";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-paper hover:bg-accent-hover",
  secondary:
    "border border-line-strong bg-paper-card text-ink hover:border-ink hover:bg-paper-deep",
  inverse: "bg-paper text-ink hover:bg-accent-soft",
  ghost: "text-accent hover:text-accent-hover underline underline-offset-4",
};

const sizes: Record<Size, string> = {
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
