import { testClient } from "hono/testing";
import { describe, expect, it } from "vitest";

import createApp from "@/lib/utils/create-app";

import UserRouter from "./index";

describe("[user]", () => {
  it("should respond with an array", async () => {
    const client = testClient(createApp().route("/", UserRouter));

    const result = await client.users.$get();
    const json = await result.json();

    expect(json.success).toBe(true);
    expect(json.data.length).toBeGreaterThanOrEqual(0);
  });
});
