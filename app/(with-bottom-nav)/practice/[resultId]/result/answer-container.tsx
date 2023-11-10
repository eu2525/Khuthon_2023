import { Database } from "@/utils/supabase/database.types";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

type _Answer = Database["public"]["Tables"]["practice_answers"]["Row"];
interface Answer extends _Answer {
  practice_questions:
    | Database["public"]["Tables"]["practice_questions"]["Row"]
    | null;
}
export const AnswerContainer = ({ answers }: { answers: Answer[] }) => {
  return (
    <div>
      <header className="mb-4">
        <h3 className="font-bold text-xl">나의 답변</h3>
      </header>
      {answers.map((answer) => (
        <AnswerItem key={answer.id} answer={answer} />
      ))}
    </div>
  );
};

const AnswerItem = ({ answer }: { answer: Answer }) => {
  const {
    answer: answerText,
    created_at,
    evaluation,
    score,
    suggestion,
    practice_questions,
  } = answer;
  const { question } = practice_questions!;
  return (
    <Card className="mb-4 p-4">
      <CardHeader>
        <h3 className="font-bold text-lg">Q. {question}</h3>
      </CardHeader>
      <Divider className="my-2" />
      <CardBody>
        <div className="mb-2">
          <p className="font-bold mb-1">답변</p>
          {answerText}
        </div>
        <div className="mb-2">
          <p className="font-bold mb-1">점수</p>
          {score}
        </div>
        <div className="mb-2">
          <p className="font-bold mb-1">평가</p>
          <p>{evaluation}</p>
        </div>
        <p className="font-bold mb-1">제안</p>
        <p>{suggestion}</p>
      </CardBody>
    </Card>
  );
};
