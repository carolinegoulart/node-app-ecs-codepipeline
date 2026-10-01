import express from "express";
import "dotenv/config";
import routes from "./routes/index.js";
import { errorHandler, notFound } from "./middlewares/error.js";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.get("/", (_req, res) => res.json({ status: "Base path" }));
app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;