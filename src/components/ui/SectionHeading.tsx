import { Reveal } from "@/components/motion/Reveal";

type Props = {
  id?: string;
  label?: string;
  title: string;
  intro?: string;
  tone?: "light" | "dark";
  className?: string;
  titleClassName?: string;
};

/** Título de seção: rótulo marginal discreto, título serif e texto de apoio opcional. */
export function SectionHeading({ id, label, title, intro, tone = "light", className = "", titleClassName = "" }: Props) {
  const dark = tone === "dark";
  return (
    <div className={className}>
      {label && (
        <Reveal variant="fade">
          <p className={`kicker flex items-center gap-3 ${dark ? "text-bronze-light" : "text-bronze-ink"}`}>
            <span aria-hidden className="h-px w-8 bg-bronze" />
            {label}
          </p>
        </Reveal>
      )}
      <Reveal variant="mask" delay={0.05}>
        <h2
          id={id}
          className={`mt-6 font-serif text-[length:var(--step-4)] font-light leading-[1.05] ${dark ? "text-paper" : "text-ink"} ${titleClassName}`}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.15}>
          <p className={`mt-6 max-w-xl text-[length:var(--step-1)] leading-relaxed ${dark ? "text-muted-dark" : "text-muted-light"}`}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
