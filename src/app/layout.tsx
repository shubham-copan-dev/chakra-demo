"use client";

import { theme } from "../chakraConfig/theme";
import { Inter } from "next/font/google";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
// eslint-disable-next-line @next/next/no-document-import-in-page
import { Head } from "next/document";
import { Provider } from "react-redux";
import store from "@/redux/store";

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
      <body className={inter.className}>
        <Provider store={store}>
          <CacheProvider>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
          </CacheProvider>
        </Provider>
      </body>
    </html>
  );
}
