import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema({
  email: String,
  username: String,
  token: String,
  hash: String,
  salt: String,
  favorites: {
    characters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Characters",
      },
    ],
    comics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comics",
      },
    ],
  },
});

export const User = mongoose.model("User", userSchema);
