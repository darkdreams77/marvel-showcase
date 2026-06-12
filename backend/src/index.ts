import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { config } from "./config/env";

import charactersRoutes from "./routes/characters";
import comicsRoutes from "./routes/comics";
import authRoutes from "./routes/auth";
import favoritesRoutes from "./routes/favorites";

const app = express();
const PORT = config.port || 3000;

app.use(
  cors({
    origin: (origin, callback) => {
      // Autorise les appels sans origin (Postman, curl...)
      if (!origin || config.allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS bloqué pour : ${origin}`));
      }
    },
    credentials: true, // indispensable pour les cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(config.mongodbUri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.get("/api/health", (_req, res) => {
  res.status(200).json({ success: true, data: "Server is running" });
});

// ------ LOGIN ------ //
app.use("/api/user", authRoutes);

// ------ CHARACTERS ------ //
app.use("/api", charactersRoutes);

// ------ COMICS ------ //
app.use("/api", comicsRoutes);

// ------ FAVORITES ------ //
app.use("/api", favoritesRoutes);

app.all(/.*/, (req, res) => {
  res.status(400).json({ message: "Page not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
