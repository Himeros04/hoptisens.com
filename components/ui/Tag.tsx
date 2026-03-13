import { cn } from "@/lib/utils";

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent";
}

export function Tag({ variant = "default", className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius-pill)] text-[11px] uppercase tracking-widest px-3 py-1 font-medium border",
        variant === "default" && "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-muted)]",
        variant === "accent" && "bg-[var(--color-accent-soft)] border-[var(--color-accent-border)] text-[var(--color-accent)]",
        className
      )}
      {...props}
    />
  );
}
