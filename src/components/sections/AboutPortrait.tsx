"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { identity } from "@/config/site";
import { useRichMotion } from "@/lib/useMediaQuery";

type Fact = { term: string; detail: string };

/**
 * Retrato num nicho em arco revestido de mármore escuro, com pilastra canelada
 * ao lado e ficha sobreposta. O recorte do retrato não é alterado; apenas
 * enquadrado em busto.
 */
export function AboutPortrait({ facts }: { facts: Fact[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const rich = useRichMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], rich ? ["3%", "-3%"] : ["0%", "0%"]);
  const marbleY = useTransform(scrollYProgress, [0, 1], rich ? ["-6%", "6%"] : ["0%", "0%"]);
  const pilasterY = useTransform(scrollYProgress, [0, 1], rich ? [40, -40] : [0, 0]);
  const cardY = useTransform(scrollYProgress, [0, 1], rich ? [30, -30] : [0, 0]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[28rem] lg:mx-0 lg:max-w-none lg:pr-10">
      {/* Pilastra canelada: detalhe arquitetônico discreto à esquerda do nicho. */}
      <motion.svg
        aria-hidden
        style={{ y: pilasterY }}
        viewBox="0 0 40 400"
        preserveAspectRatio="none"
        className="absolute -left-3 top-[18%] hidden h-[70%] w-6 text-bronze/70 sm:block lg:-left-6"
      >
        <path d="M2 14h36M6 22h28M6 378h28M2 386h36" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d="M8 22v356M32 22v356M16 30v340M24 30v340" fill="none" stroke="currentColor" strokeWidth="0.6" vectorEffect="non-scaling-stroke" opacity="0.7" />
      </motion.svg>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="relative">
        {/* Moldura bronze deslocada, também em arco. */}
        <motion.div
          aria-hidden
          className="absolute -bottom-4 -right-3 left-4 top-4 rounded-t-full border border-bronze/50 sm:-bottom-5 sm:-right-5 sm:left-5 sm:top-5"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: 1.2, delay: 0.6 }}
        />

        <motion.div
          className="relative aspect-[4/5.2] overflow-hidden rounded-t-full bg-ink shadow-[var(--shadow-paper)]"
          variants={{
            hidden: { clipPath: "inset(100% 0 0 0 round 999px 999px 0 0)" },
            visible: { clipPath: "inset(0% 0 0 0 round 999px 999px 0 0)" },
          }}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        >
          <motion.div aria-hidden style={{ y: marbleY }} className="absolute -inset-y-[8%] inset-x-0">
            <Image src="/images/marmore-escuro.webp" alt="" fill sizes="(min-width: 1024px) 34vw, 28rem" className="object-cover opacity-60" />
          </motion.div>
          {/* Luz quente atrás da cabeça e sombra na base, para destacar o terno escuro. */}
          <div
            aria-hidden
            className="absolute left-1/2 top-[8%] h-[55%] w-[85%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(215_187_128/0.26),rgb(23_25_27/0.2)_60%,transparent)]"
          />
          <div aria-hidden className="absolute inset-2.5 rounded-t-full border border-bronze/30" />

          <motion.div style={{ y: portraitY }} className="absolute inset-x-0 -bottom-[6%] top-[9%]">
            <Image
              src="/images/daniel-hero-transparent.png"
              alt={`Retrato de ${identity.name}`}
              fill
              sizes="(min-width: 1024px) 34vw, (min-width: 640px) 28rem, 90vw"
              className="origin-top scale-[1.22] object-cover object-[50%_0%] [filter:drop-shadow(0_0_1px_rgb(215_187_128/0.3))]"
            />
          </motion.div>
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
        </motion.div>

        {/* Ficha sobreposta ao canto do retrato: só dados confirmados. */}
        <motion.div style={{ y: cardY }} className="relative z-10 -mt-16 ml-auto w-[88%] sm:w-[78%] xl:absolute xl:-bottom-14 xl:-right-14 xl:mt-0 xl:w-[62%]">
          <motion.dl
            className="border border-line-light bg-paper/95 p-6 text-[0.88rem] shadow-[var(--shadow-paper)] backdrop-blur sm:p-7"
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {facts.map((f, i) => (
              <div key={f.term} className={i > 0 ? "mt-4 border-t border-line-light pt-4" : undefined}>
                <dt className="kicker text-[0.64rem] text-bronze-ink">{f.term}</dt>
                <dd className="mt-1.5 text-ink">{f.detail}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </motion.div>
    </div>
  );
}
