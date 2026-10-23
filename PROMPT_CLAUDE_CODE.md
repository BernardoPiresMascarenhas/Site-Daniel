# PROMPT PARA CLAUDE CODE — DANIEL P. FRANÇA | ADVOCACIA

Você é um engenheiro frontend sênior e diretor de arte digital especializado em sites institucionais premium, animação de interfaces e experiências editoriais. Sua missão é **IMPLEMENTAR UM SITE REAL E FUNCIONAL**, não apenas sugerir um conceito, gerar um wireframe ou entregar um mockup.

## 1. OBJETIVO E DIREÇÃO

Crie um site institucional de alto padrão para **Daniel P. França — Advocacia e Consultoria Jurídica**, com forte identidade, execução técnica impecável, excelente experiência mobile e apresentação marcante para integrar meu portfólio de desenvolvimento web.

O resultado deve parecer um trabalho de estúdio digital especializado em marcas profissionais: sóbrio, memorável, original, fluido e extremamente bem-acabado. Deve transmitir confiança, seriedade, clareza, proximidade e atenção individualizada sem usar linguagem comercial agressiva. Evite a aparência de template jurídico genérico, efeitos gratuitos, excesso de dourado, fotos artificiais de escritórios luxuosos, grandes martelos de juiz repetidos em todas as seções ou qualquer sensação de ostentação.

**NÃO peça dados que ainda não possuo antes de começar**. Construa uma versão de demonstração completa, usando somente os dados conhecidos e isolando os dados pendentes em um arquivo de configuração. Não publique como versão oficial antes de validação e autorização do profissional.

## 2. INFORMAÇÕES CONHECIDAS E PENDENTES

Informações disponíveis em materiais públicos fornecidos para referência (podem estar desatualizadas e exigem validação do advogado):

- Marca/nome do cartão: **Daniel P. França**.
- Descrição do cartão: **Advocacia e Consultoria Jurídica**.
- Áreas informadas atualmente na bio: **Direito de Família, Direito do Trabalho e Direito Previdenciário**.
- Bio: **Defensor Dativo TED OAB/MG** (não reescreva como cargo institucional ou vínculo oficial sem confirmar a forma exata de atuação).
- Bio: **Especialista em Benefícios do INSS** (não alegue título acadêmico/certificação; trate inicialmente como área de atuação/foco e deixe o uso do título “especialista” condicionado à validação).
- Bio: **Membro @septemcapulus** (não crie associação, certificação, experiência ou cargo a partir disso; deixar pendente, invisível publicamente até esclarecimento).
- Contato exibido no cartão: **(31) 9 2009-3499**, WhatsApp: `https://wa.me/5531920093499`.
- E-mail exibido no cartão: **daniel.pateisf@gmail.com**.
- No cartão antigo também aparece **Direito Tributário**, mas não na bio atual: **não colocar como área principal** antes de confirmação.
- O nome do arquivo original contém a indicação **OAB/MG 232.767**. **Isso NÃO comprova a inscrição**: tratar como pendente de conferência com o advogado e consulta ao cadastro oficial, não exibir o número automaticamente.
- Não sabemos endereço, cidade efetiva de atendimento, ano de formação, biografia, modalidade de atendimento, horários, Instagram exato ou outros canais oficiais. **Não inventar**.
- Não afirmar que ele possui escritório físico ou equipe; usar linguagem de atuação profissional individual, a menos que haja confirmação posterior.

Configure o conteúdo em `src/config/site.ts` (ou equivalente), com campos verificáveis e `TODO_CONFIRMAR`/`enabled: false` para dados ainda não validados. Os dados pendentes não podem aparecer como fatos consumados em nenhuma parte da UI, metadados ou schema.

## 3. ARQUIVOS DE IMAGEM DISPONÍVEIS

Neste projeto, considere que vou colocar os arquivos:

- `public/images/daniel-hero-transparent.png` — retrato expandido e com fundo transparente gerado por IA para composição do hero;
- `public/images/daniel-foto-original.jpg` — fotografia original do Daniel (150 × 150 px);
- `public/images/cartao-referencia.webp` — cartão de contato atual com referência cromática.

Você deve usar o retrato com fundo transparente no hero DESDE QUE a composição fique visualmente natural. Preserve a proporção; não distorça nem deixe o rosto pequeno. Como esse retrato foi gerado a partir de uma foto pequena, anote claramente que exige aprovação do retratado antes de qualquer publicação. Use a foto original apenas em contexto pequeno, se necessário, sem ampliá-la de modo visivelmente pixelado. Caso o retrato transparente não esteja presente, implemente um fallback bonito em vez de quebrar a página. Não gere uma imagem falsa de escritório do Daniel.

## 4. DIREÇÃO DE ARTE, CORES E TIPOGRAFIA

Paleta base:
- Grafite profundo: `#17191B`
- Grafite secundário: `#242729`
- Dourado discreto/bronze: `#C7A35E`
- Dourado mais claro para pequenos brilhos: `#D7BB80`
- Marfim: `#F6F3ED`
- Branco quase puro: `#FBFAF7`
- Texto secundário: `#777A7C`

Use contraste suficiente e alternância intencional entre seções dark e light. O dourado deve ser um ACENTO refinado para filetes, ícones lineares, pequenos rótulos e hover — não um banho de gradientes chamativos.

Fontes: escolha e combine intencionalmente uma serif editorial elegante para títulos (ex.: **Cormorant Garamond** ou **Playfair Display**) e uma sans extremamente legível para texto/interface (ex.: **Manrope** ou **Inter**), carregadas por `next/font` ou mecanismo adequado. Não use uma fonte diferente em cada seção. Garanta excelente hierarquia, kerning, espaçamento e quebras bonitas em telas menores.

Linguagem gráfica: linhas finas de arquitetura, composição editorial assimétrica, microtipografia, divisores delicados, detalhes geométricos discretos inspirados em pilares clássicos, texturas de papel/ruído de baixíssima opacidade, muito espaço em branco e imagens recortadas com máscaras de movimento. Não utilizar símbolos oficiais/logotipo da OAB ou elementos que sugiram chancela institucional.

## 5. EXPERIÊNCIA GERAL E INTERAÇÕES

O site precisa ser interativo sem ficar cansativo. Implemente:
1. Intro/entrada do hero por camadas, com stagger delicado nos textos, sem tela de loading artificial.
2. Header que reage ao scroll de modo refinado, com boa acessibilidade, navegação por âncoras e indicador de seção ativa quando adequado.
3. Revelação de blocos conforme entram na viewport, com variações sutis de opacity/translate/clip-path.
4. Microinterações reais nos botões e links: seta que se desloca, sublinhado animado, realce sutil.
5. Cards de áreas de atuação com hover editorial, mudança de linha/ícone/elevação mínima, sem saltos de layout.
6. Parallax muito leve ou perspectiva suave nas fotografias/ilustrações, somente quando o desempenho permitir.
7. Uma composição gráfica interativa relacionada ao Direito: por exemplo, silhueta arquitetônica com colunas e luz lateral suave, contornos de uma balança desenhados por SVG, ou linhas geométricas que acompanham o scroll. Preferir SVG/CSS e imagens licenciadas a bibliotecas 3D pesadas; esta é uma referência simbólica, **não** um cenário fictício do escritório.
8. Transições elegantes entre seções, tratamento excelente de estados de hover/focus e menu mobile com animação fluida, fechamento por ESC e clique.
9. FAQ acessível em accordion, se adotado.
10. Em celulares, desabilite efeitos de hover sem equivalente touch, evite parallax pesado e preserve a leitura.

**Obrigatório:** respeitar `prefers-reduced-motion`, evitar scroll hijacking, impedir layout shift, preservar FPS, não usar cursor customizado que atrapalhe interações, não prender scrolling e não depender de vídeo enorme para impressionar. É aceitável usar Motion/Framer Motion e, SOMENTE se indispensável, GSAP com registro/limpeza correta. A qualidade do motion design importa mais que a quantidade de efeitos.

## 6. ESTRUTURA DA LANDING PAGE

Faça uma página única muito bem construída, com navegação por âncoras, conteúdo semântico e componentes reutilizáveis. A sequência pode ser ajustada se o resultado visual ficar mais forte, mas inclua:

### A. Header
- Wordmark tipográfico personalizado: `DANIEL P. FRANÇA` e, em apoio discreto, `ADVOCACIA`.
- Links: Início, Sobre, Áreas de Atuação, Atendimento, Contato.
- Botão discreto `Contato` com ícone de seta ou WhatsApp; sem linguagem pressionando contratação.
- Comportamento sticky com contraste correto no hero e nas demais seções.
- Menu mobile impecável, com foco visível, sem travamento.

### B. Hero — seção mais importante
- Hero idealmente entre 90 e 100svh em desktop, sem cortar conteúdo em laptops menores; no mobile deixar a altura natural.
- Layout editorial em duas colunas: texto amplo à esquerda e retrato do Daniel à direita.
- Pequeno eyebrow como `DANIEL P. FRANÇA · ADVOCACIA`.
- Headline de impacto institucional, por exemplo: **“Atuação jurídica com clareza, responsabilidade e atenção a cada situação.”** Pode melhorar a redação desde que mantenha sobriedade.
- Supporting copy informativa: `Atuação em Direito de Família, Direito do Trabalho e Direito Previdenciário, com atenção às particularidades de cada demanda.`
- Ações: **“Conheça as áreas de atuação”** (scroll) e **“Entre em contato”** (contato/WhatsApp), com texto não mercantilista.
- Retrato grande com recorte transparente, moldura geométrica assimétrica, um arco/filete dourado, halo discreto e fundo grafite rico, evitando card genérico.
- Rótulo vertical decorativo ou detalhe tipográfico elegante; indicador de scroll opcional.
- As interações e tipografia devem impressionar mais que efeitos visuais chamativos.

### C. Assinatura visual / faixa de áreas
- Transição para um bloco com as três áreas: Família · Trabalho · Previdenciário, apresentadas como tipografia editorial ou grid, evitando ticker rápido que prejudique acessibilidade.
- Um pequeno texto sobre orientação jurídica individualizada, sem alegar resultados.

### D. Sobre Daniel
- Layout editorial com foto e texto muito bem diagramado.
- Título como `Uma atuação pautada pela escuta e pela clareza.`
- Escreva uma apresentação institucional sóbria e GENÉRICA, **sem inventar formação, tempo de carreira, conquistas, número de clientes, cidade ou credenciais**.
- Não usar uma frase inventada como citação literal atribuída ao Daniel.
- Deixe espaço no config para biografia oficial, OAB validada, vínculo com TED e outras informações posteriores.
- Se não houver fatos pessoais confirmados, explicite a atuação de maneira neutra em vez de fabricar storytelling.

### E. Áreas de atuação
- Três cards premium, de igual importância, com números `01 / 02 / 03`, títulos legíveis, ícones SVG lineares específicos e imagem/forma relacionada ao campo jurídico quando pertinente.
- **Direito de Família:** explicação educativa e ampla sobre questões de relações familiares; exemplos possíveis (divórcio, guarda, alimentos e sucessões) somente se apresentados como assuntos da área, não como serviços garantidamente prestados pelo profissional.
- **Direito do Trabalho:** explicação sobre questões jurídicas nas relações trabalhistas, direitos e obrigações.
- **Direito Previdenciário:** explicação sobre questões relacionadas a benefícios do INSS e previdência; dizer `Atuação em temas relacionados a benefícios do INSS` é mais seguro que afirmar qualificação não comprovada.
- Interatividade no hover e links que levam a contato ou a painéis informativos, sem criar uma página vazia.
- Direito Tributário deve ficar no config como `pending`, não renderizado até autorização.

### F. Seção gráfica de destaque
- Uma seção autoral, não um bloco genérico de texto: full-bleed ou composição ampla com fotografia editorial relacionada a arquitetura, direito ou livros jurídicos, sobreposições sutis e texto curto sobre clareza/responsabilidade.
- Imagens não devem apresentar tribunais específicos, instalações reais ou símbolos oficiais como se houvesse filiação ou vínculo profissional.
- Se não houver asset licenciado, criar uma ilustração sofisticada via SVG/CSS e documentar a pendência; não quebrar layout nem adicionar hotlinks aleatórios.
- Uma animação de linhas acompanhando a navegação pode ser o diferencial técnico do projeto.

### G. Como funciona o atendimento
- Uma linha do tempo horizontal no desktop e vertical no mobile, com três etapas neutras: `Contato inicial`, `Compreensão da demanda`, `Orientações e próximos passos`.
- Deixar claro que a análise e eventual atuação dependem das informações e condições efetivamente acordadas.
- Não mencionar atendimento gratuito, imediato, 24 horas ou on-line sem confirmação.

### H. Conteúdo informativo / perguntas frequentes
- Inclua 3 a 5 FAQs de caráter estritamente geral, bem escritas, sem aconselhamento individual e sem prometer direitos/benefícios: perguntas como `Quando buscar orientação em Direito de Família?`, `Quais documentos costumam ser úteis em uma consulta trabalhista?`, `Como se preparar para tratar de um benefício do INSS?`.
- Respostas concisas e educacionais, sem conclusões jurídicas categóricas ou prazos específicos não checados.
- Disclaimer curto: `Conteúdo de caráter informativo. Cada situação exige análise individualizada.`
- O accordion deve funcionar com mouse, teclado e leitor de tela.

### I. Contato — encerramento memorável
- Seção de destaque com fundo escuro ou marfim, grande tipografia editorial e CTA sóbrio `Entre em contato`.
- WhatsApp: `(31) 9 2009-3499` → `https://wa.me/5531920093499` com mensagem inicial neutra, por exemplo `Olá, Daniel. Gostaria de obter informações sobre o atendimento.`
- E-mail: `daniel.pateisf@gmail.com` → `mailto:daniel.pateisf@gmail.com`.
- Não mostrar endereço, mapa, cidade ou horário sem confirmação.
- Se incluir formulário, fazê-lo realmente funcional com solução segura e configurável: validações server-side, antispam, estados de loading/erro/sucesso, confirmação de privacidade e tratamento cuidadoso de dados; não coletar CPF, detalhes sensíveis de processos ou documentos via formulário genérico; sem fingir envio quando falta integração. Se não houver backend configurado, **prefira contato via WhatsApp e e-mail** a formulário cenográfico.
- Botão flutuante do WhatsApp opcional, discreto e acessível; não adicionar pop-ups capturando atenção.

### J. Footer
- Wordmark, navegação, telefone, e-mail, copyright com ano dinâmico, política de privacidade quando pertinente.
- Reservar campo de OAB/MG validado. Antes da validação, não mostrar número extraído do filename.
- Observação informativa de que o site não cria vínculo profissional automaticamente e que conteúdos são gerais, se apropriado ao contexto.
- Sem selos falsos, rankings inventados, depoimentos não autorizados ou cases jurídicos fabricados.

## 7. PADRÃO DE QUALIDADE E TECNOLOGIA

Implemente em **Next.js com App Router, TypeScript, Tailwind CSS e Motion/Framer Motion**, usando as versões estáveis compatíveis disponíveis no ambiente. Use `lucide-react` para ícones quando fizer sentido, com visual autoral em SVG para ícones específicos. A estrutura deve ser fácil de editar e escalar.

Requisitos:
- Componentização clara: Header, Hero, SectionHeading, About, PracticeAreas, VisualStatement, Process, FAQ, Contact, Footer, MobileMenu etc.
- Dados editáveis centralizados em config/content, evitando telefone ou textos duplicados espalhados pelo código.
- Design tokens CSS (`--color-...`, containers, radius, shadows, timing, fluid typography).
- `next/image` para otimizar imagens, dimensões, `sizes`, preload/priority apropriado só para o hero e fallback.
- Layout responsivo testado nos larguras **320, 375, 430, 768, 1024 e 1440 px**.
- Sem horizontal overflow, textos sobrepostos, imagens cortando o rosto ou hero com espaço vazio excessivo.
- Boa acessibilidade: HTML semântico, contraste AA, navegação pelo teclado, foco visível, aria-label em controles icônicos, skip link, navegação acessível, headings corretos, alt apropriado e reduced motion.
- SEO técnico: metadata title/description coerentes, OG bem diagramado com dados reais/confirmados, sitemap e robots, ícones, JSON-LD apenas se os dados forem verificados (NÃO inventar endereço, avaliações, credenciais ou classificações).
- LGPD: coletar o mínimo necessário, política correspondente ao tratamento efetivo e nenhum analytics/cookie de terceiros sem configuração adequada.
- Performance e estabilidade: foco em Core Web Vitals, sem bibliotecas desnecessárias, lazy-loading, font-display e animações com transform/opacity.
- Se for uma **demo pública de portfólio sem autorização do Daniel**, tratar como não oficial, usar `noindex`/staging e não divulgar como site contratado/aprovado. Antes de tornar público, obter autorização da pessoa retratada e confirmar conteúdo e contatos.
- Orientar a comunicação pelas regras aplicáveis da OAB, em especial Código de Ética e Provimento 205/2021, e conferir atualizações antes da publicação. Evitar captação irregular de clientes, promessas de resultado, comparações, superlativos, ofertas, preços de honorários, gatilhos de urgência e alegações não comprovadas.

## 8. PADRÃO ESTÉTICO INEGOCIÁVEL

Não entregue uma landing page básica com uma foto, três cards e footer. Crie ritmo visual entre seções, grade consistente, tipografia excelente, uma linguagem própria de motion, cores calibradas, detalhes de acabamento, transições realmente úteis e imagens muito bem integradas. Quero que a experiência pareça feita sob medida para Daniel, não a reprodução de um modelo do mercado. O visual pode ser moderno e ousado na composição, mas o conteúdo e a comunicação devem ser éticos e sóbrios.

Prefira trabalhar uma direção visual muito bem feita a acumular recursos pouco refinados. Não utilizar emoji em textos ou elementos da interface.

## 9. FLUXO DE EXECUÇÃO — FAÇA DE VERDADE

1. Inspecione primeiro o repositório, o gerenciador de pacotes, dependências e imagens disponíveis. Preserve a estrutura existente se eu já tiver iniciado o projeto. Se estiver vazio, crie a aplicação e configure tudo.
2. Defina rapidamente uma arquitetura de componentes, dados e tokens visuais.
3. Implemente **a página inteira**, com estilos, responsividade, animações, links funcionais e conteúdo coerente. Não pare em um esqueleto ou protótipo simplificado.
4. Use os assets locais disponíveis; se algum faltar, implemente fallback elegante e liste exatamente o arquivo esperado.
5. Execute lint, typecheck e build; corrija erros de TypeScript, importação, hidratação e responsividade.
6. Se houver navegador/preview disponível, capture e inspecione desktop e mobile, encontre problemas visuais e melhore a implementação com uma segunda passada. Se não houver, não afirme que conferiu prints inexistentes.
7. Revise explicitamente a identidade: cor, tipografia, layout do hero, qualidade do retrato, espaçamento, peso visual dos cards, movimento, seção final e experiência mobile.
8. Ao terminar, entregue: resumo do que foi implementado, comandos para executar, estrutura de arquivos, lista de dados pendentes de confirmação pelo Daniel e eventuais dependências/configurações restantes. **Não diga que está pronto para publicação oficial** enquanto faltarem consentimento e validação.

O objetivo final é um **site funcional, responsivo, visualmente marcante, elegante e eticamente apropriado**, que sirva como demonstração real do nível de qualidade do meu trabalho de desenvolvimento frontend.
