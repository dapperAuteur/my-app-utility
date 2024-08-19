"use server"
import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URL);
mongoose.Promise = global.Promise;

// export interface Transactions

const transactionSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true
    },
  },
  {
    account: {
      type: String,
      required: true,
    }
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