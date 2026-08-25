import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  index,
  children,
  className,
}: {
  id: string;
  index: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate flex min-h-screen w-full flex-col justify-center overflow-hidden px-6 py-24 md:px-16",
        className,
      )}
    >
      <span className="pointer-events-none absolute right-4 top-8 font-display text-sm tracking-[0.4em] text-foreground/40 md:right-10">
        {String(index).padStart(2, "0")}
      </span>
      <div className="relative z-10 mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function Title({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "font-display uppercase leading-[0.85] tracking-[-0.05em] text-foreground",
        "text-[clamp(2.4rem,8vw,6.5rem)]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function Body({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("max-w-xl text-sm leading-relaxed text-foreground/70 md:text-base", className)}>
      {children}
    </p>
  );
}
