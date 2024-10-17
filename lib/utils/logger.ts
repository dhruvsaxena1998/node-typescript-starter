import { logger } from "hono-pino";
import { randomUUID } from "node:crypto";
import pino from "pino";

export type StreamArray<T = pino.Level> = (pino.DestinationStream | pino.StreamEntry<T>)[] | pino.DestinationStream | pino.StreamEntry<T>;

export function PinoLogger(level: pino.Level, streams: StreamArray) {
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

export function Logger(level: pino.Level, streams: StreamArray) {
  return pino(
    { name: "app-logs", level },
    pino.multistream(streams),
  );
}
