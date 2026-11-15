import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VIRAL CASH GLOBAL 3D",
  description:
    "Global Social Media Monetization Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
