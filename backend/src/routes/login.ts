import express from "express";
import uid from "uid2";
import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";

import { User } from "../models/User";

const router = express.Router();

router.post("/user/signup", async (req, res) => {
  console.log("route : POST /user/signup");

  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username missing" });
    }

    const isUserExisting = await User.findOne({ email });

    if (isUserExisting) {
      res.status(400).json({ message: "User already existing" });
    } else {
      const salt = uid(16);
      const token = uid(64);

      const saltedPassword = password + salt;
      const hash = sha256(saltedPassword);

      const encodedHash = Base64.stringify(hash);

      const user = new User({
        email,
        username,
        token,
        hash: encodedHash,
        salt,
      });

      await user.save();

      const returnedResponse = {
        username: user.username,
        token: user.token,
        _id: user._id,
      };

      res.status(200).json(returnedResponse);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message });
  }
});

router.post("/user/login", async (req, res) => {
  console.log("route : POST /user/login");

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const { salt, hash } = user;

      const saltedPassword = password + salt;
      const shaHash = sha256(saltedPassword);
      const newHash = Base64.stringify(shaHash);

      if (newHash === hash) {
        const returnedResponse = {
          _id: user.id,
          token: user.token,
          username: user.username,
        };

        res.status(200).json(returnedResponse);
      } else {
        res.status(401).json({ message: "Wrong email or password" });
      }
    } else {
      res.status(401).json({ message: "User is not existing" });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message });
  }
});

export default router;
