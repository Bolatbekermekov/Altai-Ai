import "@/app/globals.css";

import type { Metadata } from "next";

import { ThemeProvider } from "@/components/contexts/theme-provider";
import { LanguageProvider } from "@/components/contexts/language-context";
import { inter } from "@/lib/fonts";

import { siteConfig } from "../config/site";

export const metadata: Metadata = {
  metadataBase: siteConfig.url ? new URL(siteConfig.url) : undefined,
  icons: { icon: "/favicon.svg" },
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url || undefined,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage || "/dashboard-dark.png",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  alternates: {
    canonical: siteConfig.url || undefined,
  },
  keywords: [
    "Шаблон лендинга",
    "Компоненты",
    "Shadcn",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Radix UI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" style={{ colorScheme: "dark" }} className="dark">
      <body className={`${inter.className} bg-background antialiased`}>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
