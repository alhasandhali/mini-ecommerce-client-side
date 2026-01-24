import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ClientProviders from "./ClientProviders";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "TechTrove | Next-Generation Digital Goods",
  description: "Experience the pinnacle of technology with TechTrove's curated collection of laptops, mobiles, and optical gear.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
