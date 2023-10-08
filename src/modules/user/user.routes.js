import requireUser from "../../hooks/requireUser.js";
import UserController from "./user.controller.js";
import { $ref } from "./user.schema.js";
const userRoutes = (fastify, options, done) => {
  const userController = new UserController(fastify);

  fastify.post(
    "/register",
    {
      schema: {
        body: $ref("createUserSchema"),
        tags: ["Authentication"],
      },
      consumes: ["multipart/form-data"],
    },
    userController.register
  );

  fastify.post(
    "/loginWithSocialMedia",
    {
      schema: {
        body: $ref("loginWithSocialMediaSchema"),
        tags: ["Authentication"],
        response: {
          200: $ref("socialMediaLoginResponseSchema"),
        },
      },
    },
    userController.loginWithSocialMedia
  );

  fastify.post(
    "/login",
    {
      schema: {
        body: $ref("loginSchema"),
        tags: ["Authentication"],
      },
    },
    userController.login
  );

  fastify.post(
    "/forgotPassword",
    {
      schema: {
        body: $ref("forgotPasswordSchema"),
        tags: ["Authentication"],
      },
    },
    userController.forgotPassword
  );

  fastify.post(
    "/resetPassword",
    {
      schema: {
        body: $ref("resetPasswordSchema"),
        tags: ["Authentication"],
      },
    },
    userController.resetPassword
  );

  fastify.put(
    "/updatePassword",
    {
      schema: {
        body: $ref("updatePasswordSchema"),
        tags: ["Authentication"],
      },
      preHandler: [requireUser],
    },
    userController.updatePassword
  );

  fastify.patch(
    "/userUpdate",
    {
      schema: {
        body: $ref("updateUserSchema"),
        tags: ["Authentication"],
      },
      consumes: ["multipart/form-data"],
      preHandler: [requireUser],
    },
    userController.userUpdate
  );

  fastify.get(
    "/logout",
    {
      schema: {
        tags: ["Authentication"],
      },
      preHandler: [requireUser],
    },
    userController.logout
  );

  fastify.get(
    "/get-user-Detais",
    {
      schema: {
        tags: ["Authentication"],
      },
      preHandler: [requireUser],
    },
    userController.getuserdetailsHandler
  );

  done();
};
export default userRoutes;
