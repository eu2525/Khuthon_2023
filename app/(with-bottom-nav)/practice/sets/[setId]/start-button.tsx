"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const StartButton = ({ setId }: { setId: number }) => {
  const supabase = createClient();
  const router = useRouter();

  const startPractice = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return router.push("/login");
    // start practice
    const { data: newPractice } = await supabase
      .from("practice_results")
      .insert({
        user_id: user.id,
        set_id: setId,
      })
      .select()
      .single();
    await supabase.from("practice_answers")
    if (!newPractice) {
      toast.error("오류가 발생했어요 :(");
      return;
    }
    toast.success("학습을 시작합니다!");
    router.push(`/practice/${newPractice?.id}`);
  };

  return (
    <Button
      color="primary"
      size="lg"
      className="w-full"
      onClick={startPractice}
    >
      시작하기
    </Button>
  );
};
