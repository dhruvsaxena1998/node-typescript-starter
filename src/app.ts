import { Hono } from "hono";

import { notFound, onError } from "@/lib/middlewares";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.notFound(notFound);
app.onError(onError);

export { app };
