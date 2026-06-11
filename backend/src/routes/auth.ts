import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";

import { User } from "../models/User";
import { config } from "../config/env";
import { AuthRequest, requireAuth } from "../middleware/authRequest";

const router = express.Router();

// router.post("/user/signup", async (req, res) => {
//   console.log("route : POST /user/signup");

//   try {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "Username missing" });
//     }

//     const isUserExisting = await User.findOne({ email });

//     if (isUserExisting) {
//       res.status(400).json({ message: "User already existing" });
//     } else {
//       const salt = uid(16);
//       const token = uid(64);

//       const saltedPassword = password + salt;
//       const hash = sha256(saltedPassword);

//       const encodedHash = Base64.stringify(hash);

//       const user = new User({
//         email,
//         username,
//         token,
//         hash: encodedHash,
//         salt,
//       });

//       await user.save();

//       const returnedResponse = {
//         username: user.username,
//         token: user.token,
//         _id: user._id,
//       };

//       res.status(201).json(returnedResponse);
//     }
//   } catch (error) {
//     const message = error instanceof Error ? error.message : String(error);
//     res.status(500).json({ message });
//   }
// });

// router.post("/user/login", async (req, res) => {
//   console.log("route : POST /user/login");

//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (user) {
//       const { salt, hash } = user;

//       const saltedPassword = password + salt;
//       const shaHash = sha256(saltedPassword);
//       const newHash = Base64.stringify(shaHash);

//       if (newHash === hash) {
//         const returnedResponse = {
//           _id: user.id,
//           token: user.token,
//           username: user.username,
//         };

//         res.status(200).json(returnedResponse);
//       } else {
//         res.status(401).json({ message: "Wrong email or password" });
//       }
//     } else {
//       res.status(401).json({ message: "User is not existing" });
//     }
//   } catch (error) {
//     const message = error instanceof Error ? error.message : String(error);
//     res.status(500).json({ message });
//   }
// });

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
  const { username, email, password } = req.body;

  const user = await User.findOne({ username, email });
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
    httpOnly: true, // inaccessible au JS côté client
    secure: config.nodeEnv === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours en ms
  });

  res.json({
    success: true,
    data: { username: user.username, email: user.email },
  });
});

router.post("/logout", (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict",
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
  res.json({ success: true, data: { email: user.email } });
});

export default router;
