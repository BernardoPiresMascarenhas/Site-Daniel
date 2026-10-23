/**
 * Conteúdo central do site.
 *
 * REGRA: nenhum dado marcado como `TODO_CONFIRMAR` ou `enabled: false` pode
 * aparecer na interface, nos metadados ou em dados estruturados. Para publicar
 * um dado pendente, confirme-o com o Daniel, substitua o valor e mude
 * `enabled` para `true`.
 */

export const TODO_CONFIRMAR = "TODO_CONFIRMAR" as const;

type Pending<T> = { value: T | typeof TODO_CONFIRMAR; enabled: boolean; note: string };

/* ------------------------------------------------------------------ */
/* Status do projeto                                                   */
/* ------------------------------------------------------------------ */

export const project = {
  /**
   * Enquanto `false`, o site é uma demonstração de portfólio:
   * noindex/nofollow, sem JSON-LD e com aviso discreto no rodapé.
   * Só mude para `true` após autorização do Daniel (inclusive do uso do
   * retrato) e validação de todo o conteúdo.
   */
  isOfficial: false,
  /** URL base usada em metadados, sitemap e OG. Ajuste ao domínio final. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

/* ------------------------------------------------------------------ */
/* Identidade                                                          */
/* ------------------------------------------------------------------ */

export const identity = {
  name: "Daniel P. França",
  wordmark: "DANIEL P. FRANÇA",
  wordmarkSupport: "ADVOCACIA",
  /** Descrição exibida no cartão de contato atual. */
  descriptor: "Advocacia e Consultoria Jurídica",
};

/* ------------------------------------------------------------------ */
/* Contato (dados exibidos no cartão de contato atual)                 */
/* ------------------------------------------------------------------ */

const whatsappNumber = "5531920093499";
const whatsappMessage = "Olá, Daniel. Gostaria de obter informações sobre o atendimento.";

export const contact = {
  phoneDisplay: "(31) 9 2009-3499",
  phoneHref: "tel:+5531920093499",
  whatsappHref: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  email: "daniel.pateisf@gmail.com",
  emailHref: "mailto:daniel.pateisf@gmail.com",
};

/* ------------------------------------------------------------------ */
/* Credenciais e dados pendentes — NÃO renderizados enquanto pendentes */
/* ------------------------------------------------------------------ */

export const pending = {
  oab: {
    value: TODO_CONFIRMAR,
    enabled: false,
    note:
      "Número sugerido apenas pelo nome de um arquivo (OAB/MG 232.767). Conferir com o Daniel e no Cadastro Nacional dos Advogados antes de exibir.",
  } satisfies Pending<string>,
  dativoTed: {
    value: TODO_CONFIRMAR,
    enabled: false,
    note:
      "Bio menciona 'Defensor Dativo TED OAB/MG'. Confirmar a forma exata de atuação antes de citar; não descrever como cargo ou vínculo institucional.",
  } satisfies Pending<string>,
  inssSpecialist: {
    value: TODO_CONFIRMAR,
    enabled: false,
    note:
      "Bio menciona 'Especialista em Benefícios do INSS'. Usar o termo 'especialista' apenas se houver titulação que o comprove; até lá, o site fala em 'atuação em temas relacionados a benefícios do INSS'.",
  } satisfies Pending<string>,
  septemCapulus: {
    value: TODO_CONFIRMAR,
    enabled: false,
    note: "Bio menciona 'Membro @septemcapulus'. Natureza desconhecida — manter oculto até esclarecimento.",
  } satisfies Pending<string>,
  biography: {
    value: TODO_CONFIRMAR,
    enabled: false,
    note: "Biografia oficial (formação, trajetória). Enquanto pendente, o site usa apresentação institucional neutra.",
  } satisfies Pending<string>,
  location: {
    value: TODO_CONFIRMAR,
    enabled: false,
    note: "Cidade/endereço de atendimento e se há escritório físico. Não exibir mapa ou endereço sem confirmação.",
  } satisfies Pending<string>,
  serviceMode: {
    value: TODO_CONFIRMAR,
    enabled: false,
    note: "Modalidade (presencial/on-line) e horários de atendimento.",
  } satisfies Pending<string>,
  instagram: {
    value: TODO_CONFIRMAR,
    enabled: false,
    note: "Perfil oficial do Instagram e demais canais.",
  } satisfies Pending<string>,
  portraitApproval: {
    value: TODO_CONFIRMAR,
    enabled: false,
    note:
      "O retrato do hero foi expandido por IA a partir de uma foto de 150 × 150 px. Exige aprovação expressa do Daniel antes de qualquer publicação.",
  } satisfies Pending<string>,
};

/* ------------------------------------------------------------------ */
/* Navegação                                                           */
/* ------------------------------------------------------------------ */

export const navigation = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "areas", label: "Áreas de Atuação" },
  { id: "atendimento", label: "Atendimento" },
  { id: "contato", label: "Contato" },
] as const;

export type SectionId = (typeof navigation)[number]["id"];

/* ------------------------------------------------------------------ */
/* Áreas de atuação                                                    */
/* ------------------------------------------------------------------ */

export type PracticeArea = {
  slug: "familia" | "trabalho" | "previdenciario" | "tributario";
  short: string;
  title: string;
  summary: string;
  topicsLabel: string;
  topics: string[];
  detail: string[];
  /** Detalhe arquitetônico simbólico (ver `imageCredits`). */
  image?: { src: string; alt: string; position?: string };
  status: "active" | "pending";
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "familia",
    short: "Família",
    title: "Direito de Família",
    summary:
      "Questões que envolvem as relações familiares e as mudanças pelas quais elas passam, tratadas com discrição e cuidado com o contexto de cada família.",
    topicsLabel: "Temas da área",
    topics: ["Divórcio", "Guarda", "Alimentos", "Sucessões"],
    detail: [
      "O Direito de Família cuida dos vínculos entre pessoas: casamento e união estável, o fim dessas relações, a convivência com os filhos, o dever de sustento e a organização do patrimônio entre gerações.",
      "São situações em que aspectos jurídicos e pessoais se misturam. Por isso, compreender com calma o contexto de cada família costuma ser o primeiro passo antes de qualquer encaminhamento.",
    ],
    image: { src: "/images/detalhe-rotunda.webp", alt: "", position: "50% 40%" },
    status: "active",
  },
  {
    slug: "trabalho",
    short: "Trabalho",
    title: "Direito do Trabalho",
    summary:
      "Questões jurídicas que surgem nas relações de trabalho: direitos, deveres e as dúvidas que aparecem durante o vínculo ou depois dele.",
    topicsLabel: "Temas da área",
    topics: ["Vínculo de emprego", "Verbas rescisórias", "Jornada", "Condições de trabalho"],
    detail: [
      "O Direito do Trabalho regula a relação entre quem trabalha e quem contrata: registro, jornada, remuneração, férias, encerramento do contrato e as condições em que o trabalho é realizado.",
      "Documentos como contrato, holerites e registros de ponto ajudam a entender cada caso. Cada relação de trabalho é analisada a partir do que de fato aconteceu.",
    ],
    image: { src: "/images/detalhe-capitel.webp", alt: "", position: "50% 62%" },
    status: "active",
  },
  {
    slug: "previdenciario",
    short: "Previdenciário",
    title: "Direito Previdenciário",
    summary:
      "Atuação em temas relacionados a benefícios do INSS e à previdência social, com orientação sobre requisitos, documentos e etapas.",
    topicsLabel: "Temas da área",
    topics: ["Aposentadorias", "Auxílios", "Pensão por morte", "BPC/LOAS"],
    detail: [
      "O Direito Previdenciário trata da proteção social garantida pela previdência: aposentadorias, benefícios por incapacidade, pensões e benefícios assistenciais, entre outros.",
      "Cada benefício tem requisitos próprios, e o histórico de contribuições e a documentação disponível fazem diferença na análise. Entender esse conjunto ajuda a definir os próximos passos.",
    ],
    image: { src: "/images/detalhe-jonico.webp", alt: "", position: "50% 45%" },
    status: "active",
  },
  {
    slug: "tributario",
    short: "Tributário",
    title: "Direito Tributário",
    summary: "Aparece no cartão antigo, mas não na bio atual.",
    topicsLabel: "Temas da área",
    topics: [],
    detail: [],
    // Não renderizado até confirmação do Daniel.
    status: "pending",
  },
];

export const activePracticeAreas = practiceAreas.filter((a) => a.status === "active");

/* ------------------------------------------------------------------ */
/* Textos de seção                                                     */
/* ------------------------------------------------------------------ */

export const hero = {
  headline: "Atuação jurídica com clareza, responsabilidade e atenção a cada situação.",
  supporting:
    "Direito de Família, Direito do Trabalho e Direito Previdenciário, considerando as particularidades de cada demanda.",
  primaryCta: "Conheça as áreas de atuação",
  secondaryCta: "Entre em contato",
};

export const about = {
  title: "Uma atuação pautada pela escuta e pela clareza.",
  paragraphs: [
    "Daniel P. França atua na advocacia e na consultoria jurídica, em questões ligadas às relações familiares, às relações de trabalho e à previdência social.",
    "O atendimento começa pela escuta e segue com explicações em linguagem acessível, para que a pessoa compreenda o que está em jogo antes de tomar qualquer decisão.",
  ],
  principles: [
    {
      title: "Escuta",
      text: "Entender o contexto completo antes de qualquer orientação.",
    },
    {
      title: "Clareza",
      text: "Explicar caminhos, documentos e etapas sem jargão desnecessário.",
    },
    {
      title: "Responsabilidade",
      text: "Orientar com cuidado, sem promessas sobre resultados.",
    },
  ],
};

export const statement = {
  lines: ["Entender antes de orientar.", "Explicar antes de decidir."],
  text:
    "A orientação jurídica começa pela compreensão de cada situação e pela explicação clara dos caminhos possíveis.",
};

export const attendance = {
  title: "Como funciona o atendimento",
  intro:
    "Um percurso simples, pensado para que cada pessoa entenda em que ponto está e o que vem a seguir.",
  steps: [
    {
      title: "Contato inicial",
      text: "Você entra em contato por WhatsApp ou e-mail e descreve, em linhas gerais, o assunto que deseja tratar.",
    },
    {
      title: "Compreensão da demanda",
      text: "A situação é ouvida e são identificadas as informações e os documentos relevantes para a análise.",
    },
    {
      title: "Orientações e próximos passos",
      text: "São apresentados os caminhos possíveis e, se for o caso, as condições de uma eventual atuação.",
    },
  ],
  note:
    "A análise e uma eventual atuação dependem das informações apresentadas e das condições efetivamente acordadas entre as partes.",
};

export const faq = {
  title: "Perguntas frequentes",
  intro: "Respostas gerais sobre temas que costumam gerar dúvidas.",
  disclaimer: "Conteúdo de caráter informativo. Cada situação exige análise individualizada.",
  items: [
    {
      q: "Quando buscar orientação em Direito de Família?",
      a: "Costuma ser útil buscar orientação antes de decisões importantes, como uma separação, a definição da guarda dos filhos, a revisão de alimentos ou a organização de uma herança. Entender os direitos e deveres envolvidos ajuda a tomar decisões com mais segurança e a evitar conflitos desnecessários.",
    },
    {
      q: "Quais documentos costumam ser úteis em uma consulta trabalhista?",
      a: "Em geral, ajudam a carteira de trabalho, o contrato, holerites, comprovantes de pagamento, registros de jornada e mensagens ou comunicados relacionados ao trabalho. Nem todos são indispensáveis; a necessidade de cada documento depende do caso.",
    },
    {
      q: "Como se preparar para tratar de um benefício do INSS?",
      a: "Vale reunir documentos pessoais, carteiras de trabalho, carnês ou comprovantes de contribuição e, quando houver, o extrato do CNIS, que pode ser consultado no Meu INSS. Em benefícios ligados à saúde, laudos e exames também são relevantes. Organizar esse material facilita a análise.",
    },
    {
      q: "O primeiro contato já significa que meu caso será assumido?",
      a: "Não. O primeiro contato serve para compreender a demanda. A eventual atuação depende da análise das informações e das condições combinadas entre as partes.",
    },
  ],
};

export const contactSection = {
  title: "Entre em contato",
  text:
    "Para tratar de uma situação ou tirar dúvidas sobre o atendimento, utilize um dos canais abaixo. Evite enviar documentos ou dados sensíveis na primeira mensagem.",
};

export const footer = {
  legal:
    "As informações deste site têm caráter informativo e não constituem aconselhamento jurídico. O contato por este site não estabelece, por si só, relação profissional entre as partes.",
  demoNotice:
    "Versão de demonstração, não oficial. Conteúdo e imagens sujeitos à validação e autorização do profissional.",
};

export const seo = {
  title: `${identity.name} | ${identity.descriptor}`,
  description:
    "Atuação em Direito de Família, Direito do Trabalho e Direito Previdenciário, com atenção às particularidades de cada demanda.",
};

/* ------------------------------------------------------------------ */
/* Créditos de imagem                                                  */
/* ------------------------------------------------------------------ */

/**
 * Fotografias de arquitetura (Wikimedia Commons, domínio público/CC0),
 * convertidas para duotone grafite/marfim. São referências simbólicas e não
 * indicam vínculo com nenhuma instituição ou edifício.
 */
export const imageCredits = [
  {
    file: "arquitetura-colunata.webp",
    source: "https://commons.wikimedia.org/wiki/File:Ambulatory_colonnade._23_March_1992._-_Jefferson_Memorial,_East_Potomac_Park,_Washington,_District_of_Columbia,_DC_HABS_DC,WASH,453-28.tif",
    license: "Domínio público (HABS / Library of Congress)",
  },
  {
    file: "detalhe-rotunda.webp",
    source: "https://commons.wikimedia.org/wiki/File:Ambulatory_colonnade_(from_below)._23_March_1992._-_Jefferson_Memorial,_East_Potomac_Park,_Washington,_District_of_Columbia,_DC_HABS_DC,WASH,453-27.tif",
    license: "Domínio público (HABS / Library of Congress)",
  },
  {
    file: "detalhe-capitel.webp",
    source: "https://commons.wikimedia.org/wiki/File:Athens-_A_capital_at_the_Erechtheion_(SM_stf72).png",
    license: "Domínio público (Public Domain Mark)",
  },
  {
    file: "detalhe-jonico.webp",
    source: "https://commons.wikimedia.org/wiki/File:Ionic_capital_Erechtheum,_Acropolis,_Athens,_Greece.jpg",
    license: "CC0",
  },
  {
    file: "marmore-escuro.webp",
    source: "Textura procedural gerada para o projeto",
    license: "Própria",
  },
];
