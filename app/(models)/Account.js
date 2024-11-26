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
  },
  // BUG
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag"
  }]
});

const Account = mongoose.models?.Account || mongoose.model("Account", accountSchema);

export default Account;