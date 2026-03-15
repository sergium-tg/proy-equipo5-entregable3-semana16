üimport type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TransitionWrapper from "@/components/ui/TransitionWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  metadataBase: new URL("https://isabellatrejos.vercel.app"),
  title: {
    default: "Isabella Trejos - Portafolio Profesional | Comunicadora Social UAO",
    template: "%s | Isabella Trejos - Comunicadora Social"
  },
  description: "Portafolio profesional de Isabella Trejos, estudiante de ComunicaciÃ³n Social y Periodismo en la Universidad AutÃ³noma de Occidente. Experiencia en periodismo digital, comunicaciÃ³n corporativa y redacciÃ³n creativa.",
  keywords: [
    "Isabella Trejos",
    "portafolio comunicaciÃ³n social",
    "periodista UAO",
    "comunicadora social Cali",
    "periodismo digital",
    "portafolio profesional",
    "Universidad AutÃ³noma de Occidente",
    "periodista colombiana",
    "comunicadora social en formaciÃ³n"
  ],
  authors: [{ name: "Isabella Trejos", url: "https://isabellatrejos.vercel.app" }],
  creator: "Isabella Trejos",
  publisher: "Isabella Trejos",

  // Open Graph para redes sociales
  openGraph: {
    title: "Isabella Trejos - Portafolio Profesional en ComunicaciÃ³n Social",
    description: "Descubre el portafolio profesional de Isabella Trejos, estudiante de ComunicaciÃ³n Social y Periodismo en la UAO. Proyectos, experiencia y contactos profesionales.",
    url: "https://isabellatrejos.vercel.app",
    siteName: "Portafolio Isabella Trejos",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Isabella Trejos - Portafolio Profesional de ComunicaciÃ³n Social",
      },
    ],
    locale: "es_CO",
    type: "website",
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Isabella Trejos - Portafolio Profesional",
    description: "Portafolio profesional de Isabella Trejos, comunicadora social y periodista en formaciÃ³n en la UAO",
    images: ["/twitter-image.jpg"],
    creator: "@isabellatrejos",
  },

  // ConfiguraciÃ³n de robots para SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Iconos y favicon
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  // Manifest para PWA
  manifest: "/manifest.json",

  // Meta tags adicionales para SEO local
  other: {
    "geo.region": "CO-VAC",
    "geo.placename": "Cali, Valle del Cauca",
    "geo.position": "3.4516; -76.5320",
    "ICBM": "3.4516, -76.5320",
    "language": "Spanish",
    "audience": "Empleadores, Reclutadores, Medios de ComunicaciÃ³n",
    "distribution": "global",
    "rating": "general",
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${poppins.variable} antialiased font-sans`}>
        <Navbar />
        <TransitionWrapper>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </TransitionWrapper>
        <Footer />
      </body>
    </html>
  );
}
ô *cascade08ôû *cascade08û¹*cascade08¹¾ *cascade08¾À *cascade08ÀÇ*cascade08ÇÈ *cascade08ÈÌ*cascade08ÌÍ *cascade08ÍÒ*cascade08ÒÓ *cascade08Ó×*cascade08×Ø *cascade08Øå*cascade08åç *cascade08çì*cascade08ìí *cascade08í*cascade08 *cascade08”*cascade08”— *cascade08—™*cascade08™š *cascade08šÀ*cascade08ÀÁ *cascade08ÁÍ*cascade08ÍÎ *cascade08ÎØ*cascade08ØÙ *cascade08Ùâ*cascade08âğ *cascade08ğñ*cascade08ñü *cascade08ü*cascade08À *cascade08ÀÆ*cascade08ÆÇ *cascade08ÇÒ*cascade08ÒÓ *cascade08Óß*cascade08ßà *cascade08à½*cascade08½Â *cascade08ÂÈ*cascade08ÈÉ *cascade08É×*cascade08×Ø *cascade08Øá*cascade08áâ *cascade08âõ*cascade08õö *cascade08ö“*cascade08“• *cascade08•Ç*cascade08ÇÈ *cascade08ÈÖ*cascade08Ö× *cascade08×ò*cascade08òõ *cascade08õ€
*cascade08€
ƒ
 *cascade08ƒ
Ò*cascade08Òİ *cascade08İ¬*cascade08¬» *cascade08»Ì*cascade08Ìı *cascade08ış*cascade08şƒ *cascade08ƒ™*cascade08™š *cascade08š›*cascade08›œ *cascade08œÜ*cascade08Üß *cascade08ßí*cascade08íï *cascade08ïÓ*cascade08ÓÔ *cascade08Ôû*cascade08ûü *cascade08üª*cascade08ª« *cascade08«¬*cascade08¬­ *cascade08­°*cascade08°± *cascade08±í*cascade08íî *cascade08î¡*cascade08¡¢ *cascade08¢º*cascade08º¼ *cascade08¼Ä*cascade08ÄÆ *cascade08ÆÔ*cascade08ÔÕ *cascade08ÕÚ*cascade08ÚÛ *cascade08ÛÜ*cascade08Üİ *cascade08İğ*cascade08ğñ *cascade08ñœ*cascade08œ *cascade08Ì*cascade08ÌÎ *cascade08ÎÒ*cascade08ÒÔ *cascade08Ôö*cascade08ö÷ *cascade08÷ü*cascade08üı *cascade08ıÿ*cascade08ÿ€ *cascade08€ø*cascade08øù *cascade08ùü*cascade08üş *cascade08ş*cascade08 *cascade08Ñ*cascade08ÑÒ *cascade08Òã*cascade08ãä *cascade08ä¯*cascade08¯ü *cascade082afile:///Users/santiagovalencia/portafolio%20profesional/portafolio-profesional/src/app/layout.tsx