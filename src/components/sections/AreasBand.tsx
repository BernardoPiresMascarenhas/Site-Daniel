import { activePracticeAreas } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";

/** Faixa de assinatura: as três áreas em tipografia editorial. */
export function AreasBand() {
  return (
    <section id="assinatura" aria-labelledby="assinatura-title" className="grain relative bg-ivory text-ink">
      <h2 id="assinatura-title" className="sr-only">
        Áreas em destaque
      </h2>
      {/* Cornija: duas linhas finas que marcam a passagem do hero para a seção clara. */}
      <div aria-hidden className="container-x pt-3">
        <div className="h-px bg-line-light" />
        <div className="mt-1 h-px bg-line-light" />
      </div>

      <div className="container-x">
        <ul className="grid border-b border-line-light lg:grid-cols-[1fr_1fr_1.4fr]">
          {activePracticeAreas.map((area, i) => (
            <li
              key={area.slug}
              className="border-t border-line-light first:border-t-0 lg:border-l lg:border-t-0 lg:first:border-l-0"
            >
              <a
                href={`#area-${area.slug}`}
                className={`group relative flex items-end justify-between gap-4 py-7 sm:py-9 lg:flex-col lg:items-start lg:py-20 ${i === 0 ? "lg:pr-10" : "lg:px-10"}`}
              >
                <Reveal variant="wipe" delay={i * 0.12} duration={1.2} amount={0.6}>
                  <span className="block font-serif text-[clamp(2.4rem,1rem+3.6vw,4.4rem)] font-light leading-none tracking-[-0.02em] transition-transform duration-700 ease-[var(--ease-editorial)] lg:group-hover:-translate-y-1">
                    {area.short}
                  </span>
                </Reveal>
                <span className="text-sm text-muted-light transition-colors group-hover:text-ink max-sm:sr-only">
                  <span className="sr-only">Ir para </span>
                  {area.title}
                </span>
                <span
                  aria-hidden
                  className={`absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-bronze transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-x-100 ${i === 0 ? "" : "lg:left-10 lg:w-[calc(100%-2.5rem)]"}`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="grid gap-6 py-14 md:grid-cols-12 md:py-20">
          <Reveal className="md:col-span-4" variant="fade">
            <p className="kicker text-bronze-ink">Orientação individualizada</p>
          </Reveal>
          <Reveal className="md:col-span-8 lg:col-span-7" delay={0.1}>
            <p className="font-serif text-[length:var(--step-2)] font-normal leading-snug text-ink">
              Cada pessoa chega com uma história, documentos e dúvidas próprias. A orientação jurídica parte dessa
              individualidade: ouvir, compreender o contexto e explicar com clareza os caminhos possíveis,
              sem antecipar conclusões.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
