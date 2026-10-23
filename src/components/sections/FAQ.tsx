"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { faq } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section aria-labelledby="faq-title" className="section-y relative bg-paper text-ink">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="faq-title" label="Informações gerais" title={faq.title} intro={faq.intro} />
            <Reveal delay={0.2}>
              <p className="mt-8 border-l border-bronze pl-4 text-[0.88rem] leading-relaxed text-muted-light">
                {faq.disclaimer}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <ul className="border-t border-line-light">
            {faq.items.map((item, i) => {
              const isOpen = openIndex === i;
              const buttonId = `${baseId}-q-${i}`;
              const panelId = `${baseId}-a-${i}`;
              return (
                <Reveal key={item.q} as="li" delay={i * 0.06} amount={0.4} className="border-b border-line-light">
                  <h3 className="font-sans">
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="group flex w-full items-start justify-between gap-6 py-7 text-left"
                    >
                      <span className="font-serif text-[clamp(1.35rem,1.2rem+0.6vw,1.7rem)] font-normal leading-snug transition-colors group-hover:text-bronze-ink">
                        {item.q}
                      </span>
                      <span
                        aria-hidden
                        className={`relative mt-2 flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                          isOpen ? "border-ink bg-ink text-paper" : "border-line-light group-hover:border-ink"
                        }`}
                      >
                        <span className="absolute h-px w-3 bg-current" />
                        <span
                          className={`absolute h-3 w-px bg-current transition-transform duration-500 ease-[var(--ease-editorial)] ${
                            isOpen ? "rotate-90 scale-y-0" : ""
                          }`}
                        />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-8 pr-12 leading-[1.8] text-muted-light">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
