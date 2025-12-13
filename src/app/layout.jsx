import FacebookPixel from "@/components/analytics/FacebookPixel";
import TikTokPixel from "@/components/analytics/TikTokPixel";
import { CartProvider } from "@/context/CartContext";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import AppThemeProvider from "./lib/theme/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.naturalcurehelp.com"
  ),
  title: {
    default: "Nature Cure Food | Ayurvedic & Veshoj Medicine Shop",
    template: "%s | Nature Cure Food",
  },
  description:
    "Buy authentic ayurvedic (veshoj) herbal medicine in Bangladesh. Fast delivery, trusted products, best prices. Nature Cure Food.",
  keywords: [
    "ayurvedic",
    "veshoj",
    "herbal medicine",
    "ayurveda Bangladesh",
    "unani",
    "natural remedies",
    "herbal supplements",
  ],
  openGraph: {
    type: "website",
    url: "/",
    title: "Nature Cure Food | Ayurvedic & Veshoj Medicine Shop",
    description:
      "Shop ayurvedic veshoj herbal products. Fast delivery and high quality.",
    siteName: "Nature Cure Food",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nature Cure Food",
    description: "Ayurvedic & Veshoj Medicine Shop",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AppThemeProvider>
          <CartProvider>
            <FacebookPixel />
            <TikTokPixel />
            {children}
            <Toaster position="top-right" richColors />
          </CartProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
