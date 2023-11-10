"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };
  return <Button onClick={handleLogout}>로그아웃</Button>;
};
