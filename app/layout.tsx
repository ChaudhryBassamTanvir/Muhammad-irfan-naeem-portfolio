import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const font = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-main" });

export const metadata: Metadata = {
  title: "Muhammad Irfan Naeem | Aviation Engineer",
  description: "Portfolio of Muhammad Irfan Naeem, aviation engineer in aircraft maintenance, inspection and manufacturing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.variable}>
      <body>{children}</body>
    </html>
  );
}
