const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  expense: {
    type: Number,
    required: true,
  },
  reimbursement: {
    type: Number,
    required: true,
  },
  receipt: {
    type: String, // Store file path or URL to uploaded receipt
  },
  requester: {
    type: String,
    required: true,
  },
  actions: {
    type: String,
    enum: ["approved", "rejected", "pending"],
    default: "pending",
  }
}, { timestamps: true });

module.exports = mongoose.model("Expense", expenseSchema);
