# Daniel P. França — Advocacia e Consultoria Jurídica

Site institucional (página única) em **Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + Motion**.

> **Versão de demonstração, não oficial.** Não publicar como site oficial antes da autorização do Daniel, incluindo o uso do retrato, e da validação de todo o conteúdo. Enquanto `project.isOfficial` for `false`, o site sai com `noindex`, `robots.txt` bloqueando tudo, sem JSON-LD e com um aviso no rodapé.

## Executar

```bash
npm install
npm run dev        # http://localhost:3000
# produção
npm run build && npm start
```

Verificações: `npm run lint` · `npx tsc --noEmit` · `npm run build`.

## Estrutura

```
src/
  config/site.ts            # TODO o conteúdo editável + dados pendentes (TODO_CONFIRMAR / enabled:false)
  app/
    layout.tsx              # fontes (Cormorant Garamond + Manrope), metadata, skip link
    page.tsx                # composição da landing
    privacidade/page.tsx    # política de privacidade (LGPD)
    globals.css             # design tokens, utilitários, estados de dialog
    robots.ts · sitemap.ts · opengraph-image.tsx · icon.svg
  components/
    layout/                 # Header (com progresso de leitura), MobileMenu, Wordmark, Footer, WhatsAppFloat, CurrentYear
    sections/               # Hero, HeroPortrait, AreasBand, About, AboutPortrait, PracticeAreas, AreaCard,
                            # VisualStatement, Process, FAQ, Contact
    ui/                     # ActionLink, SectionHeading, AreaIcon (ícones SVG autorais)
    motion/                 # MotionProvider (reduced motion), Reveal
    seo/StructuredData.tsx  # JSON-LD só em versão oficial
  lib/                      # useMediaQuery / useRichMotion, useActiveSection
public/images/              # retrato, foto original, cartão, fotos de arquitetura (duotone) e mármore
```

## Pendências a confirmar com o Daniel

Todas estão em `pending` em `src/config/site.ts` e **não aparecem** na interface, nos metadados nem no schema enquanto `enabled: false`:

| Item | Situação |
| --- | --- |
| Retrato do hero | Expandido por IA a partir de foto de 150 × 150 px. **Exige aprovação expressa** antes de publicar. |
| OAB/MG | O número 232.767 vem apenas do nome de um arquivo. Conferir com o Daniel e no CNA. |
| Defensor Dativo TED OAB/MG | Confirmar a forma exata de atuação antes de citar. |
| "Especialista em Benefícios do INSS" | Usar "especialista" só com titulação comprovada; hoje o site diz "atuação em temas relacionados a benefícios do INSS". |
| Membro @septemcapulus | Natureza desconhecida; oculto. |
| Direito Tributário | No config como `status: "pending"`; não renderizado. |
| Biografia oficial, cidade/endereço, modalidade e horários, Instagram/canais | Não informados; nada disso é exibido. |
| Telefone, WhatsApp, e-mail | Vieram do cartão atual; reconfirmar se continuam válidos. |
| Domínio final | Definir `NEXT_PUBLIC_SITE_URL` (metadados, sitemap, OG). |

Antes da publicação oficial: revisar a comunicação à luz do Código de Ética da OAB e do Provimento 205/2021 (e das atualizações), mudar `project.isOfficial` para `true` e revisar a política de privacidade se a hospedagem ou algum serviço coletar dados.

## Imagens

| Arquivo | Origem | Licença |
| --- | --- | --- |
| `arquitetura-colunata.webp` | Colunata, Jefferson Memorial (HABS / Library of Congress, via Wikimedia Commons) | Domínio público |
| `detalhe-rotunda.webp` | Colunata vista de baixo, mesmo levantamento HABS | Domínio público |
| `detalhe-capitel.webp` | Capitel do Erecteion, Atenas (fotografia histórica, Wikimedia Commons) | Public Domain Mark |
| `detalhe-jonico.webp` | Capitel jônico do Erecteion (Wikimedia Commons) | CC0 |
| `marmore-escuro.webp` | Textura procedural gerada para o projeto | Própria |

As fotos foram convertidas para duotone grafite/marfim. São referências simbólicas de arquitetura clássica, sem relação com nenhuma instituição. Os links de origem estão em `imageCredits`, em `src/config/site.ts`.

## Decisões técnicas

- Sem formulário: o contato é feito por WhatsApp e e-mail (não há backend configurado).
- Sem analytics nem cookies de terceiros.
- Todas as animações respeitam `prefers-reduced-motion`. Parallax só em telas ≥ 1024 px com ponteiro fino. Sem scroll hijacking.
- Se o retrato faltar, o hero mostra um monograma no nicho em vez de uma imagem quebrada.
