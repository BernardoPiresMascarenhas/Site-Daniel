import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { contact, identity } from "@/config/site";
import { Footer } from "@/components/layout/Footer";
import { Wordmark } from "@/components/layout/Wordmark";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: `Como o site de ${identity.name} trata dados pessoais.`,
};

const sections = [
  {
    title: "Dados coletados por este site",
    body: [
      "Este site não possui formulários, não utiliza cookies de rastreamento e não emprega ferramentas de análise de navegação ou publicidade de terceiros.",
      "Como qualquer serviço na internet, a infraestrutura de hospedagem pode registrar dados técnicos de acesso (como endereço IP e data e hora), utilizados apenas para segurança e funcionamento do serviço.",
    ],
  },
  {
    title: "Contato por WhatsApp e e-mail",
    body: [
      "Ao entrar em contato pelos links de WhatsApp ou e-mail, as informações que você decidir enviar são tratadas exclusivamente para responder à sua mensagem e, se for o caso, avaliar a demanda apresentada.",
      "Essas conversas também estão sujeitas às políticas de privacidade dos respectivos serviços (WhatsApp e provedor de e-mail).",
      "Recomenda-se não enviar documentos ou informações sensíveis na primeira mensagem.",
    ],
  },
  {
    title: "Compartilhamento",
    body: [
      "As informações recebidas não são vendidas nem compartilhadas com terceiros para fins comerciais. O sigilo profissional aplicável à advocacia é observado.",
    ],
  },
  {
    title: "Seus direitos",
    body: [
      "Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode solicitar confirmação de tratamento, acesso, correção ou eliminação dos seus dados pessoais, entre outros direitos, pelo e-mail indicado abaixo.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <header className="bg-ink text-paper">
        <div className="container-x flex h-[var(--header-h)] items-center justify-between">
          <Link href="/" aria-label="Voltar à página inicial">
            <Wordmark />
          </Link>
        </div>
      </header>
      <main id="conteudo" className="bg-paper text-ink">
        <article className="container-x section-y">
          <div className="mx-auto max-w-[44rem]">
            <Link href="/" className="group inline-flex items-center gap-2 text-[0.88rem] font-semibold text-muted-light hover:text-ink">
              <ArrowLeft aria-hidden strokeWidth={1.5} className="size-4 transition-transform duration-500 group-hover:-translate-x-1" />
              <span className="link-underline">Voltar ao início</span>
            </Link>
            <h1 className="mt-10 font-serif text-[length:var(--step-4)] font-light leading-[1.05]">Política de privacidade</h1>
            <p className="mt-6 text-[length:var(--step-1)] leading-relaxed text-muted-light">
              Esta página explica, de forma direta, como os dados pessoais são tratados neste site.
            </p>

            {sections.map((s) => (
              <section key={s.title} className="mt-14 border-t border-line-light pt-8">
                <h2 className="font-serif text-[length:var(--step-2)] font-normal">{s.title}</h2>
                <div className="mt-4 space-y-4 leading-[1.8] text-muted-light">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}

            <section className="mt-14 border-t border-line-light pt-8">
              <h2 className="font-serif text-[length:var(--step-2)] font-normal">Contato</h2>
              <p className="mt-4 leading-[1.8] text-muted-light">
                Para dúvidas sobre esta política ou sobre seus dados:{" "}
                <a href={contact.emailHref} className="link-underline break-all text-ink">
                  {contact.email}
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer minimal />
    </>
  );
}
