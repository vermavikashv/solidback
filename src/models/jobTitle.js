import mongoose, { Schema } from "mongoose";
const jobTitle = new Schema({
  jobTitle: {
    type: String,
  },
});

const TitlejobField = mongoose.model("titlejobField", jobTitle);

export default TitlejobField;
