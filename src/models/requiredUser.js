import mongoose, { Schema } from "mongoose";
const Requiredno = new Schema({
  requiredCandidate: {
    type: String,
  },
});

const requiredCandidateField = mongoose.model(
  "requiredCandidateField",
  Requiredno
);

export default requiredCandidateField;
