import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "e-kurs.com | Kişiye Özel K–12 Öğrenme Platformu",
  description:
    "1. sınıftan 12. sınıfa kadar dersler, konu anlatımı, testler, ödev yardımı, deneme sınavları, akıllı pratikler ve günlük başarı takibi.",
  openGraph: {
    title: "e-kurs.com | Kişiye Özel Dijital Öğretmen",
    description:
      "Türkiye K12 sistemi için sınıf, ders, beceri, analiz, ödül, veli ve öğretmen panelleri sunan modern eğitim platformu.",
    type: "website",
    locale: "tr_TR",
    siteName: "e-kurs",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
