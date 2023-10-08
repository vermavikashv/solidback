import Fastify from "fastify";
import userRoutes from "./src/modules/user/user.routes.js";
import fastifySwagger from "@fastify/swagger";
import { withRefResolver } from "fastify-zod";
import { userSchema } from "./src/modules/user/user.schema.js";
import { jobSchema } from "./src/modules/job/job.schema.js";
import { adminSchema } from "./src/modules/admin/admin.schema.js";
import dataBaseConnection from "./src/utils/connection.js";
import fastifyCors from "@fastify/cors";
import jobRoutes from "./src/modules/job/job.routes.js";
import jwt from "@fastify/jwt";
import adminRoutes from "./src/modules/admin/admin.routes.js";
import fastifymultipart from "fastify-multipart";
import fastifyStatic from "@fastify/static";
import path from "path";
import {
  deserializedAdmin,
  deserializedUser,
} from "./src/hooks/deserializedUser.js";
import emailNode from "./src/utils/nodeMailer.js";
import UserController from "./src/modules/user/user.controller.js";

const buildServer = () => {
  const app = Fastify({
    // logger: true
  });
  app.get("/", function (request, reply) {
    reply.send({ hello: "world" });
  });

  dataBaseConnection();
  app.register(jwt, {
    secret: process.env.SECRET,
  });
  app.register(fastifymultipart, {
    addToBody: true,
    attachFieldsToBody: true,
  });
  app.register(fastifyStatic, {
    root: path.join(process.cwd(), "public"),
    prefix: "/public/",
  });
  app.addHook("onRequest", deserializedUser);
  app.addHook("onRequest", deserializedAdmin);
  emailNode(app);
  for (const schema of [...userSchema]) {
    app.addSchema(schema);
  }
  for (const schema of [...jobSchema]) {
    app.addSchema(schema);
  }
  for (const schema of [...adminSchema]) {
    app.addSchema(schema);
  }

  app.register(
    fastifySwagger,
    withRefResolver({
      routePrefix: "/docs",
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: "Solid Work API",
          description: "API for solid Work",
          version: "1.0.0",
        },
      },
    })
  );
  // cors
  app.register(fastifyCors, {
    origin: (origin, cb) => {
      let hostname;
      const frontendHostname = new URL(process.env.FRONTEND_URL).hostname;
      const adminHostname = new URL(process.env.ADMIN_URL).hostname;
      try {
        hostname = new URL(origin).hostname;
      } catch (error) {
        hostname = "localhost";
      }

      if (
        hostname === "localhost" ||
        hostname === frontendHostname ||
        hostname === adminHostname
      ) {
        // Request will pass
        cb(null, true);
        return;
      }
      // Generate an error on other origins, disabling access
      cb(new Error("Not allowed"), false);
    },
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-refresh",
      "Access-Control-Allow-Origin",
      "Origin",
      "X-Requested-With",
      "Accept",
    ],

    exposedHeaders: ["x-refresh", "x-access"],
  });

  app.register(userRoutes, { prefix: "v1/auth" });
  app.register(jobRoutes, { prefix: "v1/job" });
  app.register(adminRoutes, { prefix: "v1/admin" });

  return app;
};

export default buildServer;
