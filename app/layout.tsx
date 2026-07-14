import type React from "react"
import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import { Geist_Mono } from "next/font/google"
import { Instrument_Serif } from "next/font/google"
import { Inter } from "next/font/google"
import "./globals.css"

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
})

const GeistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-instrument-serif",
  display: "swap",
})

const inter = Inter({ subsets: ["latin"], weight: ["300","400","600"], display: "swap", variable: "--font-inter" })

export const metadata: Metadata = {
  title: {
    template: "%s | Independent Chemical NIG. ENT. | | Premium Printing Materials, Machinery & Supplies",
    absolute: "Independent Chemical Enterprise",
  },
  applicationName:"Independent Chemical NIG. ENT.",
  description: "Independent Chemicals.NIG is a trusted supplier of premium printing materials, screen printing supplies, DTF products, heat transfer vinyl (HTV), printing machinery and accessories. Serving businesses across Nigeria, West Africa and beyond for nearly two decades.",
  keywords: [
  "Independent Chemicals",
  "Independent Chemicals Nigeria",
  "printing materials",
  "printing supplies",
  "printing machinery",
  "printing equipment",
  "screen printing",
  "screen printing supplies",
  "screen printing ink",
  "screen printing mesh",
  "mesh supplier",
  "heat transfer vinyl",
  "HTV",
  "Plotter",
  "Retarder",
  "Seritex",
  "HTV Nigeria",
  "DTF supplies",
  "DTF ink",
  "DTF film",
  "DTF powder",
  "printing accessories",
  "printing chemicals",
  "squeegee",
  "textile printing",
  "garment branding",
  "commercial printing",
  "large format printing",
  "printing business",
  "printing supplier Nigeria",
  "printing materials Lagos",
  "printing machinery Lagos",
  "printing supplies Nigeria",
],
  category: "Business",
  openGraph: {
    title: "Premium Printing Materials & Machinery | Independent Chemical NIG. ENT.",
    description: "Discover premium printing materials, DTF supplies, HTV, printing machinery and accessories trusted by professionals across Nigeria, West Africa and beyond.",
    url: "https://independentchemnig.com",

    siteName: "Independent Chemical NIG. ENT.",

    images: [
      {
        url: "/images/icn-logo.jpg",

        width: 1200,

        height: 630,

        alt: "Independent Chemical NIG. ENT.",
      },
    ],

    locale: "en_US",

    type: "website",
  },

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <style>{`
html {
  font-family: ${figtree.style.fontFamily};
  --font-sans: ${figtree.variable};
  --font-mono: ${GeistMono.variable};
  --font-instrument-serif: ${instrumentSerif.variable};
}
        `}</style>
      </head>
      <body className={`${figtree.variable} ${instrumentSerif.variable}`}>{children}</body>
    </html>
  )
}
