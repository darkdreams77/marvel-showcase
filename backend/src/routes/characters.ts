import express from "express";

import {
  CharactersType,
  PreviewCharacterType,
} from "@marvel-showcase/shared/src/characters";

import { apiGet, apiGetPaginated } from "../lib/axios";
import { config } from "../config/env";

const router = express.Router();

const API_KEY = config.marvelApiKey;

router.get("/characters", async (req, res) => {
  console.log("route : GET /characters");

  try {
    const { page, limit, name } = req.query;
    const defaultLimit = Number(limit) || 100;

    const skip = defaultLimit * (Number(page) - 1);

    let filters = "";
    if (name) filters += `&name=${name}`;
    if (page) filters += `&skip=${skip}`;
    if (limit) filters += `&limit=${limit}`;

    const data = await apiGetPaginated<CharactersType>(
      `/characters?apiKey=${API_KEY}${filters}`,
    );

    res.status(200).json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message });
  }
});

router.get("/character/:id", async (req, res) => {
  console.log("route : GET /character/:id");

  try {
    const { id } = req.params;

    const data = await apiGet<PreviewCharacterType>(
      `/character/${id}?apiKey=${API_KEY}`,
    );
    res.status(200).json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message });
  }
});

export default router;
