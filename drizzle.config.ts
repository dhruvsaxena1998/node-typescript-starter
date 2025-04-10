import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
import { env } from "node:process";

config({
  path: "./.env",
});

export default defineConfig({
  dialect: "mysql",
  schema: "./src/database/schema/*",
  out: "./.drizzle",
  dbCredentials: {
    host: "localhost",
    port: 3306,
    user: env.MYSQL_USER!,
    password: env.MYSQL_PASSWORD!,
    database: env.MYSQL_DATABASE!,
  },
  migrations: {
    table: "__drizzle_migrations",
  },
});
