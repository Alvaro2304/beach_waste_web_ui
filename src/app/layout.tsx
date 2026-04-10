import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beach Sentinel — Mission Control",
  description: "Remote monitoring and control dashboard for the Beach Sentinel coastal cleanup robot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
