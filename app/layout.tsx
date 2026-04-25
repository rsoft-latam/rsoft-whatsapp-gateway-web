import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quipu — Agentic Banking on WhatsApp",
  description:
    "The first agentic bank that lives inside WhatsApp. Built on Arc + Circle USDC.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
