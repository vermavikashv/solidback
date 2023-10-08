import nodemailer from "fastify-nodemailer";

const emailNode = (app) => {
  app.register(nodemailer, {
    // pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "lhavin7@gmail.com",
      pass: "clbwiyybnembnybj",
    },
  });
};
export default emailNode;
