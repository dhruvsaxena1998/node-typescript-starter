import { OpenAPIHono } from "@hono/zod-openapi";

import { notFound, onError } from "@/lib/middlewares";

const app = new OpenAPIHono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.notFound(notFound);
app.onError(onError);

export { app };
