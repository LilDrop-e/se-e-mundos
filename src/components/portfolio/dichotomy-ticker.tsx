import { motion } from "motion/react";

/**
 * Faixa entre as seções 2 e 3: palavras em dicotomia passando na horizontal,
 * tipo painel digital de rua — mas sem fundo/cor/sombra, só a fonte do site
 * chapada no branco. Movimento contínuo e lento (não amarrado ao scroll —
 * fica rolando mesmo com o site parado), só translateX, sem vertical/rotação.
 * Encostada na seção 3 (padding-bottom pequeno) e afastada da seção 2
 * (padding-top maior), pra não parecer que ainda pertence à seção anterior.
 */
const PAIRS = ["NATUREZA × TECNOLOGIA", "RAZÃO × EMOÇÃO", "DADOS × INTUIÇÃO"];

export function DichotomyTicker() {
  const segment = `${PAIRS.join("     ·     ")}     ·     `;
  const track = segment.repeat(4);

  return (
    <div className="w-full overflow-hidden bg-background pb-6 pt-24 md:pb-10 md:pt-32" aria-hidden>
      <motion.div
        className="flex whitespace-nowrap font-display text-3xl uppercase tracking-[-0.02em] text-foreground md:text-6xl"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <span>{track}</span>
        <span>{track}</span>
      </motion.div>
    </div>
  );
}
