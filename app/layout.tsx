import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Human Radar — Can you predict how humans think?",
  description: "A psychology-based social prediction game. Predict what the majority will choose.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0a0a12] text-white min-h-screen" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
