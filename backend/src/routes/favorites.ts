import express from "express";

import { User } from "../models/User";
import { AuthRequest, requireAuth } from "../middleware/authRequest";
import { Favorite } from "../models/Favorite";

const router = express.Router();

router.get("/", requireAuth, async (req: AuthRequest, res) => {
  const { type } = req.query;

  const query = {
    userId: req.userId,
    ...(type ? { type } : {}),
  };

  const favorites = await Favorite.find(query).sort({ createdAt: -1 });

  res.json({ success: true, data: favorites });
});

router.post("/", requireAuth, async (req: AuthRequest, res) => {
  const { externalId, type, name, thumbnailUrl } = req.body;

  try {
    const favorite = await Favorite.create({
      userId: req.userId,
      externalId,
      type,
      name,
      thumbnailUrl,
    });

    await favorite.save();

    res.status(201).json({ success: true, data: favorite });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message });
  }
  // return res.status(409).json({ success: false, error: "Déjà en favoris" });
  // }
});

router.delete(
  "/:type/:externalId",
  requireAuth,
  async (req: AuthRequest, res) => {
    try {
      const { externalId, type } = req.params;

      const favorite = await Favorite.findOneAndDelete({
        userId: req.userId,
        externalId,
        type,
      });

      if (!favorite) {
        return res.status(400).json({ message: `${type} is not a favorite` });
      }

      res.status(200).json({ success: true, data: `${type} deleted` });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      res.status(500).json({ message });
    }
  },
);

export default router;
