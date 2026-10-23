import type { PracticeArea } from "@/config/site";

type Props = { slug: PracticeArea["slug"]; className?: string };

/**
 * Ícones lineares autorais. `pathLength={1}` permite redesenhar os traços
 * no hover do card (ver `.draw-on-hover` em globals.css).
 */
export function AreaIcon({ slug, className = "" }: Props) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    pathLength: 1,
  };

  return (
    <svg viewBox="0 0 48 48" aria-hidden className={`draw-on-hover ${className}`}>
      {slug === "familia" && (
        <>
          {/* Arco de um portal (o lar) com duas presenças de tamanhos diferentes. */}
          <path {...common} d="M8 42V22a16 16 0 0 1 32 0v20" />
          <path {...common} d="M4 42h40" />
          <path {...common} d="M19.5 25.5a3.5 3.5 0 1 0 0.01 0" />
          <path {...common} d="M13.5 42v-6a6 6 0 0 1 12 0v6" />
          <path {...common} d="M30 30.5a2.5 2.5 0 1 0 0.01 0" />
          <path {...common} d="M26 42v-4a4 4 0 0 1 8 0v4" />
        </>
      )}
      {slug === "trabalho" && (
        <>
          {/* Carteira de trabalho: caderno com lombada e registro. */}
          <path {...common} d="M12 6h24a2 2 0 0 1 2 2v32a2 2 0 0 1-2 2H12z" />
          <path {...common} d="M12 6v36" />
          <path {...common} d="M16 6v36" />
          <path {...common} d="M27 15a4 4 0 1 0 0.01 0" />
          <path {...common} d="M21 28h12" />
          <path {...common} d="M21 32.5h12" />
          <path {...common} d="M21 37h7" />
        </>
      )}
      {slug === "previdenciario" && (
        <>
          {/* Abrigo sobre uma linha do tempo: proteção ao longo dos anos. */}
          <path {...common} d="M6 22a18 18 0 0 1 36 0" />
          <path {...common} d="M6 22c3-2 6-2 9 0c3-2 6-2 9 0c3-2 6-2 9 0c3-2 6-2 9 0" />
          <path {...common} d="M24 4v2" />
          <path {...common} d="M24 22v10" />
          <path {...common} d="M4 40h40" />
          <path {...common} d="M10 37v6" />
          <path {...common} d="M24 37v6" />
          <path {...common} d="M38 37v6" />
        </>
      )}
      {slug === "tributario" && <path {...common} d="M8 8h32v32H8z" />}
    </svg>
  );
}
