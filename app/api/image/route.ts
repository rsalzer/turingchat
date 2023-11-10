import { NextResponse } from "next/server";
import { OpenAI } from "openai";

async function getData(prompt: string) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });
  return response.data;
}

export async function POST(req: Request) {
  const data = await req.json();
  const prompt: string = data.prompt;
  const imageData = await getData(prompt);
  return NextResponse.json(imageData);
}
