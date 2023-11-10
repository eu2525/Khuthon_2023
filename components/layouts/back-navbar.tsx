"use client";

import { useRouter } from "next/navigation";

export const BACK_NAVBAR_HEIGHT = 57;

export const BackNavbar = ({ title }: { title?: string }) => {
  const router = useRouter();
  return (
    <nav className="p-4 border-b flex items-center">
      <button onClick={() => router.back()} className="mr-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </button>
      <p className="font-bold">{title}</p>
    </nav>
  );
};
