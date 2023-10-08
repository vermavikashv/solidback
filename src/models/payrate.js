import mongoose, { Schema } from "mongoose";
const Payrate = new Schema({
  payRate: {
    type: String,
  },
});

const PayrateField = mongoose.model("payrateField", Payrate);

export default PayrateField;
