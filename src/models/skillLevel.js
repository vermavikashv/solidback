import mongoose, { Schema } from "mongoose";
const skillLevel = new Schema({
  skillLevel: {
    type: String,
  },
});

const skillLevelField = mongoose.model("skillLevelField", skillLevel);

export default skillLevelField;
