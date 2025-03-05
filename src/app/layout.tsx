import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import localFont from "next/font/local";
import { categories } from "../configs/cards.config";

const druk = localFont({
  src: "../../public/fonts/Druk/Druk Wide Cyr.ttf",
  display: "swap",
  variable: "--font-druk",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get unique image URLs to prevent duplicate preloads
  const uniqueImageUrls = new Set<string>();
  categories.forEach((category) => {
    category.items.forEach((item) => {
      uniqueImageUrls.add(item.imageUrl);
    });
  });

  return (
    <html lang="en" className={druk.variable}>
      {/* Preload images */}
      {Array.from(uniqueImageUrls).map((imageUrl, index) => (
        <link
          key={index}
          rel="preload"
          href={imageUrl}
          as="image"
          type="image/jpeg"
        />
      ))}
      <body className={` bg-black `}>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="afterInteractive"
        />
        {/* <div className="scroll min-h-screen" id="main">
          {children}
        </div> */}{" "}
        {children}
      </body>
    </html>
  );
}
