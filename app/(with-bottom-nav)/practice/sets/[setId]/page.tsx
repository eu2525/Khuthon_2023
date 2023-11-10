import { createClient } from "@/utils/supabase/server";
import { Button } from "@nextui-org/react";
import { cookies } from "next/headers";
import { StartButton } from "./start-button";

export default async function PracticeSetPage({
  params,
}: {
  params: { setId: string };
}) {
  const id = params.setId;

  const cookie = cookies();
  const supabase = createClient(cookie);
  const { data: practiceSet } = await supabase
    .from("practice_sets")
    .select("*")
    .eq("id", id)
    .single();
  if (!practiceSet) return null;

  const { title, thumbnail_image, description, level } = practiceSet;

  return (
    <div
      className="flex flex-col justify-end h-full"
      style={{
        background: `linear-gradient( rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35) ), url('${thumbnail_image}')`,
        backgroundSize: "cover",
        backgroundPosition: "50% 50%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="p-4">
        <div className="text-white">
          <header className="mb-4">
            <h1 className="font-bold text-2xl mb-2">{title}</h1>
            <p>{description}</p>
          </header>
        </div>
        <StartButton setId={parseInt(id)} />
      </div>
    </div>
  );
}
