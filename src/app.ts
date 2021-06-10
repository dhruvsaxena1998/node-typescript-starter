import express from "express";

import cors from "cors";
import Routes from "./routes";

import apiErrorHandler from "./helpers/apiErrorHandler";

const app = express();
app.use(express.json());
app.use(cors());
app.use(Routes);
app.use("/public", express.static("public/"));

/*
 * Keep error-handler as last middleware
 */
app.use(apiErrorHandler);

export default app;
