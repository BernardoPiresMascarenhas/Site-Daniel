"use client";

import Image from "next/image";
import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { useState } from "react";
import { identity } from "@/config/site";

const ease = [0.22, 1, 0.36, 1] as const;

/*
 * ATENÇÃO: o retrato `daniel-hero-transparent.png` foi expandido por IA a
 * partir de uma foto de 150 × 150 px. Ele só pode ir ao ar com aprovação
 * expressa do Daniel (ver `pending.portraitApproval` em src/config/site.ts).
 */
const PORTRAIT_SRC = "/images/daniel-hero-transparent.png";

type Props = { progress: MotionValue<number>; rich: boolean; skipIntro?: boolean };

export function HeroPortrait({ progress, rich, skipIntro = false }: Props) {
  const [failed, setFailed] = useState(false);
  // Com reduced motion, a composição aparece pronta (sem recortes, desfoque ou traçado).
  const reduce = useReducedMotion() ?? false;
  const still = reduce || skipIntro;
  const portraitY = useTransform(progress, [0, 1], [0, rich ? -48 : 0]);
  const archY = useTransform(progress, [0, 1], [0, rich ? 36 : 0]);
  const arcY = useTransform(progress, [0, 1], [0, rich ? 72 : 0]);

  return (
    <div className="relative mx-auto w-full max-w-[30rem] pt-[calc(var(--header-h)+0.75rem)] sm:max-w-[34rem] lg:absolute lg:inset-0 lg:max-w-none lg:pt-0">
      <div className="relative aspect-[10/11] lg:absolute lg:-right-[6%] lg:top-[calc(var(--header-h)+1.5rem)] lg:aspect-[2/3] lg:w-[112%]">
        {/* Nicho em arco: fundo grafite rico com halo quente atrás da cabeça. */}
        <motion.div
          aria-hidden
          style={{ y: archY }}
          className="absolute inset-x-[7%] bottom-0 top-[13%] lg:bottom-[-4%]"
          initial={still ? false : { opacity: 0, clipPath: "inset(100% 0 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.4, delay: 0.1, ease }}
        >
          <div className="absolute inset-0 rounded-t-full border border-b-0 border-bronze/25 bg-[linear-gradient(180deg,#383c3f_0%,#2a2e30_34%,#1b1d1f_88%)] [mask-image:linear-gradient(to_bottom,black_55%,transparent_96%)]" />
          <div className="absolute inset-x-[10%] top-[2%] h-[46%] rounded-full bg-[radial-gradient(closest-side,rgb(215_187_128/0.30),rgb(199_163_94/0.08)_55%,transparent)] blur-2xl" />
        </motion.div>

        {/* Filete dourado: arco deslocado, desenhado na entrada. */}
        <motion.svg
          aria-hidden
          style={{ y: arcY }}
          viewBox="0 0 100 140"
          preserveAspectRatio="none"
          className="pointer-events-none absolute left-[13%] top-[8%] h-[90%] w-[86%] overflow-visible"
        >
          <defs>
            <linearGradient id="arc-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#d7bb80" stopOpacity="0.9" />
              <stop offset="0.55" stopColor="#c7a35e" stopOpacity="0.45" />
              <stop offset="1" stopColor="#c7a35e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0 140 V50 A50 50 0 0 1 100 50 V140"
            fill="none"
            stroke="url(#arc-fade)"
            strokeWidth="0.35"
            vectorEffect="non-scaling-stroke"
            initial={still ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
          />
        </motion.svg>

        {/* Retrato */}
        <motion.div style={{ y: portraitY }} className="absolute inset-0">
        <motion.div
          className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_58%,transparent_94%)] lg:[mask-image:linear-gradient(to_bottom,black_60%,transparent_88%)]"
          initial={still ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
        >
          {failed ? (
            <PortraitFallback />
          ) : (
            <Image
              src={PORTRAIT_SRC}
              alt={`Retrato de ${identity.name}, de terno escuro e gravata, em pose formal`}
              fill
              preload
              quality={90}
              sizes="(min-width: 1440px) 620px, (min-width: 1024px) 46vw, (min-width: 640px) 34rem, 100vw"
              className="object-cover object-top [filter:drop-shadow(0_0_1px_rgb(215_187_128/0.28))_drop-shadow(-10px_-6px_28px_rgb(215_187_128/0.10))]"
              onError={() => setFailed(true)}
            />
          )}
        </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/** Exibido se o retrato não estiver disponível: monograma no nicho, sem quebrar a composição. */
function PortraitFallback() {
  return (
    <div className="absolute inset-x-[7%] bottom-0 top-[13%] flex items-center justify-center">
      <svg viewBox="0 0 200 120" className="w-1/2 text-bronze/70" role="img" aria-label={identity.name}>
        <text
          x="100"
          y="78"
          textAnchor="middle"
          fill="currentColor"
          style={{ font: "300 72px var(--font-cormorant), serif", letterSpacing: "0.08em" }}
        >
          DPF
        </text>
        <path d="M30 100h140" stroke="currentColor" strokeWidth="0.6" />
      </svg>
    </div>
  );
}
