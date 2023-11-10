import { cookies } from "next/headers";
import { createClient } from "./server";
import { redirect } from "next/navigation";

export const CheckAuthProvider = async () => {
  const cookie = cookies();
  const supabase = createClient(cookie);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  return null;
};
