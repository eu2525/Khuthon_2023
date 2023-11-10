"use client";

import { Code, Button } from "@nextui-org/react";
import { FileHandler } from "./file-handler";
import react, { useState } from "react";
import toast from "react-hot-toast";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export const Onboarding = () => {
  const router = useRouter();
  const supabase = createClient();

  const [chatRaw, setChatRaw] = react.useState<string>("");
  const [names, setNames] = react.useState<string[]>([]);
  const [selectedName, setSelectedName] = react.useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeFile = (text: string, names: string[]) => {
    if (text.split("\n").length > 30) {
      toast.success("대화내용이 너무 길어서 최초 30문장의 대화만 분석할게요!");
    }
    const chatRawData =
      text.split("\n").length > 30
        ? text
            .split("\n")
            .filter((line, index) => index <= 29)
            .join("\n")
        : text;
    setChatRaw(chatRawData);
    setNames(names);
  };

  const handleSubmit = async () => {
    if (!selectedName) return;
    try {
      setLoading(true);
      const res = await fetch("http://tbal.moneyforbook.com/preprocess-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: chatRaw,
          name: selectedName,
        }),
      });
      if (!res.ok) throw new Error("문제가 발생했어요 :(");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      // put data into data
      const { data: inserted } = await supabase
        .from("chat_analytic_requests")
        .insert({
          user_id: user?.id,
          chat_raw: chatRaw.trim(),
        })
        .select("*")
        .single();
      const requestId = inserted?.id;

      if (!requestId) return;
      // put reports
      const data = await res.json();
      const chatSets = data.result.split(/\|/) as string[];
      await Promise.all(
        chatSets
          .filter((chatSet) => chatSet.replaceAll("\n", "") !== "")
          .map((chatSet) => {
            const trimed = chatSet.trim();
            console.log(trimed);
            console.log(trimed.split("\n"));
            return supabase.from("chat_analytic_reports").insert({
              chat_raw: trimed,
              request_id: requestId,
            });
          })
      );

      // redirect
      router.replace(`/chat-analytics/${requestId}`);
    } catch (e) {
      toast.error("문제가 발생했어요 :(");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col h-full justify-between">
        <section className="p-4">
          <div className="mb-4">
            <h3 className="font-bold text-lg mb-1">
              1. 카카오톡 대화 불러오기
            </h3>
            <p className="leading-8">
              분석하고 싶은 카카오톡 대화방에서
              <Code className="mx-1">
                설정 &gt; 대화 내보내기 &gt; 텍스트 메세지만 보내기
              </Code>
              에서 카카오톡 대화 내용을 저장합니다.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="font-bold text-lg mb-1">
              2. 카카오톡 대화 내용 분석 맡기기
            </h3>
            <p className="leading-8">불러온 텍스트 파일을 첨부합니다.</p>
            <p className="text-xs mb-2">
              현재 윈도우 버전 PC 카톡에서 내보낸 대화만 지원합니다.
              <br />
              아래와 같은 형식의 .txt 파일입니다.
            </p>
            <Code>
              --------------- 2023년 11월 10일 금요일 ---------------
              <br />
              [홍길동] [오후 10:14] 나 우울해
              <br />
              [김철수] [오후 10:14] 왜 우울해??
              <br />
              [홍길동] [오후 10:15] 어제 여자친구랑 헤어졌어. 너무 슬퍼.
              <br />
              [김철수] [오후 10:15] 너가 여자친구한테 좀 더 잘하지 그랬어
              <br />
            </Code>
          </div>

          <div className="mb-4">
            <FileHandler
              onFileChange={handleChangeFile}
              disabled={names.length > 0}
            />
          </div>

          <div>
            {names.length > 0 ? (
              <p className="font-bold text-red-500 text-center mb-4">
                본인 이름을 선택해주세요!
              </p>
            ) : null}
            <div className="flex gap-4 justify-center">
              {names.map((name) => (
                <Button
                  key={name}
                  onClick={() => setSelectedName(name)}
                  color={selectedName === name ? "primary" : "default"}
                >
                  {name}
                </Button>
              ))}
            </div>
          </div>
        </section>
        <section className="p-4">
          <Button
            className="w-full"
            color="primary"
            size="lg"
            isDisabled={!selectedName}
            onClick={handleSubmit}
            isLoading={loading}
          >
            제출하기
          </Button>
        </section>
      </div>
    </>
  );
};
