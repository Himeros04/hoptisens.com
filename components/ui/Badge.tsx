import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent";
}

export function Badge({ variant = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius-pill)] text-[11px] uppercase tracking-[0.08em] px-2.5 py-0.5 font-medium border",
        variant === "default" && "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-muted)]",
        variant === "accent" && "bg-[var(--color-accent-soft)] border-[var(--color-accent-border)] text-[var(--color-accent)]",
        className
      )}
      {...props}
    />
  );
}
