import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";
import { mediaResponse } from "../../utils/constants/media.js";

const createJobSchema = z.object({
  name: z.string().optional(),
  jobLocation: z.string().optional(),
  location: z
    .object({
      coordinates: z.array(z.number()),
    })
    .optional(),
  description: z.string().optional(),
  descriptionFileUpload: z.any().optional(),
  jobTitle: z.string().optional(),
  skillLevel: z.string().optional(),
  requiredCandidate: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  duration: z.string().optional(),
});

const createJobResponseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  jobLocation: z.string(),
  location: z
    .object({
      coordinates: z.array(z.number()),
    })
    .optional(),
  description: z.string().optional(),
  jobTitle: z.string(),
  skillLevel: z.string(),
  requiredCandidate: z.string(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  duration: z.string().optional(),
  aboutCompany: z.string().optional(),
  descriptionFileUpload: z.object(mediaResponse).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const getJobResponseSchema = z.array(
  z.object({
    _id: z.string(),
    name: z.string(),
    jobLocation: z.string(),
    location: z
      .object({
        coordinates: z.array(z.number()),
      })
      .optional(),
    description: z.string().optional(),
    jobTitle: z.string(),
    skillLevel: z.string(),
    requiredCandidate: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    duration: z.string(),
    aboutCompany: z.string().optional(),
    descriptionFileUpload: z.object(mediaResponse).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
);
const deleteSchema = z.object({
  message: z.string().optional(),
});

const updateSchema = z.object({
  name: z.string().optional(),
  jobLocation: z.string().optional(),
  location: z
    .object({
      coordinates: z.array(z.number()),
    })
    .optional(),
  description: z.string().optional(),
  jobTitle: z.string().optional(),
  skillLevel: z.string().optional(),
  requiredCandidate: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  duration: z.string().optional(),
  descriptionFileUpload: z.any().optional().optional(),
});

const getSingleSchema = z.object({
  name: z.string().optional(),
  jobLocation: z.string().optional(),
  location: z
    .object({
      coordinates: z.array(z.number()),
    })
    .optional(),
  description: z.string().optional(),
  jobTitle: z.string().optional(),
  skillLevel: z.string().optional(),
  requiredCandidate: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  duration: z.string().optional(),
  descriptionFileUpload: z.any().optional().optional(),
});

const postAllSchema = z.object({
  projectName: z.string().optional(),
  projectLocation: z.string().optional(),
  location: z
    .object({
      coordinates: z.array(z.number()),
    })
    .optional(),
  description: z.string().optional(),
  descriptionFileUpload: z.any().optional(),
  jobTitle: z.string().optional(),
  skillLevel: z.string().optional(),
  requiredCandidate: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  duration: z.string().optional(),
  sector: z.string().optional(),
  payrate: z.string().optional(),
  jobType: z.string().optional(),
  orderNo: z.string().optional(),
});

const ShowAlljobSchema = z.object({
  projectName: z.string().optional(),
  projectLocation: z.string().optional(),
  location: z
    .object({
      coordinates: z.array(z.number()),
    })
    .optional(),
  description: z.string().optional(),
  descriptionFileUpload: z.any().optional(),
  jobTitle: z.string().optional(),
  skillLevel: z.string().optional(),
  requiredCandidate: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  duration: z.string().optional(),
  sector: z.string().optional(),
  payrate: z.string().optional(),
  jobType: z.string().optional(),
  orderNo: z.string().optional(),
});

const jobdetailsFiledSchema = z
  .object({
    jobTitle: z.string().array().optional(),
    skillLevel: z.string().array().optional(),
    noRequried: z.string().array().optional(),
    jobType: z.string().array().optional(),
    payrate: z.string().array().optional(),
    jobsector: z.string().array().optional(),
    jobreference: z.string().optional(),
    jobdescription: z.string().optional(),
    aboutCompany: z.string().optional(),
  })
  .array();

const joblocationSchema = z.object({
  country: z.string(),
  city: z.string(),
  address: z.string(),
  loc: {
    type: {
      type: z.string(),
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: z.number(),
      required: true,
    },
  },
});

export const { schemas: jobSchema, $ref } = buildJsonSchemas(
  {
    createJobSchema,
    createJobResponseSchema,
    deleteSchema,
    getJobResponseSchema,
    updateSchema,
    getSingleSchema,
    postAllSchema,
    ShowAlljobSchema,
    jobdetailsFiledSchema,
    joblocationSchema,
  },
  {
    $id: "jobSchema",
  }
);
