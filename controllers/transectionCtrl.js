const Transaction = require('../models/transactionModel');
const dayjs = require('dayjs');

const transactionController = {
  getTransactions: async (req, res) => {
    try {
      const { timeframe, dateRange, userId, transactionType } = req.body;
      const filter = { userId };

      // Date filtering logic
      if (timeframe !== 'custom') {
        filter.createdAt = { 
          $gt: dayjs().subtract(Number(timeframe), 'day').toDate() 
        };
      } else if (dateRange?.length === 2) {
        filter.createdAt = {
          $gte: dayjs(dateRange[0]).startOf('day').toDate(),
          $lte: dayjs(dateRange[1]).endOf('day').toDate()
        };
      }

      // Transaction type filtering
      if (transactionType && transactionType !== 'all') {
        filter.transactionType = transactionType;
      }

      const transactions = await Transaction.find(filter);
      res.json(transactions);
      
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ message: 'Failed to retrieve transactions' });
    }
  },

  createTransaction: async (req, res) => {
    try {
      const transaction = new Transaction({
        ...req.body,
        reference: `TX-${Date.now()}`
      });
      await transaction.save();
      res.status(201).json({ message: 'Transaction recorded', id: transaction._id });
    } catch (error) {
      console.error('Transaction creation failed:', error);
      res.status(400).json({ message: 'Invalid transaction data' });
    }
  },

  updateTransaction: async (req, res) => {
    try {
      const { transactionId, updates } = req.body;
      const updated = await Transaction.findByIdAndUpdate(
        transactionId,
        { ...updates, lastModified: Date.now() },
        { new: true }
      );
      res.json({ message: 'Transaction updated', transaction: updated });
    } catch (error) {
      console.error('Update failed:', error);
      res.status(404).json({ message: 'Transaction not found' });
    }
  },

  removeTransaction: async (req, res) => {
    try {
      await Transaction.findByIdAndDelete(req.body.transactionId);
      res.json({ message: 'Transaction deleted' });
    } catch (error) {
      console.error('Deletion failed:', error);
      res.status(404).json({ message: 'Transaction not found' });
    }
  }
};

module.exports = transactionController;
