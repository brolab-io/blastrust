import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";

import { cookieToInitialState } from "wagmi";

import { config } from "@/config";
import { ContextProvider } from "@/context";
import MyHeader from "@/components/MyHeader";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blastrust",
  description: "Blastrust - Your trustless gateway to the blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en" className="bg-black">
      <body className={clsx(inter.className)}>
        <ContextProvider initialState={initialState}>
          <MyHeader />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
