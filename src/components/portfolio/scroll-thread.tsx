import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Fio condutor construtivista: SÓ linhas horizontais e verticais.
 * Desce em degraus, alternando de lado, desenhado conforme o scroll.
 * Nas dobras, setas triangulares são "arremessadas" e ficam como marcadores.
 */
const LANES = [8, 88, 12, 86, 10, 88, 14] as const;
const MOBILE_LANES = [20, 74, 22, 72, 20, 74, 24] as const;

export function ScrollThread() {
  const isMobile = useIsMobile();
  const lanes = isMobile ? MOBILE_LANES : LANES;
  const { scrollYProgress } = useScroll();
  const drawn = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  // degraus: vertical dentro da seção, horizontal na transição
  const step = 100 / lanes.length;
  let d = `M${lanes[0]} 0`;
  const joints: { x: number; y: number; dir: "left" | "right" }[] = [];
  lanes.forEach((lane, i) => {
    const yEnd = (i + 1) * step;
    d += ` V${yEnd}`;
    const next = lanes[i + 1];
    if (next !== undefined) {
      d += ` H${next}`;
      joints.push({ x: next, y: yEnd, dir: next > lane ? "right" : "left" });
    }
  });

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d={d}
          fill="none"
          stroke="var(--foreground)"
          strokeLinejoin="miter"
          strokeLinecap="butt"
          style={{ pathLength: drawn, strokeWidth: isMobile ? 1.1 : 0.7 }}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {joints.map((j, i) => (
        <Dart key={i} {...j} index={i} total={joints.length} progress={drawn} />
      ))}
    </div>
  );
}

function Dart({
  x,
  y,
  dir,
  index,
  total,
  progress,
}: {
  x: number;
  y: number;
  dir: "left" | "right";
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const at = (index + 1) / (total + 1);
  const opacity = useTransform(progress, [at - 0.05, at], [0, 1]);
  const scale = useTransform(progress, [at - 0.05, at], [0.3, 1]);
  // seta arremessada: entra deslocada na horizontal e recolhe até o ponto
  const throwFrom = dir === "right" ? 90 : -90;
  const tx = useTransform(progress, [at - 0.05, at + 0.01], [throwFrom, 0]);
  const colors = ["var(--brand-magenta)", "var(--brand-blue)", "var(--brand-yellow)"];
  const variant = index % 3;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        opacity,
        scale,
        x: tx,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: `${variant === 1 ? 12 : 16}px solid transparent`,
          borderRight: `${variant === 1 ? 12 : 16}px solid transparent`,
          borderTop: `${variant === 2 ? 34 : 26}px solid ${colors[index % 3]}`,
          transform: variant === 1 ? `rotate(${dir === "right" ? -90 : 90}deg)` : undefined,
        }}
      />
    </motion.div>
  );
}
