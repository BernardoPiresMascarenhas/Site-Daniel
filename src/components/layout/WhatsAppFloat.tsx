"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { contact } from "@/config/site";

/** Atalho discreto para o WhatsApp: aparece após o hero e some na seção de contato. */
export function WhatsAppFloat() {
  const { scrollY } = useScroll();
  const [pastHero, setPastHero] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setPastHero(y > window.innerHeight * 0.9));

  useEffect(() => {
    const el = document.getElementById("contato");
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show = pastHero && !contactVisible;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar pelo WhatsApp (abre em nova aba)"
          className="group fixed bottom-4 right-4 z-30 flex size-12 items-center justify-center rounded-full border border-bronze/50 bg-ink/90 text-bronze-light shadow-[0_18px_40px_-18px_rgb(0_0_0/0.7)] backdrop-blur transition-colors duration-300 hover:bg-bronze hover:text-ink md:bottom-8 md:right-8 md:size-14"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg viewBox="0 0 24 24" aria-hidden className="size-6">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
              d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z"
            />
            <path
              fill="currentColor"
              d="M9.1 7.6c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.3.6 1.4 2 2.9 2.6.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.6-.1l1.6.8c.2.1.4.2.4.3 0 .2 0 .9-.4 1.4-.4.5-1.3 1-2 1-.6 0-1.4.1-3.5-1.1-2.5-1.4-3.6-3.9-3.8-4.2-.2-.3-.8-1.3-.7-2.3 0-1 .6-1.5.8-1.7z"
            />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
