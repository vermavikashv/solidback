import mongoose, { Schema } from "mongoose";
import { bcryptPassword } from "../utils/modelHelper.js";

const admin = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

admin.pre("save", bcryptPassword);

admin.methods.comparepasswords = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};
const adminDetails = mongoose.model("adminDetails", admin);
export default adminDetails;
