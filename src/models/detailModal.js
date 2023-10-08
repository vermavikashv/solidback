import mongoose, { Schema } from "mongoose";

const userPersnalDetails = new Schema(
  {
    gender: {
      type: String,
    },
    province: { type: String },
    city: { type: String },
    transport: { type: String },
    constructionExperince: { type: String },
    startwork: { type: String },
    isGuest: { type: Boolean, default: false },
    resume: { type: String },
    companyName: { type: String },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "UserDetali",
      required: true,
    },
    favourite: [],
  },
  {
    timestamps: true,
  }
);

const UserpersnalInformation = mongoose.model(
  "UserpersnalInformation",
  userPersnalDetails
);

export default UserpersnalInformation;
