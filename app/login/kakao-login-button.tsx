"use client";

import { createClient } from "@/utils/supabase/client";
import { cookies } from "next/headers";

export const KakaoLoginButton = () => {
  async function signInWithKakao() {
    // const cookieStore = cookies();
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
    });
    console.log(data, error)
  }

  return <button onClick={signInWithKakao}>kakao login</button>;
};
