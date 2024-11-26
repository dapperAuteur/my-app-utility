"use server"
import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URL);
mongoose.Promise = global.Promise;

const transactionSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true
    },
  },
  {
    accounts: [{
      type: Schema.Types.ObjectId,
      required: true,
    }]
  },
  {
    description: {
      type: String,
      required: false,
    }
  },
  {
    category: {
      type: String,
      required: true
    }
  },
  {
    relevance: {
      type: String,
      required: false
    }
  },
  {
    tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
   }]
  },
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    date: {
      type: Date,
      required: true,
      default: Date.now()
    }
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.models?.Transaction || mongoose.model("Transaction", transactionSchema);

export default Transaction;