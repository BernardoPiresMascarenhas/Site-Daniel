"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { contact, navigation } from "@/config/site";
import { useActiveSection } from "@/lib/useActiveSection";
import { MobileMenu } from "./MobileMenu";
import { Wordmark } from "./Wordmark";

const sectionIds = navigation.map((n) => n.id);

export function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 32, mass: 0.4 });
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    // Recolhe ao descer, reaparece ao subir: sem disputar atenção com a leitura.
    setHidden(y > 640 && y > prev + 4 && !menuOpen);
    if (y < prev - 4) setHidden(false);
  });

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 text-paper"
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          aria-hidden
          className={`absolute inset-0 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
            scrolled && !menuOpen
              ? "border-line-dark bg-ink/95 backdrop-blur-md"
              : "border-transparent bg-transparent"
          }`}
        />
        {/* Progresso de leitura: filete discreto na base do header. */}
        <motion.span
          aria-hidden
          style={{ scaleX: progress }}
          className={`absolute inset-x-0 bottom-0 h-px origin-left bg-bronze/70 transition-opacity duration-500 ${
            scrolled && !menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="container-x relative flex h-[var(--header-h)] items-center justify-between gap-6">
          <a href="#inicio" className="relative z-10" aria-label="Daniel P. França Advocacia, voltar ao início">
            <Wordmark />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id} className="relative">
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative block px-3.5 py-2 text-[0.84rem] font-medium tracking-[0.01em] transition-colors duration-300 ${
                        isActive ? "text-paper" : "text-paper/65 hover:text-paper"
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-3.5 -bottom-0.5 h-px bg-bronze"
                          transition={{ type: "spring", stiffness: 380, damping: 36 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-2">
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-2 border border-bronze/50 px-4 py-2.5 text-[0.82rem] font-semibold transition-colors duration-300 hover:border-bronze hover:bg-bronze hover:text-ink sm:inline-flex"
            >
              Contato
              <ArrowUpRight
                aria-hidden
                strokeWidth={1.5}
                className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              <span className="sr-only"> via WhatsApp (abre em nova aba)</span>
            </a>

            <button
              ref={toggleRef}
              type="button"
              className="relative -mr-2 flex size-11 items-center justify-center lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="relative block h-3 w-6" aria-hidden>
                <span
                  className={`absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-500 ease-[var(--ease-editorial)] ${
                    menuOpen ? "translate-y-1.5 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 right-0 h-px bg-current transition-all duration-500 ease-[var(--ease-editorial)] ${
                    menuOpen ? "w-6 -translate-y-[5px] -rotate-45" : "w-4"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={closeMenu} active={active} returnFocusTo={toggleRef} />
    </>
  );
}
