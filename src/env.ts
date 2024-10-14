import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { env } from "node:process";
import { z } from "zod";

expand(config());

const EnvSchema = z.object({
  NODE_ENV: z.enum(["dev", "stage", "uat", "preprod", "prod"]).default("dev"),

  // eslint-disable-next-line no-magic-numbers
  SERVER_PORT: z.coerce.number().default(3000),

  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("debug"),
});

export type ENV = z.infer<typeof EnvSchema>;

// eslint-disable-next-line import/no-mutable-exports, ts/no-redeclare
let ENV: ENV;

try {
  ENV = EnvSchema.parse(env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error("❌ Invalid .env file");
    console.error(error.flatten()?.fieldErrors);

    process.exit(1);
  }
}

// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
export default ENV;
