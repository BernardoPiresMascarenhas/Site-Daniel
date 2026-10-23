import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Hero } from "@/components/sections/Hero";
import { AreasBand } from "@/components/sections/AreasBand";
import { About } from "@/components/sections/About";
import { PracticeAreas } from "@/components/sections/PracticeAreas";
import { VisualStatement } from "@/components/sections/VisualStatement";
import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { StructuredData } from "@/components/seo/StructuredData";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <AreasBand />
        <About />
        <PracticeAreas />
        <VisualStatement />
        <Process />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <StructuredData />
    </>
  );
}
