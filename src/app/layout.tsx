import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SkipLink } from "@/components/layout/SkipLink";
import { identity, project, seo } from "@/config/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(project.siteUrl),
  title: {
    default: seo.title,
    template: `%s | ${identity.name}`,
  },
  description: seo.description,
  applicationName: identity.name,
  // Demonstração não oficial: fora dos buscadores até autorização.
  robots: project.isOfficial
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: identity.name,
    title: seo.title,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#17191b",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        <SkipLink />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
