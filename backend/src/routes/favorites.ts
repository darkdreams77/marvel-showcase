import express from "express";

// import { isAuthenticated } from "../middleware/isAuthenticated";
import { User } from "../models/User";
import { AuthRequest, requireAuth } from "../middleware/authRequest";

const router = express.Router();

router.get("/favorites", requireAuth, async (req: AuthRequest, res) => {
  console.log("route : GET /favorites");

  try {
    const user = await User.findById(req.userId);
    return res.status(200).json(user?.favorites);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ message });
  }
});

router.put(
  "/favorites/characters/:id",
  requireAuth,
  async (req: AuthRequest, res) => {
    console.log("route : PUT /favorites/characters/:id");

    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Bad request " });
      }

      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }

      if (user.favorites?.characters.includes(id)) {
        return res
          .status(400)
          .json({ message: "Character already in favorites characters" });
      }

      user.favorites?.characters.push(id);

      await user.save();

      return res.status(200).json(user.favorites?.characters);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ message });
    }
  },
);

router.delete(
  "/favorites/characters/:id",
  requireAuth,
  async (req: AuthRequest, res) => {
    console.log("route : DELETE /favorites/characters/:id");

    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Bad request " });
      }

      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }

      if (!user.favorites?.characters.includes(id)) {
        return res
          .status(400)
          .json({ message: "Character is not in favorites characters" });
      }

      const index = user.favorites.characters.indexOf(id);
      if (index > -1) {
        user.favorites.characters.splice(index, 1);
      }

      await user.save();

      return res.status(200).json(user.favorites?.characters);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ message });
    }
  },
);

router.put(
  "/favorites/comics/:id",
  requireAuth,
  async (req: AuthRequest, res) => {
    console.log("route : PUT /favorites/comics/:id");

    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Bad request " });
      }

      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }

      if (user.favorites?.comics.includes(id)) {
        return res
          .status(400)
          .json({ message: "Character already in favorites characters" });
      }

      user.favorites?.comics.push(id);

      await user.save();

      return res.status(200).json(user.favorites?.comics);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ message });
    }
  },
);

router.delete(
  "/favorites/comics/:id",
  requireAuth,
  async (req: AuthRequest, res) => {
    console.log("route : DELETE /favorites/comics/:id");

    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Bad request " });
      }

      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }

      if (!user.favorites?.comics.includes(id)) {
        return res
          .status(400)
          .json({ message: "Character is not in favorites comics" });
      }

      const index = user.favorites.comics.indexOf(id);
      if (index > -1) {
        user.favorites.comics.splice(index, 1);
      }

      await user.save();

      return res.status(200).json(user.favorites?.comics);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ message });
    }
  },
);

export default router;
