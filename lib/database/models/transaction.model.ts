import { Schema, model, models } from "mongoose";

/* Transaction is used as an additional reference between the user and the Image creation,
Because we have to keep track of the credits. 
Each transaction is essentially a stripe conversion that we make to turn credits into images
*/ 
const TransactionSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  stripeId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  plan: { type: String },
  credits: { type: Number },
  buyer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Transaction = models?.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
