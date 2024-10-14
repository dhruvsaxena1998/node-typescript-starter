import { createRouter } from "@lib/utils/create-app";

import * as handlers from "./workflow.handler";
import * as routes from "./workflow.route";

const WorkflowRouter = createRouter().openapi(routes.post, handlers.post);

export default WorkflowRouter;
