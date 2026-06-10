import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const config = {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI!,
  marvelApiKey: process.env.MARVEL_APIKEY!,
  marvelURL: process.env.MARVEL_API_URL!,
  originURL: process.env.ORIGIN_URL!,
} as const;
