import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import {ProfileProvider} from "../app/context/ProfileImageContext"

import "./globals.css";

export const metadata: Metadata = {
  title: "Jamblify",
  description:
    "Jamblify is an AI powered jamb prep edtech platform, it is a platform to help you practice and prepare for jamb in order to come out in flying colours, well this is a docs and not a promo so lets get into some of the tech details",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider attribute="class">
        <body className={`${GeistSans.className} ${GeistMono.className} antialiased`}>
          <ProfileProvider>
            {children}
            </ProfileProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
