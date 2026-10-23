import { contact, identity, pending, project, seo } from "@/config/site";

/**
 * JSON-LD só é emitido em versão oficial. Contém apenas dados confirmados:
 * sem endereço, avaliações, credenciais ou classificações.
 */
export function StructuredData() {
  if (!project.isOfficial) return null;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: identity.name,
    description: seo.description,
    url: project.siteUrl,
    telephone: contact.phoneHref.replace("tel:", ""),
    email: contact.email,
    knowsAbout: ["Direito de Família", "Direito do Trabalho", "Direito Previdenciário"],
  };
  if (pending.location.enabled) data.areaServed = pending.location.value;

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
