import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Welcome Itzfizz",
  description: "Scroll-driven hero section animation built with GSAP ScrollTrigger.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"suppressHydrationWarning>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}