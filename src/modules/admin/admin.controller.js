import adminDetails from "../../models/admin.mode.js";
import { comparepassword } from "../user/user.services.js";
import {
  editStaffingRequest,
  editUserDetails,
  getalluser,
  getJobHistory,
  getStaffingRequest,
  signupAdmin,
  singleUser,
  updatePassworded,
  userdelete,
  markJobAproved,
  adminjobTitleOption,
  getSingleStaffingRequest,
  adminjobskillOption,
  adminjobSectorOption,
  adminjobPayrateOption,
  adminjobTypeOption,
  adminjobRequiredOption,
  deleteStaffingRequest,
} from "./admin.service.js";
class AdminController {
  constructor(server) {
    this.server = server;
  }

  async signupHandler(req, reply) {
    const { email, password } = req.body;
    await signupAdmin(email, password);
    reply.send("successsfully signup ");
  }

  async login(req, reply) {
    const { email, password } = req.body;
    const check = await adminDetails
      .findOne({
        email,
      })
      .select("+password");
    if (!check) {
      reply.code(500).send({ message: "Invalid email or password" });
    }
    const isPasswordMatched = await comparepassword(password, check.password);
    if (!isPasswordMatched) {
      reply.code(404).send({ message: "Invalid password or email" });
    }
    let payload = {
      _id: check._id,
    };
    const accessToken = this.jwt.sign(payload, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    // create  refresh token
    const refreshToken = this.jwt.sign(payload, {
      expiresIn: process.env.REFRESHTOKEN,
    });
    reply.header("x-access", accessToken);
    reply.header("x-refresh", refreshToken);
    reply.send({ message: "Login Scusseslfully" });
  }

  async updatePassword(req, reply) {
    const { newPassword } = req.body;
    const result = await updatePassworded(req.admin._id, newPassword);
    reply.send(result);
  }

  async logout(req, reply) {
    sessionService({
      isValid: false,
      ipAddress: req.socket.remoteAddress,
      userAgent: req.headers["user-agent"],
      userId: req.admin._id,
    });
    reply.send({ message: "logout succesfully" });
  }

  async markjobhandler(req, reply) {
    const jobUpdate = await markJobAproved(req.user.id);
    reply.code(200).send(jobUpdate);
  }

  async getuser(req, reply) {
    let { page, limit, role } = req.query;
    const result = await getalluser(
      role,

      Number(limit) || 10,
      Number(page) || 1
    );

    reply.send(result);
  }

  async getsingleUser(req, reply) {
    let id = req.params.id;
    const result = await singleUser(id);
    reply.code(200).send(result);
  }

  async editUserhandler(req, reply) {
    const result = await editUserDetails(req.params.id, req.body);
    reply.code(201).send(result);
  }

  async staffingRequestHandler(req, reply) {
    let { isAproved, isDelete, page, limit } = req.query;
    const result = await getStaffingRequest(isAproved, isDelete, page, limit);
    reply.code(200).send(result);
  }

  async singleStaffingRequestHandler(req, reply) {
    const result = await getSingleStaffingRequest(req.params.id);
    reply.code(200).send(result);
  }

  async deleteUserHandler(req, reply) {
    const result = await userdelete(req.params.id);
    reply.code(200).send(result);
  }

  async editstaffingRequestHandler(req, reply) {
    const result = await editStaffingRequest(req.params.id, req.body);
    reply.code(201).send(result);
  }

  async getJobHistoryHandler(req, reply) {
    const id = req.params.id;
    const result = await getJobHistory(id);
    reply.send({
      result,
    });
  }

  async adminJobTitlehandler(req, reply) {
    const result = await adminjobTitleOption(req.body);
    return result;
  }
  async adminJobskillhandler(req, reply) {
    const result = await adminjobskillOption(req.body);
    return result;
  }
  async adminJobRequiredhandler(req, reply) {
    const result = await adminjobRequiredOption(req.body);
    return result;
  }
  async adminJobTypehandler(req, reply) {
    const result = await adminjobTypeOption(req.body);
    return result;
  }
  async adminPayRatehandler(req, reply) {
    const result = await adminjobPayrateOption(req.body);
    return result;
  }
  async adminJobsectorhandler(req, reply) {
    const result = await adminjobSectorOption(req.body);
    return result;
  }

  async deletestaffingRequestHandler(req, reply) {
    const result = await deleteStaffingRequest(req.params.id);
    reply.code(201).send(result);
  }
}
export default AdminController;
