import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Caravela Tabuleiria – Aluguel de Jogos de Tabuleiro",
  description:
    "Alugue os melhores jogos de tabuleiro na Caravela Tabuleiria. Estratégia, família, cooperativo e muito mais!",
  icons: {
    icon: "/caravela-icon.png",
  },
  openGraph: {
    title: "Caravela Tabuleiria",
    description: "Aluguel de jogos de tabuleiro",
    images: ["/caravela-icon.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
