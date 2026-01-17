import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Caliph Students' Union",
  description: "DASHAK - Caliph Students' Union 2025-26",
  generator: "v0.app",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
          .perspective-1000 { perspective: 1000px; }
          .preserve-3d { transform-style: preserve-3d; }
        `}</style>
      </head>
      <body className="antialiased font-milker">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
