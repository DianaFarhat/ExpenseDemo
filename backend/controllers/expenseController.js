const Expense= require("../models/expenseSchema");

exports.createExpense = async (req, res) => {
  try {
    const {
      date,
      category,
      expense,
      reimbursement,
      receipt,
      actions,
      requester // 🔹 This comes from localStorage (frontend sends it)
    } = req.body;

    // Simple validation
    const errors = [];

    if (!date) errors.push("Date is required.");
    if (!category) errors.push("Category is required.");
    if (!Number.isFinite(expense)) errors.push("Expense must be a number.");
    if (!requester) errors.push("Requester (from localStorage) is required.");
    if (!["accepted", "rejected", "pending"].includes(actions)) {
      errors.push("Actions must be one of: accepted, rejected, pending.");
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation Error", errors });
    }

    // Create the expense
    const newExpense = new Expense({
      date,
      category,
      expense,
      reimbursement: reimbursement || false,
      receipt,
      requester,
      actions: actions || "pending",
    });

    const savedExpense = await newExpense.save();

    res.status(201).json({
      message: "Expense created successfully!",
      expense: savedExpense,
    });
  } catch (error) {
    console.error("Error creating expense:", error.message);
    res.status(500).json({
      message: "An unexpected error occurred while creating the expense.",
      error: error.message,
    });
  }
};


exports.getPendingExpenses = async (req, res) => {
  try {
    // Default values if query params are missing
    const page = parseInt(req.query.page) || 1; // page number
    const limit = parseInt(req.query.limit) || 10; // items per page
    const skip = (page - 1) * limit;

    // Query for pending expenses
    const [expenses, total] = await Promise.all([
      Expense.find({ actions: "pending" })
        .sort({ createdAt: -1 }) // optional: newest first
        .skip(skip)
        .limit(limit),
      Expense.countDocuments({ actions: "pending" }),
    ]);

    res.status(200).json({
      message: "Pending expenses fetched successfully.",
      page,
      totalPages: Math.ceil(total / limit),
      totalPending: total,
      expenses,
    });
  } catch (error) {
    console.error("Error fetching pending expenses:", error.message);
    res.status(500).json({
      message: "An unexpected error occurred while fetching expenses.",
      error: error.message,
    });
  }
};
