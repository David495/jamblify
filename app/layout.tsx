import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import { ProfileProvider } from "./context/ProfileImageContext";
import InitialLoader from "./components/InitialLoader";

import "./globals.css";

export const metadata: Metadata = {
  icons: {
     icon: "/favicon.ico", 
  },
  title: "Jamblify",
  description:
    "Jamblify is an AI powered jamb prep edtech platform, it is a platform to help you practice and prepare for jamb in order to come out in flying colours, well this is a docs and not a promo so lets get into some of the tech details",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className} ${GeistMono.className} antialiased`}>
        <ThemeProvider attribute="class">
          <ProfileProvider>
            <InitialLoader>
              {children}
            </InitialLoader>
          </ProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}