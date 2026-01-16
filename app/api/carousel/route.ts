import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { carouselImages } from "@/shared/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const images = await db.select().from(carouselImages);
    return NextResponse.json(images);
  } catch (error) {
    console.error("GET Carousel Error:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    const [newImage] = await db.insert(carouselImages).values({ url }).returning();
    return NextResponse.json(newImage);
  } catch (error) {
    console.error("POST Carousel Error:", error);
    return NextResponse.json({ error: "Failed to save image" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await db.delete(carouselImages).where(eq(carouselImages.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE Carousel Error:", error);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
