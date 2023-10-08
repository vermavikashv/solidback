import AdminController from "./admin.controller.js";
import { requireAdmin } from "../../hooks/requireUser.js";
import { $ref } from "./admin.schema.js";
const adminRoutes = (fastify, options, done) => {
  const adminController = new AdminController(fastify);

  fastify.post(
    "/sign-up",
    {
      schema: {
        body: $ref("adminSignupSchema"),
        tags: ["Admin"],
      },
    },
    adminController.signupHandler
  );

  fastify.post(
    "/login",
    {
      schema: {
        body: $ref("adminSignupSchema"),
        tags: ["Admin"],
      },
    },
    adminController.login
  );

  fastify.put(
    "/change-password",
    {
      schema: {
        body: $ref("adminUpdateSchema"),
        tags: ["Admin"],
      },
      preHandler: [requireAdmin],
    },
    adminController.updatePassword
  );

  fastify.get(
    "/logout",
    {
      schema: {
        // body: $ref("getAllUserSchema"),
        tags: ["Admin"],
      },
      preHandler: [requireAdmin],
    },
    adminController.logout
  );

  fastify.get(
    "/get-all-user",
    {
      schema: {
        // body: $ref("getAllUserSchema"),
        tags: ["Admin"],
        response: {
          // 200: $ref("getAllUserResponseSchema"),
        },
      },
      preHandler: [requireAdmin],
    },
    adminController.getuser
  );

  fastify.get(
    "/get-single-user/:id",
    {
      schema: {
        // body: $ref("singleUserSchema"),
        tags: ["Admin"],
        response: {
          201: $ref("singleUserSchema"),
        },
      },
      preHandler: [requireAdmin],
    },
    adminController.getsingleUser
  );

  fastify.patch(
    "/edit-user/:id",
    {
      schema: {
        body: $ref("editDataSchema"),
        tags: ["Admin"],
      },
      preHandler: [requireAdmin],
    },
    adminController.editUserhandler
  );

  fastify.get(
    "/all-staffing-request",
    {
      schema: {
        tags: ["Admin"],
      },
      preHandler: [requireAdmin],
    },
    adminController.staffingRequestHandler
  );

  fastify.get(
    "/single-staffing-request/:id",
    {
      schema: {
        tags: ["Admin"],
      },
      preHandler: [requireAdmin],
    },
    adminController.singleStaffingRequestHandler
  );

  fastify.patch(
    "/edit-staffing-request/:id",
    {
      schema: {
        body: $ref("editStaftDataSchema"),
        tags: ["Admin"],
      },
      preHandler: [requireAdmin],
    },
    adminController.editstaffingRequestHandler
  );

  fastify.delete(
    "/delete-user/:id",
    {
      schema: {
        tags: ["Admin"],
      },
      preHandler: [requireAdmin],
    },
    adminController.deleteUserHandler
  );

  fastify.get(
    "/approved",
    {
      schema: {
        tags: ["Admin"],
        response: {
          201: $ref("postAllSchema"),
        },
      },
      preHandler: [requireAdmin],
    },
    adminController.markjobhandler
  );

  fastify.get(
    "/get-job-history/:id",
    {
      schema: {
        tags: ["Admin"],
      },
    },
    adminController.getJobHistoryHandler
  );

  fastify.post(
    "/job-title",
    {
      schema: {
        tags: ["Admin"],
      },
    },
    adminController.adminJobTitlehandler
  );

  fastify.post(
    "/job-skill",
    {
      schema: {
        tags: ["Admin"],
      },
    },
    adminController.adminJobskillhandler
  );

  fastify.post(
    "/no-required",
    {
      schema: {
        tags: ["Admin"],
      },
    },
    adminController.adminJobRequiredhandler
  );
  fastify.post(
    "/job-type",
    {
      schema: {
        tags: ["Admin"],
      },
    },
    adminController.adminJobTypehandler
  );
  fastify.post(
    "/pay-rate",
    {
      schema: {
        tags: ["Admin"],
      },
    },
    adminController.adminPayRatehandler
  );
  fastify.post(
    "/job-sector",
    {
      schema: {
        tags: ["Admin"],
      },
    },
    adminController.adminJobsectorhandler
  );
  fastify.delete(
    "/delete-staffing-request/:id",
    {
      schema: {
        tags: ["Admin"],
      },
      preHandler: [requireAdmin],
    },
    adminController.deletestaffingRequestHandler
  );

  // fastify.post(
  //   "/job-role-option",
  //   {
  //     schema: {
  //       tags: ["Admin"],
  //       body: $ref("adminjobRoleSchema"),
  //     },
  //   },
  //   adminController.adminJobRolehandler
  // );

  done();
};
export default adminRoutes;
