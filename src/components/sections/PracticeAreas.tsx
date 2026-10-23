"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import { activePracticeAreas, contact, faq, type PracticeArea } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AreaIcon } from "@/components/ui/AreaIcon";
import { AreaCard } from "./AreaCard";
import { ActionLink } from "@/components/ui/ActionLink";

export function PracticeAreas() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<PracticeArea | null>(null);

  const open = (area: PracticeArea) => {
    setCurrent(area);
    dialogRef.current?.showModal();
  };

  return (
    <section id="areas" aria-labelledby="areas-title" className="grain section-y relative bg-ink-2 text-paper">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="areas-title"
            tone="dark"
            label="Áreas de atuação"
            title="Três campos do Direito, cada um com suas particularidades."
            className="lg:col-span-7"
            titleClassName="max-w-[20ch]"
          />
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="text-[length:var(--step-0)] leading-relaxed text-muted-dark">
              Um panorama de cada área para quem busca entender o tema. Os assuntos listados ilustram o campo de
              cada disciplina e não substituem a análise de um caso concreto.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-5 md:mt-20 lg:grid-cols-3 lg:gap-6">
          {activePracticeAreas.map((area, i) => (
            <Reveal key={area.slug} as="li" delay={i * 0.12} amount={0.2} className="flex">
              <AreaCard area={area} index={i} total={activePracticeAreas.length} onOpen={open} />
            </Reveal>
          ))}
        </ol>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="area-dialog-title"
        className="area-dialog m-auto max-h-[min(90svh,48rem)] w-[min(100%-2rem,44rem)] overflow-y-auto bg-paper p-0 text-ink shadow-[var(--shadow-paper)] backdrop:bg-transparent"
        onClick={(e) => {
          // Clique no fundo (fora do conteúdo) fecha o painel.
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
      >
        {current && (
          <>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="absolute right-3 top-3 z-10 flex size-11 items-center justify-center rounded-full bg-paper/90 text-ink/70 transition-colors hover:text-ink sm:right-5 sm:top-5"
              aria-label="Fechar painel"
            >
              <X aria-hidden strokeWidth={1.5} className="size-5" />
            </button>
          {current.image && (
            <div className="relative aspect-[21/8] overflow-hidden bg-ink">
              <Image
                src={current.image.src}
                alt=""
                fill
                sizes="44rem"
                style={{ objectPosition: current.image.position }}
                className="object-cover opacity-80"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            </div>
          )}
          <div className="relative p-7 sm:p-12">


            <AreaIcon slug={current.slug} className="size-12 text-bronze-ink" />
            <h3 id="area-dialog-title" className="mt-6 pr-10 font-serif text-[length:var(--step-3)] font-normal leading-tight">
              {current.title}
            </h3>
            <div className="mt-6 space-y-4 leading-[1.8] text-muted-light">
              {current.detail.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <p className="mt-8 text-[0.75rem] font-semibold text-bronze-ink">{current.topicsLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {current.topics.map((t) => (
                <li key={t} className="border border-line-light px-3 py-1 text-[0.82rem]">
                  {t}
                </li>
              ))}
            </ul>

            <p className="mt-8 border-l border-bronze pl-4 text-[0.86rem] leading-relaxed text-muted-light">
              {faq.disclaimer}
            </p>

            <div className="mt-10 flex flex-col gap-2 border-t border-line-light pt-8 xs:flex-row xs:flex-wrap xs:items-center xs:gap-x-8">
              <ActionLink href={contact.whatsappHref} tone="light" icon="external" external>
                Entre em contato
              </ActionLink>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="group inline-flex items-center gap-3 py-3.5 text-[0.9rem] font-semibold"
              >
                <span className="link-underline">Voltar às áreas</span>
                <ArrowRight aria-hidden strokeWidth={1.5} className="size-4 text-bronze-ink transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
          </>
        )}
      </dialog>
    </section>
  );
}
