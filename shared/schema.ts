import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const carouselImages = pgTable("carousel_images", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCarouselImageSchema = createInsertSchema(carouselImages);

export type CarouselImage = typeof carouselImages.$inferSelect;
export type InsertCarouselImage = z.infer<typeof insertCarouselImageSchema>;
