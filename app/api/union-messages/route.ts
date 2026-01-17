import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { unionMessages } from "@/shared/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const messages = await db.select().from(unionMessages).orderBy(desc(unionMessages.createdAt));
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const [newMessage] = await db.insert(unionMessages).values({
      name: body.name,
      phone: body.phone,
      email: body.email,
      batch: body.batch,
    }).returning();
    return NextResponse.json(newMessage);
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit message" }, { status: 500 });
  }
}
