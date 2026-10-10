import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ThirdSpace AI",
  description: "Personalized real-world recommendations for events, clubs, and communities."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

