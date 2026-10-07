import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; 
import { SITE_ORIGIN } from "@/utils/seo";
import { headers } from "next/headers";


const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "A-BAITS — рибальський онлайн-аукціон",
    template: "%s | A-BAITS",
  },
  description: "Купуйте та продавайте рибальські товари на онлайн-аукціоні A-BAITS.",
  openGraph: {
    type: "website",
    siteName: "A-BAITS",
    images: [{ url: "/images/logo.png", alt: "A-BAITS" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers()
  const language = requestHeaders.get('x-site-language') === 'ru' ? 'ru' : 'uk'

  return (
    <html lang={language}>
      <body className={`${inter.variable} antialiased`}>
          {children}
      </body>
    </html>
  );
}
