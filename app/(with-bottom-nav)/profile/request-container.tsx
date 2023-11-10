import { Database } from "@/utils/supabase/database.types";
import { Card, CardBody } from "@nextui-org/react";
import { format } from "date-fns";
import Link from "next/link";

type Request = Database["public"]["Tables"]["chat_analytic_requests"]["Row"];
export const RequestContainer = ({ requests }: { requests: Request[] }) => {
  return (
    <div className="flex-none h-fit p-4 flex gap-4 overflow-x-auto">
      {requests.map((request) => (
        <RequestItem key={request.id} request={request} />
      ))}
    </div>
  );
};

const RequestItem = ({ request }: { request: Request }) => {
  const { id, total_score, chat_raw, created_at } = request;

  return (
    <Link href={`/chat-analytics/${id}`} className="flex-none">
      <Card className="w-[200px] h-[100px]">
        <CardBody className="flex flex-col justify-center items-center">
          <h3 className="font-bold text-2xl">{total_score ?? 0}점</h3>
          {format(new Date(created_at), "yyyy-MM-dd")}
        </CardBody>
      </Card>
    </Link>
  );
};
