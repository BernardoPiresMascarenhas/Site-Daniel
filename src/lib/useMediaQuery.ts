"use client";

import { useSyncExternalStore } from "react";

/** Lê uma media query de forma segura para SSR (retorna `false` no servidor). */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Efeitos de profundidade só em telas grandes, com ponteiro fino e sem reduced motion. */
export function useRichMotion() {
  return useMediaQuery(
    "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  );
}
