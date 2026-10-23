"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

type RevealVariant = "rise" | "fade" | "mask" | "wipe";

const variants: Record<RevealVariant, Variants> = {
  rise: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  // Revela de baixo para cima por máscara, sem deslocar o layout.
  mask: {
    // Estado final com folga negativa: não corta acentos nem descendentes.
    hidden: { opacity: 0, clipPath: "inset(-20% -10% 100% -10%)", y: 12 },
    visible: { opacity: 1, clipPath: "inset(-20% -10% -20% -10%)", y: 0 },
  },
  // Revela da esquerda para a direita.
  wipe: {
    hidden: { clipPath: "inset(-20% 100% -20% 0%)" },
    visible: { clipPath: "inset(-20% -10% -20% 0%)" },
  },
};

type RevealProps = {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span";
  amount?: number;
};

export function Reveal({
  children,
  variant = "rise",
  delay = 0,
  duration = 0.9,
  className,
  as = "div",
  amount = 0.3,
}: RevealProps) {
  const Component = motion[as];
  const reduce = useReducedMotion();
  const active: RevealVariant = reduce ? "fade" : variant;
  const transition = { duration, delay, ease: [0.22, 1, 0.36, 1] as const };
  const clipped = active === "mask" || active === "wipe";

  // O IntersectionObserver ignora elementos totalmente recortados por clip-path;
  // por isso o recorte fica num filho e o elemento externo é quem é observado.
  if (clipped) {
    const Inner = as === "span" || as === "p" ? motion.span : motion.div;
    return (
      <Component
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount }}
      >
        <Inner className="block" variants={variants[active]} transition={transition}>
          {children}
        </Inner>
      </Component>
    );
  }

  return (
    <Component
      className={className}
      variants={variants[active]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={transition}
    >
      {children}
    </Component>
  );
}
