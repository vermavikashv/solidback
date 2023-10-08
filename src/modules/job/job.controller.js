import {
  deletejob,
  getSingleJob,
  getAllJob,
  updatejob,
  markJobAproved,
  applyJob,
  // jobFiledDetails,
  showAllJob,
  interestedJob,
  jobLocation,
  appliedJob,
  guestapplyJob,
  jobSectorOption,
  jobPayrateOption,
  jobTypeOption,
  jobRequiredOption,
  jobskillOption,
  jobTitleOption,
} from "./job.service.js";
import { bufferToFile } from "../../utils/bufferTofile.js";
import sessionService from "../session/session.services.js";
import {
  findUser,
  createUser,
  UserRoles,
  createpernalUserDetails,
} from "../user/user.services.js";
import { createJob } from "./job.service.js";
import PDFGenerator from "pdfkit";
import fs from "fs";
import UserController from "../user/user.controller.js";
class JobController {
  constructor(server) {
    this.server = server;
  }

  async createJobHandler(req, reply) {
    const job = await createJob(req.body, req);
    reply.code(201).send(job);
  }

  async deletehandler(req, reply) {
    await deletejob(req.params.id);
    reply.code(201).send("Delete Successfully");
  }

  async updatehandler(req, reply) {
    const jobUpdate = await updatejob(req.params.id, req.body);
    reply.code(201).send(jobUpdate);
  }

  async getEmployerSingleJob(req, reply) {
    const data = await getSingleJob(req.params.id);
    reply.send(data);
  }

  async getAlljobHandler(req, reply) {
    let { page, limit } = req.query;
    const isAdmin = req.isAdmin;
    if (!page) page = 1;
    if (!limit) limit = 10;
    let id = req.user.id;
    const data = await getAllJob(id, page, limit, isAdmin);
    reply.send(data);
  }

  async showAlljobHandler(req, reply) {
    let { page, limit } = req.query;
    if (!page) page = 1;
    if (!limit) limit = 10;
    // let id = req.user.id;
    const data = await showAllJob(page, limit);
    console.log(new Date());
    reply.send(data);
  }

  async appiedjob(req, reply) {
    const data = await appliedJob(req.user.id);
    reply.send(data);
  }

  async interestedjobHandler(req, reply) {
    const result = await interestedJob(req.body);
    reply.send(result);
  }

  async download(req, reply) {
    console.log("hi");
    // let theOutput = new PDFGenerator();
    // let path = `./uploads/pdfs/TestDocumentMode-${Date.now()}.pdf`;
    // theOutput.pipe(fs.createWriteStream(path));
    // theOutput.text("Some awesome example text");
    // theOutput.end();
    // reply.send({ status: true, msg: "Demo", path: path });
  }

  // async jobDetailsHandler(req, reply) {
  //   const result = await jobFiledDetails();
  //   return result;
  // }

  async jobApply(req, reply) {
    const jobapply = await applyJob(req.user._id, req.params.id);
    return jobapply;
  }

  async guestApplyHandler(req, res) {
    let { passowrd } = req.body;
    if (passowrd) {
      // const createUser = UserController.register;
      // const applyguest = this.jobApply;
    }
    // else {
    // const CreateUser = UserController.register(isGuest == true);
    //   const applyguest = this.jobApply;
    // }
    // end
    const guestapply = await guestapplyJob();
    return guestapply;
  }

  async locationhandler(req, reply) {
    const jobapply = await jobLocation(req.user._id, req.params.id);
    return jobapply;
  }

  async JobTitlehandler(req, reply) {
    const result = await jobTitleOption(req.body);
    return result;
  }
  async Jobskillhandler(req, reply) {
    const result = await jobskillOption(req.body);
    return result;
  }
  async JobRequiredhandler(req, reply) {
    const result = await jobRequiredOption(req.body);
    return result;
  }
  async JobTypehandler(req, reply) {
    const result = await jobTypeOption(req.body);
    return result;
  }
  async PayRatehandler(req, reply) {
    const result = await jobPayrateOption(req.body);
    return result;
  }
  async Jobsectorhandler(req, reply) {
    const result = await jobSectorOption(req.body);
    return result;
  }
}

export default JobController;
