import mongoose, { Schema } from "mongoose";
const jobField = new Schema({
  jobTitle: {
    type: String,
  },
  skillLevel: {
    type: String,
  },
  noRequried: {
    type: String,
  },
  jobType: {
    type: String,
  },
  payRate: {
    type: String,
  },
  jobsector: {
    type: String,
  },
});

const jobdetailsField = mongoose.model("jobfieldDetails", jobField);

export default jobdetailsField;
