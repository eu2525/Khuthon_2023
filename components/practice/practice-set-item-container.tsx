import { cookies } from "next/headers";
import { PracticeSetItem } from "./practice-set-item";
import { createClient } from "@/utils/supabase/server";

export const PracticeSetContainer = async () => {
  const cookieStore = cookies();
  const client = createClient(cookieStore);

  const { data: practiceSets } = await client.from("practice_sets").select("*");

  return (
    <div className="flex flex-1 gap-4 overflow-x-auto px-4 py-4">
      {practiceSets?.map((set) => (
        <PracticeSetItem key={set.id} set={set} />
      ))}
    </div>
  );
};
