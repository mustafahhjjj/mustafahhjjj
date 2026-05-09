import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillNova | Kişiselleştirilmiş K–12 Öğrenme Platformu",
  description:
    "Matematik, Türkçe, Fen Bilimleri, Sosyal Bilgiler ve İngilizce için kişiselleştirilmiş beceri pratiği, öneriler ve analizler.",
  openGraph: {
    title: "SkillNova | Kişiselleştirilmiş K–12 Öğrenme Platformu",
    description:
      "K–12 öğrencileri için beceri pratiği, çalışma planları ve öğretmen analizleri sunan modern eğitim platformu.",
    type: "website",
    locale: "tr_TR",
    siteName: "SkillNova",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
