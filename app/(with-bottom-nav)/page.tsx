import { PracticeSetContainer } from "@/components/practice/practice-set-item-container";
import { createClient } from "@/utils/supabase/server";
import { Button, Card, CardBody, Image } from "@nextui-org/react";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Index() {
  const cookieStore = cookies();
  const client = createClient(cookieStore);

  const practiceSets = await client.from("practice_sets").select("*");

  return (
    <div>
      <section className="p-4">
        <header className="text-center mb-4">
          <h2 className="font-bold text-2xl mb-1">🤗 환영해요!</h2>
          <p className="text-sm text-gray-600">
            전국민 공감 프로젝트, UT입니다.
          </p>
        </header>

        <div className="flex justify-center">
          <Card className="aspect-square w-[350px]">
            <CardBody className="flex flex-col justify-center items-center">
              <div className="mb-4">
                <h3 className="text-center">
                  💬 <span className="font-bold">카카오톡 대화</span>를 불러와
                  <br />
                  나의 공감능력을 확인해보세요!
                </h3>
              </div>
              <div className="px-4 pb-4 pt-8 flex flex-col justify-center items-center">
                <Image
                  src="/icons/question_mark.png"
                  className="animate-bounce mb-2"
                  width={100}
                  height={100}
                />
                <h5 className="font-bold text-xl text-warning-900">
                  나는 몇 점일까?
                </h5>
              </div>
              <Link href="/onboarding" className="w-fit">
                <Button
                  color="warning"
                  size="lg"
                  className="font-bold text-warning-800"
                >
                  시작하기
                </Button>
              </Link>
            </CardBody>
          </Card>
        </div>
      </section>
      <section>
        <header className="px-4 pt-4">
          <h2 className="font-bold text-xl mb-1">
            🥲 공감? 그거 어떻게 하는건데.
          </h2>
          <p className="text-sm text-gray-600">
            공감이 어려우신가요? 연습문제를 통해 공감 능력을 키워보세요!
          </p>
        </header>
        <PracticeSetContainer />
      </section>
    </div>
  );
}
