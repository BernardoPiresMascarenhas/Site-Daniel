"use client";

import Image from "next/image";
import { useRef } from "react";
import { Plus } from "lucide-react";
import type { PracticeArea } from "@/config/site";
import { AreaIcon } from "@/components/ui/AreaIcon";

type Props = { area: PracticeArea; index: number; total: number; onOpen: (area: PracticeArea) => void };

/**
 * Card de área: detalhe arquitetônico que ganha luz no hover, brilho que
 * acompanha o ponteiro e card inteiro clicável (o botão é o alvo acessível).
 */
export function AreaCard({ area, index, total, onOpen }: Props) {
  const ref = useRef<HTMLElement>(null);

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <article
      ref={ref}
      id={`area-${area.slug}`}
      aria-labelledby={`area-${area.slug}-title`}
      onPointerMove={onPointerMove}
      className="group relative flex w-full scroll-mt-28 flex-col overflow-hidden border border-line-dark bg-ink/70 shadow-[var(--shadow-lift)] transition-[border-color,transform,box-shadow] duration-500 ease-[var(--ease-editorial)] hover:-translate-y-1 hover:border-bronze/45 hover:shadow-[0_40px_70px_-40px_rgb(0_0_0/0.9)]"
    >
      {/* Brilho que segue o ponteiro (somente mouse). */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 [background:radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,30%),rgb(215_187_128/0.09),transparent_60%)] group-hover:opacity-100"
      />

      {area.image && (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-line-dark">
          <Image
            src={area.image.src}
            alt={area.image.alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 90vw, 100vw"
            style={{ objectPosition: area.image.position }}
            className="object-cover opacity-70 grayscale-[0.2] transition-[transform,opacity] duration-[1200ms] ease-[var(--ease-editorial)] group-hover:scale-[1.06] group-hover:opacity-90"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(110deg,rgb(199_163_94/0.18),transparent_55%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
          <span className="absolute bottom-4 left-7 font-serif text-[1.05rem] italic tabular-nums text-bronze-light sm:left-9">
            {String(index + 1).padStart(2, "0")}
            <span className="text-paper/70"> / {String(total).padStart(2, "0")}</span>
          </span>
        </div>
      )}

      {/* Filete superior que se estende no hover. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-[0.18] bg-bronze transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-x-100"
      />

      <div className="flex flex-1 flex-col p-7 sm:p-9">
        <div className="flex items-start justify-between gap-6">
          <h3
            id={`area-${area.slug}-title`}
            className="font-serif text-[clamp(1.85rem,1.5rem+1vw,2.4rem)] font-normal leading-[1.05]"
          >
            {area.title}
          </h3>
          <AreaIcon
            slug={area.slug}
            className="mt-1 size-11 shrink-0 text-bronze-light/80 transition-colors duration-500 group-hover:text-bronze-light"
          />
        </div>
        <p className="mt-5 text-[1rem] leading-relaxed text-paper/75">{area.summary}</p>

        <div className="mt-8 border-t border-line-dark pt-6">
          <p className="text-[0.8rem] font-semibold text-muted-dark">{area.topicsLabel}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {area.topics.map((t) => (
              <li
                key={t}
                className="border border-line-dark px-3 py-1 text-[0.84rem] text-paper/85 transition-colors duration-500 group-hover:border-paper/20"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-10">
          <button
            type="button"
            onClick={() => onOpen(area)}
            aria-haspopup="dialog"
            className="group/btn inline-flex items-center gap-3 py-2 text-[0.88rem] font-semibold text-paper after:absolute after:inset-0 after:z-20 after:content-['']"
          >
            <span className="flex size-9 items-center justify-center rounded-full border border-bronze/50 transition-colors duration-300 group-hover:border-bronze group-hover:bg-bronze group-hover:text-ink">
              <Plus aria-hidden strokeWidth={1.5} className="size-4 transition-transform duration-500 group-hover:rotate-90" />
            </span>
            <span className="link-underline">
              Ler sobre a área<span className="sr-only">: {area.title}</span>
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
