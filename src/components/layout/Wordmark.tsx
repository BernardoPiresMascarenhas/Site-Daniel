import { identity } from "@/config/site";

/** Wordmark tipográfico: nome em serif espaçada, apoio em versalete fino. */
export function Wordmark({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 leading-none ${className}`}>
      <svg viewBox="0 0 22 30" aria-hidden className="h-7 w-auto shrink-0 text-bronze">
        {/* Pequeno arco com pilar: a assinatura gráfica do site. */}
        <path d="M1 29V11a10 10 0 0 1 20 0v18" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M11 9v20" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M1 29h20" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span className="flex flex-col gap-1.5">
        <span className="whitespace-nowrap font-serif text-[0.92rem] font-medium tracking-[0.14em] xs:text-[1.02rem] xs:tracking-[0.2em] sm:text-[1.08rem]">
          {identity.wordmark}
        </span>
        {!compact && (
          <span className="font-sans text-[0.58rem] font-semibold tracking-[0.5em] opacity-60">
            {identity.wordmarkSupport}
          </span>
        )}
      </span>
    </span>
  );
}
