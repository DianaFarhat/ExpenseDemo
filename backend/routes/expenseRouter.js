const express= require('express');
const { createExpense, getExpensesByStatus, updateExpenseStatus } = require('../controllers/expenseController');
const router=express.Router();
const upload = require("../middleware/multer");
// Routes

router.get('/getExpenses', getExpensesByStatus)
router.patch("/updateStatus/:id", updateExpenseStatus);
router.post("/", upload.single("invoice"), createExpense);


module.exports = router; 