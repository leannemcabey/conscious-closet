import "./globals.css";
import { Metadata } from "next";

// const defaultUrl = process.env.NODE_ENV === "production"
//     ? `https://consciouscloset.co`
//     : "http://localhost:3000";

const defaultUrl = "https://consciouscloset.co";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Conscious Closet",
  description: "A tool for sustainably managing your wardrobe",
  category: "website",
  generator: "Next.js",
  manifest: "/manifest.json"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
