"use client";

/** Leva o foco do teclado ao conteúdo principal (não apenas a rolagem). */
export function SkipLink() {
  return (
    <a
      href="#conteudo"
      onClick={(e) => {
        const main = document.getElementById("conteudo");
        if (!main) return;
        e.preventDefault();
        main.focus({ preventScroll: true });
        main.scrollIntoView();
      }}
      className="kicker fixed left-4 top-4 z-[100] -translate-y-24 bg-paper px-4 py-3 text-ink transition-transform focus:translate-y-0"
    >
      Pular para o conteúdo
    </a>
  );
}
