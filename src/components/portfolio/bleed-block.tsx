import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
  side: "left" | "right";
  color: "magenta" | "blue" | "yellow";
  height?: number;
  top?: string;
};

const tone = {
  magenta: "var(--brand-magenta)",
  blue: "var(--brand-blue)",
  yellow: "var(--brand-yellow)",
};

/** Bloco sólido que sangra para fora da borda, deslocado pelo scroll. */
export function BleedBlock({ side, color, height = 280, top = "18%" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const dir = side === "left" ? -1 : 1;
  const shift = isMobile ? 60 : 160;
  const x = useTransform(scrollYProgress, [0, 1], [dir * shift, dir * -shift]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute"
        style={{
          x,
          top,
          height: isMobile ? height * 0.55 : height,
          width: isMobile ? "58%" : "42%",
          background: tone[color],
          [side]: isMobile ? "-18%" : "-10%",
        }}
      />
    </div>
  );
}
