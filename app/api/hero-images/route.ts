import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { heroImages } from "@/shared/schema";
import { eq, asc } from "drizzle-orm";

export async function GET() {
  try {
    const images = await db.select().from(heroImages).orderBy(asc(heroImages.position));
    return NextResponse.json(images);
  } catch (error) {
    console.error("GET Hero Images Error:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { url, position } = await request.json();
    
    // Position should be 0, 1, or 2
    if (typeof position !== 'number' || position < 0 || position > 2) {
       return NextResponse.json({ error: "Invalid position" }, { status: 400 });
    }

    const existing = await db.select().from(heroImages).where(eq(heroImages.position, position)).limit(1);
    
    if (existing.length > 0) {
      const [updated] = await db.update(heroImages)
        .set({ url })
        .where(eq(heroImages.position, position))
        .returning();
      return NextResponse.json(updated);
    } else {
      const [inserted] = await db.insert(heroImages)
        .values({ url, position })
        .returning();
      return NextResponse.json(inserted);
    }
  } catch (error) {
    console.error("POST Hero Images Error:", error);
    return NextResponse.json({ error: "Failed to save image" }, { status: 500 });
  }
}
