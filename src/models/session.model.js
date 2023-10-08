import mongoose, { Schema } from "mongoose";
const session = new Schema({
  ipAddress: {
    type: String,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userAgent: {
    type: String,
  },
  userId: {
    type: String,
  },
});
const sessionDetalis = mongoose.model("session", session);
export default sessionDetalis;
