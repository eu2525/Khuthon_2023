import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function ResultPage({
  params,
}: {
  params: { resultId: string };
}) {
  const { resultId } = params;
  const cookie = cookies();
  const supabase = createClient(cookie);
  const result = await supabase
    .from("practice_results")
    .select("*, practice_answers (*, practice_questions (*))")
    .eq("id", resultId)
    .single();
  console.log(result);
  const answers = result.data?.practice_answers;

  return (
    <div>
      <header className="mb-4 text-center">
        <h1 className="font-bold text-xl">학습결과</h1>
      </header>
      <div>나의 답변</div>
    </div>
  );
}
