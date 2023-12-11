"use client";

import { theme } from "../chakraConfig/theme";
import { Inter } from "next/font/google";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
// eslint-disable-next-line @next/next/no-document-import-in-page
import { Provider } from "react-redux";
import store from "@/redux/store";
import { QueryClient, QueryClientProvider } from "react-query";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

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
          <QueryClientProvider client={queryClient}>
            <CacheProvider>
              <ChakraProvider theme={theme}>{children}</ChakraProvider>
            </CacheProvider>
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}
