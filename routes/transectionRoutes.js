const express = require('express');
const { 
  createTransaction, 
  fetchTransactions,
  modifyTransaction,
  removeTransaction 
} = require('../controllers/transactionCtrl');

// Router object
const router = express.Router();

// Routes
router.post('/add-transaction', createTransaction);
router.post('/edit-transaction', modifyTransaction);
router.post('/delete-transaction', removeTransaction);
router.post('/get-transactions', fetchTransactions);

module.exports = router;
