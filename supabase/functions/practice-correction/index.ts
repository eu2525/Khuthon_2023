// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

serve(async (req) => {
  const systemMessage =
    "점수 : 1~10 사이의 점수를 부여. 상대방의 요구를 잘 반영하고 공감하고 있으면 높은 점수를, 그렇지 않으면 낮은 점수를 부여. 조금이라도 상대방의 요구사항을 반영하지 못하거나 공감을 하지 못하면 2점 미만의 낮은 점수를 부여.";
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Expose-Headers": "Content-Length, X-JSON",
        "Access-Control-Allow-Headers":
          "apikey,X-Client-Info, Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
      },
    });
  } else {
    try {
      const { prompt } = await req.json();
      const res = await fetch(
        `https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions`,
        {
          body: JSON.stringify({
            prompt: `점수 : 1~10 사이의 점수를 부여. 상대방의 요구를 잘 반영하고 공감하고 있으면 높은 점수를, 그렇지 않으면 낮은 점수를 부여. 조금이라도 상대방의 요구사항을 반영하지 못하거나 공감을 하지 못하면 2점 미만의 낮은 점수를 부여.\n\n${prompt}`,
            temperature: 0.7,
            max_tokens: 512,
            top_p: 0.5,
            frequency_penalty: 0,
            presence_penalty: 0,
            best_of: 1,
          }),
          headers: {
            Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );
      const data = await res.json();

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
  }
});

// To invoke:
// curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
