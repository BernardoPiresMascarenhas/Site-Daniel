"use client";

import { motion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { contact, hero, identity } from "@/config/site";
import { useRichMotion } from "@/lib/useMediaQuery";
import { ActionLink } from "@/components/ui/ActionLink";
import { HeroPortrait } from "./HeroPortrait";

const ease = [0.22, 1, 0.36, 1] as const;

// A entrada do hero toca uma única vez por sessão: ao voltar de outra página
// (navegação client-side), o conteúdo aparece pronto, sem repetir a animação.
let introPlayed = false;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const rich = useRichMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const [skipIntro] = useState(() => introPlayed);
  useEffect(() => {
    introPlayed = true;
  }, []);
  const enter = <T,>(from: T) => (skipIntro ? false : from);

  const words = hero.headline.split(" ");

  return (
    <section
      id="inicio"
      ref={ref}
      aria-labelledby="hero-title"
      className="grain relative overflow-hidden bg-ink text-paper lg:min-h-[max(40rem,min(100svh,62rem))]"
    >
      {/* Arquitetura de fundo: grade de pilastras finíssimas e luz lateral. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 right-[-10%] w-[70%] bg-[radial-gradient(60%_55%_at_58%_38%,rgb(199_163_94/0.16),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,transparent_40%,rgb(36_39_41/0.9)_100%)]" />
        {/* Pilastra: uma única linha vertical marca a divisão entre texto e retrato. */}
        <div className="container-x absolute inset-0 hidden lg:block">
          <span className="absolute inset-y-0 left-[calc(var(--gutter)+(100%-var(--gutter)*2)*7/12)] w-px bg-gradient-to-b from-transparent via-line-dark to-transparent" />
        </div>
      </div>

      <div className="container-x relative grid items-end gap-x-8 lg:min-h-[inherit] lg:grid-cols-12">
        {/* Texto */}
        <div
          className="relative z-10 -mt-4 pb-16 sm:-mt-10 sm:pb-20 lg:col-span-7 lg:mt-0 lg:self-center lg:pb-10 lg:pt-[calc(var(--header-h)+2rem)]"
        >
          <motion.p
            className="kicker flex items-center gap-4 whitespace-nowrap text-bronze-light max-xs:tracking-[0.16em]"
            initial={enter({ opacity: 0, x: -12 })}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            <span aria-hidden className="hidden h-px w-10 bg-bronze xs:block" />
            {identity.name} <span aria-hidden className="text-bronze">/</span> Advocacia
          </motion.p>

          <h1
            id="hero-title"
            className="mt-7 max-w-[21ch] font-serif text-[length:var(--step-5)] font-light leading-[1.02] tracking-[-0.015em] sm:mt-9"
          >
            <span className="sr-only">{hero.headline}</span>
            <span aria-hidden>
              {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={enter({ y: "105%" })}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.1, delay: 0.35 + i * 0.055, ease }}
                  >
                    {word}
                    {i < words.length - 1 ? " " : ""}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <motion.div
            className="mt-8 flex max-w-xl gap-5 sm:mt-10"
            initial={enter({ opacity: 0, y: 16 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease }}
          >
            <span aria-hidden className="mt-3 hidden h-px w-12 shrink-0 bg-bronze/70 sm:block" />
            <p className="text-[length:var(--step-1)] leading-relaxed text-paper/75">{hero.supporting}</p>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center xs:gap-x-8"
            initial={enter({ opacity: 0, y: 16 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease }}
          >
            <ActionLink href="#areas" icon="down">
              {hero.primaryCta}
            </ActionLink>
            <ActionLink href={contact.whatsappHref} kind="line" icon="external" external>
              {hero.secondaryCta}
            </ActionLink>
          </motion.div>
        </div>

        {/* Retrato */}
        <div className="relative order-first lg:order-none lg:col-span-5 lg:h-full">
          <HeroPortrait progress={scrollYProgress} rich={rich} skipIntro={skipIntro} />
        </div>
      </div>

      {/* Rótulo vertical e indicador de scroll */}
      <motion.p
        aria-hidden
        className="kicker absolute right-[max(0.75rem,calc((100vw-var(--container))/2-2.5rem))] top-[42%] hidden -translate-y-1/2 text-[0.62rem] tracking-[0.45em] text-paper/40 [writing-mode:vertical-rl] xl:block"
        initial={enter({ opacity: 0 })}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.4 }}
      >
        {identity.descriptor}
      </motion.p>

      <motion.a
        href="#assinatura"
        aria-label="Rolar para a próxima seção"
        className="group absolute bottom-8 right-[max(0.75rem,calc((100vw-var(--container))/2-2.5rem))] hidden items-center text-paper/50 transition-colors hover:text-paper xl:flex"
        initial={enter({ opacity: 0 })}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <span aria-hidden className="scroll-cue relative block h-12 w-px overflow-hidden bg-paper/15" />
      </motion.a>
    </section>
  );
}
