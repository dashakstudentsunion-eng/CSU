import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const carouselImages = pgTable("carousel_images", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const heroImages = pgTable("hero_images", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  position: integer("position").notNull(), // 0, 1, or 2
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCarouselImageSchema = createInsertSchema(carouselImages);
export const insertHeroImageSchema = createInsertSchema(heroImages);

export type CarouselImage = typeof carouselImages.$inferSelect;
export type InsertCarouselImage = z.infer<typeof insertCarouselImageSchema>;
export type HeroImage = typeof heroImages.$inferSelect;
export type InsertHeroImage = z.infer<typeof insertHeroImageSchema>;
