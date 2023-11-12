import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import * as ftp from "basic-ftp";
import { writeFileSync } from "fs";

async function getData(prompt: string, id: number) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });
  const url = response.data[0].url;
  if (url) await testUpload(url, id);
  return response.data;
}

async function storeFileLocally(url: string): Promise<string> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const data = Buffer.from(buffer);

  const dateString = new Date()
    .toISOString()
    .replace(/T/, "_") // replace T with a space
    .replace(/\..+/, "");

  const path = `/tmp/${dateString}.png`;
  writeFileSync(path, data);

  return path;
}

async function testUpload(url: string, id: number) {
  const path = await storeFileLocally(url);
  const client = new ftp.Client();
  client.ftp.verbose = false;
  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PW,
      secure: false,
    });
    await client.uploadFrom(path, `${id}/${path.replace("/tmp/", "")}`);
  } catch (err) {
    console.log(err);
  }
  client.close();
}

export async function POST(req: Request) {
  const data = await req.json();
  const prompt: string = data.prompt;
  const id: Number = data.id;
  const imageData = await getData(prompt, id);
  return NextResponse.json(imageData);
}
