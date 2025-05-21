const express= require('express');
const { createExpense, getExpensesByStatus, updateExpenseStatus } = require('../controllers/expenseController');
const router=express.Router();

// Routes
router.post('/', createExpense); // ✅ cleaner and conventional
router.get('/getExpenses', getExpensesByStatus)
router.patch("/updateStatus/:id", updateExpenseStatus);



module.exports = router; 