import type { z } from "@hono/zod-openapi";

import {
  datetime,
  int,
  mysqlTable,
  text,
  varchar,
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

const MAX_PASSWORD_LENGTH = 70;

export const users = mysqlTable("users", {
  id: int("id", { unsigned: true }).primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: text("password").notNull(),
  createdAt: datetime("created_at", { mode: "string" }).default("CURRENT_TIMESTAMP"),
});

export const selectUsersSchema = createSelectSchema(users);
export const selectUsersSchemaOpenAPI = selectUsersSchema.openapi({
  example: {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "super-secret-password",
    createdAt: new Date().toISOString(),
  },
});
export type SelectUsersSchema = z.infer<typeof selectUsersSchema>;

export const insertUsersSchema = createInsertSchema(users, {
  name: s => s.name.min(1),
  email: s => s.email.email(),
  password: s => s.password.min(1).max(MAX_PASSWORD_LENGTH),
})
  .required({ name: true })
  .omit({ id: true, createdAt: true });
export type InsertUsersSchema = z.infer<typeof insertUsersSchema>;
