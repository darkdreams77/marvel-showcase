import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  username: string;
  email: string;
  password: string;
  favorites: {
    characters: string[];
    comics: string[];
  };
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: {
    characters: { type: Array, required: false },
    comics: { type: Array, required: false },
  },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

export const User = mongoose.model<IUser>("User", userSchema);
