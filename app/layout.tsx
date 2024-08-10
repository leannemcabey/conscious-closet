import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

const APP_NAME = "Conscious Closet";
const APP_DEFAULT_TITLE = "Conscious Closet";
const APP_TITLE_TEMPLATE = "Conscious Closet";
const APP_DESCRIPTION = "Wardrobe sustainability tool";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#287e60",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
      <html lang="en" dir="ltr">
      <head><
        title>Conscious Closet</title>
      </head>
      <body>
        {children}
      </body>
      </html>
  );
}

// export const metadata: Metadata = {
//   metadataBase: new URL(defaultUrl),
//   title: "Conscious Closet",
//   description: "A tool for sustainably managing your wardrobe",
//   category: "website",
//   generator: "Next.js",
//   manifest: "/manifest.json"
// };
