"use client";

import Navbar from "@/components/UI/navbar";
import Sidenav from "@/components/UI/sidenav";
import { Box, Flex } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Flex>
          <Sidenav />
          <Box w="100%">
            <Navbar />
            {children}
          </Box>
        </Flex>
      </body>
    </html>
  );
}
