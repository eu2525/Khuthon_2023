import { BackNavbar } from "@/components/layouts/back-navbar";
import { Code } from "@nextui-org/react";

export default function OnboardingPage() {
  return (
    <>
      <BackNavbar />
      <section className="p-4">
        <div className="mb-4">
          <h3 className="font-bold text-lg mb-1">1. 카카오톡 대화 불러오기</h3>
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
        </div>
      </section>
    </>
  );
}
