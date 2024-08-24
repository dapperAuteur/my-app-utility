"use server"

import mongoose, { Schema } from "mongoose";
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const accountSchema = new Schema({
  accountName: {
    type: String,
    required: true,
    unique: true,
  },
  accountType: {
    type: String,
    required: true,
    default: "Checking"
  }
});

const Account = mongoose.models?.Account || mongoose.model("Account", accountSchema);

export default Account;