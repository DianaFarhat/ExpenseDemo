const express= require('express');
const { createExpense, getExpensesByStatus } = require('../controllers/expenseController');
const router=express.Router();

// Routes
router.post('/createExpense', createExpense)
router.get('/getExpenses', getExpensesByStatus)




module.exports = router; 