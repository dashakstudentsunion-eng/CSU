import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const heroImages = pgTable("hero_images", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  position: integer("position").notNull(), // 0, 1, or 2
  createdAt: timestamp("created_at").defaultNow(),
});

export const unionMessages = pgTable("union_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  batch: text("batch").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertHeroImageSchema = createInsertSchema(heroImages);
export const insertUnionMessageSchema = createInsertSchema(unionMessages);

export type HeroImage = typeof heroImages.$inferSelect;
export type InsertHeroImage = z.infer<typeof insertHeroImageSchema>;
export type UnionMessage = typeof unionMessages.$inferSelect;
export type InsertUnionMessage = z.infer<typeof insertUnionMessageSchema>;
