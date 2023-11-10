import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { AnswerContainer } from "./answer-container";
import { CheckAuthProvider } from "@/utils/supabase/check-auth-provider";

export default async function ResultPage({
  params,
}: {
  params: { resultId: string };
}) {
  const { resultId } = params;
  const cookie = cookies();
  const supabase = createClient(cookie);

  const { data: result } = await supabase
    .from("practice_results")
    .select(
      "*, practice_sets (practice_questions (*)), practice_answers (*, practice_questions (*))"
    )
    .eq("id", resultId)
    .single();
  if (!result) return notFound();
  const questions = result?.practice_sets?.practice_questions;
  const answers = result?.practice_answers;
  const { score } = result;

  let _result = result;
  // 학습결과 집계
  if (!score && questions && questions.length > 0) {
    const totalScore = answers.reduce(
      (prev, curr) => prev + (curr.score ?? 0),
      0
    );
    const averageScore = totalScore / questions.length;
    const newResult = await supabase
      .from("practice_results")
      .update({
        score: averageScore,
        evaluation: averageScore > 5 ? "잘했어요!" : "조금 더 노력해요~",
        suggestion: "다른 교육자료도 공부해보는건 어떨까요?",
      })
      .eq("id", resultId)
      .select("*")
      .single();
    _result = {
      ...result,
      ...newResult.data,
    };
  }

  return (
    <div className="p-4">
      <CheckAuthProvider />
      <section className="mb-10">
        <header className="mb-8 text-center">
          <h1 className="font-bold text-xl">학습결과</h1>
        </header>
        <div className="text-center">
          나의 점수
          <h1 className="font-bold text-3xl">{_result.score}점</h1>
        </div>
      </section>
      <AnswerContainer answers={answers} />
    </div>
  );
}
