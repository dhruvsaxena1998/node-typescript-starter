import type { z } from "zod";

import { sql } from "drizzle-orm";
import { bigint, datetime, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = mysqlTable("users", {
  id: bigint("id", { mode: "bigint", unsigned: true }).primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: text("password").notNull(),
  createdAt: datetime("created_at", { mode: "string" }).default(sql`CURRENT_TIMESTAMP`),
});

export const selectUsersSchema = createSelectSchema(users);
export type SelectUsersSchema = z.infer<typeof selectUsersSchema>;

export const insertUsersSchema = createInsertSchema(users);
export type InsertUsersSchema = z.infer<typeof insertUsersSchema>;
