"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { contact, contactSection } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = contact.emailHref;
    }
  };

  const channels = [
    { label: "WhatsApp", value: contact.phoneDisplay, href: contact.whatsappHref, external: true },
    { label: "E-mail", value: contact.email, href: contact.emailHref, external: false },
  ];

  return (
    <section id="contato" aria-labelledby="contato-title" className="grain relative overflow-hidden bg-ink text-paper">
      {/* Arco de fechamento: ecoa o nicho do hero. */}
      <motion.svg
        aria-hidden
        viewBox="0 0 600 700"
        className="pointer-events-none absolute -right-[12%] top-[6%] h-[110%] w-auto opacity-60 md:-right-[4%]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {[0, 34].map((inset, i) => (
          <motion.path
            key={inset}
            d={`M${inset} 700 V${300 + inset} A${300 - inset} ${300 - inset} 0 0 1 ${600 - inset} ${300 + inset} V700`}
            fill="none"
            stroke={i === 0 ? "#c7a35e" : "rgb(251 250 247 / 0.14)"}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
            transition={{ duration: 2.4, delay: i * 0.3, ease: [0.65, 0, 0.35, 1] }}
          />
        ))}
      </motion.svg>

      <div className="container-x relative pb-24 pt-[clamp(6rem,4rem+8vw,11rem)] md:pb-32">
        <Reveal variant="fade">
          <p className="kicker flex items-center gap-3 text-bronze-light">
            <span aria-hidden className="h-px w-8 bg-bronze" />
            Contato
          </p>
        </Reveal>
        <h2
          id="contato-title"
          className="mt-8 font-serif text-[clamp(3.2rem,1.4rem+8vw,9rem)] font-light leading-[0.92] tracking-[-0.03em]"
        >
          <Reveal as="span" variant="mask" className="block">
            Entre em
          </Reveal>
          <Reveal as="span" variant="mask" delay={0.12} className="block pl-[0.6em] md:pl-[1.4em]">
            contato.
          </Reveal>
        </h2>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12">
          <Reveal className="lg:col-span-4" delay={0.1}>
            <p className="max-w-sm text-[length:var(--step-1)] leading-relaxed text-paper/75">{contactSection.text}</p>
          </Reveal>

          <ul className="border-t border-line-dark lg:col-span-7 lg:col-start-6">
            {channels.map((c, i) => (
              <Reveal key={c.label} as="li" delay={0.15 + i * 0.1} className="border-b border-line-dark">
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group relative flex items-center justify-between gap-4 py-7 md:py-9"
                >
                  <span className="flex min-w-0 flex-col gap-2 md:flex-row md:items-baseline md:gap-8">
                    <span className="w-24 shrink-0 text-[0.84rem] font-semibold text-muted-dark">{c.label}</span>
                    <span className="min-w-0 break-words font-serif text-[clamp(1.4rem,0.9rem+1.7vw,2.5rem)] font-light leading-tight transition-colors duration-500 group-hover:text-bronze-light">
                      {c.value}
                    </span>
                  </span>
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line-dark transition-colors duration-500 group-hover:border-bronze group-hover:bg-bronze group-hover:text-ink md:size-14">
                    <ArrowUpRight
                      aria-hidden
                      strokeWidth={1.25}
                      className="size-5 transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                  <span
                    aria-hidden
                    className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-bronze transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-x-100"
                  />
                  {c.external && <span className="sr-only"> (abre em nova aba)</span>}
                </a>
              </Reveal>
            ))}
            <li className="pt-6">
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2.5 py-2 text-[0.9rem] font-medium text-muted-dark transition-colors hover:text-paper"
              >
                {copied ? (
                  <Check aria-hidden strokeWidth={1.5} className="size-4 text-bronze" />
                ) : (
                  <Copy aria-hidden strokeWidth={1.5} className="size-4" />
                )}
                <span className="link-underline">{copied ? "E-mail copiado" : "Copiar e-mail"}</span>
              </button>
              <span role="status" className="sr-only">
                {copied ? "E-mail copiado para a área de transferência" : ""}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
