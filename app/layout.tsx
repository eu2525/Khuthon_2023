import { GeistSans } from "geist/font";
import "./globals.css";
import "./bottom-sheet.css";
import "react-spring-bottom-sheet/dist/style.css";
import { Providers } from "./providers";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={GeistSans.className}>
      <body className="bg-black">
        <Providers>
          <main className="relative h-screen max-w-[500px] mx-auto flex flex-col justify-between bg-background text-foreground">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
