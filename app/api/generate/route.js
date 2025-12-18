export const runtime = "nodejs";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing in environment variables");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const data = await req.json();
    const prompt = data.body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Missing 'body' field in request JSON" },
        { status: 400 }
      );
    }

    const result = await model.generateContent(prompt);
    const output = result.response.text();

    return NextResponse.json({ output });
  } catch (error) {
    return NextResponse.json(
      // { error: error.message || "Unknown error" },
      // { status: 500 }
      null
    );
  }
};