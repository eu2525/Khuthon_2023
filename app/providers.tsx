// app/providers.tsx
"use client";

import { PortalProvider } from "@gorhom/portal";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PortalProvider>
      <NextUIProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
        >
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </PortalProvider>
  );
}
