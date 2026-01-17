import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { unionContent } from "@/shared/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const content = await db.select().from(unionContent).limit(1);
    if (content.length === 0) {
      const [defaultContent] = await db.insert(unionContent).values({
        heading: "Connect With Union",
        subtext: "Express your best",
        imageUrl: "/images/caliph-20vollyball-20league.webp",
        instagram: "https://www.instagram.com/life.at.caliph/",
        whatsapp: "#",
        email: "contact@caliph.com",
      }).returning();
      return NextResponse.json(defaultContent);
    }
    return NextResponse.json(content[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const existingContent = await db.select().from(unionContent).limit(1);
    
    if (existingContent.length === 0) {
      const [newContent] = await db.insert(unionContent).values(body).returning();
      return NextResponse.json(newContent);
    } else {
      const [updatedContent] = await db.update(unionContent)
        .set(body)
        .where(eq(unionContent.id, existingContent[0].id))
        .returning();
      return NextResponse.json(updatedContent);
    }
  } catch (error) {
    console.error("Content update error:", error);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
