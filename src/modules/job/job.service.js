import mongoose from "mongoose";
import jobapply from "../../models/apllyjob.js";
import JobDetails from "../../models/job.model.js";
import jobSectorField from "../../models/jobsector.js";
import TitlejobField from "../../models/jobTitle.js";
import jobTypeField from "../../models/jobType.js";
// import jobdetailsField from "../../models/jobField.js";
import mediaDetalis from "../../models/media.js";
import PayrateField from "../../models/payrate.js";
import requiredCandidateField from "../../models/requiredUser.js";
import skillLevelField from "../../models/skillLevel.js";
import { bufferToFile } from "../../utils/bufferTofile.js";
import { mediaFolderPath } from "../../utils/constants/media.js";

export const createJob = async (data, req) => {
  let payload = {
    ...data,
  };

  try {
    if (payload.descriptionFileUpload) {
      const file = bufferToFile(
        payload.descriptionFileUpload,
        mediaFolderPath.folderPath
      );
      const media = await mediaDetalis.create({
        path: file.fileUrl,
        type: file.mimeType,
      });
      payload.descriptionFileUpload = media._id;
    }
    payload.userId = req.user._id;
    const job = await JobDetails.create(payload);
    const newJob = await JobDetails.findById(job._id).populate(
      "descriptionFileUpload"
    );
    console.log({ newJob });
    return newJob;
  } catch (error) {
    console.log({ error });
  }
};

export const deletejob = async (_id) => {
  const jobDelete = await JobDetails.findByIdAndUpdate(_id, {
    isDelete: true,
  });
  return jobDelete;
};

export const updatejob = async (_id, data) => {
  // from this we are preventing updated job to show on dashbaord
  const updated = await JobDetails.findByIdAndUpdate(_id, {
    isAproved: false,
  });
  // we need to create new entry to maintain job edit history
  const newJob = await JobDetails.create({
    ...data,
    parentId: _id,
    superId: updated.superId,
  });
  return newJob;
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

export const getSingleJob = async (id) => {
  const getSingle = await JobDetails.findById(id);
  return getSingle;
};

export const getAllJob = async (userID, page, limit, isAdmin) => {
  const skip = (page - 1) * limit;
  const query = { userId: userID, isDelete: false };
  if (!isAdmin) {
    query.isAproved = true;
  }
  const getSingle = await JobDetails.find({
    ...query,
  })
    .skip(skip)
    .limit(limit);
  const totalJobs = await JobDetails.find({ ...query }).count();
  return { jobs: getSingle, totalJobs };
};

export const showAllJob = async (page, limit) => {
  const skip = (page - 1) * limit;
  const query = { isAproved: true, isDelete: false };
  const getSingle = await JobDetails.find({
    ...query,
  })
    .skip(skip)
    .limit(limit);
  const totalJobs = await JobDetails.find({ ...query }).count();
  return { jobs: getSingle, totalJobs };
};

export const appliedJob = async (id) => {
  const response = jobapply.find({ userId: id });
  return response;
};

export const applyJob = async (userId, jobId) => {
  const appliedjob = await jobapply.create({ userId, jobId });
  return appliedjob;
};

export const guestapplyJob = async (id) => {
  const appliedjob = await jobapply.create(id);
  return appliedjob;
};

export const jobLocation = async (userId, jobId) => {
  const appliedjob = await jobapply.create({ userId, jobId });
  return appliedjob;
};

export const interestedJob = async (data) => {
  const appliedjob = console.log(data);
  return appliedjob;
};

export const jobTitleOption = async () => {
  const getStaffing = await TitlejobField.find();
  return getStaffing;
};

export const jobskillOption = async () => {
  const getStaffing = await skillLevelField.find();
  return getStaffing;
};

export const jobRequiredOption = async () => {
  const getStaffing = await requiredCandidateField.find();
  return getStaffing;
};
export const jobTypeOption = async () => {
  const getStaffing = await jobTypeField.find();
  return getStaffing;
};
export const jobPayrateOption = async () => {
  const getStaffing = await PayrateField.find();
  return getStaffing;
};
export const jobSectorOption = async () => {
  const getStaffing = await jobSectorField.find();
  return getStaffing;
};

// export const jobFiledDetails = async () => {
//   const getStaffing = await jobdetailsField.find();
//   return getStaffing;
// };
