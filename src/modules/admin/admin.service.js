import mongoose from "mongoose";
import adminDetails from "../../models/admin.mode.js";
import UserpersnalInformation from "../../models/detailModal.js";
import JobDetails from "../../models/job.model.js";
import jobdetailsField from "../../models/jobField.js";
import jobSectorField from "../../models/jobsector.js";
import TitlejobField from "../../models/jobTitle.js";
import jobTypeField from "../../models/jobType.js";
import PayrateField from "../../models/payrate.js";
import requiredCandidateField from "../../models/requiredUser.js";
import skillLevelField from "../../models/skillLevel.js";
import UserDetalis from "../../models/user.model.js";

// const ObjectId=

export const getJobHistory = async (id) => {
  const data = await JobDetails.aggregate([
    {
      $match: {
        superId: mongoose.Types.ObjectId(id),
      },
    },
    {
      $graphLookup: {
        from: "jobdetails",
        startWith: "$_id",
        connectFromField: "_id",
        connectToField: "parentId",
        as: "child",
      },
    },
  ]);
  return data;
};

export const signupAdmin = async (email, password) => {
  const data = { email, password };
  const sign = await adminDetails.create(data);
  return sign;
};

export const updatePassworded = async (_id, newPassword) => {
  const user = await adminDetails.findById({ _id });
  user.password = newPassword;
  await user.save();
  return user;
};

export const getalluser = async (role, limit, page) => {
  const skip = (page - 1) * limit;
  const data = await UserDetalis.aggregate([
    {
      $match: {
        $expr: {
          $eq: ["$role", role],
        },
      },
    },
    {
      $facet: {
        metadata: [{ $count: "total" }, { $addFields: { page: page } }],
        data: [{ $skip: skip }, { $limit: limit }],
      },
    },
    {
      $lookup: {
        from: UserpersnalInformation.collection.name,
        let: { id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$userId", "$$id"],
              },
            },
          },
        ],
        as: "employee",
      },
    },
  ]);

  return data;
};

export const singleUser = async (id) => {
  const temp = mongoose.Types.ObjectId(id);

  const data = await UserDetalis.aggregate([
    {
      $match: {
        _id: temp,
      },
    },
    {
      $lookup: {
        from: UserpersnalInformation.collection.name,
        let: { id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$userId", "$$id"],
              },
            },
          },
        ],
        as: "temp",
      },
    },
  ]);
  return { data };
};

export const editUserDetails = async (_id, data) => {
  const getSingle = await UserDetalis.findByIdAndUpdate(_id, data);
  return getSingle;
};

export const getStaffingRequest = async (isAproved, isDelete, page, limit) => {
  // console.log({ isAproved, isDelete, page, limit });
  let details;
  if (!isAproved || !isDelete || !page || !limit) {
    details = await JobDetails.find().count();
  } else {
    details = await JobDetails.find({
      isAproved: isAproved,
      isDelete: isDelete,
      page: page,
      limit: limit,
    }).populate("descriptionFileUpload");
  }

  return details;
};
export const getSingleStaffingRequest = async (id) => {
  const getStaffing = await JobDetails.findById({
    _id: id,
    isAproved: false,
  }).populate("descriptionFileUpload");
  return getStaffing;
};

export const editStaffingRequest = async (_id, data) => {
  const getStaffing = await JobDetails.findByIdAndUpdate(_id, data);
  return getStaffing;
};

export const adminjobTitleOption = async (data) => {
  const getStaffing = await TitlejobField.create(data);
  return getStaffing;
};

export const adminjobskillOption = async (data) => {
  const getStaffing = await skillLevelField.create(data);
  return getStaffing;
};

export const adminjobRequiredOption = async (data) => {
  const getStaffing = await requiredCandidateField.create(data);
  return getStaffing;
};
export const adminjobTypeOption = async (data) => {
  const getStaffing = await jobTypeField.create(data);
  return getStaffing;
};
export const adminjobPayrateOption = async (data) => {
  const getStaffing = await PayrateField.create(data);
  return getStaffing;
};
export const adminjobSectorOption = async (data) => {
  const getStaffing = await jobSectorField.create(data);
  return getStaffing;
};

export const userdelete = async (_id) => {
  const getStaffing = await UserDetalis.findByIdAndUpdate(_id, {
    isDelete: true,
  });
  return getStaffing;
};

export const markJobAproved = async (_id) => {
  const updatedjob = await JobDetails.findOneAndUpdate(
    {
      _id: _id,
    },
    {
      isApproved: true,
    }
  );

  return updatedjob;
};

export const deleteStaffingRequest = async (_id) => {
  const getStaffing = await JobDetails.findByIdAndUpdate(_id, {
    isDelete: true,
    isAproved: false,
  });
  return getStaffing;
};
