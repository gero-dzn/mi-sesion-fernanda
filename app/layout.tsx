import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mi Sesión con Fernanda · Envidiosa",
  description: "Tenés sesión con Fernanda, la psicoanalista de Envidiosa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full" style={{ backgroundColor: '#0A0A0A' }}>
      <body className="min-h-full flex flex-col bg-[#0A0A0A]">{children}</body>
    </html>
  );
}
