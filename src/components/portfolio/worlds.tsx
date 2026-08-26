import { useState } from "react";
import { motion } from "motion/react";

type World = {
  id: string;
  shape: "diamond" | "circle" | "triangle";
  color: string;
  title: string;
  body: string;
};

const WORLDS: World[] = [
  {
    id: "rpg",
    shape: "diamond",
    color: "var(--brand-magenta)",
    title: "RPG",
    body: "Jogador de mesa de RPG e cofundador da FGV Quest. Narrativa, sistemas e a arte de improvisar regras que fazem o grupo inteiro jogar junto.",
  },
  {
    id: "skate",
    shape: "circle",
    color: "var(--brand-blue)",
    title: "SKATE",
    body: "Repetir a mesma manobra até ela virar linguagem. Errar em público, cair, levantar. Disciplina que não parece disciplina.",
  },
  {
    id: "cande",
    shape: "triangle",
    color: "var(--brand-yellow)",
    title: "F&B / TRABALHO",
    body: "Seis anos de food & beverage: Belmond, Candê, Glorioso Sushi. Operação real, cliente na frente, comunicação que precisa funcionar no primeiro take.",
  },
];

// padrão de dado de verdade: 2 colunas x 3 linhas, centralizado no quadrado
const DICE_COLS = [32, 68];
const DICE_ROWS = [25, 50, 75];

export function Worlds() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
      {WORLDS.map((w) => {
        const open = active === w.id;
        return (
          <div key={w.id} className="flex flex-col items-center">
            <motion.button
              type="button"
              aria-expanded={open}
              aria-controls={`world-${w.id}`}
              onMouseEnter={() => setActive(w.id)}
              onMouseLeave={() => setActive((c) => (c === w.id ? null : c))}
              onFocus={() => setActive(w.id)}
              onBlur={() => setActive((c) => (c === w.id ? null : c))}
              onClick={() => setActive((c) => (c === w.id ? null : w.id))}
              className="relative flex h-[260px] w-full items-center justify-center outline-none focus-visible:ring-4 focus-visible:ring-foreground md:h-[300px]"
              whileTap={{ scale: 0.96 }}
            >
              <WorldShape world={w} open={open} />
            </motion.button>

            <motion.div
              id={`world-${w.id}`}
              initial={false}
              animate={{ opacity: open ? 1 : 0, y: open ? 0 : 12 }}
              transition={{ duration: 0.25 }}
              className="mt-6 min-h-[150px] w-full border-t-[10px] pt-4"
              style={{ borderColor: w.color }}
            >
              <h3 className="font-display text-2xl uppercase tracking-[-0.04em] text-foreground">
                {w.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{w.body}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

function WorldShape({ world: w, open }: { world: World; open: boolean }) {
  if (w.shape === "diamond") {
    return (
      <motion.div
        className="relative"
        // quadrado parado; no hover só um tiltzinho leve, não vira losango
        animate={{ scale: open ? 1.08 : 1, rotate: open ? 8 : 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 16 }}
        style={{ width: 180, height: 180, background: w.color }}
      >
        {/* furinhos: padrão de dado de verdade — 2 colunas x 3 linhas,
            centralizados, giram junto (mesmo elemento pai) */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.25, delay: open ? 0.15 : 0 }}
        >
          {DICE_COLS.flatMap((x) =>
            DICE_ROWS.map((y) => (
              <span
                key={`${x}-${y}`}
                className="absolute h-[20px] w-[20px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ left: `${x}%`, top: `${y}%`, background: "var(--background)" }}
              />
            )),
          )}
        </motion.div>
      </motion.div>
    );
  }

  if (w.shape === "circle") {
    return (
      <motion.div
        className="relative rounded-full"
        animate={{ scale: open ? 1.08 : 1, rotate: open ? 8 : 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 16 }}
        style={{ width: 180, height: 180, background: w.color }}
      >
        {/* vão central abrindo — a roda */}
        <motion.div
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{ background: "var(--background)", x: "-50%", y: "-50%" }}
          animate={
            open ? { width: 64, height: 64, opacity: 1 } : { width: 0, height: 0, opacity: 0 }
          }
          transition={{ type: "spring", stiffness: 170, damping: 18 }}
        />
      </motion.div>
    );
  }

  // triângulo vazado (Kandê): parado é só o contorno; no hover, dois picos
  // menores sobem da mesma base, tipo chama/serra de montanha
  return (
    <motion.div
      className="relative"
      animate={{ scale: open ? 1.06 : 1 }}
      transition={{ type: "spring", stiffness: 160, damping: 16 }}
      style={{ width: 190, height: 163 }}
    >
      <svg viewBox="0 0 100 86" className="h-full w-full overflow-visible">
        <motion.polygon
          points="50 30 78 82 22 82"
          fill={w.color}
          initial={false}
          animate={open ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
          style={{ transformOrigin: "50px 82px" }}
          transition={{ type: "spring", stiffness: 170, damping: 16, delay: open ? 0.05 : 0 }}
        />
        <motion.polygon
          points="50 50 66 82 34 82"
          fill="var(--background)"
          stroke={w.color}
          strokeWidth={6}
          strokeLinejoin="miter"
          initial={false}
          animate={open ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
          style={{ transformOrigin: "50px 82px" }}
          transition={{ type: "spring", stiffness: 170, damping: 16, delay: open ? 0.15 : 0 }}
        />
        <polygon
          points="50 4 96 82 4 82"
          fill="none"
          stroke={w.color}
          strokeWidth={12}
          strokeLinejoin="miter"
        />
      </svg>
    </motion.div>
  );
}
