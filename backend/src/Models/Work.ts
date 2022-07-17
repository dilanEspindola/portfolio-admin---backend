import mongoose, { Schema, model } from "mongoose";
import { WorkSchema } from "../interfaces/interfaces";

const workSchema = new Schema<WorkSchema>(
  {
    projectName: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    image: {
      type: String,
      trim: true,
      required: true,
    },
    pageUrl: {
      type: String,
    },
    gitHubUrl: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { versionKey: false }
);

export default model("works", workSchema);
