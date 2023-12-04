"use client";

import { theme } from "../chakraConfig/theme";
import { Inter } from "next/font/google";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
// eslint-disable-next-line @next/next/no-document-import-in-page
import { Head } from "next/document";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
        />
      </head>
      <body
        className={inter.className}
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <CacheProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
