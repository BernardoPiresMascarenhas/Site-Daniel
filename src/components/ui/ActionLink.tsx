import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";

type Tone = "dark" | "light";
type Kind = "solid" | "line";
type Icon = "right" | "down" | "external";

const icons = { right: ArrowRight, down: ArrowDown, external: ArrowUpRight };

const iconMotion: Record<Icon, string> = {
  right: "group-hover:translate-x-1",
  down: "group-hover:translate-y-0.5",
  external: "group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
};

const styles: Record<Kind, Record<Tone, string>> = {
  solid: {
    // Botão claro sobre fundo escuro.
    dark:
      "bg-paper text-ink hover:bg-bronze-light focus-visible:bg-bronze-light px-6 py-3.5 sm:px-7 sm:py-4",
    light: "bg-ink text-paper hover:bg-ink-3 px-6 py-3.5 sm:px-7 sm:py-4",
  },
  line: {
    dark: "text-paper py-3.5 sm:py-4",
    light: "text-ink py-3.5 sm:py-4",
  },
};

type ActionLinkProps = {
  href: string;
  children: React.ReactNode;
  kind?: Kind;
  tone?: Tone;
  icon?: Icon;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
};

/** Link com aparência de ação: seta que se desloca e sublinhado/realce no hover. */
export function ActionLink({
  href,
  children,
  kind = "solid",
  tone = "dark",
  icon = "right",
  className = "",
  external = false,
  ariaLabel,
}: ActionLinkProps) {
  const Arrow = icons[icon];
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative inline-flex items-center justify-center gap-3 text-[0.9rem] font-semibold tracking-[0.01em] transition-colors duration-300 ${styles[kind][tone]} ${className}`}
    >
      <span className={kind === "line" ? "link-underline" : undefined}>{children}</span>
      <Arrow
        aria-hidden
        strokeWidth={1.5}
        className={`size-4 shrink-0 transition-transform duration-500 ease-[var(--ease-editorial)] ${iconMotion[icon]} ${kind === "line" ? "text-bronze" : ""}`}
      />
      {external && <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  );
}
