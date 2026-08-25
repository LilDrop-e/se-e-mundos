import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Fio condutor: zigue-zague grosso que atravessa a largura das 7 seções.
 * Desenho ligado ao scroll (pathLength) + marcadores triangulares nas transições.
 */
const POINTS = [
  [8, 0],
  [88, 14],
  [12, 28],
  [86, 42],
  [10, 57],
  [88, 71],
  [14, 85],
  [80, 100],
] as const;

const MOBILE_POINTS = [
  [22, 0],
  [72, 14],
  [24, 28],
  [74, 42],
  [22, 57],
  [72, 71],
  [26, 85],
  [66, 100],
] as const;

export function ScrollThread() {
  const isMobile = useIsMobile();
  const pts = isMobile ? MOBILE_POINTS : POINTS;
  const { scrollYProgress } = useScroll();
  const drawn = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        vectorEffect="non-scaling-stroke"
      >
        <motion.path
          d={d}
          fill="none"
          stroke="var(--foreground)"
          strokeWidth={isMobile ? 0.55 : 0.4}
          strokeLinejoin="miter"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: drawn, strokeWidth: isMobile ? 8 : 10 }}
        />
      </svg>
      {pts.slice(1, -1).map(([x, y], i) => (
        <Marker key={i} x={x} y={y} index={i} progress={drawn} total={pts.length - 2} />
      ))}
    </div>
  );
}

function Marker({
  x,
  y,
  index,
  total,
  progress,
}: {
  x: number;
  y: number;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const at = (index + 1) / (total + 1);
  const opacity = useTransform(progress, [at - 0.06, at], [0, 1]);
  const scale = useTransform(progress, [at - 0.06, at], [0.4, 1]);
  const colors = ["var(--brand-magenta)", "var(--brand-blue)", "var(--brand-yellow)"];

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        opacity,
        scale,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: "16px solid transparent",
          borderRight: "16px solid transparent",
          borderTop: `26px solid ${colors[index % 3]}`,
        }}
      />
    </motion.div>
  );
}
