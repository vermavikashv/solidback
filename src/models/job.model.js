import mongoose, { Schema } from "mongoose";
import mediaDetalis from "./media.js";
import UserDetalis from "./user.model.js";

const job = new Schema(
  {
    name: { type: String },
    jobLocation: { type: String },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
      },
    },
    jobTitle: { type: String },
    skillLevel: { type: String },
    requiredCandidate: { type: String },
    description: { type: String },
    descriptionFileUpload: {
      type: Schema.Types.ObjectId,
      ref: mediaDetalis.collection.name,
    },
    startDate: { type: String },
    endDate: { type: String },
    duration: { type: String },
    orderNo: { type: String },
    aboutCompany: { type: String },
    orderNo: { type: Number },

    userId: {
      type: Schema.Types.ObjectId,
      ref: UserDetalis.collection.name,
    },
    sector: {
      type: String,
    },
    payRate: {
      type: Number,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    isAproved: {
      type: Boolean,
      default: false,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    superId: {
      type: Schema.Types.ObjectId,
      default: function () {
        return this._id;
      },
    },
  },
  {
    timestamps: true,
  }
);

job.pre("save", async function (next) {
  const doc = this;
  const x = 10000;
  const isParentPresent = await JobDetails.findOne({
    superId: doc.superId,
  });
  if (isParentPresent) {
    doc.orderNo = isParentPresent.orderNo;
    next();
    return;
  }
  const lastJob = await JobDetails.find({})
    .sort({
      createdAt: -1,
    })
    .limit(1);

  if (lastJob.length) {
    doc.orderNo = lastJob[0].orderNo + 1;
  } else {
    doc.orderNo = x;
  }
  next();
});

const JobDetails = mongoose.model("JobDetails", job);
export default JobDetails;
