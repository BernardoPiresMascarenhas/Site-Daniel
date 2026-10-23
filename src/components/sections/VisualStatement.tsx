"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { statement } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";
import { useRichMotion } from "@/lib/useMediaQuery";

/*
 * Composição autoral em SVG: um pórtico clássico abstrato, desenhado traço a
 * traço conforme a seção atravessa a viewport, com luz lateral suave.
 * É uma referência simbólica — não representa nenhum edifício real.
 */

const W = 1200;
const COLUMNS = [150, 330, 510, 690, 870, 1050];
const SHAFT_W = 64;
const SHAFT_TOP = 250;
const SHAFT_BOTTOM = 610;

type Layer = "top" | "mid" | "base";
type Stroke = { d: string; start: number; weight?: number; tone?: "bronze" | "paper"; layer?: Layer };

function buildStrokes(): Stroke[] {
  const strokes: Stroke[] = [];

  // Estilóbato (degraus)
  strokes.push({ d: `M40 ${SHAFT_BOTTOM + 20} H${W - 40}`, start: 0, tone: "bronze", layer: "base" });
  strokes.push({ d: `M20 ${SHAFT_BOTTOM + 42} H${W - 20}`, start: 0.03, layer: "base" });
  strokes.push({ d: `M0 ${SHAFT_BOTTOM + 64} H${W}`, start: 0.06, layer: "base" });

  COLUMNS.forEach((x, i) => {
    const l = x - SHAFT_W / 2;
    const r = x + SHAFT_W / 2;
    const s = 0.08 + i * 0.045;
    // Base
    strokes.push({ d: `M${l - 12} ${SHAFT_BOTTOM + 20} V${SHAFT_BOTTOM + 6} H${r + 12} V${SHAFT_BOTTOM + 20}`, start: s });
    // Fuste: contornos (de baixo para cima) e caneluras
    strokes.push({ d: `M${l} ${SHAFT_BOTTOM + 6} V${SHAFT_TOP}`, start: s + 0.02, tone: "paper" });
    strokes.push({ d: `M${r} ${SHAFT_BOTTOM + 6} V${SHAFT_TOP}`, start: s + 0.02, tone: "paper" });
    [0.25, 0.5, 0.75].forEach((f, k) =>
      strokes.push({ d: `M${l + SHAFT_W * f} ${SHAFT_BOTTOM} V${SHAFT_TOP + 8}`, start: s + 0.05 + k * 0.015, weight: 0.5 }),
    );
    // Capitel
    strokes.push({
      d: `M${l - 4} ${SHAFT_TOP} C${l - 4} ${SHAFT_TOP - 14} ${r + 4} ${SHAFT_TOP - 14} ${r + 4} ${SHAFT_TOP}`,
      start: s + 0.1,
    });
    strokes.push({ d: `M${l - 16} ${SHAFT_TOP - 14} H${r + 16} V${SHAFT_TOP - 26} H${l - 16} Z`, start: s + 0.12, tone: "bronze" });
  });

  // Entablamento e frontão: camada superior
  const top = strokes.length;
  strokes.push({ d: `M80 ${SHAFT_TOP - 26} H${W - 80}`, start: 0.42, tone: "bronze" });
  strokes.push({ d: `M80 ${SHAFT_TOP - 62} H${W - 80}`, start: 0.45 });
  strokes.push({ d: `M66 ${SHAFT_TOP - 74} H${W - 66}`, start: 0.48 });
  // Frontão
  strokes.push({ d: `M66 ${SHAFT_TOP - 74} L${W / 2} 40 L${W - 66} ${SHAFT_TOP - 74}`, start: 0.52, tone: "bronze" });
  strokes.push({ d: `M150 ${SHAFT_TOP - 86} L${W / 2} 66 L${W - 150} ${SHAFT_TOP - 86} Z`, start: 0.58, weight: 0.5 });

  strokes.slice(top).forEach((st) => (st.layer = "top"));
  return strokes;
}

const STROKES = buildStrokes();

function Line({ stroke, progress }: { stroke: Stroke; progress: MotionValue<number> }) {
  const pathLength = useTransform(progress, [stroke.start, stroke.start + 0.28], [0, 1]);
  const color =
    stroke.tone === "bronze" ? "#c7a35e" : stroke.tone === "paper" ? "rgb(251 250 247 / 0.55)" : "rgb(251 250 247 / 0.3)";
  return (
    <motion.path
      d={stroke.d}
      fill="none"
      stroke={color}
      strokeWidth={stroke.weight ?? 1}
      vectorEffect="non-scaling-stroke"
      strokeLinecap="round"
      style={{ pathLength }}
    />
  );
}

export function VisualStatement() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const rich = useRichMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "center 0.45"] });
  const { scrollYProgress: passProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drawn = useTransform(scrollYProgress, (v) => (reduce ? 1 : v));
  const lightX = useTransform(passProgress, [0, 1], reduce ? ["0%", "0%"] : ["-18%", "12%"]);
  const lightOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  // Profundidade: fotografia ao fundo, frontão e base do desenho em velocidades diferentes.
  const photoY = useTransform(passProgress, [0, 1], reduce ? ["0%", "0%"] : ["-7%", "7%"]);
  const photoScale = useTransform(passProgress, [0, 1], reduce ? [1.1, 1.1] : [1.2, 1.06]);
  const topY = useTransform(passProgress, [0, 1], reduce ? [0, 0] : [-26, 18]);
  const baseY = useTransform(passProgress, [0, 1], reduce ? [0, 0] : [22, -14]);

  // Leve inclinação em perspectiva acompanhando o ponteiro (desktop, sem reduced motion).
  const tiltX = useSpring(0, { stiffness: 60, damping: 18 });
  const tiltY = useSpring(0, { stiffness: 60, damping: 18 });
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!rich || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 5);
    tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 3);
  };
  const onPointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const layers: Layer[] = ["base", "mid", "top"];
  const layerY = { top: topY, mid: undefined, base: baseY };

  return (
    <section
      ref={ref}
      aria-labelledby="statement-title"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="grain relative overflow-hidden bg-ink text-paper"
    >
      {/* Fotografia de arquitetura clássica (duotone grafite), com parallax lento. */}
      <motion.div aria-hidden style={{ y: photoY, scale: photoScale }} className="absolute inset-0 -z-10">
        <Image
          src="/images/arquitetura-colunata.webp"
          alt=""
          fill
          sizes="100vw"
          quality={75}
          className="object-cover object-[50%_45%] opacity-[0.62]"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_50%_at_50%_58%,rgb(23_25_27/0.82),rgb(23_25_27/0.45)_100%),linear-gradient(180deg,#17191b_0%,transparent_16%,transparent_84%,#17191b_100%)]"
      />

      {/* Luz lateral que atravessa o pórtico */}
      <motion.div
        aria-hidden
        style={{ x: lightX, opacity: lightOpacity }}
        className="pointer-events-none absolute -inset-y-20 left-0 w-[80%] bg-[linear-gradient(105deg,rgb(215_187_128/0.18)_0%,rgb(199_163_94/0.06)_35%,transparent_65%)] blur-2xl"
      />

      <div className="container-x relative pb-[clamp(5rem,4rem+6vw,9rem)] pt-[clamp(5rem,4rem+6vw,9rem)]">
        <div className="relative mx-auto max-w-[68rem]">
          <motion.div style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1400 }}>
            <svg
              viewBox={`0 0 ${W} 700`}
              className="h-auto w-full overflow-visible"
              role="img"
              aria-label="Ilustração de linhas de um pórtico clássico com colunas"
            >
              <defs>
                {/* Faces iluminadas das colunas: luz vinda da esquerda */}
                <linearGradient id="lit" x1="0" x2="1">
                  <stop offset="0" stopColor="#d7bb80" stopOpacity="0.18" />
                  <stop offset="1" stopColor="#d7bb80" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.g style={{ opacity: lightOpacity }}>
                {COLUMNS.map((x) => (
                  <rect
                    key={x}
                    x={x - SHAFT_W / 2}
                    y={SHAFT_TOP}
                    width={SHAFT_W / 2}
                    height={SHAFT_BOTTOM - SHAFT_TOP + 6}
                    fill="url(#lit)"
                  />
                ))}
              </motion.g>
              {layers.map((layer) => (
                <motion.g key={layer} style={{ y: layerY[layer] }}>
                  {STROKES.filter((st) => (st.layer ?? "mid") === layer).map((st) => (
                    <Line key={st.d} stroke={st} progress={drawn} />
                  ))}
                </motion.g>
              ))}
            </svg>
          </motion.div>

          {/* Texto sobreposto ao intercolúnio central */}
          <div className="relative mt-10 lg:absolute lg:inset-x-0 lg:bottom-[9%] lg:mt-0">
            <div className="mx-auto max-w-3xl text-center lg:bg-[radial-gradient(closest-side,rgb(23_25_27/0.96),rgb(23_25_27/0.85)_65%,transparent)] lg:px-16 lg:py-12">
              <h2 id="statement-title" className="font-serif text-[length:var(--step-4)] font-light leading-[1.08]">
                {statement.lines.map((line, i) => (
                  <Reveal key={line} as="span" variant="mask" delay={0.1 + i * 0.18} className="block">
                    {line}
                  </Reveal>
                ))}
              </h2>
              <Reveal delay={0.45}>
                <p className="mx-auto mt-6 max-w-md text-[0.98rem] leading-relaxed text-paper/70">{statement.text}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
