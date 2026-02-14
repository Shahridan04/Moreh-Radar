import type { Metadata, Viewport } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "@/lib/auth";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "MOREH RADAR — Kill Hunger. Kill Waste.",
  description:
    "Tactical real-time geospatial dashboard connecting mosques with surplus Ramadan food to hungry university students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          background: "#050505",
          fontFamily:
            "'Share Tech Mono', 'JetBrains Mono', 'Courier New', monospace",
        }}
      >
        <AuthProvider>
          {/* CRT Scanline overlay */}
          <div className="scanline-overlay" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
