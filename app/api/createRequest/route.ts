import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await axios.post(
    "https://www.wasenderapi.com/api/send-message",
    body,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.WASENDERAPI_KEY}`,
      },
    }
  );

  return NextResponse.json(res.data);
}
