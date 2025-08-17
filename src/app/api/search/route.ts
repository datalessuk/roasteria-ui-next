// /app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";
import { ICoffee } from "@/types/coffee";

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient();
    const url = new URL(req.url);

    const name = url.searchParams.get("name") || undefined;
    const processing = url.searchParams.get("processing_method") || undefined;
    const roast = url.searchParams.get("roast") || undefined;
    const origin = url.searchParams.get("origin");
    const tasting_notes = url.searchParams.getAll("tasting_notes");
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("approved_coffees")
      .select(
        "id, name, description, roast_level, processing_method, single_origin, tasting_notes, image_url, url",
        { count: "exact" }
      );

    if (tasting_notes.length)
      query = query.overlaps("tasting_notes", tasting_notes);
    if (name) query = query.ilike("name", `%${name}%`);
    if (processing) query = query.ilike("processing_method", `%${processing}%`);
    if (roast) query = query.ilike("roast_level", `%${roast}%`);
    if (origin) query = query.eq("single_origin", origin === "true");

    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({
      data: data as ICoffee[],
      page,
      limit,
      total: count,
      totalPages: count ? Math.ceil(count / limit) : 0,
    });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
