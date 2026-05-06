import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Playfair_Display, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans-latin",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-jp",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display-latin",
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UI Spice — サイト制作で詰まったら、ここを見る。",
  description:
    "CSS・SVG・アニメーション・UI演出を、実務の使いどころごとに探せる社内用デザイン辞典。Claude Code用プロンプト付き。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJP.variable} ${playfair.variable} ${notoSerifJP.variable}`}
    >
      <body className="min-h-screen bg-bg font-sans text-zinc-900 antialiased">
        <Header />
        <main className="mx-auto max-w-7xl px-6 pb-28 pt-10 sm:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
