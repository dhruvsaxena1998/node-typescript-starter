import { logger } from "hono-pino";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { cwd } from "node:process";
import pino from "pino";
import pretty from "pino-pretty";
import { createStream } from "rotating-file-stream";

const logFileStream = createStream("combined.log", {
  interval: "1d",
  compress: "gzip",
  path: path.join(cwd(), "logs"),
});

const errorFileStream = createStream("error.log", {
  interval: "1d",
  compress: "gzip",
  path: path.join(cwd(), "logs"),
});

const streams = [
  { stream: pretty() },
  { stream: logFileStream },
  { stream: errorFileStream, level: "error" },
];

export function PinoLogger(level: pino.Level) {
  return logger({
    pino: pino(
      {
        level,
        name: "request-logs",
      },
      pino.multistream(streams),
    ),
    http: {
      reqId: () => randomUUID(),
    },
  });
}

export function Logger(level: pino.Level) {
  return pino(
    { name: "app-logs", level },
    pino.multistream(streams),
  );
}
