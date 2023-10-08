import mongoose, { Schema } from "mongoose";
import JobDetails from "./job.model.js";
import UserDetalis from "./user.model.js";
const applyjob = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: UserDetalis.collection.name,
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: JobDetails.collection.name,
  },
  isWithdraw: {
    type: Boolean,
    default: false,
  },
});
const jobapply = mongoose.model("applyjob", applyjob);
export default jobapply;
