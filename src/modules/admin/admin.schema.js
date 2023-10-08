import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const adminSignupSchema = z.object({
  email: z.string({
    required_error: "email is Required",
    invalid_type_error: "invalid Email",
  }),
  password: z.string({
    required_error: "password is Required",
    invalid_type_error: "Invalid Password",
  }),
});

const adminUpdateSchema = z.object({
  newPassword: z.string({
    required_error: "newPassword is Required",
    invalid_type_error: "invalid new password",
  }),
});

const getAllUserResponseSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    phoneNumber: z.string().optional(),
    companyName: z.string().optional(),
    role: z.string().optional(),
    gender: z.string().optional(),
    province: z.string().optional(),
    city: z.string().optional(),
    transport: z.string().optional(),
    constructionExperince: z.string().optional(),
    startwork: z.string().optional(),
    favourite: z.string().optional(),
    resume: z.string().optional(),
    employee: z.any(),
  })
  .array();

const singleUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  companyName: z.string().optional(),
  role: z.string().optional(),
  gender: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional(),
  transport: z.string().optional(),
  constructionExperince: z.string().optional(),
  startwork: z.string().optional(),
  favourite: z.string().optional(),
  resume: z.string().optional(),
});

const editDataSchema = z.object({
  firstName: z.string({
    required_error: "firstName is Required",
    invalid_type_error: "invalid firstName",
  }),
  lastName: z.string({
    required_error: "lastName is Required",
    invalid_type_error: "Invalid lastName",
  }),
  email: z.string({
    required_error: "email is Required",
    invalid_type_error: "invalid Email",
  }),
  password: z.string({
    required_error: "password is Required",
    invalid_type_error: "Invalid Password",
  }),
  phoneNumber: z.string({
    required_error: "phoneNumber is Required",
    invalid_type_error: "invalid phoneNumber",
  }),
  gender: z.string({
    required_error: "gender is Required",
    invalid_type_error: "Invalid gender",
  }),
  province: z.string({
    required_error: "province is Required",
    invalid_type_error: "Invalid province",
  }),
  city: z.string({
    required_error: "city is Required",
    invalid_type_error: "Invalid city",
  }),
  transport: z.string({
    required_error: "transport is Required",
    invalid_type_error: "Invalid transport",
  }),
  constructionExperince: z.string({
    required_error: "constructionExperince is Required",
    invalid_type_error: "Invalid constructionExperince",
  }),
  startwork: z.string({
    required_error: "startwork is Required",
    invalid_type_error: "Invalid startwork",
  }),
  favourite: z.string({
    required_error: "favourite is Required",
    invalid_type_error: "Invalid favourite",
  }),
  resume: z.string({
    required_error: "resume is Required",
    invalid_type_error: "Invalid resume",
  }),
});

const editStaftDataSchema = z.object({
  name: z.string().optional(),
  jobLocation: z.string().optional(),
  jobTitle: z.string().optional(),
  skillLevel: z.string().optional(),
  requiredCandidate: z.string().optional(),
  description: z.string().optional(),
  createdAt: z.string().optional(),
  orderNo: z.string().optional(),
});

const adminjobRoleSchema = z.object({
  generaloperative: z.string().array().optional(),
  skilledworker: z.string().array().optional(),
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

export const { schemas: adminSchema, $ref } = buildJsonSchemas(
  {
    adminSignupSchema,
    adminUpdateSchema,
    getAllUserResponseSchema,
    singleUserSchema,
    editDataSchema,
    editStaftDataSchema,
    postAllSchema,
    adminjobRoleSchema,
  },
  {
    $id: "adminSchema",
  }
);
