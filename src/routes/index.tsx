import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";

import { Circle, Diamond, Ring, ThickLine, Triangle } from "@/components/shapes";
import { ScrollThread } from "@/components/portfolio/scroll-thread";
import { BleedBlock } from "@/components/portfolio/bleed-block";
import { Body, Section, Title } from "@/components/portfolio/section";
import { Worlds } from "@/components/portfolio/worlds";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pedro — E SE? Portfólio Bauhaus" },
      {
        name: "description",
        content:
          "Portfólio de Pedro: comunicação digital, FGV Quest, Candê, Chama e Frank 2.0. Uma pergunta como método: E SE?",
      },
      { property: "og:title", content: "Pedro — E SE? Portfólio Bauhaus" },
      {
        property: "og:description",
        content:
          "Estudante de Comunicação Digital na FGV Rio. Projetos, mundos e perguntas que atravessam skate, RPG, universidade e trabalho.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="relative bg-background font-body text-foreground">
      <ScrollThread />
      <Hero />
      <Ask />
      <Opposites />
      <WorldsSection />
      <Projects />
      <Testing />
      <Contact />
      <footer className="relative z-10 border-t-[10px] border-foreground px-6 py-8 text-xs uppercase tracking-[0.3em] text-foreground/50 md:px-16">
        Pedro — E SE?
      </footer>
    </main>
  );
}

/* 01 --------------------------------------------------------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const rotate = useTransform(scrollYProgress, [0, 1], [45, 135]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [eggs, setEggs] = useState(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setTilt({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={ref}>
      <Section id="hero" index={1} className="min-h-[100svh]">
        <BleedBlock side="right" color="magenta" top="8%" height={420} />
        <motion.div style={{ y }} className="relative">
          <motion.h1
            className="font-display uppercase leading-[0.78] tracking-[-0.07em] text-[clamp(5rem,26vw,20rem)]"
            style={{ x: tilt.x * 14 }}
            onClick={() => setEggs((n) => n + 1)}
          >
            E SE?
          </motion.h1>

          <div className="mt-10 flex items-center gap-6">
            <ThickLine length={160} thickness={10} />
            <p className="max-w-sm text-sm uppercase tracking-[0.2em] text-foreground/60">
              Pedro — comunicação digital, FGV Rio 2028
            </p>
          </div>

          <motion.div
            className="absolute right-[6%] top-[-6%] hidden md:block"
            style={{ rotate, scale, x: tilt.x * -30, y: tilt.y * -20 }}
          >
            <Diamond size={180} color="blue" rotate={0} />
          </motion.div>

          <motion.div
            className="absolute bottom-[-10%] left-[38%] hidden md:block"
            style={{ x: tilt.x * 40, y: tilt.y * 24 }}
          >
            <Ring size={140} color="yellow" thickness={14} />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 14, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Triangle size={34} />
        </motion.div>

        {eggs >= 3 && (
          <span className="absolute bottom-10 right-8 font-display text-xs uppercase tracking-[0.3em] text-[color:var(--brand-magenta)]">
            e se você continuasse clicando?
          </span>
        )}
      </Section>
    </div>
  );
}

/* 02 --------------------------------------------------------------- */
function Ask() {
  return (
    <Section id="pergunta" index={2}>
      <BleedBlock side="right" color="blue" top="24%" />
      <Title>
        Eu costumo
        <br />
        perguntar.
      </Title>
      <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <Body>
            Pedro. Estudante de Comunicação Digital na FGV Rio, turma de 2028. Fundador do FGV
            Quest, passagem pela Lacom Jr. e pela Candê, mais de 6 anos de food &amp; beverage.
            Skate no pé e RPG na mesa.
          </Body>
          <Body>
            O que atravessa tudo isso é uma mania: questionar categorias antes de aceitar que elas
            existem.
          </Body>
        </div>
        <div className="flex items-center justify-center gap-6">
          <Circle size={120} color="yellow" />
          <ThickLine length={200} thickness={10} vertical />
        </div>
      </div>
    </Section>
  );
}

/* 03 --------------------------------------------------------------- */
function Opposites() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <div ref={ref}>
      <Section id="opostas" index={3}>
        <BleedBlock side="left" color="yellow" top="14%" height={340} />
        <Title>
          E se não
          <br />
          precisassem
          <br />
          ser opostas?
        </Title>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <Body>
            Skate, RPG, universidade e trabalho não são gavetas. São a mesma prática: leitura de
            contexto, repetição, improviso e comunicação. A pista e a sala de aula pedem o mesmo
            tipo de atenção.
          </Body>
          <div className="flex items-center justify-end gap-8">
            <motion.div style={{ rotate }}>
              <Diamond size={130} color="magenta" rotate={0} />
            </motion.div>
            <Ring size={110} color="blue" thickness={12} />
          </div>
        </div>
      </Section>
    </div>
  );
}

/* 04 --------------------------------------------------------------- */
function WorldsSection() {
  return (
    <Section id="mundos" index={4}>
      <BleedBlock side="left" color="magenta" top="6%" height={360} />
      <Title className="max-w-4xl">
        Talvez seja por isso que eu nunca tenha cabido em uma coisa só.
      </Title>
      <p className="mt-6 text-xs uppercase tracking-[0.3em] text-foreground/50">
        Passe o cursor ou toque em cada forma
      </p>
      <Worlds />
    </Section>
  );
}

/* 05 --------------------------------------------------------------- */
const PROJECTS = [
  {
    name: "Chama",
    text: "Ativações culturais urbanas que conectam marcas e comunidades.",
    color: "magenta" as const,
  },
  {
    name: "Frank 2.0",
    text: "Assistente de IA no Telegram: Make.com + Groq/LLaMA 3.3 70B + Google Calendar.",
    color: "blue" as const,
  },
  {
    name: "Lacom Jr.",
    text: "Comunicação aplicada em ambiente de empresa júnior.",
    color: "yellow" as const,
  },
  {
    name: "FGV Quest",
    text: "Fundação de uma comunidade de RPG dentro da universidade.",
    color: "magenta" as const,
  },
];

function Projects() {
  return (
    <Section id="projetos" index={5}>
      <BleedBlock side="right" color="blue" top="20%" />
      <Title>
        E eu levo essas
        <br />
        perguntas para
        <br />o que eu crio.
      </Title>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <article key={p.name} className="border-t-[10px] border-foreground pt-5">
            <div className="mb-4 h-28 w-full overflow-hidden">
              <div className="flex h-full items-center justify-start gap-4">
                {p.color === "magenta" && <Diamond size={80} color="magenta" />}
                {p.color === "blue" && <Circle size={80} color="blue" />}
                {p.color === "yellow" && <Ring size={80} color="yellow" thickness={10} />}
                <ThickLine length={120} thickness={10} />
              </div>
            </div>
            <h3 className="font-display text-3xl uppercase tracking-[-0.05em]">{p.name}</h3>
            <p className="mt-2 text-sm text-foreground/70">{p.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* 06 --------------------------------------------------------------- */
function Testing() {
  return (
    <Section id="testo" index={6}>
      <BleedBlock side="left" color="yellow" top="26%" />
      <Title>Então eu testo.</Title>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {[
          "Processos seletivos como laboratório de leitura de contexto.",
          "Apresentação no Futuros Líderes: ideia exposta, testada em público.",
          "Aprendizado contínuo: cada erro vira repertório.",
        ].map((t, i) => (
          <div key={i} className="flex gap-4">
            <Triangle size={28} color={["magenta", "blue", "yellow"][i] as never} />
            <Body className="text-sm">{t}</Body>
          </div>
        ))}
      </div>
      <div className="mt-14">
        <ThickLine length={320} thickness={10} />
      </div>
    </Section>
  );
}

/* 07 --------------------------------------------------------------- */
function Contact() {
  return (
    <Section id="contato" index={7}>
      <div className="pointer-events-none absolute -bottom-[22%] -right-[18%] h-[70vw] w-[70vw] overflow-hidden rounded-full md:h-[46vw] md:w-[46vw]">
        <div className="h-full w-full rotate-[24deg] scale-150">
          <div className="h-1/3 w-full" style={{ background: "var(--brand-magenta)" }} />
          <div className="h-1/3 w-full" style={{ background: "var(--brand-blue)" }} />
          <div className="h-1/3 w-full" style={{ background: "var(--brand-yellow)" }} />
        </div>
      </div>
      <Title>
        Vamos
        <br />
        conversar.
      </Title>
      <Body className="mt-8">
        Se alguma dessas perguntas ficou na sua cabeça, ela também é sua. Me chama.
      </Body>
      <a
        href="mailto:pedro@exemplo.com"
        className="mt-10 inline-flex items-center gap-4 bg-foreground px-8 py-5 font-display text-lg uppercase tracking-[-0.03em] text-background transition-colors hover:bg-[color:var(--brand-magenta)]"
      >
        Falar com Pedro
        <Triangle size={20} color="ink" rotate={-90} style={{ borderTopColor: "currentColor" }} />
      </a>
    </Section>
  );
}
