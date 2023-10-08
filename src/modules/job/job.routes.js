import requireUser from "../../hooks/requireUser.js";
import JobController from "./job.controller.js";
import { $ref } from "./job.schema.js";

const jobRoutes = (fastify, options, done) => {
  const Jobcontroller = new JobController(fastify);
  fastify.post(
    "/create-Job",
    // {
    //   schema: {
    //     body: $ref("createJobSchema"),
    //     tags: ["Employeer"],
    //     response: {
    //       201: $ref("createJobResponseSchema"),
    //     },
    //   },
    //   consumes: ["multipart/form-data"],
    //   preHandler: [requireUser],
    // },
    Jobcontroller.createJobHandler
  );

  fastify.delete(
    "/delete-Job/:id",
    {
      schema: {
        tags: ["Employeer"],
        response: {
          201: $ref("deleteSchema"),
        },
      },
      preHandler: [requireUser],
    },
    Jobcontroller.deletehandler
  );

  fastify.patch(
    "/update-Job/:id",
    {
      schema: {
        body: $ref("updateSchema"),
        tags: ["Employeer"],
        response: {
          201: $ref("updateSchema"),
        },
      },
      preHandler: [requireUser],
    },
    Jobcontroller.updatehandler
  );

  fastify.get(
    "/get-single-Job/:id",
    {
      schema: {
        // body: $ref("getSingleSchema"),
        tags: ["Employeer"],
        response: {
          201: $ref("getSingleSchema"),
        },
      },
      // preHandler: [requireUser],
    },
    Jobcontroller.getEmployerSingleJob
  );

  fastify.get(
    "/get-all-job",
    {
      schema: {
        tags: ["Employeer"],
        response: {
          201: $ref("postAllSchema"),
        },
      },
      preHandler: [requireUser],
    },
    Jobcontroller.getAlljobHandler
  );

  fastify.post(
    "/download",
    {
      schema: {
        tags: ["Employeer"],
      },
      preHandler: [requireUser],
    },
    Jobcontroller.download
  );

  // fastify.get(
  //   "/job-details-filed",
  //   {
  //     schema: {
  //       tags: ["Employeer"],
  //       // response: {
  //       //   200: $ref("jobdetailsFiledSchema"),
  //       // },
  //     },
  //     // preHandler: [requireUser],
  //   },
  //   Jobcontroller.jobDetailsHandler
  // );

  fastify.post(
    "/location-api",
    {
      schema: {
        body: $ref("joblocationSchema"),
        tags: ["Employeer"],
      },
    },
    Jobcontroller.locationhandler
  );

  // employee api start
  fastify.post(
    "/job-apply/:id",
    {
      schema: {
        tags: ["Employee"],
      },
      preHandler: [requireUser],
    },
    Jobcontroller.jobApply
  );

  fastify.get(
    "/show-all-job",
    {
      schema: {
        tags: ["Employee"],
        response: {
          201: $ref("ShowAlljobSchema"),
        },
      },
      // preHandler: [requireUser],
    },
    Jobcontroller.showAlljobHandler
  );

  fastify.get(
    "/applied-job",
    {
      schema: {
        tags: ["Employee"],
      },
      preHandler: [requireUser],
    },
    Jobcontroller.appiedjob
  );

  fastify.post(
    "/apply-guest/:id",
    {
      schema: {
        body: $ref("createJobSchema"),
        tags: ["Employee"],
        response: {
          201: $ref("createJobResponseSchema"),
        },
      },
      consumes: ["multipart/form-data"],
      // preHandler: [requireUser],
    },
    Jobcontroller.guestApplyHandler
  );
  // employee api End

  fastify.get(
    "/job-title",
    {
      schema: {
        tags: ["Employee"],
      },
    },
    Jobcontroller.JobTitlehandler
  );

  fastify.get(
    "/job-skill",
    {
      schema: {
        tags: ["Employee"],
      },
    },
    Jobcontroller.Jobskillhandler
  );

  fastify.get(
    "/no-required",
    {
      schema: {
        tags: ["Employee"],
      },
    },
    Jobcontroller.JobRequiredhandler
  );
  fastify.get(
    "/job-type",
    {
      schema: {
        tags: ["Employee"],
      },
    },
    Jobcontroller.JobTypehandler
  );
  fastify.get(
    "/pay-rate",
    {
      schema: {
        tags: ["Employee"],
      },
    },
    Jobcontroller.PayRatehandler
  );
  fastify.get(
    "/job-sector",
    {
      schema: {
        tags: ["Employee"],
      },
    },
    Jobcontroller.Jobsectorhandler
  );

  done();
};
export default jobRoutes;
