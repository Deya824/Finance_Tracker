const mongoose = require('mongoose');

const financialRecordSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  transactionAmount: {
    type: Number,
    required: [true, 'Transaction amount is mandatory']
  },
  transactionType: {
    type: String,
    required: [true, 'Transaction type must be specified']
  },
  transactionCategory: {
    type: String,
    required: [true, 'Category is mandatory']
  },
  transactionNote: {
    type: String,
    required: [true, 'Description is required']
  },
  paymentReference: {
    type: String
  },
  transactionDate: {
    type: Date,
    required: [true, 'Date must be provided']
  }
}, {
  timestamps: true,
  collection: 'financial_records'
});

const FinancialRecord = mongoose.model('FinancialRecord', financialRecordSchema);

module.exports = FinancialRecord;
