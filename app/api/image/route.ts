import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import * as ftp from "basic-ftp";
import get from "axios";
import { Readable } from "stream";

async function getData(prompt: string, id: number) {
  console.log("Start getting prompt", prompt);
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });
  console.log("Image arrived from Openai", id);
  const url = response.data[0].url;
  if (url && id !== 0)
    testUpload(url, id).then(() => console.log("Upload finished"));
  console.log("Not waiting to return ...");
  return response.data;
}

async function testUpload(url: string, id: number) {
  const { data } = await get<Readable>(url, {
    responseType: "stream",
  });
  const client = new ftp.Client();
  client.ftp.verbose = false;
  console.log("Start uploading file");
  try {
    const dateString = new Date()
      .toISOString()
      .replace(/T/, "_") // replace T with a space
      .replace(/\..+/, "");
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PW,
      secure: false,
    });
    await client.uploadFrom(data, `${id}/${dateString}.png`);
  } catch (err) {
    console.log(err);
  }
  client.close();
  console.log("File uploading completed");
}

export async function POST(req: Request) {
  const data = await req.json();
  const prompt: string = data.prompt;
  const id: number = data.id;
  const imageData = await getData(prompt, id);
  console.log("Sending image to client");
  return NextResponse.json(imageData);
}
