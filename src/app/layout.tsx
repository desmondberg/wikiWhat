import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("www.wikiwhat.wiki"),
  title: "wikiWhat",
  description: "Search Wikipedia with a rough description",
  icons:{
    icon:'./icon.png'
  },
  openGraph: {
    images: './opengraph-image.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
