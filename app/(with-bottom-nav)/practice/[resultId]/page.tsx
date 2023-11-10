import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { QuestionContainer } from "./question-container";
import { BackNavbar } from "@/components/layouts/back-navbar";

export default async function ResultPage({
  params,
}: {
  params: { resultId: string };
}) {
  const id = params.resultId;
  const cookie = cookies();
  const supabase = createClient(cookie);

  const { data: result } = await supabase
    .from("practice_results")
    .select(
      "*, practice_sets (*, practice_questions (*)), practice_answers (*)"
    )
    .eq("id", id)
    .single();
  // check unsolved Questions
  const set = result?.practice_sets;
  const answers = result?.practice_answers ?? [];
  const questions = result?.practice_sets?.practice_questions ?? [];
  const unsolvedQuestions = questions.filter(
    (q) => !answers.find((a) => a.question_id === q.id)
  );
  const questionCount = unsolvedQuestions.length;

  return (
    <>
      <BackNavbar title={set ? set.title : ""} />
      <QuestionContainer resultId={id} questions={unsolvedQuestions} />
    </>
  );
}
