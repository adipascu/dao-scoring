"use client";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
