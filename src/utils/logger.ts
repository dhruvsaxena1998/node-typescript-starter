import type { StreamArray } from "@lib/utils/logger";

import { Logger, PinoLogger } from "@lib/utils/logger";
import ENV from "#env";
import { join } from "node:path";
import { cwd } from "node:process";
import pretty from "pino-pretty";
import { createStream } from "rotating-file-stream";

const logFileStream = createStream("combined.log", {
  interval: "1d",
  compress: "gzip",
  path: join(cwd(), "logs"),
});

const errorFileStream = createStream("error.log", {
  interval: "1d",
  compress: "gzip",
  path: join(cwd(), "logs"),
});

const streams: StreamArray = [
  { stream: pretty(), level: "debug" },
  { stream: logFileStream },
  { stream: errorFileStream, level: "error" },
];

export const logger = Logger(ENV.LOG_LEVEL, streams);
export const pinoHttpLogger = () => PinoLogger(ENV.LOG_LEVEL, streams);
