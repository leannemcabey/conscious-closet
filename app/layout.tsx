import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Head from "next/head";
import * as React from "react";

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
        <Head>
          <title>Conscious Closet</title>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
          <link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,300;1,300&display=swap"
                rel="stylesheet"/>
        </Head>
        <body>
          {children}
        </body>
      </html>
  );
}
