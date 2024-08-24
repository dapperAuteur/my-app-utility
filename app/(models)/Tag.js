"use server"

import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const tagSchema = new Schema({
  tag_name: {
    type: String,
    required: true,
  },
  description: String,
});

const Tag = mongoose.models?.Tag || mongoose.model("Tag", tagSchema);

export default Tag;
