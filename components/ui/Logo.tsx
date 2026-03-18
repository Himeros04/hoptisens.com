import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export function Logo({ className, iconClassName, textClassName }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/etoile_fleche_sans_fond.png"
        alt="Hoptisens"
        width={28}
        height={28}
        className={cn("w-7 h-7", iconClassName)}
      />
      <span
        className={cn(
          "font-serif font-medium text-2xl tracking-tighter pt-1",
          textClassName
        )}
      >
        Hoptisens
      </span>
    </div>
  );
}
