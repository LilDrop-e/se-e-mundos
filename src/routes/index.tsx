import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";

import {
  Circle,
  Diamond,
  HollowSquare,
  HollowTriangle,
  Ring,
  ThickLine,
  Triangle,
} from "@/components/shapes";
import { ScrollThread } from "@/components/portfolio/scroll-thread";
import { DichotomyTicker } from "@/components/portfolio/dichotomy-ticker";
import { ScrollCue } from "@/components/portfolio/scroll-cue";
import { LineGlyph, type Seg } from "@/components/portfolio/line-glyph";
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
          "Portfólio de Pedro: comunicação digital, FGV Quest, Chama, Frank 2.0 e pesquisa de dados. Uma pergunta como método: E SE?",
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
      <DichotomyTicker />
      <Opposites />
      <WorldsSection />
      <Mindset />
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
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
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
        <BleedBlock side="right" color="magenta" top="4%" height={300} />

        {/* formas decorativas — sempre atrás do texto */}
        <motion.div
          className="pointer-events-none absolute right-[4%] top-[2%] z-0 hidden md:block"
          style={{ rotate, scale, x: tilt.x * -30, y: tilt.y * -20 }}
        >
          <Diamond size={150} color="blue" rotate={0} />
        </motion.div>
        <motion.div
          className="pointer-events-none absolute bottom-[8%] left-[2%] z-0 hidden md:block"
          style={{ x: tilt.x * 40, y: tilt.y * 24 }}
        >
          <Ring size={120} color="yellow" thickness={14} />
        </motion.div>

        <motion.div style={{ y }} className="relative z-10">
          <motion.h1
            className="font-display uppercase leading-[0.78] tracking-[-0.07em] text-[clamp(4.5rem,22vw,17rem)]"
            style={{ x: tilt.x * 14 }}
            onClick={() => setEggs((n) => n + 1)}
          >
            E SE?
          </motion.h1>

          <div className="mt-10 flex items-center gap-6">
            <ThickLine length={120} thickness={10} />
            <p className="font-display text-xs uppercase leading-[1.5] tracking-[0.2em] text-foreground/70 md:text-sm">
              PEDRO DURAN / ECMI / FGV RIO
            </p>
          </div>
          <div className="mt-16 opacity-40">
            <Triangle size={16} />
          </div>
        </motion.div>

        {/* montagem: "?" construtivista feito só de linhas h/v */}
        <div className="pointer-events-none absolute left-[6%] top-[14%] z-0 hidden md:block">
          <LineGlyph size={150} segments={GLYPH_ASK} />
        </div>

        {eggs >= 3 && (
          <span className="absolute bottom-10 right-8 z-10 font-display text-xs uppercase tracking-[0.3em] text-[color:var(--brand-magenta)]">
            e se você continuasse clicando?
          </span>
        )}
      </Section>
    </div>
  );
}

/* glifos de montagem — apenas segmentos horizontais/verticais ---------- */
const GLYPH_ASK: Seg[] = [
  { x: 12, y: 8, len: 62, dir: "h", from: [-60, -30], color: "magenta" },
  { x: 70, y: 8, len: 34, dir: "v", from: [50, -20] },
  { x: 40, y: 40, len: 32, dir: "h", from: [40, 30], color: "blue" },
  { x: 40, y: 40, len: 30, dir: "v", from: [0, 50], arrow: "end", color: "blue" },
  { x: 40, y: 84, len: 12, dir: "h", from: [-40, 40], color: "yellow" },
];

const GLYPH_MERGE: Seg[] = [
  { x: 6, y: 20, len: 40, dir: "h", from: [-50, 0], color: "magenta" },
  { x: 6, y: 20, len: 46, dir: "v", from: [-40, 20] },
  { x: 54, y: 60, len: 40, dir: "h", from: [60, 0], color: "blue" },
  { x: 88, y: 16, len: 46, dir: "v", from: [40, -20], arrow: "end", color: "blue" },
  { x: 30, y: 62, len: 48, dir: "h", from: [0, 45], color: "yellow" },
];

const GLYPH_GRID: Seg[] = [
  { x: 10, y: 24, len: 78, dir: "h", from: [-45, 0], color: "blue" },
  { x: 10, y: 62, len: 78, dir: "h", from: [45, 0], color: "magenta" },
  { x: 30, y: 6, len: 84, dir: "v", from: [0, -45] },
  { x: 66, y: 10, len: 80, dir: "v", from: [0, 45], color: "yellow" },
];

const GLYPH_UP: Seg[] = [
  { x: 46, y: 14, len: 74, dir: "v", from: [0, 50], arrow: "start", color: "magenta" },
  { x: 14, y: 70, len: 34, dir: "h", from: [-50, 20], color: "blue" },
  { x: 56, y: 44, len: 32, dir: "h", from: [50, -20], color: "yellow" },
  { x: 20, y: 90, len: 62, dir: "h", from: [0, 40] },
];

/* 02 --------------------------------------------------------------- */
function Ask() {
  return (
    <Section id="pergunta" index={2}>
      <BleedBlock side="right" color="blue" top="72%" height={200} />
      <div className="relative z-10">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)] md:items-end">
          <div>
            <Title>
              Eu costumo
              <br />
              perguntar.
            </Title>
            <div className="mt-10 border-t-[10px] border-[color:var(--brand-magenta)] pt-5">
              <p className="font-display text-sm uppercase tracking-[0.3em] text-[color:var(--brand-magenta)]">
                O que eu não estou vendo quando algo parece óbvio demais?
              </p>
            </div>
          </div>
          <div className="pointer-events-none hidden items-end justify-end gap-10 md:flex">
            <LineGlyph size={150} segments={GLYPH_ASK} />
            <HollowSquare size={92} color="yellow" thickness={12} rotate={5} />
          </div>
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
        <BleedBlock side="left" color="yellow" top="80%" height={200} />
        <div className="relative z-10">
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
            <div className="pointer-events-none flex items-center justify-end gap-8">
              <motion.div style={{ rotate }}>
                <Diamond size={110} color="magenta" rotate={0} />
              </motion.div>
              <LineGlyph size={150} segments={GLYPH_MERGE} />
            </div>
          </div>
          <ScrollCue variant="box" color="blue" className="mt-12" />
        </div>
      </Section>
    </div>
  );
}

/* 04 --------------------------------------------------------------- */
function WorldsSection() {
  return (
    <Section id="mundos" index={4}>
      <BleedBlock side="left" color="magenta" top="88%" height={160} />
      <div className="relative z-10">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(240px,0.8fr)] md:items-start">
          <div>
            <Title className="max-w-4xl">
              Talvez seja por isso que eu nunca tenha cabido em uma coisa só.
            </Title>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-foreground/50">
              Passe o cursor ou toque em cada forma
            </p>
          </div>
          <div className="pointer-events-none hidden justify-end md:flex">
            <LineGlyph size={170} segments={GLYPH_GRID} />
          </div>
        </div>
        <Worlds />
        <ScrollCue variant="dart" color="yellow" className="mt-12" />
      </div>
    </Section>
  );
}

/* 05 --------------------------------------------------------------- */
function Mindset() {
  return (
    <Section id="criar" index={5}>
      <BleedBlock side="right" color="blue" top="80%" height={190} />
      <div className="relative z-10">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)] md:items-end">
          <div>
            <Title>
              E eu levo essas
              <br />
              perguntas para
              <br />o que eu crio.
            </Title>
            {/* texto mais curto que o padrão do site — corpo um degrau maior
                (text-base/md:text-xl em vez de text-sm/md:text-base) pra
                ocupar o respiro sem estourar o contraste com o título */}
            <Body className="mt-10 max-w-2xl text-base leading-relaxed md:text-xl">
              Pergunta é só o começo. Transformar dúvida em processo — não separo criar de
              comunicar. Se a ideia não se explica sozinha, ainda não está pronta.
            </Body>
          </div>
          {/* formas decorativas engordadas ~20% pra compensar o texto mais
              curto — ficam isoladas na própria coluna do grid, sem risco de
              esbarrar no texto */}
          <div className="pointer-events-none hidden items-end justify-end gap-10 md:flex">
            <Ring size={144} color="yellow" thickness={18} />
            <LineGlyph size={190} segments={GLYPH_UP} />
            <HollowTriangle size={90} color="magenta" thickness={14} rotate={-8} />
          </div>
        </div>
        <ScrollCue variant="ball" color="magenta" className="mt-12" />
      </div>
    </Section>
  );
}

/* 06 --------------------------------------------------------------- */
const PROJECTS = [
  {
    name: "Chama",
    href: "https://chamac.lovable.app",
    text: "Startup de ativações culturais urbanas conectando marcas a comunidades locais.",
    shape: "diamond" as const,
    logo: "/logos/chama.png",
    cue: "box" as const,
    // chama: hastes subindo, com ponta em seta
    glyph: [
      { x: 20, y: 74, len: 56, dir: "h", from: [-40, 30], color: "magenta" },
      { x: 34, y: 22, len: 54, dir: "v", from: [0, 55], arrow: "start", color: "magenta" },
      { x: 58, y: 40, len: 38, dir: "v", from: [40, 40], color: "yellow" },
      { x: 12, y: 54, len: 24, dir: "h", from: [-55, 0] },
    ] as Seg[],
  },
  {
    name: "Frank 2.0",
    text: "Assistente pessoal de IA via Telegram: Make.com + Groq/LLaMA 3.3 70B + Google Calendar.",
    shape: "circle" as const,
    logo: "/logos/frank.png",
    cue: "dart" as const,
    // janela de chat com "rabicho"
    glyph: [
      { x: 12, y: 18, len: 72, dir: "h", from: [0, -50], color: "blue" },
      { x: 12, y: 18, len: 44, dir: "v", from: [-50, 0], color: "blue" },
      { x: 80, y: 18, len: 44, dir: "v", from: [50, 0] },
      { x: 12, y: 60, len: 72, dir: "h", from: [30, 40], color: "yellow" },
      { x: 26, y: 60, len: 22, dir: "v", from: [0, 50], arrow: "end", color: "blue" },
    ] as Seg[],
  },
  {
    name: "FGV Quest",
    href: "https://www.instagram.com/fgvquest/",
    text: "Cofundador da liga de pesquisa de jogos. Atuo nas áreas de desenvolvimento e eventos.",
    shape: "ring" as const,
    logo: "/logos/fgv-quest.png",
    cue: "ball" as const,
    // dado/quadrado montado com pontas sobrando
    glyph: [
      { x: 16, y: 20, len: 66, dir: "h", from: [-45, -20], color: "yellow" },
      { x: 22, y: 72, len: 70, dir: "h", from: [45, 20], color: "yellow" },
      { x: 20, y: 14, len: 66, dir: "v", from: [0, -45], color: "magenta" },
      { x: 76, y: 24, len: 62, dir: "v", from: [0, 45] },
    ] as Seg[],
  },
  {
    name: "Pesquisa de análise de dados",
    text: "Análise aplicada a um banco de dados com 1 milhão de observações.",
    shape: "triangle" as const,
    cue: "bar" as const,
    // eixos + barras
    glyph: [
      { x: 14, y: 12, len: 74, dir: "v", from: [-40, 0] },
      { x: 14, y: 84, len: 74, dir: "h", from: [0, 45], arrow: "end", color: "magenta" },
      { x: 32, y: 52, len: 32, dir: "v", from: [0, 40], color: "blue" },
      { x: 52, y: 34, len: 50, dir: "v", from: [35, 20], color: "yellow" },
      { x: 70, y: 60, len: 24, dir: "v", from: [45, 0], color: "magenta" },
    ] as Seg[],
  },
];

const SHAPE_COLOR = {
  diamond: "magenta",
  circle: "blue",
  ring: "yellow",
  triangle: "magenta",
} as const;

function Testing() {
  return (
    <Section id="testo" index={6}>
      <div className="relative z-10">
        <Title>Então eu testo.</Title>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {PROJECTS.map((p) => {
            // fundo opaco no card inteiro, SEMPRE 100% opaco (mesmo no hover):
            // a linha global do ScrollThread (z-0, atravessa a página inteira)
            // não pode aparecer por trás da logo, do título ou do texto de
            // apoio — por isso o hover não pode mexer em opacity/bg aqui,
            // só em elementos internos (ver seta ↗ abaixo).
            const cardClassName =
              "group relative z-20 block border-t-[10px] border-foreground bg-background pt-5";

            const content = (
              <>
                <div className="mb-4 flex h-28 items-center gap-6 overflow-hidden">
                  {"logo" in p ? (
                    <img
                      src={p.logo}
                      alt={`${p.name} — logo`}
                      className="h-14 w-auto max-w-[140px] shrink-0 object-contain"
                    />
                  ) : (
                    <>
                      {p.shape === "diamond" && <Diamond size={56} color="magenta" />}
                      {p.shape === "circle" && <Circle size={58} color="blue" />}
                      {p.shape === "ring" && <Ring size={58} color="yellow" thickness={14} />}
                    </>
                  )}
                  <LineGlyph size={112} thickness={8} segments={p.glyph} />
                </div>
                <h3 className="font-display text-2xl uppercase leading-[0.95] tracking-[-0.05em] md:text-3xl">
                  {p.name}
                  {"href" in p && (
                    <span
                      aria-hidden
                      className="ml-2 inline-block align-top text-lg transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                    >
                      ↗
                    </span>
                  )}
                </h3>
                <p className="mt-2 text-sm text-foreground/70">{p.text}</p>
                <ScrollCue variant={p.cue} color={SHAPE_COLOR[p.shape]} className="mt-6 max-w-xs" />
              </>
            );

            return "href" in p ? (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.name} — abrir site em nova aba`}
                className={cardClassName}
              >
                {content}
              </a>
            ) : (
              <article key={p.name} className={cardClassName}>
                {content}
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* 07 --------------------------------------------------------------- */
function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <div ref={ref}>
      <Section id="contato" index={7}>
        <div className="pointer-events-none absolute -bottom-[12%] -right-[10%] z-0 h-[46vw] w-[46vw] overflow-hidden rounded-full md:h-[24vw] md:w-[24vw]">
          <motion.div className="h-full w-full scale-150" style={{ rotate }}>
            <div className="h-1/3 w-full" style={{ background: "var(--brand-magenta)" }} />
            <div className="h-1/3 w-full" style={{ background: "var(--brand-blue)" }} />
            <div className="h-1/3 w-full" style={{ background: "var(--brand-yellow)" }} />
          </motion.div>
        </div>
        <div className="relative z-10">
          <Title>
            Vamos
            <br />
            conversar.
          </Title>
          <Body className="mt-8">E se a próxima pergunta for sua?</Body>
          <a
            href="mailto:pxaum21@gmail.com"
            className="mt-10 inline-flex items-center gap-4 bg-foreground px-8 py-5 font-display text-lg uppercase tracking-[-0.03em] text-background transition-colors hover:bg-[color:var(--brand-magenta)]"
          >
            Me chama
            <Triangle
              size={20}
              color="ink"
              rotate={-90}
              style={{ borderTopColor: "currentColor" }}
            />
          </a>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-display text-sm uppercase tracking-[0.2em] text-foreground/70">
            <a
              href="https://www.instagram.com/dro.p_art.ur/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/in/pedrodurann/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/LilDrop-e"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
