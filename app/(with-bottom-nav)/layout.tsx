import { BottomNavbar } from "@/components/layouts/bottom-navbar";
import { Toaster } from "react-hot-toast";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "전국민 공감 프로젝트, UT?",
  description: "너 T야? 공감이 어려우신가요? UT로 오세요!",
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
