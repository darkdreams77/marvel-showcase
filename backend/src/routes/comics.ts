import express from "express";

import {
  ComicsType,
  PreviewComicType,
} from "@marvel-showcase/shared/src/comics";
import { CompleteCharacterType } from "@marvel-showcase/shared/src/characters";

import { apiGet, apiGetPaginated } from "../lib/axios";
import { config } from "../config/env";

const router = express.Router();

const API_KEY = config.marvelApiKey;

router.get("/comics", async (req, res) => {
  console.log("route : GET /comics");

  try {
    const { page, limit, title } = req.query;
    const defaultLimit = Number(limit) || 100;

    const skip = defaultLimit * (Number(page) - 1);

    let filters = "";
    if (title) filters += `&title=${title}`;
    if (page) filters += `&skip=${skip}`;
    if (limit) filters += `&limit=${limit}`;

    const data = await apiGetPaginated<ComicsType>(
      `/comics?apiKey=${API_KEY}${filters}`,
    );

    res.status(200).json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  console.log("route : GET /comics/:characterId");

  try {
    const { characterId } = req.params;

    const data = await apiGetPaginated<CompleteCharacterType>(
      `/comics/${characterId}?apiKey=${API_KEY}`,
    );
    res.status(200).json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message });
  }
});

router.get("/comic/:id", async (req, res) => {
  console.log("route : GET /comic/:id");

  try {
    const { id } = req.params;

    const data = await apiGet<PreviewComicType>(
      `/comic/${id}?apiKey=${API_KEY}`,
    );
    res.status(200).json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message });
  }
});

export default router;
