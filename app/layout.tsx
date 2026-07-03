import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const siteUrl = "https://www.satpal.cloud";
const siteTitle = "Satpalsinh Rana — Software Engineer | Angular, React, Node.js";
const siteDescription =
  "Portfolio of Satpalsinh Rana, a Software Engineer from Ahmedabad, India specializing in Angular, React, Next.js, Node.js and Electron.js. Explore projects, articles and experience.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Satpalsinh Rana",
  },
  description: siteDescription,
  keywords: [
    "Satpalsinh Rana",
    "Software Engineer",
    "Frontend Developer",
    "Full-Stack Developer",
    "Angular Developer",
    "React Developer",
    "Next.js",
    "Node.js",
    "Electron.js",
    "TypeScript",
    "Ahmedabad",
    "India",
    "Portfolio",
  ],
  authors: [{ name: "Satpalsinh Rana", url: siteUrl }],
  creator: "Satpalsinh Rana",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Satpalsinh Rana",
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0f0ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Satpalsinh Rana",
  url: siteUrl,
  jobTitle: "Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Asite Solutions Pvt. Ltd.",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Government Engineering College, Modasa",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "Angular",
    "React",
    "Next.js",
    "Node.js",
    "Electron.js",
    "RxJS",
    "MongoDB",
  ],
  sameAs: [
    process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/Satpal777",
    process.env.NEXT_PUBLIC_BLOG_URL || "https://blogs.satpal.cloud",
    process.env.NEXT_PUBLIC_LINKEDIN_URL,
  ].filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className} ${GeistMono.variable} ${GeistPixelSquare.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
