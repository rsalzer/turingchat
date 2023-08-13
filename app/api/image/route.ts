import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

async function getData(prompt: string) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "256x256",
  });
  return response.data;
}

export async function POST(req: Request) {
  const data = await req.json();
  const prompt: string = data.prompt;
  const imageData = await getData(prompt);
  return NextResponse.json(imageData);
}
