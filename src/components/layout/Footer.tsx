import Link from "next/link";
import { contact, footer, identity, navigation, pending, project } from "@/config/site";
import { CurrentYear } from "./CurrentYear";
import { Wordmark } from "./Wordmark";

export function Footer({ minimal = false }: { minimal?: boolean }) {
  return (
    <footer className="relative border-t border-line-dark bg-ink-deep text-paper">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark />
            <p className="mt-6 max-w-xs text-[0.92rem] leading-relaxed text-muted-dark">{identity.descriptor}</p>
            {/* Inscrição na OAB: exibida somente após validação (ver pending.oab). */}
            {pending.oab.enabled && (
              <p className="mt-3 text-[0.85rem] text-paper/80">OAB/MG {pending.oab.value}</p>
            )}
          </div>

          {!minimal && (
            <nav aria-label="Rodapé" className="md:col-span-3">
              <ul className="grid gap-2.5 text-[0.9rem]">
                {navigation.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="link-underline text-paper/70 transition-colors hover:text-paper">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className={minimal ? "md:col-span-7" : "md:col-span-4"}>
            <ul className="grid gap-2.5 text-[0.9rem]">
              <li>
                <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="link-underline text-paper/70 hover:text-paper">
                  WhatsApp {contact.phoneDisplay}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
              <li>
                <a href={contact.emailHref} className="link-underline break-all text-paper/70 hover:text-paper">
                  {contact.email}
                </a>
              </li>
              <li className="pt-3">
                <Link href="/privacidade" className="link-underline text-paper/70 hover:text-paper">
                  Política de privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-t border-line-dark pt-8 text-[0.85rem] leading-relaxed text-muted-dark md:grid-cols-12">
          <p className="md:col-span-7">{footer.legal}</p>
          <div className="space-y-2 md:col-span-4 md:col-start-9 md:text-right">
            <p>
              © <CurrentYear /> {identity.name}
            </p>
            {!project.isOfficial && <p className="text-paper/65">{footer.demoNotice}</p>}
          </div>
        </div>
      </div>
    </footer>
  );
}
