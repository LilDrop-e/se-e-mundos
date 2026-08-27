import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * Faixa entre as seções 2 e 3: palavras em dicotomia passando na horizontal,
 * tipo painel digital de rua — mas sem fundo/cor/sombra, só a fonte do site
 * chapada no branco. Movimento é 100% amarrado ao scroll da página (sem
 * autoplay, sem vertical, sem rotação) — só translateX conforme o usuário rola.
 */
const PAIRS = ["NATUREZA × TECNOLOGIA", "RAZÃO × EMOÇÃO", "DADOS × INTUIÇÃO"];

export function DichotomyTicker() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  const line = Array.from({ length: 8 }, () => PAIRS.join("     ·     ")).join("     ·     ");

  return (
    <div ref={ref} className="w-full overflow-hidden bg-background py-10 md:py-14" aria-hidden>
      <motion.p
        style={{ x }}
        className="whitespace-nowrap font-display text-2xl uppercase tracking-[-0.02em] text-foreground md:text-4xl"
      >
        {line}
      </motion.p>
    </div>
  );
}
