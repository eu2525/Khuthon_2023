import { Avatar, Progress } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { CheckAuthProvider } from "@/utils/supabase/check-auth-provider";
import { ResultContainer } from "./result-conatiner";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: results } = await supabase
    .from("practice_results")
    .select("*, practice_sets(*)");

  return (
    <>
      <CheckAuthProvider />
      <Avatar size="lg" />
      {user?.email}
      <div className="flex justify-center">
        <Progress
          size="lg"
          radius="sm"
          classNames={{
            base: "max-w-md",
            track: "drop-shadow-sm rounded-full",
            indicator:
              "bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full",
            label: "tracking-wider font-medium text-default-600",
            value: "text-foreground/60",
          }}
          label="EXP"
          value={65}
          showValueLabel={true}
        />
      </div>
      {results ? <ResultContainer results={results} /> : null}
    </>
  );
}
