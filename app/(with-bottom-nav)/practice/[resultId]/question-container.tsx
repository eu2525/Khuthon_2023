"use client";

import { BACK_NAVBAR_HEIGHT } from "@/components/layouts/back-navbar";
import { Database } from "@/utils/supabase/database.types";
import { Chat } from "@/utils/types";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ChatContainer } from "./chat-container";
import { LevelBadge } from "@/components/level-badge";

type Question = Database["public"]["Tables"]["practice_questions"]["Row"];

export const QuestionContainer = ({
  resultId,
  questions,
}: {
  resultId: string;
  questions: Question[];
}) => {
  const router = useRouter();

  const [selectedQuestion, setSelectedQuestion] = useState<Question>();
  const [chats, setChats] = useState<Chat[]>([]);

  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!!selectedQuestion) {
      const chats = selectedQuestion.chat_raw?.split("\n");

      setChats(
        chats?.map((chat) => {
          // const match = chat.match(/([^:]+) : (.*)/gm);
          const match = [...chat.matchAll(/([^:]+):(.*)/gm)];
          const sender = match ? (match[0] ? match[0][1]?.trim() : "") : "";
          const message = match ? (match[0] ? match[0][2]?.trim() : "") : "";
          return {
            sender,
            message,
            isMe: sender === "나",
          };
        }) ?? []
      );
    }
  }, [selectedQuestion]);

  useEffect(() => {
    if (questions.length > 0) {
      setSelectedQuestion(questions[0]);
    } else {
      toast.error("이미 학습을 완료했어요!");
      router.replace(`/practice/${resultId}/result`);
    }
  }, [questions]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <div className={`h-full flex flex-col justify-between`}>
      <div className="p-4 border-b flex items-center">
        {selectedQuestion?.level ? (
          <div className="flex-none w-[48px] mr-4">
            <LevelBadge level={selectedQuestion.level} />
          </div>
        ) : null}
        <h3 className="font-bold">Q. {selectedQuestion?.question}</h3>
      </div>
      <ChatContainer chats={chats} />
      <div className="border-t">
        <form onSubmit={handleSubmit} className="p-4 flex items-center">
          <Textarea
            type="text"
            label="답장입력"
            value={answer}
            onChange={(e) => setAnswer(e.currentTarget.value)}
            className="mr-4"
            minRows={1}
            isDisabled={loading}
          />
          <Button
            size="lg"
            isIconOnly
            color="primary"
            isLoading={loading}
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </Button>
        </form>
      </div>
    </div>
  );
};
