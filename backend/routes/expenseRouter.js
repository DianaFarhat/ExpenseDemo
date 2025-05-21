const express= require('express');
const { createExpense, getPendingExpenses } = require('../controllers/expenseController');
const router=express.Router();

// Routes
router.post('/createExpense', createExpense)
router.get('/getAllPending', getPendingExpenses)




module.exports = router; 