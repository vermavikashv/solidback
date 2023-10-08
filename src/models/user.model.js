import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { UserRoles } from "../modules/user/user.services.js";
import { bcryptPassword } from "../utils/modelHelper.js";
export const ROLE = Object.values(UserRoles);
const user = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      select: false,
    },
    phoneNumber: {
      type: Number,
    },
    companyName: {
      type: String,
    },
    role: { type: String, enum: ROLE },
    isGuest: { type: Boolean, default: false },
    isDelete: { type: Boolean, default: false },
    providerId: { type: String, default: false },
  },
  {
    timestamps: true,
  }
);

user.pre("save", bcryptPassword);

user.methods.comparepasswords = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};

const UserDetalis = mongoose.model("UserDetali", user);

export default UserDetalis;
