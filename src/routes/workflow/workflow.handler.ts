import type { AppRouteHandler } from "@lib/@types/app";

import type { WorkflowPostRoute } from "./workflow.route";

export const post: AppRouteHandler<WorkflowPostRoute> = async (c) => {
  return c.json({
    response: {

    },
  });
};
