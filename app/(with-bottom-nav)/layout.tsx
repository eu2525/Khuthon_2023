import { BottomNavbar } from "@/components/layouts/bottom-navbar";
import { Toaster } from "react-hot-toast";

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
    <>
      <div className="h-full overflow-x-hidden overflow-y-auto flex flex-col">{children}</div>
      <BottomNavbar />
      <Toaster />
    </>
  );
}
