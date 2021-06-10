import express from "express";

import cors from "cors";
import Routes from "./routes";

import apiErrorHandler from "./helpers/apiErrorHandler";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// Routes
app.use(Routes);
app.use("/public", express.static("public/"));

/*
 * Keep error-handler as last middleware
 */
app.use(apiErrorHandler);

export default app;
