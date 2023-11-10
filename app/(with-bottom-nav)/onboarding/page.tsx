import { BackNavbar } from "@/components/layouts/back-navbar";
import { CheckAuthProvider } from "@/utils/supabase/check-auth-provider";
import { Button, Code } from "@nextui-org/react";
import { FileHandler } from "./file-handler";
import { Onboarding } from "./onboarding";

export default function OnboardingPage() {
  return (
    <>
      <CheckAuthProvider />
      <BackNavbar />
      <Onboarding />
    </>
  );
}
