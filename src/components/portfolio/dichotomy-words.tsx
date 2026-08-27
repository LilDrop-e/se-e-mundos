import { motion } from "motion/react";

/**
 * Palavras soltas em dicotomia, boiando no fundo da seção — tipo folhas ao
 * vento: opacidade baixa, deriva lenta e orgânica, nunca competem com o
 * texto (que tem bg-background + z-20 por cima).
 */
type Pair = {
  a: string;
  b: string;
  top: string;
  left: string;
  size: string;
  opacity: number;
  duration: number;
  delay: number;
  rotate: number;
};

const PAIRS: Pair[] = [
  {
    a: "EMOÇÃO",
    b: "RAZÃO",
    top: "6%",
    left: "4%",
    size: "text-3xl md:text-5xl",
    opacity: 0.14,
    duration: 10,
    delay: 0,
    rotate: -6,
  },
  {
    a: "NATUREZA",
    b: "TECNOLOGIA",
    top: "62%",
    left: "54%",
    size: "text-2xl md:text-4xl",
    opacity: 0.09,
    duration: 12.5,
    delay: 1.4,
    rotate: 5,
  },
  {
    a: "DADOS",
    b: "INTUIÇÃO",
    top: "82%",
    left: "8%",
    size: "text-xl md:text-3xl",
    opacity: 0.08,
    duration: 11,
    delay: 2.6,
    rotate: -4,
  },
];

export function DichotomyWords() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      {PAIRS.map((p) => (
        <motion.div
          key={p.a}
          className={`absolute whitespace-nowrap font-display uppercase leading-none tracking-[-0.03em] text-foreground ${p.size}`}
          style={{ top: p.top, left: p.left, opacity: p.opacity }}
          animate={{
            y: [0, -16, 4, -8, 0],
            x: [0, 10, -6, 6, 0],
            rotate: [p.rotate, p.rotate + 7, p.rotate - 5, p.rotate + 3, p.rotate],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.a} <span className="opacity-60">×</span> {p.b}
        </motion.div>
      ))}
    </div>
  );
}
