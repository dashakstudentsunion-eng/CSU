import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const heroImages = pgTable("hero_images", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  position: integer("position").notNull(), // 0, 1, or 2
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertHeroImageSchema = createInsertSchema(heroImages);

export type HeroImage = typeof heroImages.$inferSelect;
export type InsertHeroImage = z.infer<typeof insertHeroImageSchema>;
