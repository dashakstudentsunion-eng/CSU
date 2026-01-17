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

export const unionContent = pgTable("union_content", {
  id: serial("id").primaryKey(),
  heading: text("heading").notNull().default("Connect With Union"),
  subtext: text("subtext").notNull().default("Express your best"),
  imageUrl: text("image_url").notNull().default("/images/caliph-20vollyball-20league.webp"),
  instagram: text("instagram").notNull().default("https://www.instagram.com/life.at.caliph/"),
  whatsapp: text("whatsapp").notNull().default("#"),
  email: text("email").notNull().default("mailto:contact@caliph.com"),
});

export const insertHeroImageSchema = createInsertSchema(heroImages);
export const insertUnionMessageSchema = createInsertSchema(unionMessages);
export const insertUnionContentSchema = createInsertSchema(unionContent);

export type HeroImage = typeof heroImages.$inferSelect;
export type InsertHeroImage = z.infer<typeof insertHeroImageSchema>;
export type UnionMessage = typeof unionMessages.$inferSelect;
export type InsertUnionMessage = z.infer<typeof insertUnionMessageSchema>;
export type UnionContent = typeof unionContent.$inferSelect;
export type InsertUnionContent = z.infer<typeof insertUnionContentSchema>;
