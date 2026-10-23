"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Info } from "lucide-react";
import { attendance } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.8", "end 0.55"] });
  const progress = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 120, damping: 30 });

  return (
    <section id="atendimento" aria-labelledby="atendimento-title" className="grain section-y relative bg-ivory text-ink">
      <div className="container-x">
        <SectionHeading
          id="atendimento-title"
          label="Atendimento"
          title={attendance.title}
          intro={attendance.intro}
          titleClassName="max-w-[14ch]"
        />

        <ol ref={listRef} className="relative mt-16 grid gap-12 pl-12 md:mt-24 md:grid-cols-3 md:gap-10 md:pl-0 md:pt-14">
          {/* Trilho da linha do tempo: vertical no mobile, horizontal a partir de md. */}
          <span aria-hidden className="absolute bottom-2 left-[0.6875rem] top-2 w-px bg-line-light md:inset-x-0 md:bottom-auto md:top-[0.6875rem] md:h-px md:w-auto" />
          <motion.span
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute bottom-2 left-[0.6875rem] top-2 w-px origin-top bg-bronze md:hidden"
          />
          <motion.span
            aria-hidden
            style={{ scaleX: progress }}
            className="absolute inset-x-0 top-[0.6875rem] hidden h-px origin-left bg-bronze md:block"
          />

          {attendance.steps.map((step, i) => (
            <Reveal key={step.title} as="li" delay={i * 0.15} amount={0.5} className="relative">
              <Node index={i} progress={progress} count={attendance.steps.length} />
              <p className="font-serif text-[1.1rem] italic text-bronze-ink">Etapa {String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-serif text-[clamp(1.7rem,1.4rem+1vw,2.2rem)] font-normal leading-tight">{step.title}</h3>
              <p className="mt-4 max-w-sm leading-relaxed text-muted-light">{step.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <p className="mt-16 flex max-w-3xl gap-4 border-t border-line-light pt-8 text-[0.95rem] leading-relaxed text-muted-light md:mt-24">
            <Info aria-hidden strokeWidth={1.5} className="mt-1 size-4 shrink-0 text-bronze-ink" />
            {attendance.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Node({ index, count, progress }: { index: number; count: number; progress: MotionValue<number> }) {
  const threshold = count === 1 ? 0 : index / (count - 1) - 0.02;
  const fill = useTransform(progress, (v) => (v >= threshold ? 1 : 0));
  return (
    <span
      aria-hidden
      className="absolute -left-12 top-1 flex size-[1.375rem] items-center justify-center rounded-full border border-bronze bg-ivory md:-top-14 md:left-0"
    >
      <motion.span style={{ scale: fill }} className="size-2 rounded-full bg-bronze transition-transform duration-300" />
    </span>
  );
}
