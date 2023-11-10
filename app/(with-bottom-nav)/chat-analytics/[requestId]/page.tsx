import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { AnalyticReportContainer } from "./analytic-report-container";
import { BackNavbar } from "@/components/layouts/back-navbar";

export default async function ChatAnalyticsPage({
  params,
}: {
  params: { requestId: string };
}) {
  const { requestId } = params;
  const cookie = cookies();
  const supabase = createClient(cookie);

  const { data: request } = await supabase
    .from("chat_analytic_requests")
    .select("*, chat_analytic_reports (*)")
    .eq("id", requestId)
    .single();
  const reports = request?.chat_analytic_reports;

  return (
    <>
      <BackNavbar />
      {reports && reports.length > 0 ? (
        <AnalyticReportContainer requestId={requestId} reports={reports} />
      ) : null}
    </>
  );
}
