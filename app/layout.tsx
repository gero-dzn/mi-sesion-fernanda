import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mi Sesión con Fernanda · Envidiosa T4",
  description: "Una conversación con la psicoanalista de Vicky. Ella escucha. Vos hablás. Después te dice quién sos.",
  openGraph: {
    title: "Mi Sesión con Fernanda",
    description: "Tuve sesión con Fernanda. Mirá lo que me dijo.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mi Sesión con Fernanda",
    description: "Tuve sesión con Fernanda. Mirá lo que me dijo.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
