import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/store/Providers";
import { TitleImage } from "@/components";
import { SWRProvider } from "@/store/SWRProvider";
import { OrganizationSchema, WebsiteSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: {
    default: "Rick and Morty Characters - Explorer App",
    template: "%s | Rick and Morty Explorer"
  },
  description: "Explora el universo de Rick and Morty. Descubre personajes, información detallada, episodios y mucho más de tu serie favorita.",
  keywords: ["rick and morty", "characters", "personajes", "serie", "cartoon", "sci-fi", "explorer", "aeromexico"],
  authors: [{ name: "Aeromexico Test App" }],
  creator: "Aeromexico Test App",
  publisher: "Aeromexico Test App",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "Rick and Morty Explorer",
    title: "Rick and Morty Characters - Explorer App",
    description: "Explora el universo de Rick and Morty. Descubre personajes, información detallada, episodios y mucho más de tu serie favorita.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rick and Morty Characters Explorer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rick and Morty Characters - Explorer App",
    description: "Explora el universo de Rick and Morty. Descubre personajes, información detallada, episodios y mucho más.",
    images: ["/images/twitter-image.jpg"],
    creator: "@aeromexico",
  },
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
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>
        <OrganizationSchema />
        <WebsiteSchema />
        <div className="app-container">
          <TitleImage />
          <SWRProvider>
            <Providers>
              {children}
            </Providers>
          </SWRProvider>
        </div>
      </body>
    </html>
  );
}
