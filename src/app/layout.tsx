import Layout from "@/layout"
import theme from "@/theme"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Clipboard next",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider>
          <Layout>{children}</Layout>
        </ChakraProvider>
      </body>
    </html>
  )
}
