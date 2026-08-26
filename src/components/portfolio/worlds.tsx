import { useState } from "react";
import { motion } from "motion/react";

type World = {
  id: string;
  shape: "diamond" | "circle" | "ring";
  color: string;
  label: string;
  title: string;
  body: string;
};

const WORLDS: World[] = [
  {
    id: "rpg",
    shape: "diamond",
    color: "var(--brand-magenta)",
    label: "Losango",
    title: "RPG",
    body: "Mestre de mesa e fundador do FGV Quest. Narrativa, sistemas e a arte de improvisar regras que fazem o grupo inteiro jogar junto.",
  },
  {
    id: "skate",
    shape: "circle",
    color: "var(--brand-blue)",
    label: "Círculo",
    title: "SKATE",
    body: "Repetir a mesma manobra até ela virar linguagem. Errar em público, cair, levantar. Disciplina que não parece disciplina.",
  },
  {
    id: "cande",
    shape: "ring",
    color: "var(--brand-yellow)",
    label: "Anel vazado",
    title: "KANDÊ / TRABALHO",
    body: "Seis anos de food & beverage e a Kandê: operação real, cliente na frente, comunicação que precisa funcionar no primeiro take.",
  },
];

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
              <motion.div
                animate={
                  open
                    ? { scale: 1.08, rotate: w.shape === "diamond" ? 55 : 8 }
                    : { scale: 1, rotate: w.shape === "diamond" ? 45 : 0 }
                }
                transition={{ type: "spring", stiffness: 160, damping: 16 }}
                style={
                  w.shape === "ring"
                    ? {
                        width: 190,
                        height: 190,
                        borderRadius: "9999px",
                        border: `18px solid ${w.color}`,
                      }
                    : {
                        width: 180,
                        height: 180,
                        background: w.color,
                        borderRadius: w.shape === "circle" ? "9999px" : 0,
                      }
                }
              />
              <span className="pointer-events-none absolute bottom-0 font-display text-xs uppercase tracking-[0.35em] text-foreground/50">
                {w.label}
              </span>
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
