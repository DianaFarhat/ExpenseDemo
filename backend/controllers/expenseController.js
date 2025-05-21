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
    if (!["approved", "rejected", "pending"].includes(actions)) {
      errors.push("Actions must be one of: approved, rejected, pending.");
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


exports.getExpensesByStatus = async (req, res) => {
  try {
    const status = req.query.status || "pending"; // default to 'pending'
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [expenses, total] = await Promise.all([
      Expense.find({ actions: status })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Expense.countDocuments({ actions: status }),
    ]);

    res.status(200).json({
      message: `${status.charAt(0).toUpperCase() + status.slice(1)} expenses fetched successfully.`,
      page,
      totalPages: Math.ceil(total / limit),
      total: total,
      expenses,
    });
  } catch (error) {
    console.error("Error fetching expenses:", error.message);
    res.status(500).json({
      message: "An unexpected error occurred while fetching expenses.",
      error: error.message,
    });
  }
};

exports.updateExpenseStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { actions } = req.body;

    const updated = await Expense.findByIdAndUpdate(id, { actions }, { new: true });
    if (!updated) return res.status(404).json({ message: "Expense not found" });

    res.status(200).json({ message: "Status updated", expense: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
