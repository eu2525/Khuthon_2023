"use client";

import { createClient } from "@/utils/supabase/client";
import { Database } from "@/utils/supabase/database.types";
import { Card, CardBody, Divider, Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChatContainer } from "../../practice/[resultId]/chat-container";
import { Chat } from "@/utils/types";
import { parseRawChat } from "@/utils/parse-raw-chat";

type Report = Database["public"]["Tables"]["chat_analytic_reports"]["Row"];
export const AnalyticReportContainer = ({
  requestId,
  reports,
}: {
  requestId: string;
  reports: Report[];
}) => {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!reports.find((report) => report.score === null)) setLoading(false);
    else handleData();
  }, [reports]);

  const handleData = async () => {
    const res = await Promise.all(
      reports.map((report) => {
        const { chat_raw } = report;
        const prompt = `나는 대화에서 얼마나 공감을 잘 하고 있을까?
${chat_raw}

위의 대화에서 '나'는 상대방의 기분을 파악해 공감하는 대화를 하고 있는 것 같아? 다음과 같은 양식으로 위의 대화를 평가해줘!

점수 : 0~10 사이로 '나'의 답변을 평가해줘!
평가 : 위의 점수를 준 이유
제안 : '나'가 했어야 하는 답변을 제안`;
        return fetch(
          "https://ccmpekyfrelctemsruhy.supabase.co/functions/v1/practice-correction-v2",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env
                .NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
          }
        );
      })
    );
    const jsons = await Promise.all(res.map((data) => data.json()));

    const finals = await Promise.all(
      jsons.map((data, index) => {
        const correction_result = data.choices[0].message.content;
        // get score, evaluation, suggestion
        const scoreMatch = correction_result.match(/^점수\s*:\s*(\d+)$/m);
        const evaluationMatch = correction_result.match(/^평가\s*:\s*(.+)$/m);
        const suggestionMatch = correction_result.match(/^제안\s*:\s*(.+)$/m);
        const score = scoreMatch ? scoreMatch[1].trim() : 0;
        const evaluation = evaluationMatch ? evaluationMatch[1].trim() : "";
        const suggestion = suggestionMatch ? suggestionMatch[1].trim() : "";

        return supabase
          .from("chat_analytic_reports")
          .update({
            score,
            evaluation,
            suggestion,
          })
          .eq("id", reports[index].id)
          .select("*")
          .single();
      })
    );
    const totalScore = finals.reduce(
      (prev, curr) => prev + (curr.data?.score ?? 0),
      0
    );
    await supabase
      .from("chat_analytic_requests")
      .update({
        total_score: totalScore / finals.length,
      })
      .eq("id", res);

    router.refresh();
  };

  if (loading)
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  return (
    <div className="h-full grid grid-cols-1 gap-4 p-4">
      {reports.map((report, index) => (
        <AnalyticReportItem key={report.id} report={report} index={index} />
      ))}
    </div>
  );
};

const AnalyticReportItem = ({
  report,
  index,
}: {
  report: Report;
  index: number;
}) => {
  const chats: Chat[] = parseRawChat(report.chat_raw);

  return (
    <div className="pb-4 border-b">
      <header className="mb-4">
        <h3 className="font-bold ml-2">대화 상황 {index + 1}</h3>
      </header>
      <Card className="mb-4">
        <CardBody>
          <ChatContainer chats={chats} />
        </CardBody>
      </Card>
      <div className="mb-2">
        <p className="font-bold mb-1 text-lg">점수</p>
        <p>{report.score}</p>
      </div>
      <div className="mb-2">
        <p className="font-bold mb-1 text-lg">평가</p>
        <p>{report.evaluation}</p>
      </div>
      <div className="mb-2">
        <p className="font-bold mb-1 text-lg">제안</p>
        <p>{report.suggestion}</p>
      </div>
    </div>
  );
};
