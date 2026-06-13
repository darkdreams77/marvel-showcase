import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";

import { User } from "../models/User";
import { config } from "../config/env";
import { AuthRequest, requireAuth } from "../middleware/authRequest";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res
      .status(409)
      .json({ success: false, error: "Email déjà utilisé" });
  }

  const user = await User.create({ username, email, password });

  const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    data: { username: user.username, email: user.email },
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(401)
      .json({ success: false, error: "Identifiants invalides" });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res
      .status(401)
      .json({ success: false, error: "Identifiants invalides" });
  }

  const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    data: { email: user.email },
  });
});

router.post("/logout", (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "lax",
  });
  res.json({ success: true });
});

router.get("/me", requireAuth, async (req: AuthRequest, res) => {
  const user = await User.findById(req.userId).select("-password");

  if (!user) {
    return res
      .status(404)
      .json({ success: false, error: "Utilisateur introuvable" });
  }
  res.json({
    success: true,
    data: { email: user.email, favorites: user.favorites },
  });
});

export default router;
