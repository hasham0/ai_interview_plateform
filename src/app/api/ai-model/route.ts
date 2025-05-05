import { CreateInterviewTS } from "@/schemas/CreateInterviewZod";
import { QUESTIONS_PROMPT } from "@/services/constant";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  try {
    const {
      jobPosition,
      jobDescription,
      interviewDuration,
      interviewType,
    }: CreateInterviewTS = await request.json();

    const FINAL_PROMPT = QUESTIONS_PROMPT.replace("{{jobTitle}}", jobPosition)
      .replace("{{jobDescription}}", jobDescription)
      .replace("{{duration}}", interviewDuration)
      .replace(
        "{{type}}",
        interviewType.map((i) => i[0].toUpperCase() + i.slice(1)).join("/")
      );

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPEN_ROUTER_API_KEY as string,
    });

    const completion = await openai.chat.completions.create({
      model: "${google/gemini-2.5-pro-exp-03-25}",
      messages: [{ role: "user", content: FINAL_PROMPT }],
      response_format: {
        type: "json_object",
      },
    });
    return NextResponse.json({
      questions: completion.choices[0].message,
    });
  } catch (error) {
    console.error("🚀 ~ POST ~ error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
//e1342a6fbd9e98f53a96d97623b3ba3eb986036ca630cce33d98c70b51cb4302
