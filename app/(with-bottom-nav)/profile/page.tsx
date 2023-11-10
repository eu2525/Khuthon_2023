import { Avatar, Button, Divider, Progress } from "@nextui-org/react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { CheckAuthProvider } from "@/utils/supabase/check-auth-provider";
import { ResultContainer } from "./result-conatiner";
import { LogoutButton } from "./logout-button";
import { RequestContainer } from "./request-container";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return <CheckAuthProvider />;

  const { data: results } = await supabase
    .from("practice_results")
    .select("*, practice_sets(*)")
    .eq("user_id", user?.id)
    // .order("updated_at", { ascending: false })
    .order("created_at", { ascending: false });
  const { data: requests } = await supabase
    .from("chat_analytic_requests")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", {
      ascending: false,
    });

  return (
    <>
      <CheckAuthProvider />
      <section className="py-8 flex flex-col justify-center items-center">
        <Avatar size="lg" className="mb-4" />
        <p>{user?.email}</p>
        <div className="w-full flex justify-center">
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
      </section>
      <Divider />
      {requests ? <RequestContainer requests={requests} /> : null}
      <Divider />
      {results ? <ResultContainer results={results} /> : null}
      <Divider />
      <section className="p-4">
        <LogoutButton />
      </section>
    </>
  );
}
