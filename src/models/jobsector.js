import mongoose, { Schema } from "mongoose";
const jobSector = new Schema({
  jobSector: {
    type: String,
  },
});

const jobSectorField = mongoose.model("jobSectorField", jobSector);

export default jobSectorField;
