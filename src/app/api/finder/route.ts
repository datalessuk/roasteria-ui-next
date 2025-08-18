export const runtime = "nodejs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/utils/supabase/server";
import * as cheerio from "cheerio";
import { ICoffeeImport } from "@/types/import";

import fetch from "node-fetch";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const isValidImageUrl = (url: string) =>
  typeof url === "string" && /^https?:\/\//.test(url);

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { url } = await req.json();
  if (!url)
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });

  let html;
  try {
    const res = await fetch(url);
    html = await res.text();
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch page" },
      { status: 500 }
    );
  }

  const $ = cheerio.load(html);
  const textContent = $("body").text().replace(/\s+/g, " ").trim();

  let imageUrl =
    $('meta[property="og:image"]').attr("content") ||
    $(".product-image img").first().attr("src") ||
    $("img").first().attr("src") ||
    null;

  if (imageUrl && !imageUrl.startsWith("http")) {
    const baseUrl = new URL(url);
    imageUrl = `${baseUrl.origin}${imageUrl}`;
  }

  const prompt = `
You are a coffee expert. Extract coffee products from the following page text.
For each unique coffee product, return a JSON object with:
- name
- description
- tastingNotes
- origin
- roast
- processingMethod
- image (must be a valid URL)

Ignore menus, ads, headers, footers, subscription prompts, and different size variations.
Return a JSON array only.

Page text:
${textContent}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a helpful coffee product extractor.",
      },
      { role: "user", content: prompt },
    ],
  });

  const answer = completion.choices[0]?.message?.content || "";

  try {
    const cleaned = answer
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const parsed = JSON.parse(cleaned);

    if (Array.isArray(parsed) && parsed.length > 0) {
      const item = parsed[0];

      const finalImage = isValidImageUrl(item.image) ? item.image : imageUrl;

      const coffeeData: ICoffeeImport = {
        name: item.name || "",
        description: item.description || "",
        tastingNotes: Array.isArray(item.tastingNotes)
          ? item.tastingNotes.join(", ")
          : String(item.tastingNotes || "")
              .split(/\s*[,/]\s*/) // split by comma or slash
              .join(", "), // join with comma
        origin: item.origin || "",
        roast: item.roast || "",
        processingMethod: item.processingMethod || "",
        image: finalImage || "",
        singleOrigin:
          /single origin/i.test(item.origin) ||
          (item.origin && item.origin.split(/,|\//).length === 1),
      };

      return NextResponse.json(coffeeData);
    } else {
      return NextResponse.json({ error: "No coffee found", raw: answer });
    }
  } catch {
    return NextResponse.json({
      error: "Failed to parse AI output",
      raw: answer,
    });
  }
}
