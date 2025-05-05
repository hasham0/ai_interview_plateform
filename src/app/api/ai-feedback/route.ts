import { FEEDBACK_PROMPT } from "./../../../services/constant";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  try {
    const { conversation } = await request.json();
    const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
      "{{conversation}}",
      JSON.stringify(conversation)
    );

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPEN_ROUTER_API_KEY as string,
    });

    const completion = await openai.chat.completions.create({
      model: "${Model.GPT_4_Omni}",
      messages: [{ role: "user", content: FINAL_PROMPT }],
      response_format: {
        type: "json_object",
      },
    });
    return NextResponse.json({
      content: completion.choices[0].message,
    });
  } catch (error) {
    console.error("🚀 ~ POST ~ error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
