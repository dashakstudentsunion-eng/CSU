import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { unionContent } from "@/shared/schema";

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
    const content = await db.select().from(unionContent).limit(1);
    
    if (content.length === 0) {
      const [newContent] = await db.insert(unionContent).values(body).returning();
      return NextResponse.json(newContent);
    } else {
      const [updatedContent] = await db.update(unionContent)
        .set(body)
        .where(db.select({ id: unionContent.id }).from(unionContent).limit(1))
        .returning();
      return NextResponse.json(updatedContent);
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
