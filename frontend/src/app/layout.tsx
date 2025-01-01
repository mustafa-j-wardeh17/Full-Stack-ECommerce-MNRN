import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProvider } from "@/context";
import { Toaster } from "react-hot-toast";
import '@fontsource/geist-mono';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    absolute:'Your Ultimate Tech Destination - ByteVault',
    default:'ByteVault',
    template:'%s - ByteVault'
  },
  description: "ByteVault is your one-stop shop for everything tech-related! Explore a wide range of the latest mobile phones, laptops, computers, gaming consoles, accessories, and much more. From high-performance devices to essential tech accessories like chargers, headphones, RAM, and storage drives, we have it all. Whether you're a gamer, a tech enthusiast, or someone looking for everyday tech solutions, ByteVault provides the best products at competitive prices, ensuring you always stay ahead in your tech journey. Upgrade your gear and discover cutting-edge innovations only at ByteVault.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster
                position="top-center"
                reverseOrder={false}
                
            />
          </ThemeProvider>
          
        </UserProvider>
      </body>
    </html>
  );
}
