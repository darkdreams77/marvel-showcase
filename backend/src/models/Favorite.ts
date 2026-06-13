import mongoose from "mongoose";

export type FavoriteType = "character" | "comic";

export interface IFavorite {
  userId: mongoose.Types.ObjectId;
  externalId: string;
  type: FavoriteType;
  name: string;
  thumbnailUrl?: string;
  createdAt: Date;
}

const favoriteSchema = new mongoose.Schema<IFavorite>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    externalId: { type: String, required: true },
    type: {
      type: String,
      enum: ["character", "comic"],
      required: true,
    },
    name: { type: String, required: true },
    thumbnailUrl: { type: String },
  },
  { timestamps: true },
);

favoriteSchema.index({ userId: 1, externalId: 1, type: 1 }, { unique: true });

export const Favorite = mongoose.model<IFavorite>("Favorite", favoriteSchema);
