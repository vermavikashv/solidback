import { verifyJwt } from "../../hooks/deserializedUser.js";
import UserDetalis from "../../models/user.model.js";
import { bufferToFile } from "../../utils/bufferTofile.js";
import sessionService from "../session/session.services.js";
import {
  comparepassword,
  findUser,
  createUser,
  createpernalUserDetails,
  UserRoles,
  updatePasswordtest,
  getuserdetails,
  updateUserDetails,
} from "./user.services.js";
class UserController {
  constructor(server) {
    this.server = server;
  }

  async register(req, reply) {
    const {
      firstName,
      lastName,
      email,
      role,
      phoneNumber,
      password,
      isGuest,
      providerId,
      gender,
      province,
      city,
      transport,
      startwork,
      constructionExperince,
      resume,
      companyName,
    } = req.body;
    let filePath = `/resume`;
    const oldUser = await findUser(email);
    if (oldUser) {
      return reply.code(409).send({ message: "Email  already Exist" });
    }
    const data = {
      firstName,
      lastName,
      email,
      role,
      phoneNumber,
      password,
      companyName,
      providerId,
    };
    const newUser = await createUser(data);

    sessionService({
      ipAddress: req.socket.remoteAddress,
      userId: newUser._id,
      userAgent: req.headers["user-agent"],
    });
    if (newUser.role === UserRoles.EMPLOYEE) {
      let file;
      if (resume) {
        console.log({ resume, filePath });
        file = bufferToFile(resume, filePath);
      }
      const details = {
        gender,
        province,
        city,
        transport,
        startwork,
        isGuest,
        constructionExperince,
        resume: file ? file.fileUrl : "",
        mimeType: file.mimeType,
        userId: newUser._id,
      };
      await createpernalUserDetails(details, newUser._id);
    }

    let payload = {
      _id: newUser._id,
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
    reply.send({ message: "Registration Scusseslfully" });
  }

  async login(req, reply) {
    const { email, password } = req.body;

    const user = await UserDetalis.findOne({
      email,
    }).select("+password");

    if (!user) {
      reply.code(500).send({ message: "Invalid password or email" });
    }
    sessionService({
      ipAddress: req.socket.remoteAddress,
      userId: user._id,
      userAgent: req.headers["user-agent"],
    });

    const isPasswordMatched = await comparepassword(password, user.password);

    if (!isPasswordMatched) {
      reply.code(404).send({ message: "Invalid password or email" });
    }
    let payload = {
      _id: user._id,
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

  async forgotPassword(req, reply) {
    const user = await UserDetalis.findOne({ email: req.body.email });
    if (user) {
      let payload = {
        _id: user._id,
      };

      const resetPasswordToken = await this.jwt.sign(payload, {
        expiresIn: process.env.EMAIL_JWT_EXPIRE,
      });

      await this.nodemailer.sendMail({
        from: "lhavin7@gmail.com",
        to: "majidkhankhan639@gmail.com",
        subject: "Test Email",
        text: `http://localhost:3000/resetPassword/${resetPasswordToken}`,
      });
      reply.code(200).send({
        message: `Follow This Link This Link Is Valid Only 15Min http://localhost:3000/v1/auth/resetPassword/${resetPasswordToken}`,
      });
    } else {
      reply.send({ message: "Email Does Not Exists" });
    }
  }

  async resetPassword(req, reply) {
    const { password, confirmPassword, token } = req.body;
    if (password !== confirmPassword) {
      reply
        .code(404)
        .send({ message: "passowrd And confirm Password Does Not Match" });
    }
    const response = verifyJwt(this.jwt, token);
    if (response.expired || !response.valid) {
      reply.code(401).send({ message: "link is expired" });
    }
    const user = await UserDetalis.findOne({ _id: response.decoded._id });

    user.password = password;
    await user.save();
    reply.send(user);
  }

  async updatePassword(req, reply) {
    const { newPassword } = req.body;
    const result = await updatePasswordtest(req.user._id, newPassword);
    reply.send(result);
  }

  async userUpdate(req, reply) {
    const { _id } = req.user;
    // const _id = "6399a641106649c4bbe5b767";
    const response = await updateUserDetails(_id, req.body);
    reply.send(response);
  }

  async logout(req, reply) {
    sessionService({
      isValid: false,
      ipAddress: req.socket.remoteAddress,
      userAgent: req.headers["user-agent"],
      userId: req.user._id,
    });
    reply.send({ message: "logout succesfully" });
  }

  async getuserdetailsHandler(req, reply) {
    const result = await getuserdetails(req.user._id);
    reply.send(result);
  }

  async loginWithSocialMedia(req, reply) {
    const { email } = req.body;
    const user = await findUser(email);
    if (user) {
      let payload = {
        _id: user._id,
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
      reply.send(user);
    } else {
      const newUser = await createUser(req.body);
      let payload = {
        _id: newUser._id,
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
      reply.send(newUser);
    }
  }
}
export default UserController;
