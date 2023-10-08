import mongoose, { Schema } from "mongoose";
const jobType = new Schema({
  jobType: {
    type: String,
  },
});

const jobTypeField = mongoose.model("jobTypeField", jobType);

export default jobTypeField;
