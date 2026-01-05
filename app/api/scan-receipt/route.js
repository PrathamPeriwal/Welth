import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { base64, mimeType = "image/jpeg" } = body;

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Analyze this receipt image and extract the following information in JSON format:
- Total amount
- Date (ISO format)
- Description
- Merchant name
- Category

Respond ONLY with valid JSON.
`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64,
          mimeType,
        },
      },
    ]);

    const text = result.response.text();
    const cleaned = text.replace(/```(?:json)?|```/g, "").trim();

    return NextResponse.json(JSON.parse(cleaned || "{}"));
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Gemini error" },
      { status: 500 }
    );
  }
}
