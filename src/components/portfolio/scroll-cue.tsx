import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type Tone = "magenta" | "blue" | "yellow" | "ink";

const tone: Record<Tone, string> = {
  magenta: "var(--brand-magenta)",
  blue: "var(--brand-blue)",
  yellow: "var(--brand-yellow)",
  ink: "var(--foreground)",
};

/**
 * Indicador de progresso no rodapé da seção, variando por seção.
 * ball  → linha empurrando uma bola que encaixa num ponto
 * box   → caixa crescendo (scale-in)
 * dart  → seta arremessada que recolhe
 * bar   → barra clássica
 */
export function ScrollCue({
  variant,
  color = "ink",
  className,
}: {
  variant: "ball" | "box" | "dart" | "bar";
  color?: Tone;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 22, mass: 0.4 });

  const push = useTransform(p, [0.15, 0.85], ["0%", "100%"]);
  const grow = useTransform(p, [0.2, 0.6], [0.15, 1]);
  const dartX = useTransform(p, [0.2, 0.55, 0.9], ["0%", "100%", "0%"]);
  const barW = useTransform(p, [0.1, 0.9], ["0%", "100%"]);
  const c = tone[color];

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none relative z-0 h-8 w-full max-w-md", className)}
    >
      {variant === "ball" && (
        <>
          <div className="absolute left-0 top-1/2 h-[8px] w-full -translate-y-1/2 bg-foreground/15" />
          <div
            className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-[4px]"
            style={{ borderColor: c }}
          />
          <motion.div className="absolute left-0 top-1/2 w-full -translate-y-1/2" style={{ x: 0 }}>
            <motion.div className="relative h-[10px]" style={{ width: push, background: c }}>
              <div
                className="absolute -right-4 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full"
                style={{ background: c }}
              />
            </motion.div>
          </motion.div>
        </>
      )}

      {variant === "box" && (
        <motion.div
          className="absolute left-0 top-1/2 h-6 w-6 origin-left -translate-y-1/2"
          style={{ background: c, scaleX: grow, scaleY: grow }}
        />
      )}

      {variant === "dart" && (
        <>
          <div className="absolute left-0 top-1/2 h-[8px] w-full -translate-y-1/2 bg-foreground/15" />
          <motion.div
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: dartX, x: "-50%" }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: "12px solid transparent",
                borderBottom: "12px solid transparent",
                borderLeft: `22px solid ${c}`,
              }}
            />
          </motion.div>
        </>
      )}

      {variant === "bar" && (
        <>
          <div className="absolute left-0 top-1/2 h-[10px] w-full -translate-y-1/2 bg-foreground/15" />
          <motion.div
            className="absolute left-0 top-1/2 h-[10px] -translate-y-1/2"
            style={{ width: barW, background: c }}
          />
        </>
      )}
    </div>
  );
}
