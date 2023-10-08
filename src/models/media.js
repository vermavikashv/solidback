import mongoose, { Schema } from "mongoose";

const media = new Schema(
  {
    path: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const mediaDetalis = mongoose.model("media", media);

export default mediaDetalis;
