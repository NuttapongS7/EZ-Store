import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import CartSidebar from "../components/CartSidebar";

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
    default: "My Shop",
    template: "%s | My Shop",
  },
  description: "Shop the best products at great prices.",
  metadataBase: new URL("https://yourdomain.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 font-sans">
        <CartProvider>
          <main className="flex-1 flex flex-col">
            <Suspense fallback={
              <div className="flex-1 flex items-center justify-center text-gray-400">
                Loading...
              </div>
            }>
              {children}
            </Suspense>
          </main>
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}