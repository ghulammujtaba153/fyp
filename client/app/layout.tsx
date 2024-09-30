

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";
import ClientProviders from "./ClientProviders";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ReduxProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cardio Hema Hub",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ReduxProvider>
        <ClientProviders>

          <FloatingNav navItems={navItems}/>
          {children}
        </ClientProviders>
        </ReduxProvider>
      </body>
    </html>
  );
}
