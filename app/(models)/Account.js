"use server"

import mongoose, { Schema } from "mongoose";
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const accountSchema = new Schema({
  account_name: {
    type: String,
    required: true,
    unique: true,
  },
  account_type: {
    type: String,
    required: true,
    default: "Checking"
  }
});

const Account = mongoose.models?.Account || mongoose.model("Account", accountSchema);

export default Account;