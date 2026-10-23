"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { contact, navigation, type SectionId } from "@/config/site";

type Props = {
  open: boolean;
  onClose: () => void;
  active: string;
  returnFocusTo: React.RefObject<HTMLButtonElement | null>;
};

export function MobileMenu({ open, onClose, active, returnFocusTo }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const returnTarget = returnFocusTo.current;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Mantém o foco dentro do menu enquanto aberto.
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>("a, button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("a")?.focus());

    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      returnTarget?.focus();
    };
  }, [open, onClose, returnFocusTo]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          id="menu-mobile"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className="grain fixed inset-0 z-40 flex flex-col bg-ink text-paper lg:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
          onClick={(e) => {
            // Clique fora dos links (área vazia) fecha o menu.
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <nav
            aria-label="Principal"
            className="container-x flex flex-1 flex-col justify-center pt-[var(--header-h)]"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            <ul className="flex flex-col border-t border-line-dark">
              {navigation.map((item, i) => (
                <motion.li
                  key={item.id}
                  className="border-b border-line-dark"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8, transition: { duration: 0.2 } }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={onClose}
                    aria-current={active === (item.id as SectionId) ? "location" : undefined}
                    className="group flex items-baseline justify-between gap-4 py-4 font-serif text-[clamp(1.9rem,8vw,2.6rem)] leading-tight"
                  >
                    <span className={active === item.id ? "text-bronze-light" : undefined}>{item.label}</span>
                    <span className="font-sans text-xs tabular-nums text-muted-dark">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="container-x flex flex-col gap-2 pb-10 text-sm text-muted-dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="link-underline w-fit text-paper">
              WhatsApp {contact.phoneDisplay}
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
            <a href={contact.emailHref} className="link-underline w-fit break-all">
              {contact.email}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
