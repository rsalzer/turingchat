import { NextResponse } from "next/server";
import * as ftp from "basic-ftp";
import get from "axios";
import { Readable } from "stream";
import sharp from "sharp";

async function testUpload(url: string, id: number) {
  const { data } = await get<ArrayBuffer>(url, {
    responseType: "arraybuffer",
  });
  const client = new ftp.Client();
  client.ftp.verbose = false;
  console.log("Converting to webp", id, url);
  const webpData = await sharp(data).webp().toBuffer();
  console.log("Uploading", id);
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
    const stream = Readable.from(webpData);
    await client.uploadFrom(stream, `${id}/${dateString}.webp`);
  } catch (err) {
    console.log(err);
  }
  client.close();
  console.log("File uploading completed");
}

export async function POST(req: Request) {
  const data = await req.json();
  const url: string = data.url;
  const id: number = data.id;
  await testUpload(url, id);
  return NextResponse.json({});
}
