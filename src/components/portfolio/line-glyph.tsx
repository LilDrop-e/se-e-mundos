import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

type Tone = "magenta" | "blue" | "yellow" | "ink";

const tone: Record<Tone, string> = {
  magenta: "var(--brand-magenta)",
  blue: "var(--brand-blue)",
  yellow: "var(--brand-yellow)",
  ink: "var(--foreground)",
};

export type Seg = {
  /** posição final em % da caixa do glifo */
  x: number;
  y: number;
  /** comprimento em % (largura para h, altura para v) */
  len: number;
  dir: "h" | "v";
  /** deslocamento inicial (solto/desencaixado), em % */
  from: [number, number];
  color?: Tone;
  /** ponta vira triângulo/seta quando encaixa */
  arrow?: "end" | "start";
};

/**
 * Sistema de montagem: segmentos SÓ horizontais/verticais que chegam soltos
 * e se encaixam quando o bloco fica centralizado na tela.
 * Sempre decorativo, sempre atrás do texto (z-0).
 */
export function LineGlyph({
  segments,
  thickness = 9,
  className,
  size = 160,
}: {
  segments: Seg[];
  thickness?: number;
  className?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // 0 solto → 1 encaixado (pico quando centralizado)
  const raw = useTransform(scrollYProgress, [0.18, 0.5, 0.82], [0, 1, 0]);
  const fit = useSpring(raw, { stiffness: 120, damping: 20, mass: 0.4 });

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none relative z-0", className)}
      style={{ width: size, height: size }}
    >
      {segments.map((s, i) => (
        <SegmentPiece key={i} seg={s} fit={fit} thickness={thickness} />
      ))}
    </div>
  );
}

function SegmentPiece({
  seg,
  fit,
  thickness,
}: {
  seg: Seg;
  fit: MotionValue<number>;
  thickness: number;
}) {
  const x = useTransform(fit, [0, 1], [`${seg.from[0]}%`, "0%"]);
  const y = useTransform(fit, [0, 1], [`${seg.from[1]}%`, "0%"]);
  const opacity = useTransform(fit, [0, 0.25, 1], [0.25, 0.7, 1]);
  const color = tone[seg.color ?? "ink"];

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${seg.x}%`,
        top: `${seg.y}%`,
        width: seg.dir === "h" ? `${seg.len}%` : thickness,
        height: seg.dir === "v" ? `${seg.len}%` : thickness,
        background: color,
        x,
        y,
        opacity,
      }}
    >
      {seg.arrow && <ArrowTip seg={seg} fit={fit} thickness={thickness} color={color} />}
    </motion.div>
  );
}

function ArrowTip({
  seg,
  fit,
  thickness,
  color,
}: {
  seg: Seg;
  fit: MotionValue<number>;
  thickness: number;
  color: string;
}) {
  const scale = useTransform(fit, [0.35, 1], [0, 1]);
  const w = thickness * 2.2;
  const atEnd = seg.arrow === "end";
  const pos =
    seg.dir === "h"
      ? { [atEnd ? "right" : "left"]: -w * 0.9, top: "50%", translateY: "-50%" }
      : { [atEnd ? "bottom" : "top"]: -w * 0.9, left: "50%", translateX: "-50%" };
  const rotate = seg.dir === "h" ? (atEnd ? -90 : 90) : atEnd ? 0 : 180;

  return (
    <motion.div
      className="absolute"
      style={{
        ...(pos as Record<string, string | number>),
        width: 0,
        height: 0,
        borderLeft: `${w / 2}px solid transparent`,
        borderRight: `${w / 2}px solid transparent`,
        borderTop: `${w}px solid ${color}`,
        rotate,
        scale,
      }}
    />
  );
}
