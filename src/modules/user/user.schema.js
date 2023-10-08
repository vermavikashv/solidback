import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";
import { ROLE } from "../../models/user.model.js";

const createUserSchema = z.object({
  firstName: z.string({
    required_error: "first is required",
  }),
  lastName: z.any().optional(),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid Email",
    })
    .optional(),
  role: z.enum(ROLE),
  isGuest: z.boolean().default(false),
  phoneNumber: z.number().optional(),
  gender: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional(),
  transport: z.string().optional(),
  companyName: z.string().optional(),
  // experience: z.string().optional(),
  constructionExperince: z.string().optional(),
  startwork: z.string().optional(),
  password: z.string().optional(),
  resume: z.any().optional(),
});

const loginSchema = z.object({
  email: z.string({
    required_error: "email is Required",
    invalid_type_error: "invalid Email",
  }),
  password: z
    .string({
      required_error: "password is Required",
      invalid_type_error: "Invalid Password",
    })
    .min(8),
});

const updatePasswordSchema = z.object({
  newPassword: z
    .string({
      required_error: "New Password is Required",
    })
    .optional(),
});

const forgotPasswordSchema = z.object({
  email: z.string({
    required_error: "Password is Required",
    invalid_type_error: "Invalid Email",
  }),
});

const resetPasswordSchema = z.object({
  password: z.string({
    required_error: "Password is Required",
    invalid_type_error: "Invalid Password",
  }),
  confirmPassword: z.string({
    required_error: "ConfirmPassword is Required",
    invalid_type_error: "Invalid Password",
  }),
  token: z.string(),
});

const updateUserSchema = z.object({
  firstName: z
    .string({
      required_error: "First Name is Required",
      invalid_type_error: "First Name must be string",
    })
    .optional(),
  lastName: z
    .string({
      required_error: "Last Name is required",
      invalid_type_error: "Last Name must be string",
    })
    .optional(),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid Email",
    })
    .optional(),
  phoneNumber: z.number().optional(),
  gender: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional(),
  transport: z.string().optional(),
  companyName: z.string().optional(),
  experience: z.string().optional(),
  startwork: z.string().optional(),
  resume: z.any().optional(),
});

const loginWithSocialMediaSchema = z.object({
  providerId: z.string().optional(),
  firstName: z
    .string({
      required_error: "firstName is required",
    })
    .optional(),
  lastName: z.string().optional(),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid Email",
    })
    .optional(),
  role: z.enum(ROLE),
  isGuest: z.boolean().default(false),
  phoneNumber: z.number().optional(),
  gender: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional(),
  transport: z.string().optional(),
  companyName: z.string().optional(),
  experience: z.string().optional(),
  startDate: z.string().optional(),
  password: z.string().optional(),
  resume: z.any().optional(),
});

const socialMediaLoginResponseSchema = z.object({
  _id: z.string(),
  firstName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  role: z.string(),
  isGuest: z.string(),
  providerId: z.any(),
});

export const { schemas: userSchema, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    loginSchema,
    updatePasswordSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    updateUserSchema,
    loginWithSocialMediaSchema,
    socialMediaLoginResponseSchema,
  },
  {
    $id: "userSchema",
  }
);
