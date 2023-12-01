"use client";

import { theme } from "../chakraConfig/theme";
import { Inter } from "next/font/google";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CacheProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
