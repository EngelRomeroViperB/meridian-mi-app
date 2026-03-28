import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Providers } from "./providers";
import "./globals.css";

const APP_NAME = "Meridian";
const APP_TITLE = "Meridian - Productividad personal";
const APP_DESCRIPTION = "PWA de productividad personal con foco, finanzas y habitos.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_TITLE,
    template: "%s | Meridian"
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: APP_NAME
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: APP_TITLE,
    description: APP_DESCRIPTION
  },
  twitter: {
    card: "summary_large_image",
    title: APP_TITLE,
    description: APP_DESCRIPTION
  }
};

export const viewport: Viewport = {
  themeColor: "#0f0f0f"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="dark">
          <body className="min-h-screen bg-background text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
