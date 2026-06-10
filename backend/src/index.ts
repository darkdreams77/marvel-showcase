import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { config } from "./config/env";

import charactersRoutes from "./routes/characters";
import comicsRoutes from "./routes/comics";
import loginRoutes from "./routes/login";

const app = express();
const PORT = config.port || 3000;

app.use(cors({ origin: config.originURL }));
app.use(express.json());

mongoose
  .connect(config.mongodbUri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.get("/api/health", (_req, res) => {
  res.status(200).json({ success: true, data: "Server is running" });
});

// ------ LOGIN ------ //
app.use(loginRoutes);

// ------ CHARACTERS ------ //
app.use(charactersRoutes);

// ------ COMICS ------ //
app.use(comicsRoutes);

app.all(/.*/, (req, res) => {
  res.status(400).json({ message: "Page not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
