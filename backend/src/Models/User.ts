import mongoose, { Schema, model } from "mongoose";
import { UserSchema } from "../interfaces/interfaces";

const userSchema = new Schema<UserSchema>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    works: [
      {
        type: mongoose.Types.ObjectId,
        ref: "works",
      },
    ],
  },
  {
    versionKey: false,
  }
);

export default model("users", userSchema);
