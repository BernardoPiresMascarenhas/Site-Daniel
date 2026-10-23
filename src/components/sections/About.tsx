import { about, identity, pending } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AboutPortrait } from "./AboutPortrait";

export function About() {
  // Itens da ficha: apenas dados confirmados. Campos pendentes só entram quando `enabled`.
  const facts: { term: string; detail: string }[] = [
    { term: "Atuação", detail: identity.descriptor },
    { term: "Canais", detail: "WhatsApp e e-mail" },
  ];
  if (pending.oab.enabled) facts.push({ term: "Inscrição", detail: `OAB/MG ${pending.oab.value}` });
  if (pending.location.enabled) facts.push({ term: "Atendimento", detail: String(pending.location.value) });

  const paragraphs = pending.biography.enabled ? [String(pending.biography.value)] : about.paragraphs;

  return (
    <section id="sobre" aria-labelledby="sobre-title" className="section-y relative bg-paper text-ink">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:items-start lg:gap-x-8">
        <div className="lg:col-span-5 lg:pr-6 lg:pt-4">
          <AboutPortrait facts={facts} />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading id="sobre-title" label="Sobre" title={about.title} titleClassName="max-w-[16ch]" />

          <div className="mt-10 max-w-[38rem] space-y-5 text-[1.04rem] leading-[1.8] text-muted-light">
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08} as="p">
                {p}
              </Reveal>
            ))}
          </div>

          <ul className="mt-12 border-t border-line-light">
            {about.principles.map((item, i) => (
              <Reveal
                key={item.title}
                as="li"
                delay={i * 0.1}
                className="grid gap-1 border-b border-line-light py-5 sm:grid-cols-[13rem_1fr] sm:items-baseline sm:gap-6"
              >
                <h3 className="font-serif text-[1.55rem] font-medium leading-tight">{item.title}</h3>
                <p className="text-[0.95rem] leading-relaxed text-muted-light">{item.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
